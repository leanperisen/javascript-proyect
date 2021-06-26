const iva = x => x * 0.21; //Calcula directamente el IVA de un producto
const carrito = [];
class Producto {

    constructor(id, nombre, categoria, precio) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
    }

    getID() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    getCategoria() {
        return this.categoria
    }
    getPrecio() {
        return this.precio;
    }

    setID(id) {
        this.id = id;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setCategoria(categoria) {
        this.categoria = categoria;
    }
    setPrecio(precio) {
        this.precio = precio;
    }
}

//Función que calcula el precio del producto con el IVA incluído

function calcularPrecioIva(monto) {
    return monto + iva(monto);
}

//Función para agregar un producto al carrito.

function agregarProducto(producto) {
    carrito.push(producto);
}

//Función para eliminar un producto del carrito cuyo ID se recibe como parámetro

function quitarProducto(id) {
    carrito.splice(carrito.find(elem => elem.getID() === id),1);
}

//Función para eliminar todos los productos del carrito

function vaciarCarrito() {
    carrito.splice(0,carrito.length);
}

/* function imprimirCarrito() {
    let informe = "";
    for (const producto of carrito) {
        informe += " " + producto.getNombre();
    }
    alert("El listado de sus productos es:" + informe);
} */

//Función que calcula el total acumulado en todo el carrito

function calcularTotalCarrito() {
    let total = 0;
    for(let i=0 ; i < carrito.length ; i++) {
        total += calcularPrecioIva(carrito[i].getPrecio()); 
    }
    return total;
}

function ingresarProducto() {
    let producto = new Producto();
    producto.setID(parseInt(prompt("Ingrese el ID del producto")));
    producto.setNombre(prompt("Ingrese el nombre del producto"));
    producto.setCategoria(prompt("Ingrese la categoría del producto"));
    producto.setPrecio(parseFloat(prompt("Ingrese el precio del producto")));
    agregarProducto(producto);
}

for (let i=0; i < 5; i++) {
    ingresarProducto();
}

let prodContainer = document.querySelector("#productos");

let html = "";

carrito.forEach (producto => {
    html += `
    <article id="${producto.getID()}">
        <h3>${producto.getCategoria()}</h3>
        <p>${producto.getNombre()}</p>
        <p>${producto.getPrecio()}</p>
    </article>`;
})

prodContainer.innerHTML = html;

let idBorrado = parseInt(prompt("Ingrese el ID del producto a eliminar"));

let articulo = document.getElementById(idBorrado);

articulo.parentNode.removeChild(articulo);