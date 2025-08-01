from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'ADMIN'

class IsCashier(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'CASHIER'

class IsSupervisor(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'SUPERVISOR'

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'STUDENT'