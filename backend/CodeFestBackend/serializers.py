from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import CustomUser

from django.contrib.auth import get_user_model
from .models import (
    StudentProfile, Programme, DuesStructure, 
    Payment, RawStudentImport, CustomUser
)
from decimal import Decimal
import re
from datetime import datetime
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    StudentProfile, Programme, DuesStructure, 
    Payment, RawStudentImport, CustomUser
)
from decimal import Decimal
import re
from datetime import datetime
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from .models import StudentProfile, Programme, DuesStructure

CustomUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'role']
        
    def validate_email(self, value):
        """Normalize email to lowercase"""
        return value.lower().strip()
        
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'STUDENT')
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove the default username field and add email field
        self.fields.pop('username', None)
        self.fields['email'] = serializers.EmailField()
        self.fields['password'] = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            # Normalize email
            email = email.lower().strip()
            
            # Authenticate using email
            user = authenticate(
                request=self.context.get('request'),
                username=email,  # Django's authenticate expects 'username' parameter
                password=password
            )
            
            if not user:
                raise serializers.ValidationError(
                    'No active account found with the given credentials'
                )
            
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled.')
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    'role': user.role,
                    'is_active': user.is_active,
                }
            }
        else:
            raise serializers.ValidationError('Must include email and password.')
        
        
class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = ['id', 'name']

class DuesStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = DuesStructure
        fields = ['id', 'academic_year', 'amount']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'receipt_no', 'amount', 'date']

class StudentProfileSerializer(serializers.ModelSerializer):
    programme_name = serializers.CharField(source='programme.name', read_only=True)
    academic_year_display = serializers.CharField(source='academic_year.academic_year', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)
    total_paid = serializers.SerializerMethodField()
    balance = serializers.SerializerMethodField()
    
    class Meta:
        model = StudentProfile
        fields = [
            'user', 'index_no', 'first_name', 'surname', 'programme', 
            'programme_name', 'phone', 'academic_year', 'academic_year_display',
            'email', 'payments', 'total_paid', 'balance'
        ]
        
    def get_total_paid(self, obj):
        return sum(payment.amount for payment in obj.payments.all())
    
    def get_balance(self, obj):
        total_paid = self.get_total_paid(obj)
        return obj.academic_year.amount - total_paid

class StudentCreateUpdateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, required=False)
    programme_name = serializers.CharField(write_only=True, required=False)
    academic_year_display = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = StudentProfile
        fields = [
            'index_no', 'first_name', 'surname', 'programme', 
            'phone', 'academic_year', 'email', 'password',
            'programme_name', 'academic_year_display'
        ]
    
    def validate_email(self, value):
        return value.lower().strip()
    
    def validate_index_no(self, value):
        # Check if index_no is unique (excluding current instance during update)
        queryset = StudentProfile.objects.filter(index_no=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError("A student with this index number already exists.")
        return value
    
    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password', None)
        programme_name = validated_data.pop('programme_name', None)
        academic_year_display = validated_data.pop('academic_year_display', None)
        
        # Handle programme
        if programme_name:
            programme, _ = Programme.objects.get_or_create(name=programme_name)
            validated_data['programme'] = programme
        
        # Handle academic year
        if academic_year_display:
            academic_year, _ = DuesStructure.objects.get_or_create(
                academic_year=academic_year_display,
                defaults={'amount': Decimal('0.00')}
            )
            validated_data['academic_year'] = academic_year
        
        # Create user
        user = CustomUser.objects.create_user(
            email=email,
            password=password or 'defaultpassword123',
            role='STUDENT'
        )
        
        # Create student profile
        validated_data['user'] = user
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        email = validated_data.pop('email', None)
        password = validated_data.pop('password', None)
        programme_name = validated_data.pop('programme_name', None)
        academic_year_display = validated_data.pop('academic_year_display', None)
        
        # Update user email and password if provided
        if email and email != instance.user.email:
            instance.user.email = email
            instance.user.save()
        
        if password:
            instance.user.set_password(password)
            instance.user.save()
        
        # Handle programme
        if programme_name:
            programme, _ = Programme.objects.get_or_create(name=programme_name)
            validated_data['programme'] = programme
        
        # Handle academic year
        if academic_year_display:
            academic_year, _ = DuesStructure.objects.get_or_create(
                academic_year=academic_year_display,
                defaults={'amount': Decimal('0.00')}
            )
            validated_data['academic_year'] = academic_year
        
        return super().update(instance, validated_data)

class CSVImportSerializer(serializers.Serializer):
    file = serializers.FileField()
    
    def validate_file(self, value):
        if not value.name.endswith('.csv'):
            raise serializers.ValidationError("File must be a CSV file.")
        return value

class RawStudentImportSerializer(serializers.ModelSerializer):
    validation_errors = serializers.SerializerMethodField()
    is_valid_record = serializers.SerializerMethodField()
    
    class Meta:
        model = RawStudentImport
        fields = '__all__'
    
    def get_validation_errors(self, obj):
        errors = []
        
        # Validate email format
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, obj.email):
            errors.append("Invalid email format")
        
        # Validate phone number (basic validation)
        if obj.phone and len(obj.phone.strip()) < 10:
            errors.append("Phone number too short")
        
        # Validate dues_paid is positive
        if obj.dues_paid < 0:
            errors.append("Dues paid cannot be negative")
        
        # Validate payment_date format (assuming DD.MM.YYYY)
        try:
            datetime.strptime(obj.payment_date, '%d.%m.%Y')
        except ValueError:
            errors.append("Invalid payment date format (expected DD.MM.YYYY)")
        
        # Check if index_no already exists in StudentProfile
        if StudentProfile.objects.filter(index_no=obj.index_no).exists():
            errors.append("Student with this index number already exists")
        
        # Check if email already exists in CustomUser
        if CustomUser.objects.filter(email=obj.email.lower()).exists():
            errors.append("User with this email already exists")
        
        return errors
    
    def get_is_valid_record(self, obj):
        return len(self.get_validation_errors(obj)) == 0

