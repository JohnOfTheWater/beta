/* global google:true */
(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    //$('#mappa').hide();
    $('#show').click(showMap);
    $('#closeMappa').click(hideMap);

    findMyLocation();
  }

  var latitude;
  var longitude;

  function findMyLocation(){
    console.log('findMyLocation');
    getLocation();
  }

  function getLocation(){
    console.log('getLocation');
    var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  }

  function geoSuccess(location) {
    console.log('geoSuccess');
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    console.log('lat', latitude);
    console.log('lng', longitude);

    //$('#search').show();
  }

  function geoError() {
    console.log('Sorry, no position available.');
  }


  function showMap(){
    $('#mappa').css('visibility', 'visible');
    //$('#mappa').fadeToggle('fast');
  }

  function hideMap(){
    $('#mappa').css('visibility', 'hidden');
  }

  var lat = 36.124789199999995;
  var lon = -86.7258631;

  var mapOptions = {
    center: new google.maps.LatLng(lat,lon),
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('mappa'), mapOptions);

  var markerOptions = {
    position: new google.maps.LatLng(lat, lon)
  };

  var marker = new google.maps.Marker(markerOptions);
  marker.setMap(map);

  var infoWindowOptions = {
    content: 'your Note was taken Here!'
  };

  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
  google.maps.event.addListener(marker,'click',function(e){

    infoWindow.open(map, marker);
  });

})();

