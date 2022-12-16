from django.db import models

# Create your models here.

class Info(models.Model):
    
    name = models.CharField(max_length=100)
    email_id = models.EmailField(max_length=100)
    status = models.CharField(max_length=100)
    time = models.CharField(max_length=100)

class Result(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email_id = models.EmailField(max_length=100)
    status = models.CharField(max_length=100)
    time = models.CharField(max_length=100)