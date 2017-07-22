function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 40.76163, lng: -73.97486600000002 },
        mapTypeId: 'roadmap',
        scrollwheel: true,
        disableDefaultUI: true,
        styles: [
            {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#ffffff',
                    },
                ],
            }, {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        visibility: 'on',
                    }, {
                        color: '#424b5b',
                    }, {
                        weight: 2,
                    }, {
                        gamma: '1',
                    },
                ],
            }, {
                featureType: 'all',
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            }, {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                    {
                        weight: 0.6,
                    }, {
                        color: '#545b6b',
                    }, {
                        gamma: '0',
                    },
                ],
            }, {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#545b6b',
                    }, {
                        gamma: '1',
                    }, {
                        weight: '10',
                    },
                ],
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#666c7b',
                    },
                ],
            }, {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#545b6b',
                    },
                ],
            }, {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#424a5b',
                    }, {
                        lightness: '0',
                    },
                ],
            }, {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#666c7b',
                    },
                ],
            }, {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#2e3546',
                    },
                ],
            },
        ],
    });

    var zoomInBtn = document.querySelector('.js-map-zoom-in'),
        zoomOutBtn = document.querySelector('.js-map-zoom-out'),
        myLocBtn = document.querySelector('.js-map-my-location');

    google.maps.event.addDomListener(zoomInBtn, 'click', function() {
        map.setZoom(map.getZoom() + 0.5);
    });

    google.maps.event.addDomListener(zoomOutBtn, 'click', function() {
        map.setZoom(map.getZoom() - 0.5);
    });
}
