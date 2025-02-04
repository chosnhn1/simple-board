from rest_framework import serializers
from .models import Article, Comment

class ArticleListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'contents', 'author', 'created_at', 'updated_at', 'is_notice']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']


class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = '__all__'

class ArticleDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'contents', 'created_at', 'updated_at', 'is_notice', 'author', 'comments']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at', 'comments']
