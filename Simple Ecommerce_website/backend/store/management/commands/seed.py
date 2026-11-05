from django.core.management.base import BaseCommand
from django.utils.text import slugify
from store.models import Category,Product

class Command(BaseCommand):
    help="Create ShopSphere demo categories and products"
    def handle(self,*args,**kwargs):
        names=["Traditional Wear","Western Wear","Footwear & Accessories","Stationery","Home & Kitchen","Electronics","Beauty & Personal Care","Medicines & Healthcare","Everyday Essentials"]
        cats={}
        for name in names:
            cats[name]=Category.objects.get_or_create(slug=slugify(name),defaults={"name":name})[0]
        data=[
        ("Traditional Cotton Kurti","Traditional Wear","799","👗",25),("Elegant Silk Saree","Traditional Wear","1899","🥻",15),
        ("Women's Casual Top","Western Wear","599","👚",30),("Men's Casual Shirt","Western Wear","899","👕",20),
        ("Classic Sneakers","Footwear & Accessories","1499","👟",18),("Fashion Handbag","Footwear & Accessories","1099","👜",12),
        ("Notebook Set","Stationery","199","📓",100),("Premium Pen Set","Stationery","149","🖊️",80),
        ("Ceramic Dinner Set","Home & Kitchen","1299","🍽️",10),("Water Bottle","Home & Kitchen","299","🥤",50),
        ("Wireless Headphones","Electronics","1999","🎧",14),("Smart Watch","Electronics","2499","⌚",9),
        ("Face Wash","Beauty & Personal Care","249","🧴",40),("Moisturizing Lotion","Beauty & Personal Care","349","🧴",35),
        ("First Aid Kit","Medicines & Healthcare","399","🩹",20),("Digital Thermometer","Medicines & Healthcare","299","🌡️",15),
        ("Reusable Shopping Bag","Everyday Essentials","99","🛍️",100),("Desk Organizer","Everyday Essentials","249","🗂️",30)]
        for name,cat,price,emoji,stock in data:
            Product.objects.update_or_create(name=name,defaults={"category":cats[cat],"description":name+" from ShopSphere sample catalogue.","price":price,"emoji":emoji,"color":"#E0E7FF","stock":stock,"rating":"4.3","is_active":True})
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(data)} products across {len(names)} categories."))
