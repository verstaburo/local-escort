window.userProfileMap = function() {
    var el = document.getElementById('user-fill-profile-map');

    if (!el) {
        return;
    }

    var map = new google.maps.Map(el, {
        zoom: 13,
        center: {lat: 40.76163, lng: -73.97486600000002},
        mapTypeId: 'roadmap',
        scrollwheel: true,
        disableDefaultUI: true,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "-54"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-89"
                    },
                    {
                        "lightness": "-55"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "-51"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]
    });

    var zoomInBtn = document.querySelector('.js-map-zoom-in'),
        zoomOutBtn = document.querySelector('.js-map-zoom-out'),
        myLocBtn = document.querySelector('.js-map-my-location'),
        marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: {lat: -9999, lng: -9999},
            draggable: true
        });

    google.maps.event.addDomListener(zoomInBtn, 'click', function () {
        map.setZoom(map.getZoom() + 1);
    });

    google.maps.event.addDomListener(zoomOutBtn, 'click', function () {
        map.setZoom(map.getZoom() - 1);
    });

    // search addr
    var input = document.querySelector('.js-map-addr-input');
    var geocoder = new google.maps.Geocoder;

    if ('geolocation' in navigator) {
        google.maps.event.addDomListener(myLocBtn, 'click', function () {
            navigator.geolocation.getCurrentPosition(function (pos) {
                var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                map.setCenter(latlng);
                marker.setPosition(latlng);
                geocodeLatLng(latlng);
                onDragEnd(marker);
            });
        });
    } else {
        $(myLocBtn).hide();
    }

    var modelMap = $('#model-map');
    // hide google logo etc
    setTimeout(function() {
        // hide google logo etc
        modelMap.find('.gm-style-cc').hide();
        modelMap.find('.gmnoprint ').hide();
        modelMap.find('.gmnoscreen').hide();
        modelMap.find('[target="_blank"]').parent().hide();
        modelMap.find('[target="_new"]').parent().hide();
    }, 0);

    $('#model-map').on('aftershow', function() {
        google.maps.event.trigger(map, 'resize');
    });

    // set marker

    google.maps.event.addListener(map, 'click', function(event) {
        if (marker) {
            marker.setMap(null);
            marker = null;
        }

        marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            draggable: true
        });

        geocodeLatLng(event.latLng);
        onDragEnd(marker);
     });


    var searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        if (marker) {
            marker.setMap(null);
        }

        var latLng = places[0].geometry.location

        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: true
        });

        map.setCenter(latLng);
        marker.setPosition(latLng);
        onDragEnd(marker);
    });


    function geocodeLatLng(q) {
        var latlng = { lat: q.lat(), lng: q.lng() }

        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    input.value = results[1].formatted_address;
                }
            } else {
                input.value = '';
            }
        });
    }

    function onDragEnd(marker) {
        google.maps.event.addListener(marker, 'dragend', function(event) {
            geocodeLatLng(event.latLng);
        });
    }
};

userProfileMap();
