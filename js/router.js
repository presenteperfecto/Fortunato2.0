/*==================================================
                    ROUTER.JS
==================================================*/


const Router = {

    pantallaActual:"inicio",

    historial:[]

};



function cambiarPantalla(nombrePantalla){


    const actual = Router.pantallaActual;


    if(actual !== nombrePantalla){

        Router.historial.push(actual);

    }


    ocultarPantallas();



    const pantalla = document.getElementById(nombrePantalla);



    if(!pantalla){

        console.error(
            "Pantalla inexistente:",
            nombrePantalla
        );

        return;

    }



    pantalla.classList.remove("oculto");



    Router.pantallaActual = nombrePantalla;



    actualizarBotonVolver();



}





function ocultarPantallas(){


    document

    .querySelectorAll(".pantalla")

    .forEach(p=>{

        p.classList.add("oculto");

    });


}





function volverPantalla(){


    if(Router.historial.length===0){

        cambiarPantalla("inicio");

        return;

    }



    const anterior=

    Router.historial.pop();



    ocultarPantallas();



    document

    .getElementById(anterior)

    .classList

    .remove("oculto");



    Router.pantallaActual=anterior;



    actualizarBotonVolver();


}






function actualizarBotonVolver(){


    const boton=

    document.getElementById(

        "btn-volver"

    );



    if(!boton)return;



    if(

        Router.pantallaActual==="inicio"

    ){

        boton.style.display="none";

    }

    else{

        boton.style.display="block";

    }


}





window.Router=Router;

window.cambiarPantalla=cambiarPantalla;

window.volverPantalla=volverPantalla;
window.irConfirmacion = irConfirmacion;
