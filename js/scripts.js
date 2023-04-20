mapboxgl.accessToken = 'pk.eyJ1IjoiYWFiYTAwIiwiYSI6ImNsZzVxaWltcTA1dnczaHFyc3NrZXc4N20ifQ.HHHdXxGVb4zlQcNg1CwEZg';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/dark-v11', // style URL
    center: [-73.99330880814004, 40.73762668306899], // starting position [lng, lat]
    zoom: 10 // starting zoom
    });   

map.on('load', function(){
  //map.addSource('my-points). {
    // type: 'geojson',
    // data: myPoints
})

map.addLayer({ //every layer must have one source, but one source can power many layers
  //id: '[data type]-[source]'
  //type: circle
  //data: myPoints

})