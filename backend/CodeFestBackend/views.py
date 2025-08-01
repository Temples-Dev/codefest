from django.shortcuts import render
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.db import transaction
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Sum
from django.contrib.auth import get_user_model
import csv
import io
from datetime import datetime
from decimal import Decimal
from .models import (
    StudentProfile, Programme, DuesStructure, 
    Payment, RawStudentImport, CustomUser
)
from .serializers import (
    StudentProfileSerializer, StudentCreateUpdateSerializer,
    ProgrammeSerializer, DuesStructureSerializer,
    CSVImportSerializer, RawStudentImportSerializer,
    StudentImportProcessSerializer
)
from .permissions import IsAdmin, IsSupervisor
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Sum
from django.contrib.auth import get_user_model

from .models import StudentProfile, Programme, DuesStructure, Payment
from .serializers import StudentProfileSerializer
from .permissions import IsCashier, IsStudent
from .serializers import StudentRegistrationSerializer

# Add these views to your existing views.py file

from rest_framework import generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Sum, F
from django.contrib.auth import get_user_model

from .models import StudentProfile, Programme, DuesStructure, Payment
from .serializers import StudentProfileSerializer, ProgrammeSerializer, DuesStructureSerializer
from .permissions import IsCashier, IsStudent

# Get the custom user model
CustomUser = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = StudentRegistrationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            with transaction.atomic():
                # Create user with STUDENT role
                user_data = {
                    'email': serializer.validated_data['email'],
                    'password': serializer.validated_data['password'],
                    'role': 'STUDENT'  # Force role to be STUDENT
                }
                
                user = CustomUser.objects.create_user(**user_data)
                
                # Get or create programme
                programme_name = serializer.validated_data['programme']
                programme, created = Programme.objects.get_or_create(
                    name=programme_name
                )
                
                # Get or create dues structure
                academic_year = serializer.validated_data['academic_year']
                dues_structure, created = DuesStructure.objects.get_or_create(
                    academic_year=academic_year,
                    defaults={'amount': 0.00}  # Default amount, can be updated by admin
                )
                
                # Create student profile
                student_profile = StudentProfile.objects.create(
                    user=user,
                    index_no=serializer.validated_data['index_no'],
                    first_name=serializer.validated_data['first_name'],
                    surname=serializer.validated_data['surname'],
                    programme=programme,
                    phone=serializer.validated_data.get('phone', ''),
                    academic_year=dues_structure
                )
                
                return Response({
                    'message': 'Student registration successful',
                    'user': {
                        'email': user.email,
                        'role': user.role,
                    },
                    'student': {
                        'index_no': student_profile.index_no,
                        'first_name': student_profile.first_name,
                        'surname': student_profile.surname,
                        'programme': student_profile.programme.name,
                        'academic_year': student_profile.academic_year.academic_year,
                    }
                }, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            return Response({
                'error': f'Registration failed: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            return Response({
                'message': 'Login successful',
                **response.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Invalid email or password'
            }, status=status.HTTP_401_UNAUTHORIZED)

class RefreshTokenView(TokenRefreshView):
    pass

class IsAdminOrSupervisor(IsAuthenticated):
    def has_permission(self, request, view):
        return (super().has_permission(request, view) and 
                request.user.role in ['ADMIN', 'SUPERVISOR'])

# Student CRUD Views
class StudentListView(generics.ListAPIView):
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAdminOrSupervisor]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['programme', 'academic_year', 'programme__name']
    search_fields = ['first_name', 'surname', 'index_no', 'user__email', 'programme__name']
    ordering_fields = ['first_name', 'surname', 'index_no', 'academic_year__academic_year']
    ordering = ['surname', 'first_name']
    
    def get_queryset(self):
        queryset = StudentProfile.objects.select_related(
            'user', 'programme', 'academic_year'
        ).prefetch_related('payments')
        
        # Additional custom filters
        position = self.request.query_params.get('position', None)
        year = self.request.query_params.get('year', None)
        programme_name = self.request.query_params.get('programme_name', None)
        payment_status = self.request.query_params.get('payment_status', None)
        
        if year:
            queryset = queryset.filter(academic_year__academic_year__icontains=year)
        
        if programme_name:
            queryset = queryset.filter(programme__name__icontains=programme_name)
        
        if payment_status:
            if payment_status == 'paid':
                # Students who have paid in full
                queryset = queryset.filter(
                    payments__amount__gte=models.F('academic_year__amount')
                )
            elif payment_status == 'partial':
                # Students with partial payments
                queryset = queryset.filter(
                    payments__amount__lt=models.F('academic_year__amount'),
                    payments__amount__gt=0
                )
            elif payment_status == 'unpaid':
                # Students with no payments
                queryset = queryset.filter(payments__isnull=True)
        
        return queryset

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentProfile.objects.select_related('user', 'programme', 'academic_year')
    serializer_class = StudentCreateUpdateSerializer
    permission_classes = [IsAdminOrSupervisor]
    lookup_field = 'index_no'
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return StudentProfileSerializer
        return StudentCreateUpdateSerializer

