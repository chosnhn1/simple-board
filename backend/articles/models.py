from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=200)
    contents = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_notice = models.BooleanField(default=False)
    
class Comment(models.Model):
    contents = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)
