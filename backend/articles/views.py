from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import Article
from .serializer import ArticleDetailSerializer, ArticleListSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

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