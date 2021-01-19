from django.conf.urls import url 
from posts import views 

urlpatterns = [ 
    url(r'^api/posts$', views.post_list, name="get_post_delete_posts"),
    url(r'^api/posts/(?P<pk>[0-9]+)$', views.post_detail, name="get_put_delete_post")
]
