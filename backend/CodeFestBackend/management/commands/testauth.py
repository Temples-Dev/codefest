from django.core.management.base import BaseCommand
from CodeFestBackend.models import CustomUser

class Command(BaseCommand):
    help = 'Tests authentication system'

    def handle(self, *args, **options):
        # Create test user if not exists
        email = "test@htu.edu.gh"
        password = "test123"
        
        user, created = CustomUser.objects.get_or_create(
            email=email,
            defaults={
                'role': 'STUDENT',
                'is_active': True
            }
        )
        if created:
            user.set_password(password)
            user.save()
            self.stdout.write(f"Created test user: {email}/{password}")
        else:
            self.stdout.write(f"Test user exists: {email}/{password}")