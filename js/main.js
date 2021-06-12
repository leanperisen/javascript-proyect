const iva = x => x * 0.21; //Calcula directamente el IVA de un producto
const carrito = [];
class Producto {

    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    getID() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
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
    setPrecio(precio) {
        this.precio = precio;
    }
}

//Función para agregar un producto al carrito.

function agregarProducto(producto) {
    carrito.push(producto);
}

//Función que calcula el precio del producto con el IVA incluído

function calcularPrecioIva(monto) {
    return monto + iva(monto);
}

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
    producto.setPrecio(parseFloat(prompt("Ingrese el precio del producto")));
    agregarProducto(producto);
}

// Ejecución del programa

for (let i=0; i < 5 ; i++) {
    ingresarProducto();
}

alert("El precio total de tu carrito es " + calcularTotalCarrito());