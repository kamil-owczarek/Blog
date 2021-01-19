from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from rest_framework import status

from posts.models import Post
from posts.serializers import PostSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            posts = posts.filter(title__icontains=title)
        
        post_serializer = PostSerializer(posts, many=True)
        return Response(post_serializer.data)

    elif request.method == 'POST':
        post_data = JSONParser().parse(request)
        post_serializer = PostSerializer(data=post_data)
        if post_serializer.is_valid():
            post_serializer.save()
            return Response(post_serializer.data, status=status.HTTP_201_CREATED)
        return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Post.objects.all().delete()
        return Response({'message': '{} Posts were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    try: 
        post = Post.objects.get(pk=pk) 
    except Post.DoesNotExist: 
        return Response({'message': 'The post does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET':
        post_serializer = PostSerializer(post)
        return Response(post_serializer.data)

    elif request.method == 'PUT':
        post_data = JSONParser().parse(request)
        post_serializer = PostSerializer(post, data=post_data)
        if post_serializer.is_valid():
            post_serializer.save()
            return Response(post_serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        post.delete()
        return Response({'message': 'Post was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)