class StudentCreateView(generics.CreateAPIView):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentCreateUpdateSerializer
    permission_classes = [IsAdminOrSupervisor]

# CSV Import Views
@api_view(['POST'])
@permission_classes([IsAdminOrSupervisor])
def upload_csv(request):
    """Upload and parse CSV file for student import"""
    serializer = CSVImportSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    csv_file = serializer.validated_data['file']
    
    try:
        # Clear previous import data for this session
        RawStudentImport.objects.all().delete()
        
        # Read and parse CSV
        decoded_file = csv_file.read().decode('utf-8')
        csv_data = csv.DictReader(io.StringIO(decoded_file))
        
        imported_records = []
        errors = []
        
        for row_num, row in enumerate(csv_data, start=2):  # Start at 2 because row 1 is header
            try:
                # Map CSV columns to model fields
                raw_student = RawStudentImport(
                    full_name=row.get('full_name', '').strip(),
                    index_no=row.get('index_no', '').strip(),
                    email=row.get('email', '').strip().lower(),
                    phone=row.get('phone', '').strip(),
                    academic_year=row.get('academic_year', '').strip(),
                    dues_paid=Decimal(str(row.get('dues_paid', '0')).replace(',', '')),
                    receipt_no=row.get('receipt_no', '').strip(),
                    programme=row.get('programme', '').strip(),
                    payment_date=row.get('payment_date', '').strip(),
                    password=row.get('password', 'defaultpassword123').strip(),
                    position=row.get('position', '').strip(),
                )
                raw_student.save()
                imported_records.append(raw_student)
                
            except Exception as e:
                errors.append(f"Row {row_num}: {str(e)}")
        
        if errors:
            return Response({
                'success': False,
                'errors': errors,
                'imported_count': len(imported_records)
            }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'success': True,
            'message': f'Successfully imported {len(imported_records)} records for validation',
            'imported_count': len(imported_records)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': f'Failed to process CSV file: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminOrSupervisor])
def validate_imported_data(request):
    """Get imported data with validation results"""
    raw_students = RawStudentImport.objects.all()
    serializer = RawStudentImportSerializer(raw_students, many=True)
    
    total_records = len(serializer.data)
    valid_records = sum(1 for record in serializer.data if record['is_valid_record'])
    invalid_records = total_records - valid_records
    
    return Response({
        'records': serializer.data,
        'summary': {
            'total_records': total_records,
            'valid_records': valid_records,
            'invalid_records': invalid_records
        }
    })

