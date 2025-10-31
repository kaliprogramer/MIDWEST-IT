"""
Add more products to existing categories.
"""
from django.db import migrations
from django.utils import timezone
from datetime import timedelta
import uuid

def add_more_products(apps, schema_editor):
    Category = apps.get_model('api', 'Category')
    Product = apps.get_model('api', 'Product')
    TopDeal = apps.get_model('api', 'TopDeal')

    # Get existing categories
    categories = {
        'laptops': Category.objects.get(slug='laptops'),
        'phones': Category.objects.get(slug='phones'),
        'audio': Category.objects.get(slug='audio'),
        'tv': Category.objects.get(slug='tv'),
        'accessories': Category.objects.get(slug='accessories'),
        'tablets': Category.objects.get(slug='tablets'),
    }

    # More products data
    new_products = [
        # More Laptops
        {
            'name': 'Dell XPS 15',
            'category': categories['laptops'],
            'description': '15.6" OLED display, Intel Core i9, NVIDIA RTX 4070, perfect for creators and professionals.',
            'price': 2199.99,
            'original_price': 2399.99,
            'discount': 8,
            'stock': 45,
            'features': ['15.6" OLED', 'Intel Core i9', '1TB SSD', '32GB RAM', 'RTX 4070'],
            'image_url': 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500',
            'rating': 4.7,
            'reviews_count': 178,
            'is_new': True
        },
        {
            'name': 'Lenovo ThinkPad X1 Carbon',
            'category': categories['laptops'],
            'description': 'Ultimate business laptop with 14" display, Intel Evo platform, and legendary ThinkPad reliability.',
            'price': 1799.99,
            'original_price': 1999.99,
            'discount': 10,
            'stock': 60,
            'features': ['14" QHD+', 'Intel Core i7', '512GB SSD', '16GB RAM', 'ThinkPad Security'],
            'image_url': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
            'rating': 4.8,
            'reviews_count': 156,
            'is_new': False
        },
        # More Phones
        {
            'name': 'Samsung Galaxy S23 Ultra',
            'category': categories['phones'],
            'description': '6.8" Dynamic AMOLED, 200MP camera, S Pen support, and Snapdragon 8 Gen 2.',
            'price': 1199.99,
            'original_price': 1299.99,
            'discount': 7,
            'stock': 85,
            'features': ['6.8" AMOLED', '200MP camera', '512GB', '12GB RAM', 'S Pen'],
            'image_url': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
            'rating': 4.9,
            'reviews_count': 423,
            'is_new': True
        },
        {
            'name': 'Google Pixel 8 Pro',
            'category': categories['phones'],
            'description': 'Advanced AI photography, 6.7" LTPO OLED, Google Tensor G3 chip.',
            'price': 999.99,
            'original_price': 1099.99,
            'discount': 9,
            'stock': 70,
            'features': ['6.7" OLED', 'Tensor G3', '256GB', 'Advanced AI camera'],
            'image_url': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
            'rating': 4.7,
            'reviews_count': 289,
            'is_new': True
        },
        # More Audio Products
        {
            'name': 'Bose QuietComfort Ultra',
            'category': categories['audio'],
            'description': 'Premium noise cancelling headphones with spatial audio and advanced mic system.',
            'price': 429.99,
            'original_price': 479.99,
            'discount': 10,
            'stock': 55,
            'features': ['Spatial Audio', '24hr battery', 'USB-C', 'Multi-point connection'],
            'image_url': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
            'rating': 4.8,
            'reviews_count': 167,
            'is_new': True
        },
        {
            'name': 'Apple HomePod 2nd Gen',
            'category': categories['audio'],
            'description': 'Room-filling sound, Spatial Audio, and deep integration with Apple ecosystem.',
            'price': 299.99,
            'original_price': 349.99,
            'discount': 14,
            'stock': 40,
            'features': ['Spatial Audio', 'Siri', 'Room sensing', 'Smart home hub'],
            'image_url': 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500',
            'rating': 4.6,
            'reviews_count': 143,
            'is_new': False
        },
        # More TVs
        {
            'name': 'Samsung QN90C Neo QLED 75"',
            'category': categories['tv'],
            'description': 'Neo QLED 4K brilliance with Neural Quantum Processor and Anti-Glare screen.',
            'price': 2799.99,
            'original_price': 3299.99,
            'discount': 15,
            'stock': 25,
            'features': ['75" Neo QLED', '4K 144Hz', 'Gaming Hub', 'Object Tracking Sound+'],
            'image_url': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500',
            'rating': 4.8,
            'reviews_count': 112,
            'is_new': True
        },
        # More Accessories
        {
            'name': 'Apple Watch Series 9',
            'category': categories['accessories'],
            'description': 'Latest Apple Watch with S9 chip, Double Tap gesture, and bright display.',
            'price': 399.99,
            'original_price': 429.99,
            'discount': 7,
            'stock': 100,
            'features': ['Always-On Retina', 'Double Tap', 'ECG', 'Blood Oxygen'],
            'image_url': 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
            'rating': 4.8,
            'reviews_count': 342,
            'is_new': True
        },
        {
            'name': 'Magic Keyboard with Touch ID',
            'category': categories['accessories'],
            'description': 'Extended layout with numeric keypad and Touch ID for Mac computers.',
            'price': 199.99,
            'original_price': 229.99,
            'discount': 13,
            'stock': 80,
            'features': ['Touch ID', 'Numeric keypad', 'Scissor mechanism', 'Backlit'],
            'image_url': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
            'rating': 4.7,
            'reviews_count': 229,
            'is_new': False
        },
        # More Tablets
        {
            'name': 'Samsung Galaxy Tab S9 Ultra',
            'category': categories['tablets'],
            'description': '14.6" Dynamic AMOLED 2X display, S Pen included, and Snapdragon 8 Gen 2.',
            'price': 1199.99,
            'original_price': 1399.99,
            'discount': 14,
            'stock': 45,
            'features': ['14.6" AMOLED', 'S Pen included', '512GB', '16GB RAM'],
            'image_url': 'https://images.unsplash.com/photo-1632634571086-3ebbd8981d31?w=500',
            'rating': 4.7,
            'reviews_count': 167,
            'is_new': True
        },
        {
            'name': 'Microsoft Surface Pro 9',
            'category': categories['tablets'],
            'description': '13" PixelSense Flow display, Intel Core i7, and versatile 2-in-1 design.',
            'price': 1599.99,
            'original_price': 1799.99,
            'discount': 11,
            'stock': 35,
            'features': ['13" PixelSense', 'Intel Core i7', '512GB SSD', '16GB RAM'],
            'image_url': 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?w=500',
            'rating': 4.6,
            'reviews_count': 145,
            'is_new': False
        },
    ]

    # Create products
    for product_data in new_products:
        product = Product.objects.create(
            product_id=uuid.uuid4(),
            name=product_data['name'],
            slug=product_data['name'].lower().replace(' ', '-').replace('"', ''),
            description=product_data['description'],
            price=product_data['price'],
            original_price=product_data['original_price'],
            discount=product_data['discount'],
            stock=product_data['stock'],
            features=product_data['features'],
            category=product_data['category'],
            image_url=product_data['image_url'],
            rating=product_data['rating'],
            reviews_count=product_data['reviews_count'],
            is_new=product_data['is_new'],
            is_available=True,
            buyer_no=product_data['reviews_count'] * 2
        )

        # Create top deals for products with high discounts
        if product_data['discount'] > 10:
            TopDeal.objects.create(
                product=product,
                deal_price=product_data['price'],
                start_date=timezone.now(),
                end_date=timezone.now() + timedelta(days=7)
            )

def remove_added_products(apps, schema_editor):
    Product = apps.get_model('api', 'Product')
    new_product_names = [
        'Dell XPS 15', 'Lenovo ThinkPad X1 Carbon', 'Samsung Galaxy S23 Ultra',
        'Google Pixel 8 Pro', 'Bose QuietComfort Ultra', 'Apple HomePod 2nd Gen',
        'Samsung QN90C Neo QLED 75"', 'Apple Watch Series 9', 'Magic Keyboard with Touch ID',
        'Samsung Galaxy Tab S9 Ultra', 'Microsoft Surface Pro 9'
    ]
    Product.objects.filter(name__in=new_product_names).delete()

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0008_populate_sample_data'),
    ]

    operations = [
        migrations.RunPython(add_more_products, remove_added_products)
    ]