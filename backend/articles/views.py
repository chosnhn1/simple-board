from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Article, Comment
from .serializer import ArticleDetailSerializer, ArticleListSerializer, CommentSerializer

# Create your views here.
@api_view(['GET', 'POST'])
def article_list(request):
    if request.method == 'GET':
        articles = get_list_or_404(Article)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        if request.user.is_authenticated:
            serializer = ArticleDetailSerializer(data=request.data)    
            if serializer.is_valid():
                serializer.save(author=request.user)
                return Response(data=serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET', 'PATCH', 'DELETE'])
def article_detail(request, pk):
    if request.method == 'GET':
        article = get_object_or_404(Article, pk=pk)
        serializer = ArticleDetailSerializer(article)
        return Response(data=serializer.data)
    
    elif request.user.is_authenticated:
        article = get_object_or_404(Article, pk=pk)
        if request.user == article.author:
            if request.method == 'PATCH':
                serializer = ArticleDetailSerializer(article, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save(author=request.user)
                    return Response(data=serializer.data, status=status.HTTP_205_RESET_CONTENT)

            if request.method == 'DELETE':
                article.delete()
                return Response(status=status.HTTP_202_ACCEPTED)
        
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
    return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def comment_list(request, article_pk):
    if request.user.is_authenticated:
        article = get_object_or_404(Article, pk=article_pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user, article=article)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['DELETE'])
def comment_detail(request, article_pk, comment_pk):
    if request.user.is_authenticated:
        comment = get_object_or_404(Comment, pk=comment_pk)
        if request.user == comment.author:
            comment.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
            
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)