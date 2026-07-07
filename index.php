<?php
$url = "https://dummyjson.com/products";
$response = file_get_contents($url);
$data = json_decode($response, true);
$products = $data['products'];

$exchangeRate = 86; // 1 USD = ₹86
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Product Store</title>

<style>
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
background:#0f172a;
padding:30px;
}

h1{
text-align:center;
color:#00e5ff;
margin-bottom:30px;
}

.container{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
gap:20px;
}

.card{
background:#1e293b;
border-radius:15px;
overflow:hidden;
box-shadow:0 5px 15px rgba(0,0,0,.3);
transition:0.3s;
}

.card:hover{
transform:translateY(-8px);
}

.card img{
width:100%;
height:220px;
object-fit:cover;
}

.content{
padding:20px;
}

h2{
color:#38bdf8;
margin-bottom:10px;
}

.price{
font-size:22px;
font-weight:bold;
color:#22c55e;
margin:10px 0;
}

.category{
display:inline-block;
background:#06b6d4;
padding:5px 10px;
border-radius:20px;
margin-bottom:10px;
font-size:14px;
color:white;
}

.desc{
color:#ddd;
line-height:1.5;
}

.rating{
margin-top:12px;
color:gold;
font-weight:bold;
}
</style>

</head>
<body>

<h1>🛍 Product Store (PHP API)</h1>

<div class="container">

<?php foreach($products as $product){ 
$priceINR = round($product['price'] * $exchangeRate);
?>

<div class="card">

<img src="<?php echo $product['thumbnail']; ?>" alt="Product">

<div class="content">

<span class="category">
<?php echo strtoupper($product['category']); ?>
</span>

<h2><?php echo htmlspecialchars($product['title']); ?></h2>

<div class="price">
₹<?php echo number_format($priceINR); ?>
</div>

<p class="desc">
<?php echo htmlspecialchars($product['description']); ?>
</p>

<div class="rating">
⭐ <?php echo $product['rating']; ?>/5
</div>

</div>

</div>

<?php } ?>

</div>

</body>
</html>