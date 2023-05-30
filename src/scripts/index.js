import '../styles/index.scss';

let currentPage = 1; // Current page of products
const limitPerPage = 6; // Number of products to load per page

// Constants
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.querySelector('.modal .close');

const cartItemsList = document.getElementById('cartItems');
const removeButton = document.getElementById('remove--btn');

const productsContainer = document.getElementById('productsContainer');
const addMoreProductsButton = document.getElementById('addMoreProducts');

addMoreProductsButton.classList.add("add__more--btn")

//Get items from local storage
const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];


//Fetch Products
function loadProducts(page = 1, limit = limitPerPage) {
  fetch(`http://localhost:5001/products?_page=${page}&_limit=${limit}`)
    .then(response => response.json())
    .then(products => {
      products.forEach((product) => renderProduct(product));
      // Increment the current page
      currentPage++;
    })
    .catch(error => console.error('Error loading products:', error));
}


// Render Functions
function renderProduct(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('product');

  const productContainer = document.createElement('div');
  productContainer.classList.add("product--container")

  const imageContainer = document.createElement('div');
  const imageElement = document.createElement('img');
  imageContainer.appendChild(imageElement)
  imageElement.src = product.images[0];
  productContainer.appendChild(imageContainer);
  //Simple container to hold up images with different aspect ratios
  imageContainer.classList.add("image__container")

  productContainer.appendChild(imageContainer);


  const infoText = document.createElement('div');
  infoText.classList.add("product--text")
  productContainer.appendChild(infoText)

  productElement.appendChild(productContainer);




  const titleElement = document.createElement('h6');
  titleElement.textContent = product.title;
  infoText.appendChild(titleElement);

  const priceElement = document.createElement('p');
  priceElement.textContent = `$${product.price}`;
  infoText.appendChild(priceElement);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add to Cart';
  addButton.classList.add("add__cart--btn")
  addButton.addEventListener('click', () => addToCart(product));
  productElement.appendChild(addButton);

  productsContainer.appendChild(productElement);
}

function renderCartItem(item) {
  const cartItem = document.createElement('li')
  cartItem.classList.add("cart__item")
  cartItem.id = item.id

  cartItem.innerHTML = `
      <div>
          <img class="card__item--img" src="${item.images[0]}"/>
          <div>
                <h6 class="card__item--title">${item.title}</h6>
                <p class="card__item--price">$${item.price}</p>
                <span>Qty: <p id="quantity-${item.id}" class="card__item--quantity">${item.quantity}</p></span>
         </div>
      </div>
      <button id="remove--btn" class="remove--btn" data-product-id="${item.id}">Remove</button>
      `;


  cartItems.appendChild(cartItem);

}




//Save Items in LocalStorage
function saveCartItems() {
  localStorage.setItem('savedItems', JSON.stringify(savedItems));
}

function addToCart(product) {

  const existingItem = savedItems.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const cartItem = { ...product, quantity: 1 };
    savedItems.push(cartItem);
  }

  saveCartItems();
}


//Actions
function openModal() {
  //Render saved items in cart as cartItems
  savedItems.map((item) => renderCartItem(item))

  modal.style.display = 'block';
}


function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function closeModal() {
  //Cleanup children nodes from cart to prevent duplications as modal closes
  removeAllChildren(cartItemsList)
  modal.style.display = 'none';
}

function loadMoreProducts() {
  loadProducts(currentPage, limitPerPage);
}


function removeItemById(arr, idNumber) {
  const index = arr.findIndex(item => item.id === idNumber);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}


// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});


cartItemsList.addEventListener('click', (event) => {
  const productId = Number(event.target.dataset.productId);
  document.getElementById(productId).remove()
  removeItemById(savedItems, productId);
  localStorage.removeItem(String(productId))
});


//Modal events
openModalButton.addEventListener('click', () => {
  openModal();
});

closeModalButton.addEventListener('click', () => {
  closeModal();
});

//Load more products button
addMoreProductsButton.addEventListener('click', () => {
  loadMoreProducts();
});

// Close the modal if clicked outside the content area
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Close the modal when the Escape key is pressed
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

