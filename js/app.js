/*==================================================
                    APP.JS
==================================================*/


const App={


    tipoEntrega:null,
    sucursal:null,


    cliente:{
        nombre:"",
        telefono:"",
        direccion:"",
        entreCalles:"",
        indicaciones:""
    },


    productoActual:null,

    carrito:[]
};




document.addEventListener(

"DOMContentLoaded",

()=>{
    iniciarEventos();
});






function iniciarEventos(){

const realizarPedido = document.getElementById("btn-realizar-pedido");

if(realizarPedido){
    realizarPedido.addEventListener("click", mostrarEntrega);
}



const delivery=

document.getElementById("btn-delivery");



const retiro=

document.getElementById("btn-retiro");




if(delivery){


delivery.onclick=()=>{



    App.tipoEntrega="DELIVERY";
    App.costoEnvio = 2000;
    App.sucursal = obtenerSucursales().find(sucursal => sucursal.principal) || null;

    mostrarMensaje("Delivery: Martes a Domingos de 20:00 hs a 00:00 hs. Feriados, consultar disponibilidad de servicio.", 2000, true, "center");

    obtenerUbicacionCliente();



};



}



if(retiro){


retiro.onclick=()=>{


    App.tipoEntrega="RETIRO";
    App.costoEnvio = 0;


    cargarSucursales();


    cambiarPantalla("sucursales");


};


}
const logo = document.querySelector(".logo");

if(logo){

logo.addEventListener("click", irAlInicio);
logo.setAttribute("role", "button");
logo.setAttribute("tabindex", "0");
logo.setAttribute("aria-label", "Volver al menú principal");

logo.addEventListener("keydown", evento=>{
    if(evento.key === "Enter" || evento.key === " "){
        evento.preventDefault();
        irAlInicio();
    }
});

}

const carritoFlotante = document.getElementById("cart-floating");

if(carritoFlotante){
carritoFlotante.onclick = mostrarCarrito;
carritoFlotante.setAttribute("role", "button");
carritoFlotante.setAttribute("tabindex", "0");
}



}





/*==================================================
            SELECCION SUCURSAL
==================================================*/


function cargarSucursales(){


const contenedor=

document.getElementById(

"lista-sucursales"

);



if(!contenedor)return;



contenedor.innerHTML="";



obtenerSucursales()

.forEach(sucursal=>{


const boton=document.createElement("button");



boton.className="btn-opcion";



boton.innerHTML = `
    <strong>${sucursal.nombre}</strong>
    <span class="direccion-sucursal">${sucursal.direccion}</span>
`;



boton.onclick=()=>{


App.sucursal=sucursal;


irProductos();


};



contenedor.appendChild(boton);

});


}





/*==================================================
            PRODUCTO
==================================================*/

function seleccionarProducto(id){


App.productoActual=

obtenerProducto(id);

const cantidad = document.getElementById(`cantidad-${id}`);

App.cantidadProductoActual = Math.max(1, Number(cantidad?.value) || 1);

document.querySelectorAll(".check-sabor").forEach(check=>check.checked=false);



    cargarSabores();

    cambiarPantalla("sabores");


}





/*==================================================
            CARRITO
==================================================*/


function agregarProducto(producto){


App.carrito.push(producto);



actualizarVistaCarrito();



}

function mostrarCarrito(){

actualizarVistaCarrito();

cambiarPantalla("carrito");

}

function actualizarOpcionesPago(){

const selector = document.getElementById("metodo-pago");
const campoIndicaciones = document.getElementById("campo-indicaciones");

if(!selector) return;

const opciones = App.tipoEntrega === "RETIRO"
    ? ["Transferencia"]
    : ["Efectivo", "Transferencia", "QR"];

selector.innerHTML = opciones.map(opcion => `<option value="${opcion}">${opcion}</option>`).join("");
selector.onchange = actualizarCampoEfectivo;

if(campoIndicaciones){
    campoIndicaciones.style.display = App.tipoEntrega === "DELIVERY" ? "block" : "none";
}

actualizarCampoEfectivo();

}

function actualizarCampoEfectivo(){

const selector = document.getElementById("metodo-pago");
const campoEfectivo = document.getElementById("campo-efectivo");

if(!selector || !campoEfectivo) return;

campoEfectivo.style.display = App.tipoEntrega === "DELIVERY" && selector.value === "Efectivo"
    ? "block"
    : "none";

}

function mostrarEntrega(){

    const opciones = document.getElementById("delivery-options");

    if(!opciones) return;

    opciones.classList.remove("mostrar");
    mostrarMensaje("Abierto de 12:00 hs a 23:59 hs.", 2000, true, "center");

    setTimeout(() => {
        opciones.classList.add("mostrar");
    }, 2000);

}

function irProductos(){

    cambiarPantalla("productos");

    setTimeout(()=>{

        cargarProductos();

    },100);

}



window.App=App;
window.seleccionarProducto=seleccionarProducto;
window.agregarProducto= agregarProducto;
window.mostrarEntrega=mostrarEntrega;
window.irProductos = irProductos;
window.mostrarCarrito = mostrarCarrito;
window.actualizarOpcionesPago = actualizarOpcionesPago;
