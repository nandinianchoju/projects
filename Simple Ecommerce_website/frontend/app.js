/* ShopSphere — vanilla JavaScript storefront and localStorage state */
const CATEGORIES = [
  {name:"Traditional Wear",icon:"🥻",color:"#fff0f2"},
  {name:"Western Wear",icon:"👗",color:"#f0edff"},
  {name:"Footwear & Accessories",icon:"👟",color:"#eaf5ff"},
  {name:"Stationery",icon:"✏️",color:"#fff4df"},
  {name:"Home & Kitchen",icon:"🏡",color:"#e9f8ef"},
  {name:"Electronics",icon:"🎧",color:"#f0edff"},
  {name:"Beauty & Personal Care",icon:"🧴",color:"#ffeaf2"},
  {name:"Medicines & Healthcare",icon:"🩺",color:"#e7f7f5"},
  {name:"Everyday Essentials",icon:"🛍️",color:"#fff1e7"}
];
const PRODUCTS = [
  {id:1,name:"Floral Cotton Anarkali Kurta",category:"Traditional Wear",price:1299,oldPrice:1799,rating:4.8,reviews:124,image:"http://127.0.0.1:5500/frontend/images/anarkali-kurta.png",description:"A graceful everyday Anarkali crafted in breathable cotton, with delicate floral detailing and a flattering flowy silhouette.",sizes:["S","M","L","XL"],colors:["Rose","Ivory","Sage"],stock:18,popularity:98},
  {id:2,name:"Handwoven Festive Saree",category:"Traditional Wear",price:2199,oldPrice:2899,rating:4.7,reviews:86,image:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85",description:"A beautiful festive drape with a rich woven finish. A timeless addition to your occasion wardrobe.",sizes:["Free size"],colors:["Maroon","Teal"],stock:9,popularity:89},
  {id:3,name:"Everyday Linen Shirt",category:"Western Wear",price:899,oldPrice:1199,rating:4.5,reviews:72,image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=85",description:"An easy, relaxed-fit linen-blend shirt that keeps your look polished and comfortable all day.",sizes:["S","M","L","XL"],colors:["White","Blue","Beige"],stock:24,popularity:93},
  {id:4,name:"Classic Wide-Leg Jeans",category:"Western Wear",price:1499,oldPrice:1999,rating:4.6,reviews:91,image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",description:"A versatile high-rise denim with a flattering wide-leg fit. Pair it with your favourite basics.",sizes:["26","28","30","32"],colors:["Blue","Black"],stock:15,popularity:91},
  {id:5,name:"Minimal Everyday Sneakers",category:"Footwear & Accessories",price:1799,oldPrice:2299,rating:4.7,reviews:156,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",description:"Lightweight, versatile sneakers with a cushioned sole for everyday comfort and easy styling.",sizes:["6","7","8","9","10"],colors:["White","Coral"],stock:12,popularity:99},
  {id:6,name:"Quilted Crossbody Bag",category:"Footwear & Accessories",price:1199,oldPrice:1599,rating:4.4,reviews:63,image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",description:"A compact crossbody bag with a soft quilted finish, adjustable strap and room for your essentials.",sizes:["One size"],colors:["Black","Cream","Pink"],stock:11,popularity:82},
  {id:7,name:"Pastel Study Planner",category:"Stationery",price:299,oldPrice:399,rating:4.8,reviews:208,image:"https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=700&q=85",description:"Plan your days with a thoughtfully laid-out planner, weekly goals, notes and habit trackers.",sizes:["A5"],colors:["Lilac","Peach"],stock:40,popularity:96},
  {id:8,name:"Premium Gel Pen Set",category:"Stationery",price:199,oldPrice:249,rating:4.5,reviews:112,image:"https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=85",description:"Smooth-writing gel pens in a curated set of everyday colours. Great for notes and journaling.",sizes:["Set of 6"],colors:["Mixed"],stock:55,popularity:80},
  {id:9,name:"Ceramic Coffee Mug Set",category:"Home & Kitchen",price:649,oldPrice:899,rating:4.6,reviews:77,image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=85",description:"A set of two tactile ceramic mugs that bring a little calm to your morning coffee ritual.",sizes:["Set of 2"],colors:["Cream","Terracotta"],stock:20,popularity:87},
  {id:10,name:"Glass Food Storage Set",category:"Home & Kitchen",price:999,oldPrice:1299,rating:4.4,reviews:54,image:"https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=700&q=85",description:"Reusable glass containers with secure lids to keep pantry organisation simple and neat.",sizes:["Set of 5"],colors:["Clear"],stock:16,popularity:75},
  {id:11,name:"Wireless Bluetooth Headphones",category:"Electronics",price:2499,oldPrice:3299,rating:4.7,reviews:302,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",description:"Comfortable wireless headphones for music, calls and focus time, with a clean minimal design.",sizes:["One size"],colors:["Black","Ivory"],stock:14,popularity:100},
  {id:12,name:"Smart Fitness Watch",category:"Electronics",price:2999,oldPrice:3999,rating:4.3,reviews:144,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",description:"A sleek everyday smartwatch with activity tracking, notifications and a comfortable strap.",sizes:["One size"],colors:["Black","Blush"],stock:8,popularity:90},
  {id:13,name:"Daily Hydration Face Serum",category:"Beauty & Personal Care",price:599,oldPrice:799,rating:4.6,reviews:189,image:"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=85",description:"A lightweight hydrating serum for a fresh, comfortable-feeling skincare routine. Check ingredients before use.",sizes:["30 ml"],colors:["One variant"],stock:21,popularity:94},
  {id:14,name:"Gentle Daily Care Kit",category:"Beauty & Personal Care",price:799,oldPrice:1099,rating:4.5,reviews:98,image:"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85",description:"A simple personal-care set for your daily routine. Review product labels and suitability before use.",sizes:["Combo"],colors:["One variant"],stock:13,popularity:84},
  {id:15,name:"Digital Thermometer",category:"Medicines & Healthcare",price:249,oldPrice:349,rating:4.6,reviews:241,image:"https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=700&q=85",description:"A convenient digital thermometer for basic temperature monitoring. Follow the manufacturer's instructions.",sizes:["One size"],colors:["White"],stock:30,popularity:88},
  {id:16,name:"First Aid Essentials Kit",category:"Medicines & Healthcare",price:499,oldPrice:649,rating:4.7,reviews:167,image:"https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=700&q=85",description:"A handy first-aid organiser with everyday supplies. Check contents and expiry dates before use.",sizes:["Basic kit"],colors:["White"],stock:19,popularity:86},
  {id:17,name:"Insulated Water Bottle",category:"Everyday Essentials",price:449,oldPrice:599,rating:4.6,reviews:133,image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85",description:"A reusable insulated bottle designed to keep your drink close at hand through busy days.",sizes:["750 ml"],colors:["Mint","Black","Lilac"],stock:32,popularity:92},
  {id:18,name:"Compact Travel Organiser",category:"Everyday Essentials",price:349,oldPrice:499,rating:4.4,reviews:81,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",description:"Keep small essentials together with this lightweight organiser for bags, desks and travel.",sizes:["One size"],colors:["Grey","Sage"],stock:26,popularity:78}
];
// Correct the sample image URL for headphones.
PRODUCTS[10].image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85";

const KEYS={cart:"shopsphere_cart_v2",wishlist:"shopsphere_wishlist_v2",preferences:"shopsphere_preferences_v2",recent:"shopsphere_recent_v2"};
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
let cart=read(KEYS.cart,[]),wishlist=read(KEYS.wishlist,[]),preferences=read(KEYS.preferences,[]),recent=read(KEYS.recent,[]);
let activeCategory="all",searchTerm="",selectedProduct=null;
const $=id=>document.getElementById(id);
// Django backend connection
const API_HOST = ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? window.location.hostname
    : "127.0.0.1";
const API_BASE = `http://${API_HOST}:8000`;

let authUser = null;
let authMode = "login";

// Get CSRF token from Django
async function getCSRFToken() {
    const response = await fetch(`${API_BASE}/api/csrf/`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Could not connect to authentication server.");
    }

    const data = await response.json();
    return data.csrfToken;
}

// Common API request function
async function authRequest(endpoint, method = "GET", body = null) {
    const options = {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (method !== "GET") {
        options.headers["X-CSRFToken"] = await getCSRFToken();
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(API_BASE + endpoint, options);

    const data = await response.json();

    if (!response.ok) {
        const message = Object.values(data)
            .flat()
            .join(" ");

        throw new Error(message || "Something went wrong.");
    }

    return data;
}
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function toast(message,type="success"){const el=document.createElement("div");el.className="toast "+type;el.textContent=message;$("toastRegion").append(el);setTimeout(()=>el.remove(),2800)}
function productById(id){return PRODUCTS.find(p=>p.id===Number(id))}
function discount(p){return Math.round((1-p.price/p.oldPrice)*100)}
function productCard(p){return `<article class="product-card"><div class="product-image" data-detail="${p.id}"><img src="${p.image_url || p.image}" alt="${escapeHTML(p.name)}" loading="lazy"><span class="discount-badge">${discount(p)}% OFF</span><button class="wish-btn ${wishlist.includes(p.id)?"active":""}" data-wish="${p.id}" aria-label="Add to wishlist">${wishlist.includes(p.id)?"♥":"♡"}</button></div><div class="product-info"><div class="product-category">${escapeHTML(p.category)}</div><div class="product-name" data-detail="${p.id}">${escapeHTML(p.name)}</div><div class="product-rating">★ ${p.rating} <span>(${p.reviews})</span></div><div class="product-bottom"><div><span class="price">${money(p.price)}</span><span class="old-price">${money(p.oldPrice)}</span></div><button class="add-btn" data-add="${p.id}">+ Add</button></div></div></article>`}
function renderGrid(target,items){$(target).innerHTML=items.map(productCard).join("");}
function updateCounts(){$("wishCount").textContent=wishlist.length;$("cartCount").textContent=cart.reduce((n,x)=>n+x.qty,0)}
function showPage(name){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));const page=$(name+"Page");if(page)page.classList.add("active");document.querySelectorAll("#categoryNav a").forEach(a=>a.classList.toggle("active",a.dataset.category===activeCategory&&name==="shop"||a.getAttribute("href")==="#"+name));window.scrollTo({top:0,behavior:"smooth"});if(name==="cart")renderCart();if(name==="wishlist")renderWishlist();if(name==="shop")renderShop();if(name === "orders") renderOrders();}
function navigate(){
    const hash = location.hash.replace("#","") || "home";

    if(hash.startsWith("product-")){
        openProduct(Number(hash.split("-")[1]));
        return;
    }

    const valid = ["home", "shop", "cart", "wishlist", "orders"];
    showPage(valid.includes(hash) ? hash : "home");
}
function initCategories(){const nav=$("categoryNav");CATEGORIES.forEach(c=>{const a=document.createElement("a");a.href="#shop";a.textContent=c.name;a.dataset.category=c.name;a.addEventListener("click",()=>{activeCategory=c.name;searchTerm="";$("searchInput").value="";showPage("shop")});nav.append(a)});$("searchCategory").innerHTML+='<option value="all">All categories</option>';CATEGORIES.forEach(c=>{const o=document.createElement("option");o.value=c.name;o.textContent=c.name;$("searchCategory").append(o)});$("categoryGrid").innerHTML=CATEGORIES.map(c=>`<button class="category-tile" data-category-tile="${c.name}"><span class="category-emoji" style="background:${c.color}">${c.icon}</span><strong>${c.name}</strong></button>`).join("");$("categoryFilters").innerHTML=CATEGORIES.map(c=>`<label><input type="radio" name="category" value="${c.name}"> ${c.name}</label>`).join("")}
function renderHome(){renderGrid("popularGrid",[...PRODUCTS].sort((a,b)=>b.popularity-a.popularity).slice(0,4));const picks=preferences.length?PRODUCTS.filter(p=>preferences.includes(p.category)):PRODUCTS.slice(0,4);renderGrid("recommendedGrid",(picks.length?picks:PRODUCTS).slice(0,4));$("recommendationNote").textContent=preferences.length?"Picked from your interests: "+preferences.join(", "):"A mix of customer favourites to get you started.";const viewed=recent.map(productById).filter(Boolean).slice(0,4);$("recentSection").hidden=!viewed.length;if(viewed.length)renderGrid("recentGrid",viewed)}
function filteredProducts(){let list=PRODUCTS.filter(p=>(activeCategory==="all"||p.category===activeCategory)&&(!searchTerm||(p.name+" "+p.category+" "+p.description).toLowerCase().includes(searchTerm.toLowerCase())));const min=Number($("minPrice")?.value)||0,max=Number($("maxPrice")?.value)||Infinity;list=list.filter(p=>p.price>=min&&p.price<=max);const sort=$("sortSelect")?.value||"popular";if(sort==="price-low")list.sort((a,b)=>a.price-b.price);else if(sort==="price-high")list.sort((a,b)=>b.price-a.price);else if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);else list.sort((a,b)=>b.popularity-a.popularity);return list}
function renderShop(){const list=filteredProducts();$("listingTitle").textContent=activeCategory==="all"?"Explore everything":activeCategory;$("resultCount").textContent=`Showing ${list.length} of ${PRODUCTS.length} products`;$("shopEmpty").hidden=!!list.length;$("shopGrid").hidden=!list.length;renderGrid("shopGrid",list);document.querySelectorAll('input[name="category"]').forEach(i=>i.checked=i.value===activeCategory);$("activeFilters").innerHTML=(activeCategory!=="all"?`<button class="filter-chip" data-clear-category>${activeCategory} ×</button>`:"")+(searchTerm?`<button class="filter-chip" data-clear-search>Search: ${escapeHTML(searchTerm)} ×</button>`:"")}
function openProduct(id){const p=productById(id);if(!p)return;selectedProduct=p;if(!recent.includes(id))recent.unshift(id);recent=recent.slice(0,8);save(KEYS.recent,recent);location.hash="product-"+id;document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));$("detailsPage").classList.add("active");$("detailCrumb").textContent=p.name;$("productDetails").innerHTML=`<div class="detail-layout"><div class="detail-image"><img src="${p.image}" alt="${escapeHTML(p.name)}"></div><div class="detail-copy"><span class="eyebrow">${escapeHTML(p.category)}</span><h1>${escapeHTML(p.name)}</h1><div class="product-rating">★ ${p.rating} <span>(${p.reviews} reviews)</span></div><div class="detail-price">${money(p.price)} <del>${money(p.oldPrice)}</del> <span class="discount-badge">${discount(p)}% OFF</span></div><p>${escapeHTML(p.description)}</p><div class="detail-label">Choose size</div><div class="choice-row" id="sizeChoices">${p.sizes.map((s,i)=>`<button class="choice ${i===0?"selected":""}">${s}</button>`).join("")}</div><div class="detail-label">Choose colour</div><div class="choice-row" id="colorChoices">${p.colors.map((c,i)=>`<button class="choice ${i===0?"selected":""}">${c}</button>`).join("")}</div><p class="detail-stock">${p.stock>0?"✓ In stock — ready to ship":"Currently unavailable"}</p><div class="detail-actions"><button class="btn btn-primary" data-add="${p.id}">Add to cart · ${money(p.price)}</button><button class="btn" style="background:#f5f2ff;color:var(--purple)" data-wish="${p.id}">${wishlist.includes(p.id)?"♥ Saved":"♡ Wishlist"}</button></div></div></div>`;const related=PRODUCTS.filter(x=>x.category===p.category&&x.id!==p.id).slice(0,4);renderGrid("relatedGrid",related.length?related:PRODUCTS.filter(x=>x.id!==p.id).slice(0,4));window.scrollTo({top:0,behavior:"smooth"})}
function addToCart(id){const p=productById(id);if(!p||p.stock<1){toast("This item is currently unavailable","error");return}const item=cart.find(x=>x.id===p.id);if(item){if(item.qty>=p.stock){toast("Maximum available quantity reached","error");return}item.qty++}else cart.push({id:p.id,qty:1});save(KEYS.cart,cart);updateCounts();toast("Added to your cart")}
function toggleWishlist(id){id=Number(id);if(wishlist.includes(id)){wishlist=wishlist.filter(x=>x!==id);toast("Removed from wishlist")}else{wishlist.push(id);toast("Saved to your wishlist")}save(KEYS.wishlist,wishlist);updateCounts();document.querySelectorAll(`[data-wish="${id}"]`).forEach(b=>{b.classList.toggle("active",wishlist.includes(id));b.textContent=wishlist.includes(id)?"♥":"♡"});if(location.hash==="#wishlist")renderWishlist()}
function renderWishlist(){const items=wishlist.map(productById).filter(Boolean);$("wishlistHeadingCount").textContent=`(${items.length})`;$("wishlistEmpty").hidden=!!items.length;$("wishlistGrid").hidden=!items.length;renderGrid("wishlistGrid",items)}

function renderCart(){cart=cart.filter(x=>productById(x.id));const host=$("cartItems");$("cartHeadingCount").textContent=`(${cart.reduce((n,x)=>n+x.qty,0)} items)`;if(!cart.length){host.innerHTML='<div class="empty-state"><span>🛒</span><h3>Your bag is taking a little break</h3><p>Add something lovely to get started.</p><a class="btn btn-primary" href="#shop">Start shopping</a></div>';$("cartSummary").innerHTML="";return}host.innerHTML=cart.map(item=>{const p=productById(item.id);return `<article class="cart-row"><img src="${p.image}" alt="${escapeHTML(p.name)}"><div><div class="product-category">${escapeHTML(p.category)}</div><h3>${escapeHTML(p.name)}</h3><p>${money(p.price)} each</p><div class="quantity-control"><button data-qty="${p.id}" data-change="-1">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-change="1">+</button><button class="remove-btn" data-remove="${p.id}">Remove</button></div></div><div class="row-price">${money(p.price*item.qty)}</div></article>`}).join("");const subtotal=cart.reduce((n,x)=>n+productById(x.id).price*x.qty,0),shipping=subtotal>=999?0:49;$("cartSummary").innerHTML=`<h3>Order summary</h3><div class="summary-line"><span>Subtotal</span><span>${money(subtotal)}</span></div><div class="summary-line"><span>Delivery</span><span>${shipping===0?"FREE":money(shipping)}</span></div><div class="summary-line"><span>Discount</span><span>− ${money(cart.reduce((n,x)=>n+(productById(x.id).oldPrice-productById(x.id).price)*x.qty,0))}</span></div><div class="summary-line summary-total"><span>Total</span><span>${money(subtotal+shipping)}</span></div><button class="btn btn-primary" id="checkoutBtn">Continue to checkout →</button><p class="summary-note">Secure checkout · Taxes included where applicable</p>`}
async function renderOrders() {
    const container = document.getElementById("ordersContainer");

    if (!container) return;

    if (!authUser) {
        container.innerHTML = `
            <div class="empty-state">
                <span>🔒</span>
                <h3>Please login to view your orders</h3>
                <p>Your previous purchases will appear here.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="empty-state">
            <span>📦</span>
            <h3>Loading your orders...</h3>
        </div>
    `;

    try {
        const response = await authRequest("/api/orders/");

console.log("ORDERS API RESPONSE:", response);

const orders = response.orders || [];
console.log("ORDERS API RESPONSE:", orders);
        if (!orders.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <span>🛍️</span>
                    <h3>No orders yet</h3>
                    <p>Your placed orders will appear here.</p>
                    <a href="#shop" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="orders-container">
                ${orders.map(order => `
                    <div class="order-card">

                        <div class="order-header">
                            <div>
                                <h3>Order #${order.order_id}</h3>
                                <div class="order-date">
                                    ${new Date(order.created_at).toLocaleString("en-IN")}
                                </div>
                            </div>

                            <span class="order-status">
                                ${order.status}
                            </span>
                        </div>

                        <div class="order-items">
                            ${order.items.map(item => `
                                <div class="order-item">
                                    <span>
                                        ${item.product_name} × ${item.quantity}
                                    </span>
                                    <span>
                                        ₹${(Number(item.price) * item.quantity).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            `).join("")}
                        </div>

                        <div class="summary-line">
                            <span>Subtotal</span>
                            <span>₹${Number(order.subtotal).toLocaleString("en-IN")}</span>
                        </div>

                        <div class="summary-line">
                            <span>Shipping</span>
                            <span>₹${Number(order.shipping_fee).toLocaleString("en-IN")}</span>
                        </div>

                        <div class="order-footer">
                            <span>Total Amount</span>
                            <span class="order-total">
                                ₹${Number(order.total_amount).toLocaleString("en-IN")}
                            </span>
                        </div>

                        <div class="order-address">
                            <strong>Delivery Address:</strong><br>
                            ${order.shipping_address}
                        </div>

                    </div>
                `).join("")}
            </div>
        `;

    } catch (error) {
        console.error("Orders loading failed:", error);

        container.innerHTML = `
            <div class="empty-state">
                <span>⚠️</span>
                <h3>Unable to load orders</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}
function changeQty(id,delta){const item=cart.find(x=>x.id===Number(id));if(!item)return;const p=productById(id);item.qty=Math.min(p.stock,item.qty+delta);if(item.qty<=0)cart=cart.filter(x=>x.id!==Number(id));save(KEYS.cart,cart);updateCounts();renderCart()}
function openPreferences(){const host=$("preferenceOptions");host.innerHTML=CATEGORIES.map(c=>`<label class="preference-option ${preferences.includes(c.name)?"selected":""}"><input type="checkbox" value="${c.name}" ${preferences.includes(c.name)?"checked":""}> <span>${c.icon}</span>${c.name}</label>`).join("");$("preferencesModal").classList.add("open");$("preferencesModal").setAttribute("aria-hidden","false")}
function closePreferences(){$("preferencesModal").classList.remove("open");$("preferencesModal").setAttribute("aria-hidden","true")}

function runSearch(){searchTerm=$("searchInput").value.trim();activeCategory=$("searchCategory").value;location.hash="shop";showPage("shop")}
function init(){
  initCategories();renderHome();updateCounts();window.addEventListener("hashchange",navigate);$("searchForm").addEventListener("submit",e=>{e.preventDefault();runSearch()});document.querySelectorAll("[data-go-shop]").forEach(b=>b.addEventListener("click",()=>{activeCategory="all";location.hash="shop"}));$("categoryGrid").addEventListener("click",e=>{const b=e.target.closest("[data-category-tile]");if(b){activeCategory=b.dataset.categoryTile;location.hash="shop"}});$("categoryFilters").addEventListener("change",e=>{if(e.target.name==="category"){activeCategory=e.target.value;renderShop()}});$("sortSelect").addEventListener("change",renderShop);$("applyFilters").addEventListener("click",renderShop);$("clearFilters").addEventListener("click",clearFilters);$("emptyClear").addEventListener("click",clearFilters);$("activeFilters").addEventListener("click",e=>{if(e.target.hasAttribute("data-clear-category"))activeCategory="all";if(e.target.hasAttribute("data-clear-search")){searchTerm="";$("searchInput").value=""}renderShop()});$("preferencesOpen").addEventListener("click",openPreferences);$("heroPersonalize").addEventListener("click",openPreferences);$("editPreferences").addEventListener("click",openPreferences);$("closePreferences").addEventListener("click",closePreferences);$("skipPreferences").addEventListener("click",closePreferences);$("preferencesModal").addEventListener("click",e=>{if(e.target===$("preferencesModal"))closePreferences()});$("savePreferences").addEventListener("click",()=>{preferences=[...$("preferenceOptions").querySelectorAll("input:checked")].map(x=>x.value);save(KEYS.preferences,preferences);renderHome();closePreferences();toast("Your shopping interests are updated")});document.addEventListener("click", async e => {const add=e.target.closest("[data-add]");if(add){e.preventDefault();addToCart(add.dataset.add);return}const wish=e.target.closest("[data-wish]");if(wish){e.preventDefault();toggleWishlist(wish.dataset.wish);if(selectedProduct&&Number(wish.dataset.wish)===selectedProduct.id&&location.hash.startsWith("#product-"))wish.textContent=wishlist.includes(selectedProduct.id)?"♥ Saved":"♡ Wishlist";return}const detail=e.target.closest("[data-detail]");if(detail){openProduct(detail.dataset.detail);return}const qty=e.target.closest("[data-qty]");if(qty){changeQty(qty.dataset.qty,Number(qty.dataset.change));return}const remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));save(KEYS.cart,cart);updateCounts();renderCart();toast("Item removed from cart");return}if (e.target.closest("#checkoutBtn")) {

    if (!authUser) {
        toast("Please login before placing an order.", "error");
        return;
    }

    const shippingAddress = prompt("Enter your complete shipping address:");

    if (!shippingAddress || !shippingAddress.trim()) {
        toast("Shipping address is required.", "error");
        return;
    }

    const confirmed = confirm("Are you sure you want to place this order?");

    if (!confirmed) return;

    try {
    console.log("CHECKOUT USER:", authUser);
    console.log("CHECKOUT CART:", cart);

    // Sync the latest cart with Django before placing the order
    const synced = await syncCartWithDatabase();

    if (!synced) {
        throw new Error("Cart synchronization failed. Please try again.");
    }

    const result = await authRequest(
        "/api/orders/place/",
        "POST",
        {
            shipping_address: shippingAddress.trim()
        }
    );

        console.log("ORDER PLACED:", result);

        cart = [];
        save(KEYS.cart, cart);

        toast("Order placed successfully!");

        setTimeout(() => {
            window.location.reload();
        }, 1200);

        } catch (error) {
        console.error("Order placement failed:", error);
        toast(error.message || "Unable to place order.", "error");
    }
}
});

$("newsletterBtn").addEventListener("click", () => {
    const email = $("newsletterEmail").value.trim();

    if (!/^[^\s@]+\.[^\s@]+$/.test(email)) {
        toast("Please enter a valid email address", "error");
        return;
    }

    toast("Thanks for joining the ShopSphere list!");
    $("newsletterEmail").value = "";
});;navigate();if(!preferences.length)setTimeout(openPreferences,900)}
// ---------------- AUTHENTICATION ----------------

function openAuthModal(mode = "login") {
    authMode = mode;

    $("authModal").classList.add("open");
    $("authModal").setAttribute("aria-hidden", "false");

    updateAuthForm();
}

function closeAuthModal() {
    $("authModal").classList.remove("open");
    $("authModal").setAttribute("aria-hidden", "true");
}

function updateAuthForm() {
    const isRegister = authMode === "register";

    $("authTitle").textContent =
        isRegister ? "Create your account" : "Welcome back!";

    $("authDescription").textContent =
        isRegister
        ? "Join ShopSphere and discover your favourites."
        : "Login to continue shopping.";

    $("authSubmit").textContent =
        isRegister ? "Create account" : "Login";

    $("nameFields").hidden = !isRegister;
    $("emailField").hidden = !isRegister;

    $("authEmail").required = isRegister;

    $("authSwitchText").textContent =
        isRegister
        ? "Already have an account?"
        : "Don't have an account?";

    $("authSwitch").textContent =
        isRegister ? "Login" : "Register";

    $("authMessage").textContent = "";
    $("authForm").reset();
}

function updateAccountUI() {
    $("accountLabel").textContent =
        authUser ? "Logout" : "Login";
}
// Sync frontend cart with Django database
async function syncCartWithDatabase() {
    if (!authUser) return;

    try {
        const data = await authRequest(
            "/api/cart/sync/",
            "POST",
            { items: cart }
        );

        console.log("CART SYNCED WITH DATABASE:", data);
        return true;

    } catch (error) {
        console.error("Cart synchronization failed:", error);
        toast(error.message, "error");
        return false;
    }
}
// Check whether the customer is already logged in
async function checkCurrentUser() {
    try {
        const data = await authRequest("/api/me/");
        authUser = data.authenticated ? data.user : null;
        updateAccountUI();

if (authUser) {
    await syncCartWithDatabase();
}
    } catch (error) {
        console.error("Authentication check:", error);
    }
}

// Login or registration form submission
async function submitAuthForm(event) {
    event.preventDefault();

    const message = $("authMessage");
    const submitButton = $("authSubmit");

    message.textContent = "";
    submitButton.disabled = true;

    try {
        const username = $("authUsername").value.trim();
        const password = $("authPassword").value;

        if (authMode === "register") {

            const registrationData = {
                username: username,
                email: $("authEmail").value.trim(),
                password: password,
                first_name: $("firstName").value.trim(),
                last_name: $("lastName").value.trim()
            };

            await authRequest(
                "/api/register/",
                "POST",
                registrationData
            );

            // Automatically login after successful registration
        }

        const loginData = await authRequest(
            "/api/login/",
            "POST",
            {
                username: username,
                password: password
            }
        );

        authUser = loginData.user;

updateAccountUI();

await syncCartWithDatabase();

closeAuthModal();

        toast(
            authMode === "register"
            ? "Account created successfully!"
            : "Welcome back, " + authUser.username + "!"
        );

        // Refresh CSRF token after login
        await getCSRFToken();

    } catch (error) {
        message.textContent = error.message;
    } finally {
        submitButton.disabled = false;
    }
}

async function logoutUser() {
    try {
        const data = await authRequest(
            "/api/logout/",
            "POST"
        );

        authUser = null;
        updateAccountUI();
        closeAuthModal();

        toast(data.message || "Logged out successfully!");

    } catch (error) {
        console.error("Logout error:", error);
        toast(error.message, "error");
    }
}

// Attach authentication event listeners
document.addEventListener("DOMContentLoaded", () => {

    // Login or logout using the account button
    $("accountOpen").addEventListener("click", () => {
        if (authUser) {
            logoutUser();
        } else {
            openAuthModal("login");
        }
    });

    // Close authentication modal
    $("authClose").addEventListener("click", closeAuthModal);

    $("authModal").addEventListener("click", event => {
        if (event.target === $("authModal")) {
            closeAuthModal();
        }
    });

    // Switch between login and registration
    $("authSwitch").addEventListener("click", () => {
        openAuthModal(
            authMode === "login" ? "register" : "login"
        );
    });

    // Submit login or registration
    $("authForm").addEventListener("submit", submitAuthForm);

    // Logout button inside the modal
    

    // Check existing login session
    checkCurrentUser();
});
function clearFilters(){activeCategory="all";searchTerm="";$("searchInput").value="";$("searchCategory").value="all";$("minPrice").value="";$("maxPrice").value="";renderShop()}
document.addEventListener("DOMContentLoaded",init);
