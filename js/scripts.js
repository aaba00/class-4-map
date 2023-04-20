mapboxgl.accessToken = 'pk.eyJ1IjoiYWFiYTAwIiwiYSI6ImNsZzVxaWltcTA1dnczaHFyc3NrZXc4N20ifQ.HHHdXxGVb4zlQcNg1CwEZg';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/dark-v11', // style URL
  center: [-73.99330880814004, 40.73762668306899], // starting position [lng, lat]
  zoom: 10 // starting zoom
});

map.on('load', () => {
  map.addSource('homeless_reports_points', {
    type: 'geojson',
    data: 'data/homeless_reports_points.geojson',
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 25
  }),

    map.addLayer({
      id: 'reports-layer',
      type: 'circle',
      source: 'homeless_reports_points',
      // THE ISSUE - filter returns error: "expected value to be of type number, but found null instead." However, I already filtered out all null values in the "year_n" column in qgis before exporting to geojson..still tinkering
      //filter: ['==', ['number', ['get', 'year_n']], 2022],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          5,
          100,
          10,
          750,
          20
        ]
      },
    });
});
