/*==================================================
                PRODUCTOS.JS
        Catálogo de productos Fortunato
==================================================*/


const productos = [

/*==================================================
                    HELADOS
==================================================*/

{
    id:1,
    categoria:"Helados",
    nombre:"1/2 Kg",
    codigo:"HLD-500",

    descripcion:"Hasta 2 sabores",

    precio:0, // El administrador podrá modificarlo

    peso:500,

    saboresPermitidos:2,

    disponible:true,

    visible:true,

    stockControl:false,

    stock:9999,

    imagen:"img/productos/medio.png"
},


{
    id:2,
    categoria:"Helados",
    nombre:"1 Kg",
    codigo:"HLD-1000",

    descripcion:"Hasta 4 sabores",

    precio:0,

    peso:1000,

    saboresPermitidos:4,

    disponible:true,

    visible:true,

    stockControl:false,

    stock:9999,

    imagen:"img/productos/1kg.png"
},


{
    id:3,
    categoria:"Helados",
    nombre:"2 Kg",

    codigo:"HLD-2000",

    descripcion:"Hasta 8 sabores",

    precio:0,

    peso:2000,

    saboresPermitidos:8,

    disponible:true,

    visible:true,

    stockControl:false,

    stock:9999,

    imagen:"img/productos/2kg.png"
},




/*==================================================
                    PALETAS
==================================================*/


{
    id:10,

    categoria:"Paletas",

    nombre:"Paleta",

    codigo:"PAL-001",

    descripcion:"Paleta artesanal",

    precio:0,

    disponible:true,

    visible:true,

    stockControl:true,

    stock:999,

    imagen:"img/productos/paleta.png"
},




/*==================================================
                POSTRES
==================================================*/


{
    id:20,

    categoria:"Postres",

    nombre:"Postres",

    codigo:"PST-001",

    descripcion:"Próximamente",

    precio:0,

    disponible:false,

    visible:false,

    stockControl:false,

    stock:0,

    imagen:"img/productos/postres.png"
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

        producto.visible===true &&

        producto.disponible===true

    );

}






/*==================================================
                PRODUCTOS POR CATEGORIA
==================================================*/


function obtenerCategoria(categoria){

    return productos.filter(

        producto=>

        producto.categoria===categoria &&

        producto.visible===true

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