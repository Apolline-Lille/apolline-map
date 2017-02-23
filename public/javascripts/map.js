var map = L.map('mapLille1').setView([50.6088164,3.140037], 17);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2hhbndhbmd6aGUiLCJhIjoiY2l0eTRra3g4MDRvaDJ4bjI5cThxbmRtayJ9.i8U4waJuLb7FJL8IaNPN3g', {
    maxZoom: 30,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.outdoors'
}).addTo(map);






