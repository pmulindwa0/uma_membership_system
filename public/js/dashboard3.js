$(document).ready(function () {
    "use strict";
    /*$(".counter").counterUp({
        delay: 100,
        time: 1200
    });*/

    $('.vcarousel').carousel({
        interval: 3000
    })
    //******************************************//
    // Markers 0.328148,32.6078928, 32.6147324	0.3140376, 32.6124464, 0.3142874
    //******************************************//
    var map_2;
    map_2 = new GMaps({
        div: '#map_2',
        lat: 0.328148,
        lng: 32.6078928
    });
    
    map_2.addMarker({
        lat: 0.3140376,
        lng: 32.6147324,
        title: 'Lima',
        details: {
            database_id: 42,
            author: 'HPNeo'
        },
        click: function(e) {
            if (console.log)
                console.log(e);
            alert('You clicked in this marker');
        }
    });
    map_2.addMarker({
        lat: 0.3142874,
        lng: 32.6124464,
        title: 'Marker with InfoWindow',
        infoWindow: {
            content: '<p>HTML Content</p>'
        }
    });
    // Google map
    var map_4;
    map_4 = new GMaps({
        div: '#map_4',
        lat: 0.3132008,
        lng: 32.5290845
    });
/*[0.3132008,32.5290845] //kampala
[0.3971569,32.4684297] //wakiso
[0.3766509,32.9163507] //lugazi
[0.212988, 32.324095]//Mpigi
[0.0475944,32.435283] //entebe*/
    var path2 = [
        [0.3971569,32.4684297],
        [0.3766509,32.9163507],
        [0.212988, 32.324095],
        [0.0475944,32.435283]
    ];

    polygon = map_4.drawPolygon({
        paths: path2,
        strokeColor: '#BBD8E9',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#BBD8E9',
        fillOpacity: 0.6
    });
    

    // $('#usa').vectorMap({
    //     map: 'us_aea_en',
    //     markers: [
    //         {
    //             latLng: [36.77, -119.41],
    //             name: 'California visit : 250'

    //   },
    //         {
    //             latLng: [34.15, -105],
    //             name: 'New Maxico visit : 250'

    //   },
    //         {
    //             latLng: [41.49, -99.90],
    //             name: 'Nebraska visit   : 1250'

    //   },
    //         {
    //             latLng: [25.20, 55.27],
    //             name: 'UAE : 250'

    //   }],

    //     backgroundColor: 'transparent',
    //     regionStyle: {
    //         initial: {
    //             fill: '#c1ccd1'
    //         }
    //     }
    // });

    //ct-weather
    new Chartist.Line('#ct-city-wth', {
        labels: ['12AM', '2AM', '6AM', '9AM', '12AM', '3PM', '6PM', '9PM'],
        series: [
    [5, 2, 7, 4, 5, 3, 5, 4]
  ]
    }, {
        chartPadding: {
            left: -20,
            top: 10,
        },
        low: 1,
        showPoint: true,
        fullWidth: true,
        plugins: [
    Chartist.plugins.tooltip()
  ],
        axisX: {
            showLabel: true,
            showGrid: false
        },
        axisY: {
            showLabel: false,
            showGrid: false
        },
        showArea: true
    });

    $("#sparkline8").sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
        type: 'line',
        width: '100%',
        height: '50',
        lineColor: '#cfecfe',
        fillColor: '#cfecfe',
        maxSpotColor: '#cfecfe',
        highlightLineColor: 'rgba(0, 0, 0, 0.2)',
        highlightSpotColor: '#cfecfe'
    });
    $("#sparkline9").sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
        type: 'line',
        width: '100%',
        height: '50',
        lineColor: '#f1effd',
        fillColor: '#f1effd',
        minSpotColor: '#f1effd',
        maxSpotColor: '#f1effd',
        highlightLineColor: 'rgba(0, 0, 0, 0.2)',
        highlightSpotColor: '#f1effd'
    });
    var sparkResize;

    $(window).on("resize", function (e) {
        clearTimeout(sparkResize);
        sparkResize = setTimeout(sparklineLogin, 500);
    });
});
