-- Run this once in MySQL Workbench before running Django migrations.
CREATE DATABASE IF NOT EXISTS shopsphere_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE shopsphere_db;

-- Django creates and maintains the relational tables from backend/store/models.py
-- Run from the backend folder:
--   py manage.py makemigrations
--   py manage.py migrate
