from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _


class RawStudentImport(models.Model):
    full_name = models.CharField(max_length=100)
    index_no = models.CharField(max_length=20, unique=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    academic_year = models.CharField(max_length=9)
    dues_paid = models.DecimalField(max_digits=10, decimal_places=2)
    receipt_no = models.CharField(max_length=20)
    programme = models.CharField(max_length=100)
    payment_date = models.CharField(max_length=10)  # Raw format: "04.09.2023"
    password = models.CharField(max_length=100)
    position = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.index_no} - {self.full_name}"

class Role(models.TextChoices):
    ADMIN = 'ADMIN', _('Administrator')
    CASHIER = 'CASHIER', _('Cashier')
    SUPERVISOR = 'SUPERVISOR', _('Supervisor')
    STUDENT = 'STUDENT', _('Student')

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        
        # Normalize email to lowercase
        email = self.normalize_email(email).lower().strip()
        
        # Set default values for required fields
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        # Set required fields for superuser
        extra_fields.setdefault('role', Role.ADMIN)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('role') != Role.ADMIN:
            raise ValueError('Superuser must have role=ADMIN.')
        
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.STUDENT)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Required for Django admin
    is_superuser = models.BooleanField(default=False)  # Required for Django admin
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']

    def save(self, *args, **kwargs):
        # Always normalize email to lowercase before saving
        self.email = self.email.lower().strip()
        
        # Auto-set is_staff for ADMIN and SUPERVISOR roles
        if self.role in [Role.ADMIN, Role.SUPERVISOR]:
            self.is_staff = True
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        # Admins have all permissions
        if self.role == Role.ADMIN:
            return True
        return super().has_perm(perm, obj)
    
    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        # Admins and Supervisors can view admin modules
        if self.role in [Role.ADMIN, Role.SUPERVISOR]:
            return True
        return super().has_module_perms(app_label)

class Programme(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class DuesStructure(models.Model):
    academic_year = models.CharField(max_length=9, unique=True)  # e.g., "2024-2025"
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    
    def __str__(self):
        return f"{self.academic_year} - GHS {self.amount}"

class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    index_no = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    programme = models.ForeignKey(Programme, on_delete=models.PROTECT)
    phone = models.CharField(max_length=20, blank=True, null=True)
    academic_year = models.ForeignKey(DuesStructure, on_delete=models.PROTECT, related_name='students')
    
    def __str__(self):
        return f"{self.index_no} - {self.first_name} {self.surname}"

class Payment(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='payments')
    receipt_no = models.CharField(max_length=20, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    date = models.DateField()
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return f"Receipt #{self.receipt_no} - GHS {self.amount}"