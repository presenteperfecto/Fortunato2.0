/*==================================================
                MERCADOPAGO.JS
        Integración Mercado Pago Fortunato
==================================================*/


// SDK oficial Mercado Pago

const { MercadoPagoConfig, Preference } = require("mercadopago");





/*==================================================
            CONFIGURACIÓN API
==================================================*/


const client = new MercadoPagoConfig({

    accessToken:

    process.env.MERCADOPAGO_ACCESS_TOKEN

});







/*==================================================
        CREAR PREFERENCIA DE PAGO
==================================================*/


async function crearPago(pedido){


    try{


        const preference = new Preference(client);



        const respuesta = await preference.create({



            body:{


                items:

                pedido.productos.map(producto=>({


                    id:

                    String(producto.id),



                    title:

                    producto.nombre,



                    description:

                    producto.sabores

                    .map(

                    sabor=>sabor.nombre

                    )

                    .join(", "),



                    quantity:

                    producto.cantidad || 1,



                    currency_id:

                    "ARS",



                    unit_price:

                    Number(producto.precio)


                })),





                back_urls:{


                    success:

                    "https://tu-dominio.com/pago-exitoso",



                    failure:

                    "https://tu-dominio.com/pago-rechazado",



                    pending:

                    "https://tu-dominio.com/pago-pendiente"


                },





                auto_return:

                "approved",





                notification_url:


                "https://tu-servidor.com/webhook/mercadopago"



            }



        });





        return {


            id:

            respuesta.id,



            urlPago:

            respuesta.init_point



        };




    }

    catch(error){


        console.error(

            "Error Mercado Pago:",

            error

        );



        throw error;


    }



}









/*==================================================
            CONSULTAR PAGO
==================================================*/


async function consultarPago(idPago){


    try{


        // Esta función se conectará
        // con Payments API


        return {


            estado:

            "pendiente"


        };



    }

    catch(error){


        console.error(error);


    }


}






/*==================================================
            EXPORTAR
==================================================*/


module.exports={


    crearPago,


    consultarPago


};