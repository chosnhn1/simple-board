from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializer import UserDetailSerializer, UserRegistrationSerializer, UserLoginSerializer

# Create your views here.
def index(request):
    return HttpResponse("This is accounts index.")

@api_view(['POST'])
def signup(request):
    if request.user.is_authenticated:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        serializer = UserRegistrationSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

# @api_view(['POST'])
# def login(request):
#     if request.user.is_authenticated:
#         return Response(status=status.HTTP_400_BAD_REQUEST)
    
#     serializer = UserLoginSerializer(data=request.data)
#     if serializer.is_valid():
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key}, status=status.HTTP_202_ACCEPTED)


    # auth_login(request.data)
    # return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def logout(request):
    if request.user.is_authenticated:
        auth_logout(request.data)
        return Response(status=status.HTTP_202_ACCEPTED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def set_password(request):
    if request.user.is_authenticated:
        user = get_object_or_404(get_user_model(), pk=request.user.pk)

        user.set_password()
    pass

@api_view(['GET', 'PATCH', 'DELETE'])
def detail(request, pk):
    if request.method == 'GET':
        user = get_object_or_404(get_user_model(), pk=pk)
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)
    else:
        if request.user.is_authenticated:
            user = get_object_or_404(get_user_model(), pk=pk)
            if request.user == user:
                if request.method == 'PATCH':
                    context = UserDetailSerializer(request.data, instance=user)
                    if context.is_valid():
                        context.save()
                        return Response(context.data)
                    return Response(context.error_messages, status=status.HTTP_400_BAD_REQUEST)
                if request.method == 'DELETE':
                    # signoff
                    pass
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED) 

def signup():
    pass

def signoff():
    pass