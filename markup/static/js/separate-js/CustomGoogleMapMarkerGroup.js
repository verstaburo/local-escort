function CustomGroup(latlng, map) {
    this.latlng = latlng;
    this.setMap(map);
    this.markers = [];
    this.id = [];
}

CustomGroup.prototype = new google.maps.OverlayView();

CustomGroup.prototype.add = function(src, id) {
    var avatar  = document.createElement('div');
    avatar.className = 'avatar avatar_size_xs';
    this.id.push(id);

    var img = document.createElement('img');
    img.className = 'avatar__img';
    img.src = src;

    avatar.appendChild(img);
    this.markers.push(avatar);
};

CustomGroup.prototype.draw = function() {
    var div = this.div;

    if (!div) {

        div = this.div = document.createElement('div');
        div.className = 'map__group';

        var markers = this.markers;

        for (var i = 0; i < markers.length; i++) {
            if (i === 3 && markers.length > 4) {
                var count = document.createElement('div');
                count.className = 'map__count';
                count.innerHTML = '+' + (markers.length - 3);
                div.appendChild(count);
                break;
            }

           div.appendChild(markers[i]);
        }

        var close = document.createElement('div');
        close.className = 'close';
        close.innerHTML = '<svg class="close__icon" width="14" height="14"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/svg-symbols.svg#close"></use></svg>'

        div.appendChild(close);
        div.dataset.group_id = this.id.join(',');


        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
        div.style.left = (point.x - 10) + 'px';
        div.style.top = (point.y - 20) + 'px';
    }
};

CustomGroup.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

CustomGroup.prototype.getPosition = function() {
    return this.latlng;
};
