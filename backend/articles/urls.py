from django.urls import path, include
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'', views.ArticleViewSet)

urlpatterns = [
    path('', views.article_list, name="list"),
    path('<int:pk>/', views.article_detail, name="detail"),
]