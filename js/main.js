let products = JSON.parse(localStorage.getItem('products')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function () {
    updateCartDropdown(); // Atualizar o carrinho ao carregar a página
    loadProducts(); // Carregar produtos ao carregar a página
});

function loadProducts() {
    const productContainer = document.getElementById('market-product-list');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4';
        productDiv.innerHTML = `
            <div class="card mb-4">
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.category}</p>
                    <h4 class="card-text">R$ ${product.price},00</h4>
                    <br>
                    <a href="#" class="btn btn-dark" onclick="addToCart(${product.id})"><img src="assets/icons/add-shopping-cart.svg" alt="Carrinho" class="img-fluid" style="width: 20px;"></a>
                </div>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDropdown();
    }
}

function updateCartDropdown() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.innerHTML = ''; // Limpar a lista atual
    cart.forEach((item, index) => {
        cartDropdown.innerHTML += `
            <div class="cart-item d-flex justify-content-between align-items-center">
                <span>${item.name}</span>
                <span>R$${item.price},00</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})"><img         src="assets/icons/delete.svg" alt="Excluir" style="width: 20px;"></button>
            </div>`;
    });
}

function removeFromCart(index) {
    event.stopPropagation();
    cart.splice(index, 1); // Remove o item pelo índice
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDropdown();
}
