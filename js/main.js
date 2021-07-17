const products = [
    {
        id: "1",
        name: "La metamorfosis",
        author: "Franz Kafka",
        price: 1300,
        stock: 10
    },
    {
        id: "2",
        name: "Crónica de una muerte anunciada",
        author: "Gabriel García Márquez",
        price: 1800,
        stock: 0
    },
    {
        id: "3",
        name: "El señor de los Anillos: La Comunidad del Anillo",
        author: "J.R.R Tolkien",
        price: 2300,
        stock: 20
    },
    {
        id: "4",
        name: "El Arnoldo: podcast",
        author: "El arnoldo",
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
];
const cart = [];

const iva = x => x * 0.21; //Calcula directamente el IVA de un producto

//Función que calcula el precio del producto con el IVA incluído

function calculatePriceIva(mount) {
    return mount + iva(mount);
}

//Función para eliminar un producto del carrito cuyo ID se recibe como parámetro

function deleteProduct(id) {
    cart.splice(cart.find(elem => elem.id() === id),1);
}

//Función para eliminar todos los productos del carrito

function emptyCart() {
    cart.splice(0,cart.length);
    let cartContainer = document.querySelector(".modal-body");
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

function informTotal() {
    swal("Your total price is U$D" + calculateTotalCart());
}

// Función para renderizar los productos al sumarse al carrito

function renderCart(product) {
    let sectionCart = document.querySelector(".modal-body");
    let article = document.createElement("article");
    article.innerHTML = `
    <article class="m-2 cart-card" id=${product.id}>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p class="card-text">Price: U$D${product.price}</p>
            </div>
        </div>
    </article>`;
    sectionCart.appendChild(article);
}

// Función que suma el producto al carrito (evaluando si hay stock e informando el resultado de la operación) y renderiza el mismo en el HTML

function addToCart (event) {
    let idToFind = event.target.id;
    let productFound = products.find(product => product.id === idToFind);
    if (productFound.stock > 0) {
        cart.push(productFound);
        renderCart(productFound);
        swal("Your product has been added to the cart!", "", "success",);
    }
    else {
        swal("The product is not available", "", "error",);
    }
    
}

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
        swal("Please complete your name, last name, email, message and accept T&C","", "error");
        valid = false;
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
                swal("Your message has been sent!", "", "success")
                console.log(result)
            },
            error: function (jqXHR) {
                swal("Something went wrong, please try again in a few minutes", "", "error")
                console.log(jqXHR);
            }
        })
    }
}

function resizeCart () {
    $(".cart-icon").css({"font-size":"2.2rem"});
}

//Variables y constantes

const btnAddToCart = document.querySelectorAll(".btn-buy");
const btnBuyAll = document.querySelector(".btn-buyall");
const btnEmptyCart = document.querySelector(".btn-emptycart");
const contactForm = $(".contact-form");

//Listeners

btnAddToCart.forEach(btn => btn.addEventListener('click', addToCart));
btnEmptyCart.addEventListener('click', emptyCart);
btnBuyAll.addEventListener('click', informTotal);
contactForm.submit(validateForm);
