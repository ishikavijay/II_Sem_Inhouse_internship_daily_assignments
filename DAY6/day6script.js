// ============================
// NeoShop - Product API Script
// ============================

const productContainer = document.getElementById("productContainer");
const loader = document.getElementById("loader");
const errorBox = document.getElementById("error");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const topBtn = document.getElementById("topBtn");

let allProducts = [];

// Fetch Products
async function loadProducts() {

    loader.style.display = "block";
    errorBox.classList.add("d-none");

    try {

        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();

        allProducts = data.products;

        displayProducts(allProducts);

        loadCategories(allProducts);

        loader.style.display = "none";

    }

    catch (error) {

        loader.style.display = "none";

        errorBox.classList.remove("d-none");

        console.log(error);

    }

}

// Display Cards

function displayProducts(products) {

    productContainer.innerHTML = "";

    if (products.length === 0) {

        productContainer.innerHTML = `
        <div class="col-12 text-center">
            <h3>No Products Found</h3>
        </div>
        `;

        return;
    }

    products.forEach(product => {

        productContainer.innerHTML += `

<div class="col-lg-4 col-md-6">

<div class="product-card position-relative">

<div class="wishlist">
❤
</div>

<img src="${product.thumbnail}" class="img-fluid">

<div class="product-content">

<h4 class="product-title">
${product.title}
</h4>

<p>
${product.description.substring(0,80)}...
</p>

<div class="d-flex justify-content-between align-items-center">

<span class="price">
$${product.price}
</span>

<span class="rating">
⭐ ${product.rating}
</span>

</div>

<div class="discount">

${product.discountPercentage.toFixed(0)}% OFF

</div>

<button class="btn-cart">

🛒 Add To Cart

</button>

</div>

</div>

</div>

`;

    });

    // Wishlist Toggle

    document.querySelectorAll(".wishlist").forEach(btn => {

        btn.addEventListener("click", function () {

            if (this.innerHTML == "❤") {

                this.innerHTML = "💖";

            }

            else {

                this.innerHTML = "❤";

            }

        });

    });

}

// Categories

function loadCategories(products) {

    const categories = [...new Set(products.map(item => item.category))];

    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

    categories.forEach(cat => {

        categoryFilter.innerHTML += `

<option value="${cat}">
${cat}
</option>

`;

    });

}

// Search

searchInput.addEventListener("keyup", filterProducts);

// Category Filter

categoryFilter.addEventListener("change", filterProducts);

function filterProducts() {

    const text = searchInput.value.toLowerCase();

    const category = categoryFilter.value;

    const filtered = allProducts.filter(product => {

        const matchesText =
            product.title.toLowerCase().includes(text);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesText && matchesCategory;

    });

    displayProducts(filtered);

}

// Scroll Button

window.onscroll = function () {

    if (document.documentElement.scrollTop > 300) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

};

topBtn.onclick = function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

// Initialize

loadProducts();