import os
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer, FileSerializer
from base.models import Post
from .models import File
from django.contrib.auth.models import User
import json
from .fileUploadHandler import handle_uploaded_file

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addNewPost(request):
    try:
        rawParam = request.body
        param = json.loads(rawParam.decode('utf8'))
        user = User.objects.get(pk=param['user_id'])
        post = user.post_set.create(post_title='Untitle')
        serializer = PostSerializer(post)
        return JsonResponse({
            'status': 201,
            'message': 'create new post success',
            'post': serializer.data
        })
    except:
        return JsonResponse({
            'status': 503,
            'message': 'can not create post',
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPosts(request):
    user = request.user
    posts = user.post_set.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload(request):
    param = request.POST
    try:
        post_id = int(param.get('post_id'))
        if not Post.objects.filter(pk=post_id).exists():
            return JsonResponse({
                'status': 400,
                'message': 'post_id not exist',
            })    
    except:
        return JsonResponse({
            'status': 400,
            'message': 'post_id require',
        })
    try:
        file = request.FILES['upload_file']
    except:
        return JsonResponse({
            'status': 400,
            'message': 'upload_file require',
        })
    responseSaveFile = handle_uploaded_file(file)
    if responseSaveFile['result']:
        count = File.objects.filter(post_id=post_id).count()
        file = File(post_id=post_id, file_link=responseSaveFile['file_link'], file_type= 'pdf', version=count)
        file.save()
        serializer = FileSerializer(file)
        return JsonResponse({
            'status': 201,
            'message': responseSaveFile['message'],
            'file': serializer.data
        })
    else:
        return JsonResponse({
            'status': 400,
            'message': responseSaveFile['message'],
        })