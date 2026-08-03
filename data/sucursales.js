/*==================================================
                SUCURSALES.JS
==================================================*/


const sucursales=[


{

    id:1,

    nombre:"Fortunato Lugano",

    principal:true,

    direccion:"Villa Lugano, Buenos Aires",

    telefono:"5411XXXXXXXX",

    activa:true,


    ubicacion:{

        lat:-34.679850,

        lng:-58.467850

    }


},



{

    id:2,

    nombre:"Fortunato Sucursal 2",

    principal:false,

    direccion:"Buenos Aires",

    telefono:"5411XXXXXXXX",

    activa:true,


    ubicacion:{

        lat:-34.65,

        lng:-58.45

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