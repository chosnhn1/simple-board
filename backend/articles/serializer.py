from rest_framework import serializers
from .models import Article, Comment

class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'contents', 'author', 'created_at', 'updated_at', 'is_notice']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']


class ArticleDetailSerializer(serializers.ModelSerializer):
    # title = serializers.CharField()
    # contents = serializers.CharField()
    # created_at = serializers.DateTimeField()
    # updated_at = serializers.DateTimeField()
    # is_notice = serializers.BooleanField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'contents', 'created_at', 'updated_at', 'is_notice', 'author']


class CommentSerializer(serializers.ModelSerializer):
    # contents = serializers.CharField()
    # created_at = serializers.DateTimeField()
    
    class Meta:
        model = Comment