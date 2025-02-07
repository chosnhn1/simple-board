from django.urls import path
from rest_framework.authtoken import views as authviews
from . import views

urlpatterns = [
    path("", views.index, name="list"),
    path("<int:pk>/", views.detail, name="detail"),
    # path("login/", views.login, name="login"),
    path("login/", authviews.obtain_auth_token, name="login"),
    path("logout/", views.logout, name="logout"),
]