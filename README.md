# ⚡ Midwest IT Store

An advanced **full-stack e-commerce platform** built for selling **electronics and IT-related products** — from powerful laptops and gaming gear to networking tools and accessories.  
Developed with **Django (Backend API)** and **React (Frontend SPA)** for speed, scalability, and modern user experience.

---

## 🚀 Tech Stack

**Frontend:** React, TailwindCSS, Axios, React Router  
**Backend:** Django, Django REST Framework  
**Database:** PostgreSQL / SQLite  
**Authentication:** Django AllAuth / JWT  
**Hosting:** Render (Backend) + Vercel (Frontend)  

---

## 🛒 Features

- 🔐 **User Authentication** — Signup, login, logout & profile management  
- 🧠 **AI-powered Product Recommendation** *(optional)*  
- 💻 **Product Management** — Add, update, or remove products easily  
- ❤️ **Wishlist & Favorites** — Save items for later  
- 🛍️ **Add to Cart** — Real-time cart updates using REST APIs  
- 💸 **Order System** — Secure checkout and order tracking  
- 📦 **Dynamic Product Categories** — Smart filtering and search  
- 📱 **Responsive Design** — Optimized for desktop and mobile  
- ⚙️ **Admin Dashboard** — Manage users, orders, inventory, and offers  

---

## 🧩 Project Structure
backend/
├── core/
├── products/ # Product App
│ ├── models/
│ │ ├── category.py
│ │ ├── product.py
│ │ ├── topdeal.py
│ │ ├── product_image.py
│ │ ├── wishlist.py
│ │ ├── cart.py
│ │ └── slidebar.py
│ ├── utils/ # AI / Helper Functions
│ │ ├── ai_features.py
│ │ └── init.py
│ ├── serializers.py
│ ├── views.py
│ ├── urls.py
│ └── admin.py
├── orders/
├── users/
└── manage.py
