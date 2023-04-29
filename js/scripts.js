mapboxgl.accessToken = 'pk.eyJ1IjoiYWFiYTAwIiwiYSI6ImNsZzVxaWltcTA1dnczaHFyc3NrZXc4N20ifQ.HHHdXxGVb4zlQcNg1CwEZg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [-73.99330880814004, 40.73762668306899],
  zoom: 10
});

map.on('load', () => {
  //add data 
  map.addSource('reports', {
    type: 'geojson',
    data: 'data/homeless_reports_points.geojson',
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 25,
    filter: ['==', ['number', ['get', 'year']], 2019]
  });

  //add cluster layers, code adapted from https://docs.mapbox.com/mapbox-gl-js/example/cluster/
  map.addLayer({
    id: 'reports-clusters',
    source: 'reports',
    type: 'circle',
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        50,
        '#f1f075',
        100,
        '#f28cb1',
        1000,
        '#c417b1'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        7,
        50,
        10,
        100,
        20,
        1000,
        25
      ]
    },
  });

  map.addLayer({
    id: 'reports-cluster-count',
    type: 'symbol',
    source: 'reports',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 10
    }
  });

  map.addLayer({
    id: 'reports-unclustered-point',
    type: 'circle',
    source: 'reports',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#11b4da',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  });

});

// use the slider to update the year of data displayed on the map. code adapted from github user tmlmt/Thomas Lamant at https://jsfiddle.net/4fao60cu/3/, https://github.com/mapbox/mapbox-gl-js/issues/2613
// ideally would like to find a way to update the data's filter without redrawing the whole map
document.getElementById('slider').addEventListener('input', (event) => {
  const yearSlider = parseInt(event.target.value);
  const myStyle = map.getStyle();
  myStyle.sources.reports.filter = ['==', ['number', ['get', 'year']], yearSlider];
  map.setStyle(myStyle);
  document.getElementById('active-year').innerText = yearSlider;
});