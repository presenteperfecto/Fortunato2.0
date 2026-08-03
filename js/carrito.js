/*==================================================
                    CARRITO.JS
        Gestión del carrito de compras
==================================================*/


const Carrito = {

    items: []

};


/*==================================================
            AGREGAR PRODUCTO
==================================================*/

function agregarAlCarrito(producto){

    Carrito.items.push(producto);

    App.carrito = Carrito.items;

    actualizarContadorCarrito();

    actualizarVistaCarrito();

    actualizarTotalCarrito();

}




/*==================================================
            ELIMINAR PRODUCTO
==================================================*/

function eliminarDelCarrito(indice){

    if(indice < 0 || indice >= Carrito.items.length){

        return;

    }

    Carrito.items.splice(indice,1);

    App.carrito = Carrito.items;

    actualizarContadorCarrito();

    actualizarVistaCarrito();

    actualizarTotalCarrito();

}




/*==================================================
            VACIAR CARRITO
==================================================*/

function vaciarCarrito(){

    Carrito.items = [];

    App.carrito = [];

    actualizarContadorCarrito();

    actualizarVistaCarrito();

    actualizarTotalCarrito();

}




/*==================================================
            CANTIDAD ITEMS
==================================================*/

function cantidadItems(){

    return Carrito.items.length;

}




/*==================================================
            TOTAL CARRITO
==================================================*/

function calcularTotalCarrito(){

    let total = 0;

    Carrito.items.forEach(item=>{

        total += Number(item.precio);

    });

    return total;

}




/*==================================================
        ACTUALIZAR TOTAL
==================================================*/

function actualizarTotalCarrito(){

    const total = document.getElementById("carrito-total");

    if(!total) return;

    total.textContent =

        "$ " +

        calcularTotalCarrito().toLocaleString("es-AR");

}




/*==================================================
        ACTUALIZAR CONTADOR
==================================================*/

function actualizarContadorCarrito(){

    const contador = document.getElementById("cart-count");

    if(!contador) return;

    contador.textContent = cantidadItems();

}




/*==================================================
            ACTUALIZAR VISTA
==================================================*/

function actualizarVistaCarrito(){

    const lista = document.getElementById("carrito-lista");

    if(!lista) return;

    lista.innerHTML = "";

    Carrito.items.forEach((item,indice)=>{

        const card = document.createElement("div");

        card.className = "carrito-item";

        card.innerHTML = `

            <div class="carrito-info">

                <h3>${item.nombre}</h3>

                <p>

                    ${item.sabores.map(

                        sabor=>sabor.nombre

                    ).join(", ")}

                </p>

            </div>

            <div class="carrito-precio">

                $${Number(item.precio).toLocaleString("es-AR")}

            </div>

            <button

                class="btn-eliminar"

                onclick="eliminarDelCarrito(${indice})">

                ✕

            </button>

        `;

        lista.appendChild(card);

    });

}




/*==================================================
        OBTENER CARRITO
==================================================*/

function obtenerCarrito(){

    return Carrito.items;

}




/*==================================================
            EXPORTAR
==================================================*/

window.Carrito = Carrito;

window.agregarAlCarrito = agregarAlCarrito;

window.eliminarDelCarrito = eliminarDelCarrito;

window.vaciarCarrito = vaciarCarrito;

window.calcularTotalCarrito = calcularTotalCarrito;

window.actualizarTotalCarrito = actualizarTotalCarrito;

window.actualizarContadorCarrito = actualizarContadorCarrito;

window.actualizarVistaCarrito = actualizarVistaCarrito;

window.obtenerCarrito = obtenerCarrito;