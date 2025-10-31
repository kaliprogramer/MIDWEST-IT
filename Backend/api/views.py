from rest_framework import viewsets
from .models import Product,SlideBar,addtoCart
from .serializers import ProductSerializer , SlideBarSerializer,AddToCartSerializer
from rest_framework import viewsets, permissions
#import Q
from django.db.models import Q

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class SlideBarViewSet(viewsets.ModelViewSet):
    queryset = SlideBar.objects.all()
    serializer_class = SlideBarSerializer


class Top5ProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.order_by('-buyer_no')[:5]

    serializer_class = ProductSerializer


class AddToCartViewSet(viewsets.ModelViewSet):
    serializer_class = AddToCartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return addtoCart.objects.filter(buyer=self.request.user)












#ai for image search here :
# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, extract_features, decode_ai_code
from .serializers import ProductSerializer
import numpy as np
from PIL import Image
import torch
from torchvision import transforms
from torchvision.models import resnet50, ResNet50_Weights

# Load model globally
model = resnet50(weights=ResNet50_Weights.DEFAULT)
model.eval()

transformer = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def extract_query_features(image_file):
    """Extract features from uploaded image"""
    image = Image.open(image_file).convert("RGB")
    img_t = transformer(image).unsqueeze(0)
    with torch.no_grad():
        features = model(img_t)
    vector = features.flatten().numpy().astype(np.float32)
    return vector

def cosine_similarity(vec1, vec2):
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))


class ImageSearchAPIView(APIView):
    """
    Upload an image and return similar products based on AI features.
    """

    def post(self, request):
        file = request.FILES.get('image')
        if not file:
            return Response({'error': 'No image uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        query_vector = extract_query_features(file)

        results = []
        products = Product.objects.exclude(ai_image_code__isnull=True)
        for product in products:
            product_vector = decode_ai_code(product.ai_image_code)
            sim = cosine_similarity(query_vector, product_vector)
            results.append((sim, product))

        results.sort(reverse=True, key=lambda x: x[0])
        top_products = [p for _, p in results[:5]]  # top 5

        serializer = ProductSerializer(top_products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
