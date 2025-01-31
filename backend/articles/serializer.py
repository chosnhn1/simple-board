from rest_framework import serializers
from .models import Article, Comment

class ArticleSerializer(serializers.Serializer):
    title = serializers.CharField()
    contents = serializers.CharField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    is_notice = serializers.BooleanField()

    class Meta:
        pass

class CommentSerializer(serializers.Serializer):
    contents = serializers.CharField()
    created_at = serializers.DateTimeField()
    
    class Meta:
        pass