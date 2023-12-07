from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_title = models.CharField(max_length=200)
    post_create_date = models.DateTimeField(default=timezone.now)

class File(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file_link = models.FileField(upload_to='store/pdfs/')
    file_type = models.CharField(max_length=5)
    version = models.IntegerField()


class History(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    shape = models.CharField(max_length=255)
    x = models.FloatField()
    y = models.FloatField()
    context = models.CharField(max_length=255, null=True)


class Permission(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    permission_type = models.CharField(max_length=255)

class Assignment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    request_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_request_user')
    review_user = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment_title = models.CharField(max_length=255, null=True)
    assignment_create_date = models.DateTimeField(default=timezone.now)
    assignment_deadline = models.DateTimeField(null=True)
    assignment_status = models.CharField(max_length=6)

