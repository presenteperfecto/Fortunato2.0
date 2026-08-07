/*==================================================
                SERVIDOR.JS
        Backend Heladería Fortunato
==================================================*/


// Librerías

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs/promises");
const path = require("path");

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

/*==================================================
            GUARDAR COMPROBANTES
==================================================*/

app.post("/comprobantes", async(req,res)=>{

    try{

        const comprobante = req.body;
        const codigo = String(comprobante.codigo || "");

        if(!/^FOR-\d{6,8}-\d{4}$/.test(codigo)){
            return res.status(400).json({ ok:false, mensaje:"Código de pedido inválido" });
        }

        const carpeta = path.join(__dirname, "comprobantes");
        const archivo = path.join(carpeta, `${codigo}.json`);

        await fs.mkdir(carpeta, { recursive:true });
        await fs.writeFile(archivo, JSON.stringify(comprobante, null, 2), "utf8");

        res.status(201).json({ ok:true, codigo });

    }catch(error){

        console.error("Error al guardar comprobante:", error);
        res.status(500).json({ ok:false, mensaje:"No se pudo guardar el comprobante" });

    }

});
