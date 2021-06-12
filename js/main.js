const iva = x => x * 0.21; //Calcula directamente el IVA de un producto
const carrito = []; //Arreglo que contiene los productos que se van sumando al carrito. Más adelante se tratará de un arreglo de objetos, donde cada uno tendrá un ID para facilitar supresión de productos

//Función para agregar un producto al carrito.
function agregarProducto(monto) {
    carrito.push(monto);
}

//Función que calcula el precio del producto con el IVA incluído

function calcularPrecioIva(producto) {
    return producto + iva(producto);
}

//Función que calcula el total acumulado en todo el carrito

function calcularTotalCarrito() {
    let total = 0;
    for(let i=0 ; i < carrito.length ; i++) {
        total += calcularPrecioIva(carrito[i]); 
    }
    return total;
}

let precioUno = parseFloat(prompt("Ingrese un precio a agregar al carrito"));
agregarProducto(precioUno);
let precioDos = parseFloat(prompt("Agregue un segundo precio al carrito"));
agregarProducto(precioDos);
alert("El total de su compra es " + calcularTotalCarrito());