(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){

    //draggable();
  }

  //function draggable(){
    //$('#newNote').draggable();
  //}

  var drags = '#newNote, #nprWrap, #bigPic';//add here your draggable divs

  $(function() {$(drags).draggable();});

})();

