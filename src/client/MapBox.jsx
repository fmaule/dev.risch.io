'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiZm1hdWxlIiwiYSI6ImNraDJwcjhjcjBldGIycHBjZ3J2YXFwYmkifQ.a9W8YS77SRyPjgI9Iz86VA';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }

  componentDidMount() {
    const map =  new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} />
      </div>
    )
  }
}

let domContainer = document.querySelector('#component_map');
ReactDOM.render(<MapBox />, domContainer);

// 'use strict';
// const { useState, useEffect, useCallback, useRef } = React;

// mapboxgl.accessToken = 'pk.eyJ1IjoiZm1hdWxlIiwiYSI6ImNraDJwcjhjcjBldGIycHBjZ3J2YXFwYmkifQ.a9W8YS77SRyPjgI9Iz86VA';

// const MapBox = () => {
//   const [coords, setCoords] = useState({
//     lng: 5,
//     lat: 34,
//     zoom: 2,
//   });

//   const mapContainer = useCallback(node => {
//     if (node !== null) {
//         const map = new mapboxgl.Map({
//           container: node,
//           style: 'mapbox://styles/mapbox/streets-v11',
//           center: [coords.lng, coords.lat],
//           zoom: coords.zoom
//       });
       
//       map.on('move', () => {
//         setCoords({
//           lng: map.getCenter().lng.toFixed(4),
//           lat: map.getCenter().lat.toFixed(4),
//           zoom: map.getZoom().toFixed(2)
//         });
//       });   
//     }
//   }, []);

//   return (
//     <div>
//       <div ref={mapContainer} className="mapContainer" />
//     </div>
//   )
// }

// let domContainer = document.querySelector('#map_container');
// ReactDOM.render(<MapBox />, domContainer);