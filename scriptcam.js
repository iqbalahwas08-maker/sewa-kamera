const products = [
  {id:1, name:"Canon EOS R5", price:500000, img:"https://images.unsplash.com/photo-1519183071298-a2962be90b8e"},
  {id:2, name:"Sony A7 III", price:400000, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"},
  {id:3, name:"Nikon Z6 II", price:350000, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"},
  {id:4, name:"Fujifilm X-T4", price:300000, img:"https://images.unsplash.com/photo-1595433707802-6c247ed0b9cf"},
  {id:5, name:"DJI Drone Mini", price:250000, img:"https://images.unsplash.com/photo-1555617980-7cc5e03ad29a"},
  {id:6, name:"GoPro Hero 10", price:200000, img:"https://images.unsplash.com/photo-1508898578281-774ac4893d49"},
  {id:7, name:"Canon 70-200mm Lens", price:150000, img:"https://images.unsplash.com/photo-1586771107449-775f87d4c8b0"},
  {id:8, name:"Tripod Manfrotto", price:80000, img:"https://images.unsplash.com/photo-1557324232-b8917d3c3dcb"},
  {id:9, name:"Lighting Kit", price:120000, img:"https://images.unsplash.com/photo-1555617980-7cc5e03ad29a"},
  {id:10,name:"Stabilizer Gimbal", price:100000, img:"https://images.unsplash.com/photo-1508898578281-774ac4893d49"}
];

let currentPage = 1;
const perPage = 6;
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProducts() {
  const start = (currentPage-1)*perPage;
  const end = start+perPage;
  const list = products.slice(start,end);
  document.getElementById('productGrid').innerHTML = list.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Rp ${p.price.toLocaleString()}</p>
      <button onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
    </div>
  `).join('');
  document.getElementById('pageInfo').innerText = `Halaman ${currentPage}/${Math.ceil(products.length/perPage)}`;
}

function addToCart(id){
  const item = products.find(p=>p.id===id);
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty++;
  else cart.push({...item, qty:1});
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cartCount').innerText = cart.length;
}

document.getElementById('nextBtn').onclick=()=>{
  if(currentPage<Math.ceil(products.length/perPage)){currentPage++;renderProducts();}
}
document.getElementById('prevBtn').onclick=()=>{
  if(currentPage>1){currentPage--;renderProducts();}
}

// Modal keranjang
const modal = document.getElementById("cartModal");
document.getElementById("cartBtn").onclick=()=>{
  const list = cart.map(c=>`<li>${c.name} x ${c.qty}</li>`).join('');
  document.getElementById('cartItems').innerHTML=list;
  modal.style.display="block";
}
document.querySelector(".close").onclick=()=>modal.style.display="none";

renderProducts();
document.getElementById('cartCount').innerText = cart.length;
