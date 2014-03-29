(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){

    //draggable();
  }

  //function draggable(){
    //$('#newNote').draggable();
  //}

  var drags = '#newNote, #nprWrap, #bigPic, #audioWindow';//add here your draggable divs

  $(function() {$(drags).draggable();});

})();

