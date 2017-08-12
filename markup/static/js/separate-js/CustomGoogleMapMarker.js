function CustomMarker(latlng, map, args) {
    this.latlng = latlng;
    this.args = args;
    this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {

    var self = this;

    var div = this.div;

    if (!div) {

        div = this.div = document.createElement('div');
        div.className = 'map__marker';

        var avatar  = document.createElement('div');
        avatar.className = 'avatar avatar_size_medium';

        var close = document.createElement('div');
        close.className = 'close';
        close.innerHTML = '<svg class="close__icon" width="14" height="14"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../svg-symbols.svg#close"></use></svg>'

        div.appendChild(close);

        var img = document.createElement('img');

        img.className = 'avatar__img';
        img.src = this.args.img;

        avatar.appendChild(img);
        div.appendChild(avatar);

        if (typeof(self.args.marker_id) !== 'undefined') {
            div.dataset.marker_id = self.args.marker_id;
        }

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
        div.style.left = (point.x - 10) + 'px';
        div.style.top = (point.y - 20) + 'px';
    }
};

CustomMarker.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

CustomMarker.prototype.getPosition = function() {
    return this.latlng;
};
