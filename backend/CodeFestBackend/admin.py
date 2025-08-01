from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, StudentProfile, Programme, DuesStructure, Payment, RawStudentImport

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'role', 'is_active', 'is_staff', 'date_joined')
    list_filter = ('role', 'is_active', 'is_staff', 'date_joined')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('role',)}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    readonly_fields = ('date_joined',)  # Make date_joined read-only
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'role', 'is_active', 'is_staff'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)

@admin.register(Programme)
class ProgrammeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(DuesStructure)
class DuesStructureAdmin(admin.ModelAdmin):
    list_display = ('academic_year', 'amount')
    list_filter = ('academic_year',)
    ordering = ('academic_year',)

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('index_no', 'first_name', 'surname', 'programme', 'academic_year', 'get_email')
    list_filter = ('programme', 'academic_year')
    search_fields = ('index_no', 'first_name', 'surname', 'user__email')
    ordering = ('surname', 'first_name')
    
    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'
    get_email.admin_order_field = 'user__email'

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('receipt_no', 'get_student_name', 'amount', 'date')
    list_filter = ('date', 'student__programme', 'student__academic_year')
    search_fields = ('receipt_no', 'student__index_no', 'student__first_name', 'student__surname')
    ordering = ('-date',)
    
    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.surname}"
    get_student_name.short_description = 'Student'
    get_student_name.admin_order_field = 'student__surname'

@admin.register(RawStudentImport)
class RawStudentImportAdmin(admin.ModelAdmin):
    list_display = ('index_no', 'full_name', 'email', 'programme', 'academic_year')
    list_filter = ('programme', 'academic_year')
    search_fields = ('index_no', 'full_name', 'email')
    ordering = ('index_no',)