/*==================================================
                PRODUCTOS.JS
        Catálogo de productos Fortunato
==================================================*/


const productos = [


{
    id:1,

    nombre:"1/4 Kg Helado",

    categoria:"Helado",

    precio:3500,

    saboresPermitidos:3,

    descripcion:
    "Cuarto kilo de helado artesanal",

    disponible:true

},



{
    id:2,

    nombre:"1/2 Kg Helado",

    categoria:"Helado",

    precio:6500,

    saboresPermitidos:4,

    descripcion:
    "Medio kilo de helado artesanal",

    disponible:true

},




{
    id:3,

    nombre:"1 Kg Helado",

    categoria:"Helado",

    precio:12000,

    saboresPermitidos:4,

    descripcion:
    "Kilo de helado artesanal",

    disponible:true

},




{
    id:4,

    nombre:"Paleta Helada",

    categoria:"Paleta",

    precio:2500,

    saboresPermitidos:1,

    descripcion:
    "Paletas bañadas artesanales",

    disponible:true

}

];





/*==================================================
                CONFIGURACIÓN GENERAL
==================================================*/


const configuracionVenta={

    compraMinima:500,

    permitePostres:false,

    permiteDelivery:true,

    permiteRetiro:true,

    aceptaEfectivo:true,

    aceptaTransferencia:true,

    aceptaQR:true,

    aceptaCupones:true

};






/*==================================================
                BUSCAR PRODUCTO
==================================================*/


function obtenerProducto(id){

    return productos.find(

        producto=>producto.id===id

    );

}






/*==================================================
            PRODUCTOS DISPONIBLES
==================================================*/


function obtenerProductosDisponibles(){

    return productos.filter(

        producto=>

        producto.visible !== false &&

        producto.disponible === true

    );

}






/*==================================================
                PRODUCTOS POR CATEGORIA
==================================================*/


function obtenerCategoria(categoria){

    return productos.filter(

        producto=>

        producto.categoria === categoria &&

        producto.visible !== false &&
        producto.disponible === true

    );

}







/*==================================================
                VALIDAR STOCK
==================================================*/


function hayStock(id,cantidad=1){

    const producto=obtenerProducto(id);

    if(!producto) return false;

    if(!producto.stockControl) return true;

    return producto.stock>=cantidad;

}







/*==================================================
            ACTUALIZAR STOCK
==================================================*/


function descontarStock(id,cantidad=1){

    const producto=obtenerProducto(id);

    if(!producto) return;

    if(!producto.stockControl) return;

    producto.stock-=cantidad;

}







/*==================================================
            CAMBIAR DISPONIBILIDAD
==================================================*/


function cambiarDisponibilidad(id,estado){

    const producto=obtenerProducto(id);

    if(producto){

        producto.disponible=estado;

    }

}







/*==================================================
            EXPORTAR VARIABLES
==================================================*/


window.productos=productos;

window.configuracionVenta=configuracionVenta;

window.obtenerProducto=obtenerProducto;

window.obtenerProductosDisponibles=obtenerProductosDisponibles;

window.obtenerCategoria=obtenerCategoria;

window.hayStock=hayStock;

window.descontarStock=descontarStock;

window.cambiarDisponibilidad=cambiarDisponibilidad;
