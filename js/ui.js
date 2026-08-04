/*==================================================
                    UI.JS
==================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{

    cargarProductos();

    cargarSabores();

});





/*==================================================
            PRODUCTOS
==================================================*/


function cargarProductos(){


const contenedor = 
document.getElementById("lista-productos");


if(!contenedor){

    console.log("No existe lista-productos");

    return;

}



contenedor.innerHTML="";



obtenerProductosDisponibles()

.forEach(producto=>{


const card=document.createElement("div");


card.className="producto-card";



card.innerHTML=`

<h3>${producto.nombre}</h3>

<p>${producto.descripcion}</p>

<p>
$ ${producto.precio}
</p>


<input 
type="number"
min="1"
value="1"
id="cantidad-${producto.id}">


<button onclick="seleccionarProducto(${producto.id})">

Elegir sabores

</button>

`;



contenedor.appendChild(card);


});


}





/*==================================================
            SABORES
==================================================*/


function cargarSabores(){



const contenedor=

document.getElementById(

"lista-sabores"

);



if(!contenedor)return;



contenedor.innerHTML="";

const esPaleta = App.productoActual?.categoria === "Paleta";
const saboresDisponibles = sabores.filter(sabor =>
    sabor.disponible && (esPaleta ? sabor.categoria === "Paletas" : sabor.categoria !== "Paletas")
);

const grupos = esPaleta ? [{
    titulo:"Sabores de paletas",
    sabores:saboresDisponibles
}] : [
    {
        titulo:"Chocolate",
        sabores:saboresDisponibles.filter(sabor => sabor.nombre.toLowerCase().startsWith("chocolate"))
    },
    {
        titulo:"Dulce de leche",
        sabores:saboresDisponibles.filter(sabor => sabor.nombre.toLowerCase().includes("dulce de leche"))
    },
    {
        titulo:"Otros gustos",
        sabores:saboresDisponibles.filter(sabor => {
            const nombre = sabor.nombre.toLowerCase();
            return !nombre.startsWith("chocolate") &&
                !nombre.includes("dulce de leche");
        })
    }
];

grupos.forEach(grupo => {
    const cuadro = document.createElement("div");
    cuadro.className = "grupo-sabores";
    cuadro.innerHTML = `<h3>${grupo.titulo}</h3><div class="grupo-sabores-lista"></div>`;

    const lista = cuadro.querySelector(".grupo-sabores-lista");

    grupo.sabores.forEach(sabor => {
        const item = document.createElement("label");
        item.className = "sabor-item";
        const detalle = esPaleta
            ? `${sabor.descripcion ? `${sabor.descripcion} · ` : ""}Baño de ${sabor.cobertura}`
            : "";
        item.innerHTML = `
            <input type="checkbox" class="check-sabor" value="${sabor.id}">
            <span class="sabor-nombre">
                ${sabor.nombre}
                ${detalle ? `<small class="sabor-detalle">${detalle}</small>` : ""}
            </span>
        `;
        lista.appendChild(item);
    });

    contenedor.appendChild(cuadro);
});



}








/*==================================================
        CONFIRMAR SABORES
==================================================*/


function confirmarSabores(){



const seleccionados=[];



document

.querySelectorAll(".check-sabor:checked")

.forEach(check=>{



const sabor=

obtenerSabor(

Number(check.value)

);



if(sabor){

seleccionados.push(sabor);

}


});






if(!App.productoActual){

mostrarMensaje(

"Seleccioná un producto"

);

return;

}

if(seleccionados.length === 0){

mostrarMensaje(
"Elegí al menos un sabor"
);

return;

}






if(

seleccionados.length >

App.productoActual.saboresPermitidos

){


mostrarMensaje(

`Este producto permite elegir hasta ${App.productoActual.saboresPermitidos} gustos`

);



return;


}





const productoPedido={



id:App.productoActual.id,


nombre:App.productoActual.nombre,


precio:App.productoActual.precio,


sabores:seleccionados

,cantidad: App.cantidadProductoActual || 1



};




agregarAlCarrito(productoPedido);



mostrarMensaje(
"Producto agregado"
);

cambiarPantalla(
"productos"
);



actualizarVistaCarrito();



}








/*==================================================
            CARRITO VISUAL
==================================================*/


function actualizarVistaCarrito(){



const lista=

document.getElementById(

"carrito-lista"

);



const total=

document.getElementById(

"carrito-total"

);



if(!lista)return;



lista.innerHTML="";



App.carrito.forEach((item,index)=>{



const div=document.createElement("div");



div.className="carrito-item";



div.innerHTML=`


<div>

<h3>

${item.nombre}

</h3>


<p>

${item.sabores

.map(s=>s.nombre)

.join(", ")}

</p>


</div>



<button 

onclick="eliminarDelCarrito(${index})">

❌

</button>


`;



lista.appendChild(div);



});




if(total){


total.innerHTML=

"$ "+

calcularTotalCarrito()

.toLocaleString("es-AR");


}



}

function irProductos(){

    cambiarPantalla("productos");

    cargarProductos();

}




window.irProductos = irProductos;

window.cargarProductos=cargarProductos;

window.cargarSabores=cargarSabores;

window.confirmarSabores=confirmarSabores;

window.actualizarVistaCarrito=

actualizarVistaCarrito;


/* Mensajes y pasos posteriores al carrito. */
function mostrarMensaje(texto){

let mensaje = document.querySelector(".mensaje-flotante");

if(!mensaje){
    mensaje = document.createElement("div");
    mensaje.className = "mensaje-flotante";
    document.body.appendChild(mensaje);
}

mensaje.textContent = texto;
mensaje.classList.add("mostrar");

clearTimeout(mensaje.temporizador);
mensaje.temporizador = setTimeout(()=>mensaje.classList.remove("mostrar"), 3000);

}

function irConfirmacion(){

if(!Carrito.items.length){
    mostrarMensaje("Agregá al menos un producto al pedido");
    return;
}

actualizarOpcionesPago();

cambiarPantalla("confirmacion");

}

window.mostrarMensaje = mostrarMensaje;
window.irConfirmacion = irConfirmacion;
