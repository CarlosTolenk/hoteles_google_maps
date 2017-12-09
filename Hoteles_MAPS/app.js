$(document).ready(function() {

    var marcador;
    var latitudPunto;
    var longitudPunto;
    var mapa;
    var lngActual = -80.192800;
    var latActual = 25.760527;
    var latlngInicial = new google.maps.LatLng(25.760527, -80.192800);
    var lista = [];
    var hotelInfo = {}; 


    $("#botonRegistrar").click(function() {

        $.mobile.changePage('#ResgistrarHotel');
        window.setTimeout(mostrarMapa, 1000);

    });

    $("#verLista, #atras3").click(function() {

        $.mobile.changePage('#listaHoteles');
        generarLista();

    });


    $("#atras, #atras2").click(function() {

        $.mobile.changePage('#inicio');

    });


    $("#agregarHotel").click(function() {

        registrarHotelInfo();

    });


    function mostrarMapa() {

          
        var opciones = {            
            zoom: 5,
            center: latlngInicial,
            mapTypeId: google.maps.MapTypeId.ROADMAP        
        };

               
        mapa = new google.maps.Map(document.getElementById("divMapa"), opciones);   

        marcador = new google.maps.Marker({            
            position: latlngInicial,
            map: mapa,
            draggable: true,
            title: "Posicion de marcador"        
        }); 

        google.maps.event.addListener(marcador, 'dragend', function(event) {
            latitudPunto = event.latLng.lat();
            longitudPunto = event.latLng.lng();

            latActual = latitudPunto;
            lngActual = longitudPunto;

        });            
    }


    function mostrarMapaHotel(hotelActivo) {
        var latlngHotel = new google.maps.LatLng(hotelActivo.lat, hotelActivo.lng);
        var opciones = {            
            zoom: 5,
            center: latlngHotel,
            mapTypeId: google.maps.MapTypeId.ROADMAP        
        };

               
        mapa = new google.maps.Map(document.getElementById("divMapaHotel"), opciones);   

        marcador = new google.maps.Marker({            
            position: latlngHotel,
            map: mapa,
            draggable: false,
            title: "Posicion de marcador"        
        });           
    }



    function registrarHotelInfo(){
        var nombre = $('#nombre').val();
        var estrellas = $('#estrellas').val();
        var telefono = $('#telefono').val();
        var ciudad = $('#ciudad').val();
        if (nombre && estrellas && telefono && ciudad) {

            hotelInfo.nombre = nombre;
            hotelInfo.estrellas = estrellas;
            hotelInfo.telefono = telefono;
            hotelInfo.ciudad = ciudad;

            hotelInfo.lng = lngActual;
            hotelInfo.lat = latActual;

            lista.push(hotelInfo);
            hotelInfo = {};

            console.log(lista);

            alert('El Hotel ' + nombre + ' ha sido registrado con exito!');

            var nombre = $('#nombre').val('');
            var estrellas = $('#estrellas').val('');
            var telefono = $('#telefono').val('');
            var ciudad = $('#ciudad').val('');
        } else{
            alert("Complete el formulario");
        }


    }

    function generarLista(){
        $( "#contenedorLista" ).empty();
        for (var i = lista.length - 1; i >= 0; i--) {
            var hotelDetails = '<li data-index="' + i + '"><a href="" class="ui-btn ui-btn-icon-right ui-icon-carat-r">' + lista[i].nombre + '</a></li>';
            $('#contenedorLista').append(hotelDetails);

        };

        $('#contenedorLista li a').click(function(event) {
            event.preventDefault();
            var elementIndex = $(this).parent().attr('data-index');
            $.mobile.changePage('#item');

            $("#hotelNombre").text(lista[elementIndex].nombre);
            $("#hotelCiudad").text(lista[elementIndex].ciudad);
            $("#hotelTelefono").text(lista[elementIndex].telefono);
            $("#hotelEstrellas").text(lista[elementIndex].estrellas);

            // mostrarMapaHotel(lista[elementIndex]);
            setTimeout(function(){
                mostrarMapaHotel(lista[elementIndex]);
            }, 1000);

        });
    }


    mostrarMapa();


});
