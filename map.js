/*
 * L.TileLayer.Grayscale is a regular tilelayer with grayscale makeover.
 * from https://github.com/Zverik/leaflet-grayscale
 */

L.TileLayer.Grayscale = L.TileLayer.extend({
	options: {
		quotaRed: 21,
		quotaGreen: 71,
		quotaBlue: 8,
		quotaDividerTune: 0,
		quotaDivider: function quotaDivider() {
			return this.quotaRed + this.quotaGreen + this.quotaBlue + this.quotaDividerTune;
		}
	},

	initialize: function initialize(url, options) {
		options = options || {};
		options.crossOrigin = true;
		L.TileLayer.prototype.initialize.call(this, url, options);

		this.on('tileload', function (e) {
			this._makeGrayscale(e.tile);
		});
	},

	_createTile: function _createTile() {
		var tile = L.TileLayer.prototype._createTile.call(this);
		tile.crossOrigin = "Anonymous";
		return tile;
	},

	_makeGrayscale: function _makeGrayscale(img) {
		if (img.getAttribute('data-grayscaled')) return;

		img.crossOrigin = '';
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);

		var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var pix = imgd.data;
		for (var i = 0, n = pix.length; i < n; i += 4) {
			pix[i] = pix[i + 1] = pix[i + 2] = (this.options.quotaRed * pix[i] + this.options.quotaGreen * pix[i + 1] + this.options.quotaBlue * pix[i + 2]) / this.options.quotaDivider();
		}
		ctx.putImageData(imgd, 0, 0);
		img.setAttribute('data-grayscaled', true);
		img.src = canvas.toDataURL();
	}
});

L.tileLayer.grayscale = function (url, options) {
	return new L.TileLayer.Grayscale(url, options);
};

/*
 * L.TopoJSON
 * from https://gist.github.com/rclark/5779673
 */

L.TopoJSON = L.GeoJSON.extend({
	addData: function addData(jsonData) {
		if (jsonData.type === "Topology") {
			for (key in jsonData.objects) {
				geojson = topojson.feature(jsonData, jsonData.objects[key]);
				L.GeoJSON.prototype.addData.call(this, geojson);
			}
		} else {
			L.GeoJSON.prototype.addData.call(this, jsonData);
		}
	}
});

/*
 * L.Mask
 * from https://github.com/turban/Leaflet.Mask
 */

L.Mask = L.Polygon.extend({
	options: {
		stroke: false,
		color: '#333',
		fillOpacity: 0.9,
		clickable: true,

		outerBounds: new L.LatLngBounds([-90, -360], [90, 360])
	},

	initialize: function initialize(latLngs, options) {

		var outerBoundsLatLngs = [this.options.outerBounds.getSouthWest(), this.options.outerBounds.getNorthWest(), this.options.outerBounds.getNorthEast(), this.options.outerBounds.getSouthEast()];
		L.Polygon.prototype.initialize.call(this, [outerBoundsLatLngs, latLngs], options);
	}

});
L.mask = function (latLngs, options) {
	return new L.Mask(latLngs, options);
};