from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class MyUser(AbstractUser):
    username=models.CharField(max_length=50,unique=True,primary_key=True)
    registration=models.CharField(max_length=11,unique=True)
    bio=models.CharField(max_length=500)
    profile_image=models.ImageField(upload_to='profile_image/',blank=True,null=True)
    followers=models.ManyToManyField('self',related_name='following',symmetrical=False)
    
    # By default, a ManyToManyField in Django is symmetrical when it refers to the same model (self). This means that if User A follows User B, Django would automatically assume that User B follows User A, which is incorrect in a social media-style follower system.

    def __str__(self):
        return self.username
    
# since we can't use this model directly as data in api are passed down in json format so we need to serialize it

class Post(models.Model):
    user=models.ForeignKey(MyUser,on_delete=models.CASCADE,related_name='posts')
    description=models.CharField(max_length=400)
    created_at=models.DateTimeField(auto_now_add=True)
    likes=models.ManyToManyField(MyUser,related_name='post_likes',blank=True)
