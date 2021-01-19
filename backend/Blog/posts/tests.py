from django.test import TestCase, Client
from posts.models import Post
from posts.serializers import PostSerializer
from django.urls import reverse
from rest_framework import status
import json

client = Client()

class GetAllPostsTest(TestCase):
    def setUp(self):
        Post.objects.create(title="test1", author="test1", description="test1")
        Post.objects.create(title="test2", author="test2", description="test2")

    def test_get_all_posts(self):
        response = client.get(reverse('get_post_delete_posts'))
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSinglePostTest(TestCase):
    def setUp(self):
        self.test1 = Post.objects.create(title="test1", author="test1", description="test1")
        self.test2 = Post.objects.create(title="test2", author="test2", description="test2")

    def test_get_single_valid_post(self):
        response = client.get(reverse('get_put_delete_post', kwargs={'pk': self.test1.pk}))
        post = Post.objects.get(pk=self.test1.pk)
        serializer = PostSerializer(post)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_invalid_post(self):
        response = client.get(reverse('get_put_delete_post', kwargs={'pk': 3}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PostNewPostTest(TestCase):
    def setUp(self):
        self.valid_post = {
            'title': 'test1', 
            'author': 'test1',
            'description': 'test1'
        }
        self.invalid_post = {
            'title': '', 
            'author': 'test2',
            'description': 'test2'
        }
    
    def test_post_valid_post(self):
        response = client.post(
            reverse('get_post_delete_posts'), 
            data=json.dumps(self.valid_post),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_invalid_post(self):
        response = client.post(
            reverse('get_post_delete_posts'), 
            data=json.dumps(self.invalid_post),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class PutSinglePostTest(TestCase):
    def setUp(self):
        self.test1 = Post.objects.create(title="test1", author="test1", description="test1")
        self.test2 = Post.objects.create(title="test2", author="test2", description="test2")
        self.valid_post = {
            'title': 'test1',
            'author': 'test1', 
            'description': 'valid put'
        }
        self.invalid_post = {
            'title': '',
            'description': 'invalid put'
        }
    
    def test_put_valid_post(self):
        response = client.put(
            reverse('get_put_delete_post', kwargs={'pk': self.test1.pk}), 
            data=json.dumps(self.valid_post),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_put_invalid_post(self):
        response = client.put(
            reverse('get_put_delete_post', kwargs={'pk': self.test1.pk}), 
            data=json.dumps(self.invalid_post),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSinglePostTest(TestCase):
    def setUp(self):
        self.test1 = Post.objects.create(title="test1", author="test1", description="test1")
        self.test2 = Post.objects.create(title="test2", author="test2", description="test2")

    def test_delete_single_post(self):
        response = client.delete(reverse('get_put_delete_post', kwargs={'pk': self.test1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class DeleteAllPostsTest(TestCase):
    def setUp(self):
        Post.objects.create(title="test1", author="test1", description="test1")
        Post.objects.create(title="test2", author="test2", description="test2")

    def test_delete_all_posts(self):
        response = client.delete(reverse('get_post_delete_posts'))
        Post.objects.all().delete()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)