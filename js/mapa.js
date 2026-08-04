/* Google Maps y validación de delivery. */
let mapa;
let marcadores = [];

const ubicacionFortunato = {
    lat: -34.679850,
    lng: -58.467850
};

function iniciarMapa(){
    const elemento = document.getElementById("map");

    if(!elemento || !window.google?.maps){
        return;
    }

    mapa = new google.maps.Map(elemento, {
        center:ubicacionFortunato,
        zoom:13,
        mapTypeControl:false,
        streetViewControl:false
    });

    const iconoHelado = {
        url:"data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56" viewBox="0 0 46 56">
                <path fill="#d8a66c" d="M16 33h14l-7 20z"/>
                <path fill="#8b4c24" d="M11 25a12 12 0 1 1 24 0c0 7-5 10-12 10s-12-3-12-10z"/>
                <path fill="#4d2714" d="M13 22a10 10 0 0 1 20 0c0 3-2 4-4 4H17c-2 0-4-1-4-4z"/>
                <circle cx="19" cy="19" r="2" fill="#f1d6ad"/>
                <circle cx="27" cy="22" r="2" fill="#f1d6ad"/>
            </svg>`),
        scaledSize:new google.maps.Size(40, 49),
        anchor:new google.maps.Point(20, 49)
    };

    const limites = new google.maps.LatLngBounds();

    marcadores = obtenerSucursales().map(sucursal => {
        limites.extend(sucursal.ubicacion);

        return new google.maps.Marker({
            position:sucursal.ubicacion,
            map:mapa,
            title:`${sucursal.nombre} - ${sucursal.direccion}`,
            icon:iconoHelado
        });
    });

    if(marcadores.length > 1){
        mapa.fitBounds(limites, 60);
    }
}

function obtenerUbicacionCliente(){
    cambiarPantalla("direccion");

    setTimeout(()=>{
        if(!mapa){
            iniciarMapa();
        }
    }, 500);
}

function validarDireccion(){
    const direccion = document.getElementById("direccion-cliente").value;

    if(direccion.trim() === ""){
        mostrarMensaje("Ingresá una dirección");
        return false;
    }

    App.cliente.direccion = direccion;
    App.cliente.entreCalles = document.getElementById("entre-calles").value.trim();

    // Distancia simulada hasta integrar un geocodificador.
    App.distancia = 2;

    if(App.distancia <= 3){
        App.costoEnvio = 0;
    }else if(App.distancia <= 4.5){
        App.costoEnvio = 500;
    }else{
        mostrarMensaje("No llegamos a esa zona");
        return false;
    }

    irProductos();
}

window.initMap = iniciarMapa;
window.obtenerUbicacionCliente = obtenerUbicacionCliente;
window.validarDireccion = validarDireccion;
