from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import Article
from .serializer import serialize_article_to_json, ArticleDetailSerializer, ArticleSerializer

# Create your views here.
def index(request):
    return HttpResponse("This is articles index.")

# RUD
@require_http_methods(["GET", "POST", "DELETE"])
def detail(request, pk):
    if request.method == "GET":
        article = get_object_or_404(klass=Article, pk=pk)
        # article = Article.objects.filter(pk=pk).order_by('-pk')
        print(article)
        if article:
            serializer = ArticleSerializer(article)
            print(serializer)
            return JsonResponse(data=serializer.data)
        # else:
        #     return JsonResponse({'error': 'No data.'}, status=400)

    response = JsonResponse({'error':"error occurred."})
    response.status_code = 400
    return response