from django.urls import path
from rest_framework.authtoken import views as authviews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from . import views

urlpatterns = [
    path("", views.index, name="list"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path("<int:pk>/", views.detail, name="detail"),
    # path("login/", views.login, name="login"),
    # path("login/", authviews.obtain_auth_token, name="login"),
    # path("logout/", views.logout, name="logout"),
]