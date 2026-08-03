/*==================================================
                    ROUTER.JS
        Control de navegación de la aplicación
==================================================*/

const Router = {

    pantallaActual: "inicio",

    historial: []

};


/*==================================================
                CAMBIAR PANTALLA
==================================================*/

function cambiarPantalla(nombrePantalla){

    ocultarPantallas();

    const pantalla = document.getElementById(nombrePantalla);

    if(!pantalla){

        console.error("La pantalla no existe:", nombrePantalla);

        return;

    }

    pantalla.classList.remove("oculto");

    Router.historial.push(Router.pantallaActual);

    Router.pantallaActual = nombrePantalla;

    actualizarTitulo();

}



/*==================================================
                OCULTAR PANTALLAS
==================================================*/

function ocultarPantallas(){

    const pantallas = document.querySelectorAll(".pantalla");

    pantallas.forEach(pantalla=>{

        pantalla.classList.add("oculto");

    });

}



/*==================================================
                VOLVER
==================================================*/

function volverPantalla(){

    if(Router.historial.length===0){

        return;

    }

    const anterior = Router.historial.pop();

    cambiarPantalla(anterior);

}



/*==================================================
            ACTUALIZAR TITULO
==================================================*/

function actualizarTitulo(){

    const titulo = document.getElementById("titulo-pantalla");

    if(!titulo) return;

    switch(Router.pantallaActual){

        case "inicio":
            titulo.textContent="Heladería Fortunato";
        break;

        case "direccion":
            titulo.textContent="Ingresá tu dirección";
        break;

        case "sucursales":
            titulo.textContent="Elegí una sucursal";
        break;

        case "productos":
            titulo.textContent="Elegí tus productos";
        break;

        case "sabores":
            titulo.textContent="Seleccioná los sabores";
        break;

        case "carrito":
            titulo.textContent="Tu pedido";
        break;

        case "confirmacion":
            titulo.textContent="Confirmar pedido";
        break;

        default:
            titulo.textContent="Heladería Fortunato";

    }

}



/*==================================================
            IR A PRODUCTOS
==================================================*/

function irProductos(){

    cambiarPantalla("productos");

}



/*==================================================
            IR A DIRECCION
==================================================*/

function irDireccion(){

    cambiarPantalla("direccion");

}



/*==================================================
            IR A SUCURSALES
==================================================*/

function irSucursales(){

    cambiarPantalla("sucursales");

}



/*==================================================
            IR A SABORES
==================================================*/

function irSabores(){

    cambiarPantalla("sabores");

}



/*==================================================
            IR A CARRITO
==================================================*/

function irCarrito(){

    cambiarPantalla("carrito");

}



/*==================================================
            IR A CONFIRMACION
==================================================*/

function irConfirmacion(){

    cambiarPantalla("confirmacion");

}



/*==================================================
            EXPORTAR
==================================================*/

window.Router = Router;

window.cambiarPantalla = cambiarPantalla;

window.volverPantalla = volverPantalla;

window.irDireccion = irDireccion;

window.irSucursales = irSucursales;

window.irProductos = irProductos;

window.irSabores = irSabores;

window.irCarrito = irCarrito;

window.irConfirmacion = irConfirmacion;