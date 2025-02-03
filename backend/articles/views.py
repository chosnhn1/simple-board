from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import Article
from .serializer import ArticleDetailSerializer, ArticleListSerializer
from rest_framework import permissions, viewsets
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
            serializer.set_value({'author': request.user})
            if serializer.is_valid():
                article = serializer.save()
                return Response(article)
            return Response(serializer.errors)
        return Response()
    return Response()

@api_view(['GET', 'PATCH', 'DELETE'])
def article_detail(request):
    return Response()