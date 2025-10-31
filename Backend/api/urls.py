from django.urls import path
from .auth_views import RegisterView, profile_view, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, SlideBarViewSet, Top5ProductsViewSet, AddToCartViewSet,ImageSearchAPIView
router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('slidebar', SlideBarViewSet)
router.register('top5', Top5ProductsViewSet, basename='top5')
router.register('cart', AddToCartViewSet, basename='cart')
urlpatterns = [
    path('', include(router.urls)),
    # JWT Auth
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Custom Endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', profile_view, name='profile'),
    path('logout/', LogoutView.as_view(), name='logout'),
    #ai image search
    path('search-by-image/', ImageSearchAPIView.as_view(), name='search-by-image'),
]


