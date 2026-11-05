# ShopSphere Backend

Django 5.2 + Django REST Framework + MySQL backend.

## Windows setup
1. In MySQL Workbench run:
   CREATE DATABASE shopsphere_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
2. Copy `.env.example` to `.env` and enter your MySQL password and a strong SECRET_KEY.
3. In this folder run:
   py -m venv .venv
   .venv\\Scripts\\activate
   py -m pip install -r requirements.txt
   py manage.py check
   py manage.py makemigrations
   py manage.py migrate
   py manage.py createsuperuser
   py manage.py seed
   py manage.py runserver
4. Visit http://127.0.0.1:8000/api/products/ and http://127.0.0.1:8000/admin/.

Frontend Live Server origins on port 5500 are allowed in settings. Use fetch with credentials: 'include'; fetch `/api/csrf/` before unsafe methods and send its token as `X-CSRFToken`.

Checkout creates an order and reduces stock transactionally; it does not collect payment. This is a development starter and requires security review, payment integration and tests before production.
