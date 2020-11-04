

const initMap = () => {
  const map = L.map('map', { fadeAnimation: false });
  const topoLayer = new L.TopoJSON(null);

  // load OSM tiles in grayscale
  L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    minZoom: 2,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);

  const regionCovidRisk = [{ istatId: 1, risk: 'high' }, { istatId: 2, risk: 'high' }, { istatId: 3, risk: 'high' }, { istatId: 4, risk: 'high' }, { istatId: 5, risk: 'medium' }, { istatId: 6, risk: 'low' }, { istatId: 7, risk: 'medium' }, { istatId: 8, risk: 'low' }, { istatId: 9, risk: 'low' }, { istatId: 10, risk: 'low' }, { istatId: 11, risk: 'low' }, { istatId: 12, risk: 'low' }, { istatId: 13, risk: 'low' }, { istatId: 14, risk: 'low' }, { istatId: 15, risk: 'medium' }, { istatId: 16, risk: 'medium' }, { istatId: 17, risk: 'low' }, { istatId: 18, risk: 'high' }, { istatId: 19, risk: 'low' }, { istatId: 20, risk: 'low' }];

  const provinceCovidRisk = [{ istatId: 21, risk: 'high' }, { istatId: 22, risk: 'low' }];

  const riskToColor = ({ regionIstatCode, provinceIstatCode }) => {

    // palette https://colorhunt.co/palette/212737
    const riskColorMap = {
      low: '#ffe08e',
      medium: '#ffa420',
      high: '#ff4239'
    };

    const provinceRiskLevel = (provinceCovidRisk.find(zone => zone.istatId === provinceIstatCode) || {}).risk;
    const regionRiskLevel = (regionCovidRisk.find(zone => zone.istatId === regionIstatCode) || {}).risk;
    return riskColorMap[provinceRiskLevel || regionRiskLevel];
  };

  const addTopoData = topoData => {
    topoLayer.addData(topoData);
    topoLayer.addTo(map);
    topoLayer.eachLayer(handleLayer);
  };

  const handleLayer = layer => {
    console.log('layer', layer);
    const {
      reg_istat_code_num: regionIstatCode,
      prov_istat_code_num: provinceIstatCode
    } = layer.feature.properties;

    const fillColor = riskToColor({ regionIstatCode, provinceIstatCode });

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
  };

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

  fetch('data/limits_IT_provinces.topo.json').then(response => response.json()).then(data => {
    console.log({ data });
    addTopoData(data);
  });

  map.setView(new L.LatLng(42.0, 12.4964), 6);
  // map.dragging.disable();
};

window.addEventListener('load', () => initMap());