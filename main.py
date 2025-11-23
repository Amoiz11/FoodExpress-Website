from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# FoodExpress Backend App
app = FastAPI(
    title="FoodExpress API",
    description="Backend for FoodExpress Restaurant", 
    version="1.0.0"
)

# Frontend connect karne ke liye
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve HTML files manually
@app.get("/")
async def serve_index():
    return FileResponse("index.html")

@app.get("/menu.html")
async def serve_menu():
    return FileResponse("menu.html")

@app.get("/notifications.html") 
async def serve_notifications():
    return FileResponse("notifications.html")

@app.get("/about.html")
async def serve_about():
    return FileResponse("about.html")

@app.get("/contact.html")
async def serve_contact():
    return FileResponse("contact.html")

# Serve CSS files
@app.get("/style.css")
async def serve_css():
    return FileResponse("style.css", media_type="text/css")

@app.get("/notification-style.css")
async def serve_notification_css():
    return FileResponse("notification-style.css", media_type="text/css")

@app.get("/script.js")
async def serve_js():
    return FileResponse("script.js", media_type="application/javascript")

# Serve static files for assets
app.mount("/assets", StaticFiles(directory="."), name="assets")

# ========== API ROUTES ==========

# Home API
@app.get("/api/")
async def home():
    return {
        "message": "🎉 FoodExpress Backend Successfully Running!", 
        "status": "active",
        "version": "1.0.0"
    }

# Menu API
@app.get("/api/menu")
async def get_menu():
    return {
        "success": True,
        "menu": [
            {
                "id": 1, 
                "name": "Chicken Burger", 
                "price": 299, 
                "category": "burgers",
                "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
                "description": "Juicy chicken patty with fresh vegetables"
            },
            {
                "id": 2, 
                "name": "Veg Pizza", 
                "price": 399, 
                "category": "pizza",
                "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", 
                "description": "Fresh veggies with mozzarella cheese"
            },
            {
                "id": 3, 
                "name": "French Fries", 
                "price": 99, 
                "category": "sides",
                "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
                "description": "Crispy golden fries with seasoning"
            },
            {
                "id": 4, 
                "name": "Chocolate Shake", 
                "price": 149, 
                "category": "beverages",
                "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
                "description": "Creamy chocolate milkshake"
            },
            {
                "id": 5, 
                "name": "Pasta", 
                "price": 249, 
                "category": "main-course",
                "image": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400",
                "description": "Italian pasta with red sauce"
            },
            {
                "id": 6, 
                "name": "Ice Cream", 
                "price": 129, 
                "category": "desserts",
                "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
                "description": "Vanilla ice cream with chocolate sauce"
            }
        ]
    }

# Order API
@app.post("/api/orders")
async def create_order():
    return {
        "success": True, 
        "order_id": 12345, 
        "status": "Order placed successfully!",
        "message": "Your food will be delivered in 30 minutes 🚀",
        "delivery_time": "30 minutes"
    }

# Notifications API
@app.get("/api/notifications")
async def get_notifications():
    return {
        "success": True,
        "notifications": [
            {
                "id": 1,
                "title": "Order Confirmed",
                "message": "Your order #12345 has been confirmed",
                "type": "success",
                "time": "10 minutes ago",
                "read": False
            },
            {
                "id": 2,
                "title": "Special Offer",
                "message": "Get 20% off on your next order",
                "type": "info", 
                "time": "2 hours ago",
                "read": False
            },
            {
                "id": 3,
                "title": "Delivery Update",
                "message": "Your order is out for delivery",
                "type": "success",
                "time": "1 day ago",
                "read": True
            }
        ]
    }

# User Registration API
@app.post("/api/register")
async def register_user():
    return {
        "success": True,
        "user_id": 1001,
        "message": "User registered successfully",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }

# User Login API  
@app.post("/api/login")
async def login_user():
    return {
        "success": True,
        "user_id": 1001,
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "name": "FoodExpress User"
    }

# Health Check API
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy", 
        "service": "FoodExpress Backend",
        "timestamp": "2024-01-15T10:30:00Z",
        "version": "1.0.0"
    }

# Server Info API
@app.get("/api/info")
async def server_info():
    return {
        "name": "FoodExpress Backend",
        "framework": "FastAPI",
        "version": "1.0.0",
        "status": "running",
        "endpoints": [
            "/api/menu",
            "/api/orders", 
            "/api/notifications",
            "/api/register",
            "/api/login",
            "/api/health"
        ]
    }

# If run directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)