document.addEventListener('DOMContentLoaded', function() {
    var userName = localStorage.getItem('user_login');
    if (userName) {
        document.getElementById('user-greeting').textContent = 'Olá, ' + userName;
    }
});

let products = JSON.parse(localStorage.getItem('products')) || [];

function showAddProductForm() {
    hideForms();
    document.getElementById('add-product-form').style.display = 'block';
}

function showEditProductForm(id, name, category, price, stock, imageUrl) {
    hideForms();
    document.getElementById('edit-product-id').value = id;
    document.getElementById('edit-product-name').value = name;
    document.getElementById('edit-product-category').value = category;
    document.getElementById('edit-product-price').value = price;
    document.getElementById('edit-product-stock').value = stock;
    document.getElementById('edit-product-image').value = imageUrl;
    document.getElementById('edit-product-form').style.display = 'block';
}

function hideForms() {
    document.getElementById('add-product-form').style.display = 'none';
    document.getElementById('edit-product-form').style.display = 'none';
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('add-product-name').value;
    const category = document.getElementById('add-product-category').value;
    const price = document.getElementById('add-product-price').value;
    const stock = document.getElementById('add-product-stock').value;
    const imageUrl = document.getElementById('add-product-image').value;

    const newProduct = {
        id: products.length + 1,
        name: name,
        category: category,
        price: price,
        stock: stock,
        imageUrl: imageUrl
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    hideForms();
}

function updateProduct(event) {
    event.preventDefault();
    const id = document.getElementById('edit-product-id').value;
    const name = document.getElementById('edit-product-name').value;
    const category = document.getElementById('edit-product-category').value;
    const price = document.getElementById('edit-product-price').value;
    const stock = document.getElementById('edit-product-stock').value;
    const imageUrl = document.getElementById('edit-product-image').value;

    const productIndex = products.findIndex(product => product.id == id);
    if (productIndex !== -1) {
        products[productIndex].name = name;
        products[productIndex].category = category;
        products[productIndex].price = price;
        products[productIndex].stock = stock;
        products[productIndex].imageUrl = imageUrl;
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        hideForms();
    }
}

function deleteProduct(id) {
    products = products.filter(product => product.id != id);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>R$ ${product.price},00</td>
            <td>${product.stock}</td>
            <td>${product.name}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="showEditProductForm(${product.id}, '${product.name}', '${product.category}', ${product.price}, ${product.stock}, '${product.imageUrl}')"><img src="assets/icons/edit.svg" alt="Editar" style="width: 20px;"></button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})"><img src="assets/icons/delete.svg" alt="Excluir" style="width: 20px;"></button>
            </td>
        `;
        productList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);