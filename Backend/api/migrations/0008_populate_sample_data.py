"""
Populate the database with realistic sample data for an electronics store.
"""
from django.db import migrations
from django.utils import timezone
from datetime import timedelta
import uuid

def create_sample_data(apps, schema_editor):
    Category = apps.get_model('api', 'Category')
    Product = apps.get_model('api', 'Product')
    TopDeal = apps.get_model('api', 'TopDeal')
    SlideBar = apps.get_model('api', 'SlideBar')
    ProductImage = apps.get_model('api', 'ProductImage')

    # Create categories
    categories = {
        'laptops': Category.objects.create(name='Laptops', slug='laptops'),
        'phones': Category.objects.create(name='Smartphones', slug='phones'),
        'audio': Category.objects.create(name='Audio', slug='audio'),
        'tv': Category.objects.create(name='TV & Home', slug='tv'),
        'accessories': Category.objects.create(name='Accessories', slug='accessories'),
        'tablets': Category.objects.create(name='Tablets', slug='tablets'),
    }

    # Sample products data with realistic descriptions and features
    products_data = [
        {
            'name': 'MacBook Pro 16"',
            'category': categories['laptops'],
            'description': 'Latest M2 Pro chip, 16-inch Liquid Retina XDR display, up to 22 hours of battery life.',
            'price': 2499.99,
            'original_price': 2699.99,
            'discount': 7,
            'stock': 50,
            'features': ['16-inch Retina Display', 'M2 Pro chip', '512GB SSD', '16GB RAM'],
            'image_url': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
            'rating': 4.8,
            'reviews_count': 245,
            'is_new': True
        },
        {
            'name': 'iPhone 15 Pro',
            'category': categories['phones'],
            'description': 'A17 Pro chip, 48MP camera system, Titanium design, Dynamic Island.',
            'price': 999.99,
            'original_price': 1099.99,
            'discount': 9,
            'stock': 100,
            'features': ['6.1" OLED', 'A17 Pro chip', '256GB', 'Titanium frame'],
            'image_url': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
            'rating': 4.9,
            'reviews_count': 532,
            'is_new': True
        },
        {
            'name': 'Sony WH-1000XM5',
            'category': categories['audio'],
            'description': 'Industry-leading noise canceling with Auto NC Optimizer.',
            'price': 399.99,
            'original_price': 449.99,
            'discount': 11,
            'stock': 75,
            'features': ['30hr battery', 'Adaptive Sound Control', 'Multipoint connection'],
            'image_url': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
            'rating': 4.7,
            'reviews_count': 189,
            'is_new': False
        },
        {
            'name': 'LG C3 OLED 65"',
            'category': categories['tv'],
            'description': '4K OLED evo Gallery Edition Smart TV with AI-powered processing.',
            'price': 2499.99,
            'original_price': 2999.99,
            'discount': 17,
            'stock': 30,
            'features': ['4K OLED', 'WebOS 23', 'G-SYNC Compatible', 'Dolby Vision IQ'],
            'image_url': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500',
            'rating': 4.9,
            'reviews_count': 156,
            'is_new': True
        },
        {
            'name': 'iPad Pro 12.9"',
            'category': categories['tablets'],
            'description': 'Stunning 12.9-inch Liquid Retina XDR display with M2 chip power.',
            'price': 1099.99,
            'original_price': 1199.99,
            'discount': 8,
            'stock': 60,
            'features': ['M2 chip', '12.9" XDR display', '256GB', 'Apple Pencil 2 support'],
            'image_url': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
            'rating': 4.8,
            'reviews_count': 324,
            'is_new': True
        },
        {
            'name': 'AirPods Pro 2',
            'category': categories['accessories'],
            'description': 'Active Noise Cancellation, Adaptive Audio, and MagSafe Charging Case.',
            'price': 249.99,
            'original_price': 279.99,
            'discount': 11,
            'stock': 150,
            'features': ['H2 chip', 'Adaptive Audio', '6hr battery', 'MagSafe charging'],
            'image_url': 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500',
            'rating': 4.8,
            'reviews_count': 892,
            'is_new': False
        },
    ]

    # Create products
    for product_data in products_data:
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

        # Create top deals for selected products
        if product_data['discount'] > 10:
            TopDeal.objects.create(
                product=product,
                deal_price=product_data['price'],
                start_date=timezone.now(),
                end_date=timezone.now() + timedelta(days=7)
            )

    # Create slider content
    sliders = [
        {
            'title': 'New iPhone 15 Pro',
            'subtitle': 'Experience the power of A17 Pro',
            'buttonText': 'Shop Now',
            'image_url': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200'
        },
        {
            'title': 'MacBook Pro M2',
            'subtitle': 'Supercharged for productivity',
            'buttonText': 'Learn More',
            'image_url': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200'
        },
        {
            'title': 'Premium Audio',
            'subtitle': 'Immersive sound experience',
            'buttonText': 'Discover',
            'image_url': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200'
        }
    ]

    for slider_data in sliders:
        SlideBar.objects.create(**slider_data)

def remove_sample_data(apps, schema_editor):
    Category = apps.get_model('api', 'Category')
    Product = apps.get_model('api', 'Product')
    TopDeal = apps.get_model('api', 'TopDeal')
    SlideBar = apps.get_model('api', 'SlideBar')
    
    Category.objects.all().delete()
    Product.objects.all().delete()
    TopDeal.objects.all().delete()
    SlideBar.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_sample_data, remove_sample_data)
    ]