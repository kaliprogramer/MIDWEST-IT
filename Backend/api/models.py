from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User
from django.utils.timezone import now
import uuid

# ------------------- AI Image Feature Extraction -------------------
import torch
import numpy as np
from torchvision import models as tv_models  # Avoid conflict with Django models
from torchvision import transforms as tv_transforms
from torchvision.models import ResNet50_Weights
from PIL import Image
import base64

# Load ResNet50 model globally
resnet_model = tv_models.resnet50(weights=ResNet50_Weights.DEFAULT)
resnet_model.eval()

# Transformations for input image
transform = tv_transforms.Compose([
    tv_transforms.Resize((224, 224)),
    tv_transforms.ToTensor(),
])

def decode_ai_code(encoded):
    """Convert base64 string back to numpy array"""
    vector = np.frombuffer(base64.b64decode(encoded), dtype=np.float32)
    return vector
def extract_features(image_file):
    """Extract image features and return as base64 string"""
    image = Image.open(image_file).convert("RGB")
    img_t = transform(image).unsqueeze(0)
    with torch.no_grad():
        features = resnet_model(img_t)
    # Convert to numpy + encode in base64 for compact storage
    vector = features.flatten().numpy().astype(np.float32)
    encoded = base64.b64encode(vector.tobytes()).decode('utf-8')
    return encoded

# ------------------- Category Model -------------------
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

# ------------------- Product Model -------------------
class Product(models.Model):
    product_id = models.UUIDField(default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    main_image = models.ImageField(upload_to='products/', null=True, blank=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True, default='')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    discount = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=5)
    reviews_count = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    stock = models.PositiveIntegerField(default=0)
    is_new = models.BooleanField(default=False)
    features = models.JSONField(default=list, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', null=True)
    buyer_no = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ai_image_code = models.TextField(max_length=5000, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
    
    # ✅ Automatically generate ai_image_code if main_image or image_url exists
        if not self.ai_image_code:
            try:
                if self.main_image:
                    self.ai_image_code = extract_features(self.image_url)
                elif self.image_url:
                    import requests
                    from io import BytesIO
                    image = Image.open(BytesIO(requests.get(self.image_url).content)).convert("RGB")
                    img_t = transform(image).unsqueeze(0)
                    with torch.no_grad():
                        features = resnet_model(img_t)
                    vector = features.flatten().numpy().astype(np.float32)
                    self.ai_image_code = base64.b64encode(vector.tobytes()).decode('utf-8')
            except Exception as e:
                print(f"Failed to generate AI code for {self.name}: {e}")

        super().save(*args, **kwargs)


    @property
    def discount_percent(self):
        dp = getattr(self, 'discount_price', None)
        try:
            if dp:
                return round(100 - (float(dp) / float(self.price)) * 100, 2)
        except Exception:
            pass
        if self.discount:
            return float(self.discount)
        return 0

# ------------------- Top Deal Model -------------------
class TopDeal(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='top_deals')
    deal_price = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateTimeField(default=now)
    end_date = models.DateTimeField()

    def __str__(self):
        return f"Top Deal: {self.product.name} at {self.deal_price}"

# ------------------- Product Images Model -------------------
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return f"Image for {self.product.name}"

# ------------------- Wishlist Model -------------------
class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlist')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wishlisted_by')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user.username} ❤️ {self.product.name}"

# ------------------- SlideBar Model -------------------
class SlideBar(models.Model):
    image = models.ImageField(upload_to='slides/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    buttonText = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.title

# ------------------- Cart Model -------------------
class addtoCart(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_products')
    quantity = models.PositiveIntegerField(default=1)


    def __str__(self):
        return f"{self.quantity} of {self.product.name}"
