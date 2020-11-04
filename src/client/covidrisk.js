

const initMap = () => {
  const map = L.map('map', { fadeAnimation: false });
  const topoLayer = new L.TopoJSON(null);

  // load OSM tiles in grayscale
  L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14, 
    minZoom: 2,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);

  const covidRisk = [
    { istatId: 1, risk: 2 },
    { istatId: 2, risk: 2 },
    { istatId: 3, risk: 2 },
    { istatId: 4, risk: 2 },
    { istatId: 5, risk: 1 },
    { istatId: 6, risk: 0 },
    { istatId: 7, risk: 1 },
    { istatId: 8, risk: 0 },
    { istatId: 9, risk: 0 },
    { istatId: 10, risk: 0 },
    { istatId: 11, risk: 0 },
    { istatId: 12, risk: 0 },
    { istatId: 13, risk: 0 },
    { istatId: 14, risk: 0 },
    { istatId: 15, risk: 1 },
    { istatId: 16, risk: 1 },
    { istatId: 17, risk: 0 },
    { istatId: 18, risk: 2 },
    { istatId: 19, risk: 0 },
    { istatId: 20, risk: 0 },
  ]

  const riskToColor = (istatId) => {
    // palette https://colorhunt.co/palette/212737
    const riskColorMap = {
      0: '#9ad3bc',
      1: '#f5b461',
      2: '#ec524b',
    }
    const riskLevel = covidRisk.find(zone => zone.istatId === istatId).risk || 0;
    return riskColorMap[riskLevel];
  }

  const addTopoData = (topoData) => {
    topoLayer.addData(topoData);
    topoLayer.addTo(map);
    topoLayer.eachLayer(handleLayer);
  }

  const handleLayer = (layer) => {  
    const { reg_istat_code_num: regIstatCodeNum } = layer.feature.properties;
    
    const fillColor = riskToColor(regIstatCodeNum);
    
    if (fillColor) {
      return layer.setStyle({
        fillColor,
        weight: 3,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.5
      });
    }

    layer.setStyle({
      color: 'black',
      weight: 1,
      opacity: 0.1,
      dashArray: '1',
      fillOpacity: 0.1
    });
  }

  // const italyBox = [[
  //   6.1962890625,
  //   36.491973470593685
  // ],
  // [
  //   19.16015625,
  //   36.491973470593685
  // ],
  // [
  //   19.16015625,
  //   47.057716353979225
  // ],
  // [
  //   6.1962890625,
  //   47.057716353979225
  // ],
  // [
  //   6.1962890625,
  //   37.491973470593685
  // ]];

  // this sucks, it looks better without any mask
  // const maskCoords = italyBox.map((coord) => new L.LatLng(coord[0][0], coord[0][1]));
  // L.mask(maskCoords).addTo(map);

  fetch('data/limits_IT_regions.topo.json')
    .then(response => response.json())
    .then(data => {
      console.log({data})
      addTopoData(data);
    });

    map.setView(new L.LatLng(42.0, 12.4964), 6);
    // map.dragging.disable();
  };

window.addEventListener('load', () => initMap());