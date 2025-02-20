from django.urls import path

from django.conf import settings
from django.conf.urls.static import static

from .views import get_user_profile_data,CustomTokenObtainPairView,CustomTokenRefreshView,register,authenticated,toggleFollow,get_users_posts,toggleLike,create_posts,get_posts,search_users,update_user_details,logout

urlpatterns=[
    path('user_data/<str:pk>/',get_user_profile_data,name='user_data'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/',register,name='register'),
    path('authenticated/',authenticated,name='authenticated'),
    path('toggle_follow/',toggleFollow,name='toggle_follow'),
    path('posts/<str:pk>/',get_users_posts,name="user_posts"),
    path('toggleLike/', toggleLike,name='toggle_like'),
    path('create_post/',create_posts,name="create_post"),
    path('get_posts/',get_posts,name='get_posts'),
    path('search/',search_users,name='search'),
    path('update_user/', update_user_details,name='update_user_details'),
    path('logout/', logout,name='logout'),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)