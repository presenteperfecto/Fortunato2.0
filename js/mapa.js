/*==================================================
                    MAPA.JS
        Google Maps + Validación Delivery
==================================================*/


let mapa;

let marcador;

const ubicacionFortunato = {

    lat: -34.679850,

    lng: -58.467850

};



function iniciarMapa(){


    const elemento = document.getElementById("map");


    if(!elemento){

        return;

    }


    mapa = new google.maps.Map(elemento,{

        center: ubicacionFortunato,

        zoom:15,

        mapTypeControl:false,

        streetViewControl:false

    });



    marcador = new google.maps.Marker({

        position:ubicacionFortunato,

        map:mapa,

        title:"Heladería Fortunato Lugano"

    });


}




/*==================================================
            OBTENER DIRECCION
==================================================*/


function obtenerUbicacionCliente(){


    cambiarPantalla("direccion");


    setTimeout(()=>{


        if(!mapa){

            iniciarMapa();

        }


    },500);


}





/*==================================================
        VALIDAR DISTANCIA DELIVERY
==================================================*/


function validarDireccion(){


    const direccion =

    document.getElementById("direccion-cliente").value;



    if(direccion.trim()===""){


        mostrarMensaje(

            "Ingresá una dirección"

        );


        return false;

    }



    App.cliente.direccion=direccion;



    // distancia simulada hasta integrar geocoder

    App.distancia=2;



    if(App.distancia<=3){


        App.costoEnvio=0;


    }

    else if(App.distancia<=4.5){


        App.costoEnvio=500;


    }

    else{


        mostrarMensaje(

        "No llegamos a esa zona"

        );


        return false;

    }



    irProductos();


}





/*==================================================
            INICIAR MAPA AUTOMATICO
==================================================*/


window.initMap=iniciarMapa;


window.obtenerUbicacionCliente=

obtenerUbicacionCliente;


window.validarDireccion=

validarDireccion;