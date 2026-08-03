/*==================================================
                    PEDIDO.JS
        Gestión de pedidos Heladería Fortunato
==================================================*/


const Pedido = {

    codigo: "",

    fecha: null,

    estado: "PENDIENTE",

    tipoEntrega: "",

    sucursal: null,

    cliente:{

        nombre:"",
        telefono:"",
        direccion:"",
        entreCalles:"",
        referencia:""

    },

    pago:{

        metodo:"",
        necesitaCambio:false,
        montoCambio:0,
        utilizaQR:false,
        cupon:null

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

    Pedido.codigo = generarCodigoPedido();

    Pedido.fecha = new Date();

    Pedido.estado = "PENDIENTE";

    Pedido.tipoEntrega = App.tipoEntrega;

    Pedido.sucursal = App.sucursal;

    Pedido.productos = [...Carrito.items];

    Pedido.subtotal = calcularTotalCarrito();

    Pedido.envio = calcularCostoEnvio();

    Pedido.total =

        Pedido.subtotal +

        Pedido.envio -

        Pedido.descuento;

}



/*==================================================
            CODIGO PEDIDO
==================================================*/

function generarCodigoPedido(){

    const fecha = new Date();

    const año = fecha.getFullYear();

    const mes = String(

        fecha.getMonth()+1

    ).padStart(2,"0");

    const dia = String(

        fecha.getDate()

    ).padStart(2,"0");

    const numero = Math.floor(

        Math.random()*9000

    )+1000;

    return `FOR-${año}${mes}${dia}-${numero}`;

}



/*==================================================
            COSTO ENVIO
==================================================*/

function calcularCostoEnvio(){

    if(Pedido.tipoEntrega==="RETIRO"){

        return 0;

    }

    return 0;

}



/*==================================================
            CAMBIAR ESTADO
==================================================*/

function cambiarEstadoPedido(estado){

    Pedido.estado = estado;

}



/*==================================================
        DATOS CLIENTE
==================================================*/

function guardarDatosCliente(datos){

    Pedido.cliente={

        ...Pedido.cliente,

        ...datos

    };

}



/*==================================================
            DATOS PAGO
==================================================*/

function guardarPago(datos){

    Pedido.pago={

        ...Pedido.pago,

        ...datos

    };

}



/*==================================================
        MENSAJE WHATSAPP
==================================================*/

function generarMensajeWhatsApp(){

    let mensaje="";

    mensaje += "🍦 HELADERÍA FORTUNATO\n";
    mensaje += "========================\n\n";

    mensaje += "📋 Pedido: ";

    mensaje += Pedido.codigo;

    mensaje += "\n\n";

    mensaje += "🚚 Tipo: ";

    mensaje += Pedido.tipoEntrega;

    mensaje += "\n";



    if(Pedido.tipoEntrega==="DELIVERY"){

        mensaje += "📍 Dirección: ";

        mensaje += Pedido.cliente.direccion;

        mensaje += "\n";

        mensaje += "📌 Entre calles: ";

        mensaje += Pedido.cliente.entreCalles;

        mensaje += "\n";

    }



    mensaje += "\n🍨 PRODUCTOS\n\n";



    Pedido.productos.forEach((producto,index)=>{

        mensaje += `${index+1}) ${producto.nombre}\n`;

        mensaje += "Sabores:\n";

        producto.sabores.forEach(sabor=>{

            mensaje += "• ";

            mensaje += sabor.nombre;

            mensaje += "\n";

        });

        mensaje += "\n";

    });



    mensaje += "💲Subtotal: $";

    mensaje += Pedido.subtotal.toLocaleString("es-AR");

    mensaje += "\n";



    mensaje += "🚚 Envío: $";

    mensaje += Pedido.envio.toLocaleString("es-AR");

    mensaje += "\n";



    mensaje += "🎁 Descuento: $";

    mensaje += Pedido.descuento.toLocaleString("es-AR");

    mensaje += "\n";



    mensaje += "========================\n";



    mensaje += "TOTAL: $";

    mensaje += Pedido.total.toLocaleString("es-AR");

    mensaje += "\n\n";



    mensaje += "💳 Pago: ";

    mensaje += Pedido.pago.metodo;

    mensaje += "\n";



    if(Pedido.pago.necesitaCambio){

        mensaje += "💵 Llevo: $";

        mensaje += Pedido.pago.montoCambio;

        mensaje += "\n";

    }



    if(Pedido.pago.utilizaQR){

        mensaje += "📲 Abona mediante QR\n";

    }



    return mensaje;

}



/*==================================================
        ENVIAR WHATSAPP
==================================================*/

function enviarWhatsApp(){

    crearPedido();

    const mensaje = generarMensajeWhatsApp();

    const telefono = "5491158708358";

    const url =

    `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(

        url,

        "_blank"

    );

}



/*==================================================
            EXPORTAR
==================================================*/

window.Pedido = Pedido;

window.crearPedido = crearPedido;

window.enviarWhatsApp = enviarWhatsApp;

window.guardarDatosCliente = guardarDatosCliente;

window.guardarPago = guardarPago;

window.cambiarEstadoPedido = cambiarEstadoPedido;