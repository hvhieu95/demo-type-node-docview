from rest_framework.serializers import ModelSerializer
from base.models import Post, File


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class FileSerializer(ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'