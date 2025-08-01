from django.urls import path
from .views import (
    RegisterView, LoginView, RefreshTokenView,
    StudentListView, StudentDetailView, StudentCreateView,
    upload_csv, validate_imported_data, process_imported_data,
    ProgrammeListView, DuesStructureListView, student_statistics,
    # New role-based views
    CashierStudentListView, CashierStudentDetailView,
    StudentSelfProfileView, StudentBasicListView,
    ProgrammePublicListView, DuesStructurePublicListView,
    user_dashboard, user_permissions
)    
urlpatterns = [
    # Authentication
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    
    # ADMIN & SUPERVISOR - Full access to student management
    path('admin/students/', StudentListView.as_view(), name='admin-student-list'),
    path('admin/students/create/', StudentCreateView.as_view(), name='admin-student-create'),
    path('admin/students/<str:index_no>/', StudentDetailView.as_view(), name='admin-student-detail'),
    
    # CSV Import (Admin & Supervisor only)
    path('admin/import/upload-csv/', upload_csv, name='upload-csv'),
    path('admin/import/validate/', validate_imported_data, name='validate-imported-data'),
    path('admin/import/process/', process_imported_data, name='process-imported-data'),
    
    # CASHIER - Read-only access to student data
    path('cashier/students/', CashierStudentListView.as_view(), name='cashier-student-list'),
    path('cashier/students/<str:index_no>/', CashierStudentDetailView.as_view(), name='cashier-student-detail'),
    
    # STUDENT - Own profile and basic search
    path('student/profile/', StudentSelfProfileView.as_view(), name='student-profile'),
    path('student/search/', StudentBasicListView.as_view(), name='student-search'),
    
    # SHARED - Available to appropriate roles
    path('programmes/', ProgrammePublicListView.as_view(), name='programme-list'),
    path('dues-structures/', DuesStructurePublicListView.as_view(), name='dues-structure-list'),
    
    # Utility endpoints
    path('dashboard/', user_dashboard, name='user-dashboard'),
    path('permissions/', user_permissions, name='user-permissions'),
    path('admin/statistics/', student_statistics, name='admin-statistics'),
    
    # Legacy endpoints (for backward compatibility)
    path('students/', StudentListView.as_view(), name='student-list'),
    path('students/create/', StudentCreateView.as_view(), name='student-create'),
    path('students/<str:index_no>/', StudentDetailView.as_view(), name='student-detail'),
    path('statistics/', student_statistics, name='student-statistics'),
]