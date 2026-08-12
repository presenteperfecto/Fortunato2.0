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


${producto.categoria === "Paleta" ? `
<select id="cantidad-${producto.id}" class="cantidad-producto" aria-label="Cantidad de paletas para ${producto.nombre}">
    ${Array.from({ length: 15 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
</select>
` : `
<input 
    type="number"
    min="1"
    value="1"
    id="cantidad-${producto.id}"
    class="cantidad-invisible">
    <p class="cantidad-fija">Cantidad: 1</p>
`}

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
const cantidadTotal = App.cantidadProductoActual || 1;
const saboresDisponibles = sabores.filter(sabor =>
    sabor.disponible && (esPaleta ? sabor.categoria === "Paletas" : sabor.categoria !== "Paletas")
);

if(esPaleta){
    const instruccion = document.createElement("p");
    instruccion.className = "paleta-cantidad-instruccion";
    instruccion.textContent = `Seleccioná la cantidad de cada sabor. Total de paletas: ${cantidadTotal}. Máximo 15 paletas por gusto.`;
    contenedor.appendChild(instruccion);
}

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
        titulo:"Frutales & Especiales",
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
            const item = document.createElement(esPaleta ? "div" : "label");
        item.className = "sabor-item";
        const detalle = esPaleta
            ? `${sabor.descripcion ? `${sabor.descripcion} · ` : ""}Baño de ${sabor.cobertura}`
            : "";
            if (esPaleta) {
                const options = Array.from({ length: 16 }, (_, i) => `<option value="${i}">${i}</option>`).join("");
                item.innerHTML = `
                    <div class="sabor-info">
                        <span class="sabor-nombre">
                            ${sabor.nombre}
                            ${detalle ? `<small class="sabor-detalle">${detalle}</small>` : ""}
                        </span>
                        <label class="sabor-cantidad-label">
                            Cantidad
                            <select class="cantidad-sabor" data-sabor-id="${sabor.id}" aria-label="Cantidad de paletas para ${sabor.nombre}">
                                ${options}
                            </select>
                        </label>
                    </div>
                `;
            } else {
                item.innerHTML = `
                    <input type="checkbox" class="check-sabor" value="${sabor.id}">
                    <span class="sabor-nombre">
                        ${sabor.nombre}
                        ${detalle ? `<small class="sabor-detalle">${detalle}</small>` : ""}
                    </span>
                `;
            }
            lista.appendChild(item);
        });

        if (esPaleta) {
            contenedor.querySelectorAll(".cantidad-sabor").forEach(input => {
                const item = input.closest(".sabor-item");
                input.addEventListener("change", () => {
                    let valor = Math.max(0, Number(input.value) || 0);
                    if (valor > 15) valor = 15;
                    input.value = valor;
                    if (item){
                        item.classList.toggle("seleccionado", valor > 0);
                    }
                });
            });
        }

    contenedor.appendChild(cuadro);
});



}








/*==================================================
        CONFIRMAR SABORES
==================================================*/


function confirmarSabores(){
    const seleccionados = [];
    const esPaleta = App.productoActual?.categoria === "Paleta";
    const cantidadTotal = App.cantidadProductoActual || 1;

    if(!App.productoActual){
        mostrarMensaje("Seleccioná un producto");
        return;
    }

    if(esPaleta){
        let sumaSabores = 0;
        document.querySelectorAll(".cantidad-sabor").forEach(input => {
            let cantidad = Math.max(0, Number(input.value) || 0);
            if (cantidad > 15) cantidad = 15;
            input.value = cantidad;
            const sabor = obtenerSabor(Number(input.dataset.saborId));
            if(sabor && cantidad > 0){
                seleccionados.push({ ...sabor, cantidad });
                sumaSabores += cantidad;
            }
        });

        if(sumaSabores === 0){
            mostrarMensaje("Elegí la cantidad de cada sabor para las paletas");
            return;
        }

        if(sumaSabores !== cantidadTotal){
            mostrarMensaje(`La suma de los sabores debe ser exactamente ${cantidadTotal} paletas`);
            return;
        }
    } else {
        document.querySelectorAll(".check-sabor:checked").forEach(check => {
            const sabor = obtenerSabor(Number(check.value));
            if(sabor){
                seleccionados.push(sabor);
            }
        });

        if(seleccionados.length === 0){
            mostrarMensaje("Elegí al menos un sabor");
            return;
        }

        if(seleccionados.length > App.productoActual.saboresPermitidos){
            mostrarMensaje(`Este producto permite elegir hasta ${App.productoActual.saboresPermitidos} gustos`);
            return;
        }
    }

    const productoPedido = {
        id: App.productoActual.id,
        nombre: App.productoActual.nombre,
        precio: App.productoActual.precio,
        sabores: seleccionados,
        cantidad: cantidadTotal
    };

    agregarAlCarrito(productoPedido);
    mostrarMensaje("Producto agregado");
    cambiarPantalla("productos");
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
function mostrarMensaje(texto, duracion = 1500, conBorde = false, posicion = "bottom"){

let mensaje = document.querySelector(".mensaje-flotante");

if(!mensaje){
    mensaje = document.createElement("div");
    mensaje.className = "mensaje-flotante";
    document.body.appendChild(mensaje);
}

mensaje.textContent = texto;
mensaje.classList.remove("mensaje-flotante--center", "mensaje-flotante--bottom");
mensaje.classList.add(posicion === "center" ? "mensaje-flotante--center" : "mensaje-flotante--bottom");
mensaje.classList.add("mostrar");
mensaje.classList.toggle("mensaje-flotante--border", !!conBorde);

clearTimeout(mensaje.temporizador);
mensaje.temporizador = setTimeout(()=>mensaje.classList.remove("mostrar"), duracion);

}

function irConfirmacion(){

    if(!Carrito.items.length){
        mostrarMensaje("Agregá al menos un producto al pedido");
        return;
    }

    const subtotal = calcularTotalCarrito();
    if(App.tipoEntrega === "DELIVERY" && subtotal < 7500){
        mostrarMensaje("Mínimo de compra en delivery: 2 🍨1/4kg o equivalentes");
        return;
    }

    actualizarOpcionesPago();
    actualizarResumenConfirmacion();
    cambiarPantalla("confirmacion");

}

function actualizarResumenConfirmacion(){
    const subtotal = calcularTotalCarrito();
    const envio = App.tipoEntrega === "DELIVERY" && App.costoEnvio ? App.costoEnvio : 0;
    const totalConEnvio = subtotal + envio;

    const subtotalEl = document.getElementById("pedido-subtotal");
    const envioLine = document.getElementById("pedido-envio-line");
    const envioEl = document.getElementById("pedido-envio");
    const totalEl = document.getElementById("pedido-total");

    if(subtotalEl){
        subtotalEl.textContent = "$ " + subtotal.toLocaleString("es-AR");
    }

    if(envioLine && envioEl){
        if(envio > 0){
            envioLine.classList.remove("oculto");
            envioEl.textContent = "$ " + envio.toLocaleString("es-AR");
        } else {
            envioLine.classList.add("oculto");
        }
    }

    if(totalEl){
        totalEl.textContent = "$ " + totalConEnvio.toLocaleString("es-AR");
    }
}

window.mostrarMensaje = mostrarMensaje;
window.irConfirmacion = irConfirmacion;