class StudentImportProcessSerializer(serializers.Serializer):
    selected_records = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=True
    )
    process_all_valid = serializers.BooleanField(default=False)
    
    
class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = ['id', 'name']

class DuesStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = DuesStructure
        fields = ['id', 'academic_year', 'amount']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'receipt_no', 'amount', 'date']

class StudentBasicSerializer(serializers.ModelSerializer):
    """Basic student info for other students to view (no financial data)"""
    programme_name = serializers.CharField(source='programme.name', read_only=True)
    academic_year_display = serializers.CharField(source='academic_year.academic_year', read_only=True)
    
    class Meta:
        model = StudentProfile
        fields = [
            'index_no', 'first_name', 'surname', 'programme_name', 
            'academic_year_display', 'phone'
        ]

class StudentProfileSerializer(serializers.ModelSerializer):
    programme_name = serializers.CharField(source='programme.name', read_only=True)
    academic_year_display = serializers.CharField(source='academic_year.academic_year', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)
    total_paid = serializers.SerializerMethodField()
    balance = serializers.SerializerMethodField()
    
    class Meta:
        model = StudentProfile
        fields = [
            'user', 'index_no', 'first_name', 'surname', 'programme', 
            'programme_name', 'phone', 'academic_year', 'academic_year_display',
            'email', 'payments', 'total_paid', 'balance'
        ]
        
    def get_total_paid(self, obj):
        return sum(payment.amount for payment in obj.payments.all())
    
    def get_balance(self, obj):
        total_paid = self.get_total_paid(obj)
        return obj.academic_year.amount - total_paid

class StudentCreateUpdateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, required=False)
    programme_name = serializers.CharField(write_only=True, required=False)
    academic_year_display = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = StudentProfile
        fields = [
            'index_no', 'first_name', 'surname', 'programme', 
            'phone', 'academic_year', 'email', 'password',
            'programme_name', 'academic_year_display'
        ]
    
    def validate_email(self, value):
        return value.lower().strip()
    
    def validate_index_no(self, value):
        # Check if index_no is unique (excluding current instance during update)
        queryset = StudentProfile.objects.filter(index_no=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError("A student with this index number already exists.")
        return value
    
    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password', None)
        programme_name = validated_data.pop('programme_name', None)
        academic_year_display = validated_data.pop('academic_year_display', None)
        
        # Handle programme
        if programme_name:
            programme, _ = Programme.objects.get_or_create(name=programme_name)
            validated_data['programme'] = programme
        
        # Handle academic year
        if academic_year_display:
            academic_year, _ = DuesStructure.objects.get_or_create(
                academic_year=academic_year_display,
                defaults={'amount': Decimal('0.00')}
            )
            validated_data['academic_year'] = academic_year
        
        # Create user
        user = CustomUser.objects.create_user(
            email=email,
            password=password or 'defaultpassword123',
            role='STUDENT'
        )
        
        # Create student profile
        validated_data['user'] = user
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        email = validated_data.pop('email', None)
        password = validated_data.pop('password', None)
        programme_name = validated_data.pop('programme_name', None)
        academic_year_display = validated_data.pop('academic_year_display', None)
        
        # Update user email and password if provided
        if email and email != instance.user.email:
            instance.user.email = email
            instance.user.save()
        
        if password:
            instance.user.set_password(password)
            instance.user.save()
        
        # Handle programme
        if programme_name:
            programme, _ = Programme.objects.get_or_create(name=programme_name)
            validated_data['programme'] = programme
        
        # Handle academic year
        if academic_year_display:
            academic_year, _ = DuesStructure.objects.get_or_create(
                academic_year=academic_year_display,
                defaults={'amount': Decimal('0.00')}
            )
            validated_data['academic_year'] = academic_year
        
        return super().update(instance, validated_data)

class CSVImportSerializer(serializers.Serializer):
    file = serializers.FileField()
    
    def validate_file(self, value):
        if not value.name.endswith('.csv'):
            raise serializers.ValidationError("File must be a CSV file.")
        return value

class RawStudentImportSerializer(serializers.ModelSerializer):
    validation_errors = serializers.SerializerMethodField()
    is_valid_record = serializers.SerializerMethodField()
    
    class Meta:
        model = RawStudentImport
        fields = '__all__'
    
    def get_validation_errors(self, obj):
        errors = []
        
        # Validate email format
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, obj.email):
            errors.append("Invalid email format")
        
        # Validate phone number (basic validation)
        if obj.phone and len(obj.phone.strip()) < 10:
            errors.append("Phone number too short")
        
        # Validate dues_paid is positive
        if obj.dues_paid < 0:
            errors.append("Dues paid cannot be negative")
        
        # Validate payment_date format (assuming DD.MM.YYYY)
        try:
            datetime.strptime(obj.payment_date, '%d.%m.%Y')
        except ValueError:
            errors.append("Invalid payment date format (expected DD.MM.YYYY)")
        
        # Check if index_no already exists in StudentProfile
        if StudentProfile.objects.filter(index_no=obj.index_no).exists():
            errors.append("Student with this index number already exists")
        
        # Check if email already exists in CustomUser
        if CustomUser.objects.filter(email=obj.email.lower()).exists():
            errors.append("User with this email already exists")
        
        return errors
    
    def get_is_valid_record(self, obj):
        return len(self.get_validation_errors(obj)) == 0

class StudentImportProcessSerializer(serializers.Serializer):
    selected_records = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=True
    )
    process_all_valid = serializers.BooleanField(default=False)
    
    
class StudentRegistrationSerializer(serializers.Serializer):
    # User fields
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    # Student profile fields
    index_no = serializers.CharField(max_length=20)
    first_name = serializers.CharField(max_length=50)
    surname = serializers.CharField(max_length=50)
    programme = serializers.CharField(max_length=100)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    academic_year = serializers.CharField(max_length=9)
    
    def validate_email(self, value):
        """Check if email already exists"""
        if CustomUser.objects.filter(email=value.lower().strip()).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value.lower().strip()
    
    def validate_index_no(self, value):
        """Check if index number already exists"""
        if StudentProfile.objects.filter(index_no=value.strip()).exists():
            raise serializers.ValidationError("A student with this index number already exists.")
        return value.strip()
    
    def validate_academic_year(self, value):
        """Validate academic year format (e.g., 2024-2025)"""
        import re
        pattern = r'^\d{4}-\d{4}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError("Academic year must be in format YYYY-YYYY (e.g., 2024-2025)")
        
        # Check if the years are consecutive
        start_year, end_year = map(int, value.split('-'))
        if end_year != start_year + 1:
            raise serializers.ValidationError("Academic year must be consecutive years (e.g., 2024-2025)")
        
        return value
    
    def validate(self, attrs):
        """Validate password confirmation"""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Password and password confirmation do not match.")
        return attrs

# Also add a basic serializer for student info without financial data
class StudentBasicSerializer(serializers.ModelSerializer):
    """Basic student info for student role to view other students"""
    programme_name = serializers.CharField(source='programme.name', read_only=True)
    academic_year_name = serializers.CharField(source='academic_year.academic_year', read_only=True)
    
    class Meta:
        model = StudentProfile
        fields = [
            'index_no', 'first_name', 'surname', 
            'programme_name', 'academic_year_name', 'phone'
        ]
        read_only_fields = fields