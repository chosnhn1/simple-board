from django.urls import path, include
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'', views.ArticleViewSet)

urlpatterns = [
    path('', views.article_list, name="list"),
    # path('', include(router.urls)),
    # path("", views.list, name="list"),
    # path("<int:pk>/", views.detail, name="detail"),
]