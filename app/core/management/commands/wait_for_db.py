import time

from django.core.management.base import BaseCommand
from django.db.utils import OperationalError

from psycopg2 import OperationalError as PsycoError


class Command(BaseCommand):
    """Django command to wait for database."""

    def handle(self, *args, **options):
        """Entrypoint for command."""
        self.stdout.write('waiting for database...')
        db_up = False
        while not db_up:
            try:
                self.check(databases=['default'])
            except (PsycoError, OperationalError):
                self.stdout.write('database not ready, retrying in 3secs...')
                time.sleep(3)
            else:
                db_up = True
                self.stdout.write(self.style.SUCCESS('database is ready.'))
