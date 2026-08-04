/*==================================================
                    PEDIDO.JS
        Gestión pedidos Fortunato
==================================================*/


const Pedido = {


    codigo:"",

    fecha:null,

    estado:"PENDIENTE",


    tipoEntrega:"",


    sucursal:null,


    cliente:{


        nombre:"",

        telefono:"",

        direccion:"",

        entreCalles:"",

        indicaciones:""


    },


    pago:{


        metodo:"",

        estado:"PENDIENTE"


    },


    productos:[],


    subtotal:0,


    envio:0,


    descuento:0,


    total:0



};







/*==================================================
            CREAR PEDIDO
==================================================*/


function crearPedido(){



    Pedido.codigo=

    generarCodigoPedido();



    Pedido.fecha=

    new Date();




    Pedido.tipoEntrega=

    App.tipoEntrega;




    Pedido.sucursal=

    App.sucursal;




    Pedido.productos=

    Carrito.items.map(producto=>({ ...producto, sabores:[...producto.sabores] }));

    Pedido.cliente = { ...App.cliente };





    Pedido.subtotal=

    calcularTotalCarrito();





    Pedido.envio=

    App.costoEnvio || 0;





    Pedido.total=

    Pedido.subtotal

    +

    Pedido.envio

    -

    Pedido.descuento;




}








/*==================================================
            CODIGO PEDIDO
==================================================*/


function generarCodigoPedido(){



    const fecha=

    new Date();



    const numero=

    Math.floor(

    Math.random()*9000

    )+1000;




    return `FOR-${fecha.getFullYear()}${fecha.getMonth()+1}${fecha.getDate()}-${numero}`;

}









/*==================================================
            WHATSAPP
==================================================*/


function generarMensajeWhatsApp(){



    let mensaje="";



    mensaje +=

    "🍦 HELADERÍA FORTUNATO\n";



    mensaje +=

    "====================\n\n";




    mensaje +=

    "Pedido: "

    +

    Pedido.codigo

    +

    "\n\n";





    mensaje +=

    "📦 PRODUCTOS\n\n";





    Pedido.productos.forEach(

    (producto,index)=>{



        mensaje +=

        `${index+1}) ${producto.cantidad} x ${producto.nombre}\n`;



        mensaje +=

        "Sabores:\n";



        producto.sabores.forEach(

        sabor=>{


            mensaje +=

            "• "

            +

            sabor.nombre

            +

            "\n";


        });



        mensaje += "\n";



    });







    if(Pedido.tipoEntrega==="DELIVERY"){



        mensaje +=

        "🚚 DELIVERY\n\n";



        mensaje +=

        "Dirección: "

        +

        Pedido.cliente.direccion

        +

        "\n";



        mensaje +=

        "Entre calles: "

        +

        Pedido.cliente.entreCalles

        +

        "\n\n";

        if(Pedido.cliente.indicaciones){

            mensaje += "Indicaciones: " + Pedido.cliente.indicaciones + "\n\n";

        }



    }

    else{


        mensaje +=

        "🏪 RETIRO EN LOCAL\n\n";


    }







    mensaje +=

    "💰 TOTAL: $"

    +

    Pedido.total

    .toLocaleString("es-AR")

    +

    "\n\n";





    mensaje +=

    "💳 Pago: "

    +

    Pedido.pago.metodo

    +

    "\n";

    if(Pedido.pago.metodo === "Transferencia"){

        mensaje += "\nIMPORTANTE: Enviá el comprobante de transferencia por este WhatsApp para confirmar el pedido.\n";

    }




    return mensaje;



}









/*==================================================
        ENVIAR WHATSAPP
==================================================*/


function enviarWhatsApp(){

    if(!Pedido.codigo){
        crearPedido();
    }



    const mensaje=

    generarMensajeWhatsApp();




    const telefono=

    "5491158708358";




    const url=

    `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;





    window.open(

        url,

        "_blank"

    );



}








/*==================================================
            EXPORTAR
==================================================*/


window.Pedido=Pedido;


window.crearPedido=

crearPedido;


window.enviarWhatsApp=

enviarWhatsApp;


window.generarMensajeWhatsApp=

generarMensajeWhatsApp;


function guardarDatosCliente(){

const nombre = document.getElementById("nombre-cliente").value.trim();
const telefono = document.getElementById("telefono-cliente").value.trim();

if(!nombre || !telefono){
    mostrarMensaje("Completá tu nombre y teléfono");
    return false;
}

App.cliente.nombre = nombre;
App.cliente.telefono = telefono;
App.cliente.indicaciones = App.tipoEntrega === "DELIVERY"
    ? document.getElementById("indicaciones-cliente").value.trim()
    : "";
Pedido.pago.metodo = document.getElementById("metodo-pago").value;
return true;

}

async function crearPagoMercadoPago(){

if(!guardarDatosCliente()) return;

crearPedido();

const estado = document.getElementById("estado-pago");
const qr = document.getElementById("qr-pago");
const metodo = Pedido.pago.metodo;

cambiarPantalla("pago");

if(metodo !== "QR"){
    qr.style.display = "none";
    estado.textContent = metodo === "Efectivo"
        ? "Pagás en efectivo al recibir o retirar el pedido."
        : "Realizá la transferencia y envianos el comprobante por WhatsApp.";
    return;
}

qr.style.display = "none";
estado.textContent = "Generando el enlace de pago seguro...";

try{
    const respuesta = await fetch("http://localhost:3000/crear-pago", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(Pedido)
    });
    const datos = await respuesta.json();

    if(!respuesta.ok || !datos.ok || !datos.pago?.urlPago){
        throw new Error(datos.mensaje || "No se pudo crear el pago");
    }

    Pedido.pago.url = datos.pago.urlPago;
    estado.innerHTML = 'El enlace de pago está listo. <a id="link-pago" target="_blank" rel="noopener">Abrir Mercado Pago</a>';
    document.getElementById("link-pago").href = Pedido.pago.url;
}catch(error){
    console.error(error);
    estado.textContent = "No se pudo conectar con el servidor de pagos. Podés enviar el pedido por WhatsApp y coordinar el pago.";
}

}

function confirmarPago(){

Pedido.pago.estado = "A_CONFIRMAR";
enviarWhatsApp();
guardarComprobantePedido();
vaciarCarrito();
mostrarMensaje("Pedido preparado para enviar por WhatsApp");

}

function guardarComprobantePedido(){

const comprobante = {
    ...Pedido,
    fecha: Pedido.fecha instanceof Date ? Pedido.fecha.toISOString() : Pedido.fecha,
    productos: Pedido.productos.map(producto => ({ ...producto, sabores:[...producto.sabores] }))
};

localStorage.setItem(`fortunato-comprobante-${Pedido.codigo}`, JSON.stringify(comprobante));

const codigos = JSON.parse(localStorage.getItem("fortunato-comprobantes") || "[]");
if(!codigos.includes(Pedido.codigo)){
    codigos.unshift(Pedido.codigo);
    localStorage.setItem("fortunato-comprobantes", JSON.stringify(codigos));
}

fetch("http://localhost:3000/comprobantes", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(comprobante)
}).catch(error => console.warn("No se pudo guardar el comprobante en el servidor", error));

}

window.crearPagoMercadoPago = crearPagoMercadoPago;
window.confirmarPago = confirmarPago;