@api_view(['POST'])
@permission_classes([IsAdminOrSupervisor])
def process_imported_data(request):
    """Process validated data and create student records"""
    serializer = StudentImportProcessSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    process_all_valid = serializer.validated_data['process_all_valid']
    selected_records = serializer.validated_data['selected_records']
    
    try:
        if process_all_valid:
            # Process all valid records
            raw_students = RawStudentImport.objects.all()
            valid_students = [
                student for student in raw_students 
                if len(RawStudentImportSerializer().get_validation_errors(student)) == 0
            ]
        else:
            # Process only selected records
            valid_students = RawStudentImport.objects.filter(id__in=selected_records)
        
        created_students = []
        errors = []
        
        for raw_student in valid_students:
            try:
                # Create or get programme
                programme, _ = Programme.objects.get_or_create(
                    name=raw_student.programme
                )
                
                # Create or get dues structure
                dues_structure, _ = DuesStructure.objects.get_or_create(
                    academic_year=raw_student.academic_year,
                    defaults={'amount': raw_student.dues_paid}
                )
                
                # Create user
                user = CustomUser.objects.create_user(
                    email=raw_student.email,
                    password=raw_student.password,
                    role='STUDENT'
                )
                
                # Split full name into first name and surname
                name_parts = raw_student.full_name.split()
                first_name = name_parts[0] if name_parts else ''
                surname = ' '.join(name_parts[1:]) if len(name_parts) > 1 else ''
                
                # Create student profile
                student = StudentProfile.objects.create(
                    user=user,
                    index_no=raw_student.index_no,
                    first_name=first_name,
                    surname=surname,
                    programme=programme,
                    phone=raw_student.phone,
                    academic_year=dues_structure
                )
                
                # Create payment record if dues were paid
                if raw_student.dues_paid > 0:
                    payment_date = datetime.strptime(raw_student.payment_date, '%d.%m.%Y').date()
                    Payment.objects.create(
                        student=student,
                        receipt_no=raw_student.receipt_no,
                        amount=raw_student.dues_paid,
                        date=payment_date
                    )
                
                created_students.append(student)
                
            except Exception as e:
                errors.append(f"Failed to create student {raw_student.index_no}: {str(e)}")
        
        # Clear processed raw data
        if created_students:
            processed_ids = [rs.id for rs in valid_students if any(
                cs.index_no == rs.index_no for cs in created_students
            )]
            RawStudentImport.objects.filter(id__in=processed_ids).delete()
        
        return Response({
            'success': True,
            'message': f'Successfully created {len(created_students)} student records',
            'created_count': len(created_students),
            'errors': errors
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': f'Failed to process imported data: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)

# Utility Views
class ProgrammeListView(generics.ListCreateAPIView):
    queryset = Programme.objects.all()
    serializer_class = ProgrammeSerializer
    permission_classes = [IsAdminOrSupervisor]

class DuesStructureListView(generics.ListCreateAPIView):
    queryset = DuesStructure.objects.all()
    serializer_class = DuesStructureSerializer
    permission_classes = [IsAdminOrSupervisor]

@api_view(['GET'])
@permission_classes([IsAdminOrSupervisor])
def student_statistics(request):
    """Get student statistics for dashboard"""
    total_students = StudentProfile.objects.count()
    
    # Students by programme
    programmes = Programme.objects.annotate(
        student_count=models.Count('studentprofile')
    ).values('name', 'student_count')
    
    # Students by academic year
    academic_years = DuesStructure.objects.annotate(
        student_count=models.Count('students')
    ).values('academic_year', 'student_count')
    
    # Payment statistics
    total_payments = Payment.objects.aggregate(
        total_amount=Sum('amount')
    )['total_amount'] or 0
    
    students_with_payments = StudentProfile.objects.filter(
        payments__isnull=False
    ).distinct().count()
    
    return Response({
        'total_students': total_students,
        'programmes': list(programmes),
        'academic_years': list(academic_years),
        'total_payments': total_payments,
        'students_with_payments': students_with_payments,
        'students_without_payments': total_students - students_with_payments
    })
    
    
# Permission classes for different roles
class IsCashierPermission(IsAuthenticated):
    def has_permission(self, request, view):
        return (super().has_permission(request, view) and 
                request.user.role == 'CASHIER')

class IsStudentPermission(IsAuthenticated):
    def has_permission(self, request, view):
        return (super().has_permission(request, view) and 
                request.user.role == 'STUDENT')

class IsStudentOrHigherPermission(IsAuthenticated):
    """Allows Students, Cashiers, Supervisors, and Admins"""
    def has_permission(self, request, view):
        return (super().has_permission(request, view) and 
                request.user.role in ['STUDENT', 'CASHIER', 'SUPERVISOR', 'ADMIN'])

# CASHIER VIEWS - Can view and search students (read-only)
class CashierStudentListView(generics.ListAPIView):
    """Cashiers can view and search all students - READ ONLY"""
    serializer_class = StudentProfileSerializer
    permission_classes = [IsCashierPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['programme', 'academic_year', 'programme__name']
    search_fields = ['first_name', 'surname', 'index_no', 'user__email', 'programme__name']
    ordering_fields = ['first_name', 'surname', 'index_no', 'academic_year__academic_year']
    ordering = ['surname', 'first_name']
    
    def get_queryset(self):
        queryset = StudentProfile.objects.select_related(
            'user', 'programme', 'academic_year'
        ).prefetch_related('payments')
        
        # Apply the same filters as admin view
        position = self.request.query_params.get('position', None)
        year = self.request.query_params.get('year', None)
        programme_name = self.request.query_params.get('programme_name', None)
        payment_status = self.request.query_params.get('payment_status', None)
        
        if year:
            queryset = queryset.filter(academic_year__academic_year__icontains=year)
        
        if programme_name:
            queryset = queryset.filter(programme__name__icontains=programme_name)
        
        if payment_status:
            if payment_status == 'paid':
                # Students who have paid in full
                queryset = queryset.filter(
                    payments__amount__gte=models.F('academic_year__amount')
                )
            elif payment_status == 'partial':
                # Students with partial payments
                queryset = queryset.filter(
                    payments__amount__lt=models.F('academic_year__amount'),
                    payments__amount__gt=0
                )
            elif payment_status == 'unpaid':
                # Students with no payments
                queryset = queryset.filter(payments__isnull=True)
        
        return queryset

class CashierStudentDetailView(generics.RetrieveAPIView):
    """Cashiers can view individual student details - READ ONLY"""
    queryset = StudentProfile.objects.select_related('user', 'programme', 'academic_year')
    serializer_class = StudentProfileSerializer
    permission_classes = [IsCashierPermission]
    lookup_field = 'index_no'

# STUDENT VIEWS - Can only view/search their own data and other students' basic info
class StudentSelfProfileView(generics.RetrieveAPIView):
    """Students can view their own profile details"""
    serializer_class = StudentProfileSerializer
    permission_classes = [IsStudentPermission]
    
    def get_object(self):
        """Return the student profile for the current logged-in user"""
        try:
            return StudentProfile.objects.select_related(
                'user', 'programme', 'academic_year'
            ).prefetch_related('payments').get(user=self.request.user)
        except StudentProfile.DoesNotExist:
            return None
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response({
                'error': 'Student profile not found for this user'
            }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class StudentBasicListView(generics.ListAPIView):
    """Students can search and view basic info of other students (no financial data)"""
    permission_classes = [IsStudentPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['programme', 'academic_year']
    search_fields = ['first_name', 'surname', 'index_no', 'programme__name']
    ordering_fields = ['first_name', 'surname', 'index_no']
    ordering = ['surname', 'first_name']
    
    def get_serializer_class(self):
        from .serializers import StudentBasicSerializer
        return StudentBasicSerializer
    
    def get_queryset(self):
        return StudentProfile.objects.select_related(
            'user', 'programme', 'academic_year'
        ).all()

# UTILITY VIEWS - Available to all authenticated users
class ProgrammePublicListView(generics.ListAPIView):
    """All authenticated users can view programmes"""
    queryset = Programme.objects.all()
    serializer_class = ProgrammeSerializer
    permission_classes = [IsAuthenticated]

class DuesStructurePublicListView(generics.ListAPIView):
    """All authenticated users can view dues structures"""
    queryset = DuesStructure.objects.all()
    serializer_class = DuesStructureSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_dashboard(request):
    """Dashboard data based on user role"""
    user = request.user
    
    if user.role == 'STUDENT':
        # Student dashboard - only their own data
        try:
            student_profile = StudentProfile.objects.select_related(
                'programme', 'academic_year'
            ).prefetch_related('payments').get(user=user)
            
            total_paid = sum(payment.amount for payment in student_profile.payments.all())
            balance = student_profile.academic_year.amount - total_paid
            
            return Response({
                'role': user.role,
                'profile': {
                    'index_no': student_profile.index_no,
                    'name': f"{student_profile.first_name} {student_profile.surname}",
                    'programme': student_profile.programme.name,
                    'academic_year': student_profile.academic_year.academic_year,
                    'total_due': student_profile.academic_year.amount,
                    'total_paid': total_paid,
                    'balance': balance,
                    'payment_status': 'paid' if balance <= 0 else 'partial' if total_paid > 0 else 'unpaid'
                },
                'recent_payments': [
                    {
                        'receipt_no': payment.receipt_no,
                        'amount': payment.amount,
                        'date': payment.date
                    } for payment in student_profile.payments.all()[:5]  # Last 5 payments
                ]
            })
        except StudentProfile.DoesNotExist:
            return Response({
                'role': user.role,
                'error': 'Student profile not found'
            })
    
    elif user.role == 'CASHIER':
        # Cashier dashboard - summary statistics
        total_students = StudentProfile.objects.count()
        
        # Payment statistics
        total_payments = Payment.objects.aggregate(
            total_amount=Sum('amount')
        )['total_amount'] or 0
        
        students_with_payments = StudentProfile.objects.filter(
            payments__isnull=False
        ).distinct().count()
        
        # Recent payments (last 10)
        recent_payments = Payment.objects.select_related(
            'student'
        ).order_by('-date')[:10]
        
        return Response({
            'role': user.role,
            'statistics': {
                'total_students': total_students,
                'students_with_payments': students_with_payments,
                'students_without_payments': total_students - students_with_payments,
                'total_payments_amount': total_payments
            },
            'recent_payments': [
                {
                    'receipt_no': payment.receipt_no,
                    'student_name': f"{payment.student.first_name} {payment.student.surname}",
                    'student_index': payment.student.index_no,
                    'amount': payment.amount,
                    'date': payment.date
                } for payment in recent_payments
            ]
        })
    
    elif user.role in ['SUPERVISOR', 'ADMIN']:
        # Full dashboard access (redirect to existing statistics endpoint)
        from .views import student_statistics
        return student_statistics(request)
    
    else:
        return Response({
            'role': user.role,
            'message': 'Dashboard not available for this role'
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_permissions(request):
    """Return user's current permissions and role"""
    user = request.user
    
    permissions = {
        'role': user.role,
        'can_view_students': user.role in ['ADMIN', 'SUPERVISOR', 'CASHIER'],
        'can_edit_students': user.role in ['ADMIN', 'SUPERVISOR'],
        'can_import_csv': user.role in ['ADMIN', 'SUPERVISOR'],
        'can_view_all_payments': user.role in ['ADMIN', 'SUPERVISOR', 'CASHIER'],
        'can_view_own_profile': user.role == 'STUDENT',
        'can_search_students': True,  # All authenticated users
        'is_admin': user.role == 'ADMIN',
        'is_supervisor': user.role == 'SUPERVISOR',
        'is_cashier': user.role == 'CASHIER',
        'is_student': user.role == 'STUDENT'
    }
    
    return Response(permissions)

