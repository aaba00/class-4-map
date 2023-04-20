mapboxgl.accessToken = 'pk.eyJ1IjoiYWFiYTAwIiwiYSI6ImNsZzVxaWltcTA1dnczaHFyc3NrZXc4N20ifQ.HHHdXxGVb4zlQcNg1CwEZg';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/dark-v11', // style URL
  center: [-73.99330880814004, 40.73762668306899], // starting position [lng, lat]
  zoom: 10 // starting zoom
});

map.on('load', () => {
  map.addSource('homeless_reports', {
    type: 'geojson',
    data: 'data/homeless_reports_points.geojson'
  }),

    map.addLayer({
      'id': 'reports-layer',
      'type': 'circle',
      'source': 'homeless_reports',
      'paint': {
        'circle-radius': 4,
        'circle-stroke-width': 2,
        'circle-color': 'red',
        'circle-stroke-color': 'white'
      }
    });
});
