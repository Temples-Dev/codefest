# scripts/normalize_data.py
import csv
from datetime import datetime
from django.core.management.base import BaseCommand
from CodeFestBackend.models import *
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Couldn't import Django.") from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()

class Command(BaseCommand):
    help = 'Normalizes CSV data into 3NF-compliant models'

    def handle(self, *args, **options):
        with open(r'D:\Codefest\backend\data\students.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Step 1: Parse raw data
                surname, first_name = map(str.strip, row['Name'].split(','))
                payment_date = datetime.strptime(row['payment date'], '%d.%m.%Y').date()
                
                # Step 2: Get or create Programme
                programme, _ = Programme.objects.get_or_create(
                    name=row['Programme of Study'].strip()
                )
                
                # Step 3: Get or create DuesStructure
                dues_structure, _ = DuesStructure.objects.get_or_create(
                    academic_year=row['Academic Year'].strip(),
                    defaults={'amount': float(row['Dues Paid'].strip())}
                )
                
                # Step 4: Create User (role = position)
                user = CustomUser.objects.create_user(
                    email=row['Email'].strip(),
                    password=row['password'].strip(),
                    role=row['position'].upper()  # Maps to Role.choices
                )
                
                # Step 5: Create StudentProfile
                StudentProfile.objects.create(
                    user=user,
                    index_no=row['Index No'].strip(),
                    first_name=first_name,
                    surname=surname,
                    programme=programme,
                    phone=row['Phone'].strip(),
                    academic_year=dues_structure
                )
                
                # Step 6: Record Payment
                Payment.objects.create(
                    student=user.studentprofile,
                    receipt_no=row['Receipt No'].strip(),
                    amount=float(row['Dues Paid'].strip()),
                    date=payment_date
                )
        self.stdout.write(self.style.SUCCESS('Data normalized successfully!'))