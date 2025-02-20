# Django-React
 staring with the project we need to create a virtual environment 
 ```bash
python3 -m venv env
```
this will create a virtual environment folder env
```bash
source env/bin/activate
```
this to activate virtual environment in mac 
and for windows
```bash
env/Scripts/activate.bat
```

this is the requirement.txt file
```
asgiref
Django
django-cors-headers
djangorestframework
djangorestframework-simplejwt
PyJWT
pytz
sqlparse
psycopg2-binary
python-dotenv
```
django-cors-headers to fix cross origin request issues

```bash
pip install -r requirement.txt
```
+ for tutorial only following changes are made in settings.py of project folder
```py
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

ALLOWED_HOSTS = ["*"]

# for jwt tokens

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "api",
    "rest_framework",
    "corsheaders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWS_CREDENTIALS = True
```
how jwt tokens work
+ json web token
+ act as permission or authentication
+ when frontend interacts with backend, the backend needs to know who we are and do we have permission to do
+ the token is decode in backend to grant the permissions
+ credentials passed from frontend to backend and grant the token (access token and refresh token)  from the backend
+ what access token will do is that it grant the request and refresh token refreshes the access token
+ frontend will store both tokens so in future we don't have to constantly sign in in the backend
+ when the access token expires then refresh token is sent to backend to again respawn the access token
+ we do this for security if the access token is leaked


<hr>
first we make models and then its serializable class 
after then views are made

+ now in views there are two thing ListCreateApiView and CreateApiView
+ then difference is that first one lists as well as create data point but later one only creates the data point
+ in view methods like get_queryset, perform_create are inbuilt methods which we are overwritting for our specific use cases

# Frontend part
```bash
 npm install axios react-router-dom jwt-decode
```
make following folder in src
+ components
+ pages
+ assets
+ styles
  
make 3 files in the src folder
+ constants.js
+ api.js
+ .env

--- make ProtectedRoute.jsx in components folder of src






<hr>

```bash
npm create vite@latest
```
say project frontend is created 
change directory to that folder
```bash
npm install
```
```bash
npm install axios
```
```bash
npm install react-router-dom
```
# setting up tailwind css
```bash
npm install tailwindcss @tailwindcss/vite
```
make vite.config.js like this i.e. include tailwindcss into plugins
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@vtailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```
now remove every thing from index.css and include
@import 'tailwindcss';

```bash
npm install react-icons
```
# authentication using JWT token

in backend
```bash
pip install djangorestframework-simplejwt
```
include rest_framework_simplejwt in INSTALLED_APPS of settings.py
```py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}
```
include this also in settings.py

```bash
# simplejwt calls userid bydefault for user model so we need to change it to username since in our app username is the primary key
SIMPLE_JWT={
    "USER_ID_FIELD":"username",
}
```
this also

this is urls.py in base

```py
from django.urls import path

from django.conf import settings
from django.conf.urls.static import static

from .views import get_user_profile_data

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns=[
    path('user_data/<str:pk>/',get_user_profile_data,name='user_data'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
```

### customizing the token classes

```bash
from django.urls import path

from django.conf import settings
from django.conf.urls.static import static

from .views import get_user_profile_data,CustomTokenObtainPairView,CustomTokenRefreshView

urlpatterns=[
    path('user_data/<str:pk>/',get_user_profile_data,name='user_data'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
```
check views.py for custom code


now making our custom authentication using cooking
make authenticate.py in base 
```py
from rest_framework_simplejwt.authentication import JWTAuthentication

class CustomCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token=request.COOKIES.get('access_token')
        if not access_token:
            return None
        validated_token=self.get_validated_token(access_token)
        try:
            user=self.get_user(validated_token)
        except:
            return None
        return (user,validated_token)
```

change settings.py default authentication class

```py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'base.authenticate.CustomCookieAuthentication',
    )
}
```

# making protected routes
we will be using react redux toolkit for this

create view authenticated which has permission class as IsAuthenticated
and then make stores --

```bash
npm install @reduxjs/toolkit react-redux
```

make a store
storeIndex.js
authSlice.js
in a store folder
after that make a protectedRoute component in components folder

also need to provide the store in main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import storeIndex from './store/storeIndex.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={storeIndex}><App /></Provider>
  </StrictMode>,
)
```