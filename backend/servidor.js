/*==================================================
                SERVIDOR.JS
        Backend Heladería Fortunato
==================================================*/


// Librerías

const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");



// Mercado Pago

const {

    crearPago

} = require("./mercadoPago");





// Cargar variables .env

dotenv.config();





// Crear servidor

const app = express();





// Puerto

const PORT = process.env.PORT || 3000;





/*==================================================
                MIDDLEWARE
==================================================*/


app.use(cors());


app.use(express.json());





/*==================================================
                PRUEBA SERVIDOR
==================================================*/


app.get("/",(req,res)=>{


    res.send(

        "Servidor Fortunato funcionando"

    );


});







/*==================================================
            CREAR PAGO MERCADO PAGO
==================================================*/


app.post("/crear-pago",async(req,res)=>{


    try{


        const pedido = req.body;



        const pago = await crearPago(pedido);




        res.json({


            ok:true,


            pago:pago


        });



    }


    catch(error){


        console.error(error);



        res.status(500).json({


            ok:false,


            mensaje:

            "Error al crear pago"


        });


    }


});







/*==================================================
            WEBHOOK MERCADO PAGO
==================================================*/


app.post("/webhook/mercadopago",

(req,res)=>{


    console.log(

        "Notificación Mercado Pago"

    );


    console.log(req.body);



    res.sendStatus(200);


});








/*==================================================
                INICIAR SERVIDOR
==================================================*/


app.listen(PORT,()=>{


    console.log(

        `Servidor Fortunato activo en puerto ${PORT}`

    );


});