from rest_framework import serializers
from .models import User

class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    is_active = serializers.BooleanField()
    is_staff = serializers.BooleanField()

    class Meta:
        pass