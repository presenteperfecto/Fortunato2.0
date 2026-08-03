/*==================================================
                    CARRITO.JS
        Carrito múltiple Fortunato
==================================================*/


const Carrito = {


    items:[]


};





/*==================================================
            AGREGAR PRODUCTO
==================================================*/


function agregarAlCarrito(producto){



    const existente =

    Carrito.items.find(item =>


        item.id === producto.id &&


        JSON.stringify(item.sabores)

        ===

        JSON.stringify(producto.sabores)


    );





    if(existente){


        existente.cantidad++;


    }

    else{


        producto.cantidad = 1;


        Carrito.items.push(producto);


    }





    App.carrito = Carrito.items;



    actualizarContadorCarrito();



    actualizarVistaCarrito();


}








/*==================================================
            SUMAR CANTIDAD
==================================================*/


function aumentarCantidad(index){



    Carrito.items[index].cantidad++;



    actualizarVistaCarrito();


}








/*==================================================
            RESTAR CANTIDAD
==================================================*/


function disminuirCantidad(index){



    if(Carrito.items[index].cantidad > 1){



        Carrito.items[index].cantidad--;



    }

    else{


        eliminarDelCarrito(index);


        return;


    }



    actualizarVistaCarrito();


}








/*==================================================
            ELIMINAR PRODUCTO
==================================================*/


function eliminarDelCarrito(index){



    Carrito.items.splice(

        index,

        1

    );



    App.carrito = Carrito.items;



    actualizarVistaCarrito();



    actualizarContadorCarrito();


}








/*==================================================
            TOTAL
==================================================*/


function calcularTotalCarrito(){


    let total=0;



    Carrito.items.forEach(item=>{


        total +=

        item.precio *

        item.cantidad;


    });



    return total;


}








/*==================================================
            ACTUALIZAR CONTADOR
==================================================*/


function actualizarContadorCarrito(){



    const contador=

    document.getElementById(

        "cart-count"

    );



    if(!contador)return;



    let cantidad=0;



    Carrito.items.forEach(item=>{


        cantidad += item.cantidad;


    });




    contador.textContent=cantidad;



}








/*==================================================
            MOSTRAR CARRITO
==================================================*/


function actualizarVistaCarrito(){



    const lista=

    document.getElementById(

        "carrito-lista"

    );



    const total=

    document.getElementById(

        "carrito-total"

    );



    if(!lista)return;



    lista.innerHTML="";





    Carrito.items.forEach((item,index)=>{



        const div=

        document.createElement("div");



        div.className=

        "carrito-item";





        div.innerHTML=`

        
        <div>


        <h3>

        ${item.nombre}

        </h3>



        <p>

        ${item.sabores

        .map(s=>s.nombre)

        .join(", ")}


        </p>



        <strong>

        Cantidad:

        ${item.cantidad}

        </strong>


        </div>



        <div>


        <button

        onclick="disminuirCantidad(${index})">

        -

        </button>



        <button

        onclick="aumentarCantidad(${index})">

        +

        </button>



        <button

        onclick="eliminarDelCarrito(${index})">

        ❌

        </button>


        </div>


        `;



        lista.appendChild(div);



    });






    if(total){


        total.textContent=

        "$ "

        +

        calcularTotalCarrito()

        .toLocaleString("es-AR");


    }


}








/*==================================================
            VACIAR
==================================================*/


function vaciarCarrito(){


    Carrito.items=[];


    App.carrito=[];


    actualizarVistaCarrito();


    actualizarContadorCarrito();


}







window.Carrito=Carrito;


window.agregarAlCarrito=

agregarAlCarrito;


window.eliminarDelCarrito=

eliminarDelCarrito;


window.aumentarCantidad=

aumentarCantidad;


window.disminuirCantidad=

disminuirCantidad;


window.calcularTotalCarrito=

calcularTotalCarrito;


window.actualizarVistaCarrito=

actualizarVistaCarrito;
