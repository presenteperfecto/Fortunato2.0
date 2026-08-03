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

        entreCalles:""


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

    [...Carrito.items];





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




    return mensaje;



}









/*==================================================
        ENVIAR WHATSAPP
==================================================*/


function enviarWhatsApp(){



    crearPedido();



    const mensaje=

    generarMensajeWhatsApp();




    const telefono=

    "5491100000000";




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
