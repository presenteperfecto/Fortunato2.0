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

        entreCalles:""


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



const delivery=

document.getElementById("btn-delivery");



const retiro=

document.getElementById("btn-retiro");




if(delivery){


delivery.onclick=()=>{


    App.tipoEntrega="DELIVERY";


    obtenerUbicacionCliente();


};


}




if(retiro){


retiro.onclick=()=>{


    App.tipoEntrega="RETIRO";


    cargarSucursales();


    cambiarPantalla("sucursales");


};


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



boton.innerHTML=

sucursal.nombre;



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



cambiarPantalla("sabores");


}


function mostrarEntrega(){

    document
    .getElementById("delivery-options")
    .style.display="flex";

}


window.mostrarEntrega=mostrarEntrega;


/*==================================================
            CARRITO
==================================================*/


function agregarProducto(producto){


App.carrito.push(producto);



actualizarVistaCarrito();



}





window.App=App;

window.seleccionarProducto=

seleccionarProducto;

window.agregarProducto=

agregarProducto;
