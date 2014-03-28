'use strict';

(function() {

  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
      width = 320,
      height = 0;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log('An error occured! ' + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
///tmp/4016-1po6k78.mp3
})();

$('#get').click(get);

//function get(){
  //debugger;
  //var stuff = $('#photo').attr('src');
  //$('#roffo').val(stuff);
//}

function get(){
    debugger;
    var id = '5334ca517a49d8a20d319b55';
    var body = $('#photo').attr('src');
    var k = {body:body};
    var data = k;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/rollo/' + id;
    var type = 'POST';
    var success = function(count){
      alert('your note has been succesfuly updated');
      console.log(count);
    };
    $.ajax({url:url, type:type, data:data, success:success});
  }
