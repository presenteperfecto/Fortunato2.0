/*==================================================
                SUCURSALES.JS
==================================================*/


const sucursales=[


{

    id:1,

    nombre:"Fabrica Fortunato",

    principal:true,

    direccion:"Cosquín 4463, C1439, Villa Lugano, Ciudad Autónoma de Buenos Aires",

    telefono:"5411XXXXXXXX",

    activa:true,


    ubicacion:{

        lat:-34.6829123,

        lng:-58.4800625

    }


},



{

    id:2,

    nombre:"Heladeria Fortunato",

    principal:false,

    direccion:"Emilio Mitre 1136, C1424, Ciudad Autónoma de Buenos Aires",

    telefono:"5411XXXXXXXX",

    activa:true,


    ubicacion:{

        lat:-34.6338377,

        lng:-58.4396946

    }


}



];





function obtenerSucursales(){
    return sucursales.filter(
        sucursal=>sucursal.activa
    );
}



function obtenerSucursal(id){
    return sucursales.find(
        sucursal=>sucursal.id===id
    );
}


window.sucursales=sucursales;
window.obtenerSucursales=obtenerSucursales;
window.obtenerSucursal=obtenerSucursal;
