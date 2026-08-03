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


const contenedor=

document.getElementById(

"lista-productos"

);



if(!contenedor)return;



contenedor.innerHTML="";



obtenerProductosDisponibles()

.forEach(producto=>{



const card=document.createElement("div");



card.className="producto-card";



card.innerHTML=`


<h3>

${producto.nombre}

</h3>


<p>

${producto.descripcion}

</p>



<button onclick="seleccionarProducto(${producto.id})">

Elegir

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




sabores.forEach(sabor=>{



if(!sabor.disponible)return;



const item=document.createElement("label");



item.className="sabor-item";



item.innerHTML=`


<input 

type="checkbox"

class="check-sabor"

value="${sabor.id}">


${sabor.nombre}



`;



contenedor.appendChild(item);



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






window.cargarProductos=cargarProductos;

window.cargarSabores=cargarSabores;

window.confirmarSabores=confirmarSabores;

window.actualizarVistaCarrito=

actualizarVistaCarrito;
