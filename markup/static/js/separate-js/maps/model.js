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

    google.maps.event.addListener(map, 'tilesloaded', function() {
        // hide google logo etc
        modelMap.find('.gm-style-cc').hide();
        modelMap.find('.gmnoprint ').hide();
        modelMap.find('.gmnoscreen').hide();
        modelMap.find('[target="_blank"]').parent().hide();
        modelMap.find('[target="_new"]').parent().hide();
    });


    // random marker position
    var rand = function (n) {
        return Math.random() > .5 ? n - Math.random() : n + Math.random()
    };

    // just generate random string
    var generateId = function() {
        return Math.random().toString(36).replace('.', '');
    };

    // markers
    var locations = [],
        avatars = ['navbar', 'andrew', 'anya', 'jackson', 'john', 'mika', 'miya', 'sarah'];

    // generate markers
    for (var i = 0; i < 500; i++) {
        locations.push(new google.maps.LatLng(rand(40.76163), rand(-73.97486600000002)));
    }

    var markers = locations.map(function(loc) {
        return new CustomMarker(loc, map, {
            marker_id: generateId(),
            img: 'static/img/content/avatars/' +  avatars[Math.floor(Math.random() * avatars.length)] + '.png',
        });
    });

    // add a few groups
    var group1 = new CustomGroup(new google.maps.LatLng(35.76163, -65.97486600000002), map);
    group1.add('static/img/content/avatars/navbar.png', generateId());
    group1.add('static/img/content/avatars/andrew.png', generateId());
    group1.add('static/img/content/avatars/anya.png', generateId());
    group1.add('static/img/content/avatars/jackson.png', generateId());
    group1.add('static/img/content/avatars/john.png', generateId());
    group1.add('static/img/content/avatars/mika.png', generateId());
    group1.add('static/img/content/avatars/miya.png', generateId());

    var group2 = new CustomGroup(new google.maps.LatLng(32.76163, -60.97486600000002), map);
    group2.add('static/img/content/avatars/navbar.png', generateId());
    group2.add('static/img/content/avatars/mika.png', generateId());
    group2.add('static/img/content/avatars/miya.png', generateId());
    group2.add('static/img/content/avatars/sarah.png', generateId());

    markers.push(group1);
    markers.push(group2);

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

    $('.model-map')
        .on('click', '.map__marker', function() {
            var el = $(this);

            if (el.hasClass('active')) {
                return;
            }

            el
                .addClass('active')
                .siblings('.map__marker')
                .removeClass('active')
                .siblings('.map__group')
                .removeClass('active');

            $('.map__heading').addClass('active');

            $.ajax({
                url: 'model-map-ajax-example.html',
                type: 'GET',
                success: function(data) {
                    var model = $('.map__content')
                        .last()
                        .html('')
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
        })
        .on('click', '.map__group', function() {
            var el = $(this);

            if (el.hasClass('active')) {
                return;
            }

            var pMap = el.parents('.map');

            pMap.find('.map__marker').removeClass('active');
            pMap.find('.map__group').removeClass('active');

            el.addClass('active');

            $.ajax({
                url: 'model-map-ajax-example.html',
                type: 'GET',
                success: function(data) {
                    var model = $('.map__content').last().html('');

                    el.data('group_id').split(',').forEach(function(item) {
                        model
                            .append(data)
                            .children()
                            .last()
                            .attr('id', 'group-' + item);

                        modelPreviewInit(model); // init effects slider, etc.
                    });
                }
            });

            console.log('You just clicked on marker with group_id ' + el.data('group_id'));
        })
        .on('click', '.map__group .close', function(e) {
            e.stopPropagation();
            var el = $(this).parent();
            el.removeClass('active');

            var mapHeading = $('.map__heading'),
                mapContent = $('.map__content'),
                ids = el.data('group_id').split(',');

                ids.forEach(function(item) {
                    mapContent.find('#group-' + item)
                        .slideUp(250, function() {
                            $(this).remove();

                            if (!mapContent.last().children().length) {
                                mapHeading.removeClass('active');
                            }
                        });
                });

            console.log('You just closed marker with group ' + el.data('group_id'));
        })
})();
