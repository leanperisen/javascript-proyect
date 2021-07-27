//------------ Variables y selectores ------------ //


const products = [
    {
        id: "1",
        name: "The metamorphosis",
        author: "Franz Kafka",
        price: 1300,
        stock: 10
    },
    {
        id: "2",
        name: "Pride and Prejudice",
        author: "Jane Austen",
        price: 1800,
        stock: 0
    },
    {
        id: "3",
        name: "Moby-Dick",
        author: "Herman Melville",
        price: 2300,
        stock: 20
    },
    {
        id: "4",
        name: "River God",
        author: "Wilbur Smith",
        price: 1000,
        stock: 3
    },
    {
        id: "5",
        name: "Siddhartha",
        author: "Herman Hesse",
        price: 1200,
        stock: 15
    },
    {
        id: "6",
        name: "It",
        author: "Stephen King",
        price: 1800,
        stock: 22
    },
]; // Arreglo con los productos disponibles

const cart = []; //Carrito de compras

const iva = x => x * 0.21; //Calcula directamente el IVA de un producto

const saveLocal = (key, value) => { localStorage.setItem(key, value) }; //Función para añadir en Localstorage

const btnBuyAll = document.querySelector(".btn-buyall"); //Botón final de compra

const btnEmptyCart = document.querySelector(".btn-emptycart"); //Botón para vaciar el carrito

const contactForm = $(".contact-form"); //Formulario de contacto seleccionado con jQuery


//------------ Listeners ------------ //


btnEmptyCart.addEventListener('click', emptyCart); //Evento para botón de vaciar el carrito

btnBuyAll.addEventListener('click', informTotal); //Evento para informar el costo total y vaciar carrito

contactForm.submit(validateForm); //Evento para validar formulario y enviar datos mediante AJAX


// ------------ Funciones ------------ //


//Función que calcula el precio del producto con el IVA incluído

function calculatePriceIva(mount) {
    return mount + iva(mount);
}

//Función para eliminar todos los productos del carrito

function emptyCart() {
    cart.splice(0,cart.length);
    localStorage.clear();
    let cartContainer = document.querySelector(".container-prods");
    cartContainer.innerHTML = "";
}

//Función para calcular el total del precio sumado en el carrito

function calculateTotalCart() {
    let total = 0;
    for(let i=0 ; i < cart.length ; i++) {
        total += calculatePriceIva(cart[i].price); 
    }
    return total;
}

//Función para informar el total de la compra y vaciar el carrito

function informTotal() {
    swal("The total price is U$D " + calculateTotalCart());
    emptyCart();
}

// Función para renderizar un producto que se suma al carrito

function renderCart(product) {
    let sectionCart = document.querySelector(".container-prods");
    let row = document.createElement("div");
    row.setAttribute("class", "row mt-2 d-flex justify-content-around align-items-center");
    row.setAttribute("id", product.id);
    row.innerHTML = `
    <div class="col-12 d-flex align-items-center">
        <p class="mb-0">${product.name} - U$D${product.price}</p>
    </div>`;
    sectionCart.appendChild(row);
}

// Función que suma el producto al carrito (evaluando si hay stock e informando el resultado de la operación)

function addToCart (event) {
    let idToFind = event.target.id;
    let productFound = products.find(product => product.id === idToFind);
    if (productFound.stock > 0) {
        cart.push(productFound);
        renderCart(productFound);
        saveLocal("productsCart", JSON.stringify(cart));
        swal("The product has been added to the cart!", "", "success",);
    }
    else {
        swal("The product is not available", "", "error",);
    }
}

//Función para validar el formulario chequeando los campos ingresados. Envía por AJAX la información y retorna si la comunicación fue exitosa

function validateForm (event) {
    event.preventDefault();
    let children = $(contactForm.children());
    let name = children[0].firstElementChild.value;
    let lastName = children[1].firstElementChild.value;
    let email = children[2].firstElementChild.value;
    let message = children[7].firstElementChild.value;
    let termsCond = children[8].firstElementChild.checked;
    let valid = true;
    if ((name === null || name === "") || (lastName === null || lastName === "") || (email === null || email === "") || (message === null || message === "") || (!termsCond)) {
        valid = false;
        swal("Please complete your name, last name, email, message and accept T&C","", "error");
    }
    if (valid) {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'POST',
            body: JSON.stringify({
                formName: name,
                formLastname: lastName,
                formMssg: message,
            }),
            success: function (result) {
                swal("Your message has been sent!", "", "success");
                console.log(result);
            },
            error: function (jqXHR) {
                swal("Something went wrong, please try again in a few minutes", "", "error");
                console.log(jqXHR);
            }
        })
    }
}

//Función para renderizar los productos guardados en el arreglo de productos al ingresar a la página

function renderContent() {
    let container = document.querySelector(".products-container");
    products.forEach(product => {
        let item = document.createElement("article");
        item.setAttribute("class", "m-3");
        item.setAttribute("id", product.id);
        item.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="https://picsum.photos/300" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h6>${product.author}</h6>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut neque diam, vulputate eget hendrerit vel, ultrices ac libero.</p>
                <button href="#" id="${product.id}" class="btn btn-primary btn-buy">Add to cart</button>
            </div>
        </div>
        `;
    container.appendChild(item);
    })
}

//Función para renderizar en el carrito los productos guardados en Localstorage (si los hubiese) al ingresar a la página

function getFromStorage () {
    let savedProducts = JSON.parse(localStorage.getItem("productsCart"));
    if (savedProducts != null) {
        let sectionCart = document.querySelector(".container-prods");
        savedProducts.forEach (product => {
            let row = document.createElement("div");
            row.setAttribute("class", "row mt-2 d-flex justify-content-around align-items-center");
            row.setAttribute("id", product.id);
            row.innerHTML = `
            <div class="col-12 d-flex align-items-center">
                <p class="mb-0">${product.name} - U$D${product.price}</p>
            </div>`;
            sectionCart.appendChild(row);
        })
    }
}

window.onload = () => {

    renderContent();

    getFromStorage();

    const btnAddToCart = document.querySelectorAll(".btn-buy"); //Botones para añadir al carrito
    btnAddToCart.forEach(btn => btn.addEventListener('click', addToCart)); //Evento para todos los botones de añadir al carrito
}