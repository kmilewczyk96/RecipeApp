# Recipe App API

## Requirements:
- Docker and Docker Compose.

## How to start the app:
- Simply run `docker compose up` command from Project's root directory.
- (optional) if you wish to prepopulate the database with some fake data you can run <br> `docker compose run --rm app sh -c "python manage.py populate_db"` command as well.
- (optional) create superuser account with `docker compose run --rm app sh -c "python manage.py createsuperuser"` command.
- Your app will be served on localhost:5173 port, you can also access admin panel on localhost:8000/admin if you chose to create superuser account.
