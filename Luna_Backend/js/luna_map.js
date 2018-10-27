const UNDEF    = 'undefined'

var lights = [
// title, desc ,  lat , long      , range , colour, id
  ['UrbanIoTHack1', UNDEF, -32.92642,  151.756397, 1, "#0000FF", 'd073d537f9d4'],
  ['UrbanIoTHack2', UNDEF, -32.926447, 151.756377, 1, "#0000FF", 'd073d537dc56'],
  ['UrbanIoTHack3', UNDEF, -32.92647,  151.75641, 1, "#0000FF", 'd073d53a0021'],
  ['UrbanIoTHack4', UNDEF, -32.926441, 151.756431, 1, "#0000FF", 'd073d539c941']
];


var lat;
var lng;


function formSubmit(form) {
  /*
    parent.url_slug = url_slug;
    parent.$.fancybox.close();
  */
  //alert ('hello ' + form['index'].value + ' ' + form['range'].value + ' ' + form['color'].value);
  //lights[form['index'].value][4] = form['range'].value
  lights[form['index'].value][5] = form['color'].value
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

$(function () {
  var markers = [];
  var markerPersons = [];
  var infos = [];

    function initMap() {

      var location = new google.maps.LatLng(-32.92644, 151.75638);

      var mapCanvas = document.getElementById('map');
      var mapOptions = {
          center: location,
          zoom: 19,
          panControl: false,
          mapTypeId: google.maps.MapTypeId.SATELLITE
      }
      var map = new google.maps.Map(mapCanvas, mapOptions);
      //map.setTilt(0);

      for (i = 0; i < lights.length; i++)
      {
        var r = parseInt(lights[i][5].substr(1,2),16);
        var g = parseInt(lights[i][5].substr(3,2),16);
        var b = parseInt(lights[i][5].substr(5,2),16);

        marker = new google.maps.Marker({
      //      icon:     locations[i][7] == UNDEF ? '' : locations[i][7],
          position: new google.maps.LatLng(lights[i][2], lights[i][3]),
          map: map,
        });
        marker.setIcon('images/b.png');

        var content = '<div class="info-window">' +
                '<h3>' + lights[i][0] + '</h3>' +
                '<div class="info-content">' +
                '<form action="#" onsubmit="formSubmit(this); return false;">' +
                '<label for="range">Range</label>' +
                '<input type="hidden" name="index" value="' + i + '" />' +
                '<input type="range" id="start" name="range" min="1" max="10" value="' + lights[i][4] + '"/>' +
                '<input type="color" name="color" value="' + lights[i][5] + '" />' +
                '<input type="submit" value="Apply" />' +
                '</form>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
            return function() {
              closeInfos();
              infowindow.setContent(content);
              infowindow.open(map,marker);
              infos[0]=infowindow;
            };
        })(marker,content,infowindow));

        markers.push(marker);
      }

      fetch('lat.txt')
        .then(response => response.text())
        .then(text => lat = text)
      fetch('lng.txt')
        .then(response => response.text())
        .then(text => lng = text)

      var marker  = new google.maps.Marker({
      //      icon:     locations[i][7] == UNDEF ? '' : locations[i][7],
          position: new google.maps.LatLng(lat, lng),
          map: map,
        });
      marker.setIcon('images/person.png');
      markerPersons.push(marker);
    }


    function closeInfos(){
      if(infos.length > 0){
        /* detach the info-window from the marker ... undocumented in the API docs */
        infos[0].set("marker", null);
        /* and close it */
        infos[0].close();
        /* blank the array */
        infos.length = 0;
      }
    }


    function updateMarkers()
    {
      for (i = 0; i < lights.length; i++)
      {
        var r = parseInt(lights[i][5].substr(1,2),16);
        var g = parseInt(lights[i][5].substr(3,2),16);
        var b = parseInt(lights[i][5].substr(5,2),16);

        var marker = markers[i];

        if(r>g && r>b) {
          marker.setIcon('images/r.png');
        } else if(g>r && g>b) {
          marker.setIcon('images/g.png');
        } else if(b>g && b>r) {
          marker.setIcon('images/b.png');
        } else {
          marker.setIcon('images/o.png');
        }

        var content = '<div class="info-window">' +
                '<h3>' + lights[i][0] + '</h3>' +
                '<div class="info-content">' +
                '<form action="#" onsubmit="formSubmit(this); return false;">' +
                '<label for="range">Range</label>' +
                '<input type="hidden" name="index" value="' + i + '" />' +
                '<input type="range" id="start" name="range" min="1" max="10" value="' + lights[i][4] + '"/>' +
                '<input type="color" name="color" value="' + lights[i][5] + '" />' +
                '<input type="submit" value="Apply" />' +
                '</form>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
            return function() {
              closeInfos();
              infowindow.setContent(content);
              infowindow.open(map,marker);
              infos[0]=infowindow;
            };
        })(marker,content,infowindow));
      }

      fetch('lat.txt')
        .then(response => response.text())
        .then(text => lat = text)
      fetch('lng.txt')
        .then(response => response.text())
        .then(text => lng = text)

      markerPersons[0].setPosition(new google.maps.LatLng(lat, lng));

      for (i = 0; i < lights.length; i++)
      {
        thisLat = lights[i][2];
        thisLng = lights[i][3];

        var R = 6371000; // Radius of the earth in m
        var dLat = deg2rad(lat-thisLat);
        var dLon = deg2rad(lng-thisLng);
        var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(thisLat)) * Math.cos(deg2rad(lat)) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in m

//        d = Math.sqrt((lat-thisLat)*(lat-thisLat) +  (lng-thisLng)*(lng-thisLng))
//        console.log('Light: ' + i + '. d=' + d + '.');
        d = Math.exp(-d / lights[i][4]);
//        console.log('Light: ' + i + '. d=' + d + '.');

        cmd = new Object;
        cmd.power = "on";
        cmd.color = lights[i][5];
        cmd.brightness = d

        $.ajax({
            url: 'https://api.lifx.com/v1/lights/id:' + lights[i][6] + '/state',
            //url: 'https://api.lifx.com/v1/lights/id:d073d537f9d4/state',
            type: 'PUT',
            dataType: 'json',
            beforeSend: function(request) {
              request.setRequestHeader("Authorization", "Bearer cf2e8db130431b6b57db493bca6e2d50da430628b9c236d8a9ed5523a6b670e2");
            },
            data: cmd,
            success: function (data, textStatus, xhr) {
                console.log(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation: ' + xhr.status + ' (' + errorThrown + ')');
            }
        });
      }

    }

    google.maps.event.addDomListener(window, 'load', initMap);

    var intervalID = setInterval(function(){ updateMarkers(); }, 2000);
});
