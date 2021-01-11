from django.db import models
from datetime import date

class Post(models.Model):
    title = models.CharField(max_length=100, blank=False)
    author = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=500, blank=False)
    published = models.DateField(default=date.today())