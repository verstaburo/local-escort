(function() {
    var map = new google.maps.Map(document.getElementById('map'), {
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
        posMarker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: {lat: -9999, lng: -9999},
        });

    google.maps.event.addDomListener(zoomInBtn, 'click', function () {
        map.setZoom(map.getZoom() + 1);
    });

    google.maps.event.addDomListener(zoomOutBtn, 'click', function () {
        map.setZoom(map.getZoom() - 1);
    });

    if ('geolocation' in navigator) {
        google.maps.event.addDomListener(myLocBtn, 'click', function () {
            navigator.geolocation.getCurrentPosition(function (pos) {
                var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                map.setCenter(latlng);
                posMarker.setPosition(latlng);
            });
        });
    } else {
        $(myLocBtn).hide();
    }

    var modelMap = $('#model-map');

    modelMap.on('aftershow', function() {
        google.maps.event.trigger(map, 'resize');
    });

    // random marker position
    var rand = function (n) {
        return Math.random() > .5 ? n - Math.random() : n + Math.random()
    };

    // markers
    var locations = [],
        avatars = ['navbar', 'andrew', 'anya', 'jackson', 'john', 'mika', 'miya', 'sarah'];

    // generate markers
    for (var i = 0; i < 500; i++) {
        locations.push(new google.maps.LatLng(rand(40.76163), rand(-73.97486600000002)));
    }

    var markers = locations.map(function(loc, i) {
        return new CustomMarker(loc, map, {
            marker_id: i,
            img: 'static/img/content/avatars/' +  avatars[Math.floor(Math.random() * avatars.length)] + '.png',
        });
    });

    new MarkerClusterer(
        map,
        markers,
        {
            styles: [{
                url: 'static/img/content/cluster/m1.png',
                textColor: 'white',
                width: 50,
                height: 50,
                textSize: 16
            }]
        }
    );

    // event

    modelMap
        .on('click', '.map__marker', function() {
            var el = $(this);

            if (el.hasClass('active')) {
                return;
            }

            el.addClass('active');

            $('.map__heading').addClass('active');

            $.ajax({
                url: 'model-map-ajax-example.html',
                type: 'GET',
                success: function(data) {
                    var model = $('.map__content')
                        .last()
                        .append(data)
                        .children()
                        .last()
                        .attr('id', 'marker-' + el.data('marker_id'));

                    modelPreviewInit(model); // init effects slider, etc.
                }
            });

            console.log('You just clicked on marker with marker_id' + el.data('marker_id'));
        })
        .on('click', '.map__marker .close', function(e) {
            e.stopPropagation();
            var el = $(this).parent();
            el.removeClass('active');

            var mapHeading = $('.map__heading'),
                mapContent = $('.map__content');

            mapContent.find('#marker-' + el.data('marker_id'))
                .slideUp(250, function() {
                    $(this).remove();

                    if (!mapContent.last().children().length) {
                        mapHeading.removeClass('active');
                    }
                });

            console.log('You just closed marker with marker_id ' + el.data('marker_id'));
        });
})();
