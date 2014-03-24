(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#regFieldset').hide();
    $('#newNote').hide();
    $('#dateS').hide();
    $('#alpha').hide();
    $('#searchResult').hide();
    $('#searchP *').hide();
    $('#regLog').click(showRegLogPanel);
    $('#closeReg').click(closeRegLogPanel);
    $('#closeNewNote').click(closeNewNote);
    $('#showN').click(showNewNote);
    $('#sort').click(showSortOptions);
    $('#dateS').click(sortByDate);
    $('#alpha').click(sortByAlpha);
    $('#srcNB').click(searchByName);
    $('#searchP').click(showSearchOptions);
    $('#notesWrap').on('click', '.picture', queryNote);
    $('#noteWrap').on('click', '.noteButton', updateNote);
  }

//------animations-------/

  function showSearchOptions(){
    $('#dateS').fadeOut('fast');
    $('#alpha').fadeOut('fast');
    $('#searchP *').fadeIn(500);
  }

  function showSortOptions(){
    $('#searchP *').fadeOut('fast');
    $('#dateS').fadeIn(500);
    $('#alpha').fadeIn(500);
  }

  function showRegLogPanel(){
    $('#regFieldset').fadeIn(1000);
    $('#regName').focus();
  }

  function closeRegLogPanel(){
    $('#regFieldset').fadeOut(1000);
  }

  function showNewNote(){
    $('#newNote').fadeIn(500);
    $('#noteTitle').focus();
  }

  function closeNewNote(){
    $('#newNote').fadeOut(500);
  }
//--------search by neme/date/tags-------//

  function searchByName(){
    debugger;
    var title = $('#srcName').val();
    //title = title.replace(' ', '-');
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/noteTitle/'+title;
    $.getJSON(url, displaySBD);
  }

//-------sort by date/alpha-------//

  function sortByDate(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/notesByDate';
    $.getJSON(url, displaySBD);
  }

  function sortByAlpha(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/notesByAlpha';
    $.getJSON(url, displaySBD);
  }

  function displaySBD(data){
    debugger;
    $('#searchResult').fadeIn();
    $('#searchResult .picture').remove();
    //$('.fotoMI').remove();
    for(var i = 0; i < data.notes.length; i++){
      appendSBD(data.notes[i]);
    }
  }

  function appendSBD(note){
    var $picture = $('<div>');
    var $title = $('<div>');
    var $date = $('<div>');
    var $tags = $('<div>');
    var $sample = $('<div>');
    var date = note.dateCreated.substr(0, 10);

    $picture.addClass('picture');
    $title.addClass('titleResult').text(note.title);
    $date.addClass('dateResult').text(date);
    $tags.addClass('tagsResult').text(note.tags);
    $sample.addClass('sampleResult').text(note.sample+'...');

    $($picture).hide();

    $picture.append($sample);
    $picture.append($tags);
    $picture.append($date);
    $picture.append($title);
    $('#result').append($picture);

    $($picture).fadeIn('slow');
  }

//-------query note-------//
  function queryNote(){
    var id = $(this).attr('value');
    console.log(id);
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/note/'+id;
    $.getJSON(url, displayNote);
  }

  function displayNote(data){
    debugger;
    $('.noteTitle, .noteData, .noteBody, .noteTags, .notePicture').remove();
    data = data.note;
    var $title = $('<div>');
    var $date = $('<div>');
    var $body = $('<div>');
    var $tags = $('<div>');
    var $picture = $('<div>');
    var $picture2 = $('<div>');
    var $picture3 = $('<div>');
    var $edit = $('<textarea>');
    var $update = $('<button>');
    var $form = $('<form>');
    var $input = $('<input>');
    var $button = $('<button>');
    var date = data.dateCreated.slice(0, 10);

    $title.text(data.title).addClass('noteTitle').attr('data-id', data._id);
    $date.text(date).addClass('noteData').attr('data-id', data._id);
    $body.text(data.body).addClass('noteBody').attr('data-id', data._id);
    $tags.text(data.tags).addClass('noteTags').attr('data-id', data._id).attr('value', data.tags);
    $picture.addClass('notePicture').attr('data-id', data._id).css('background', 'url("'+data.photo[0]+'")').css('background-size', 'cover').attr('value', data.photo[0]);
    $picture2.addClass('notePicture2').attr('data-id', data._id).css('background', 'url("'+data.photo[1]+'")').css('background-size', 'cover');
    $picture3.addClass('notePicture3').attr('data-id', data._id).css('background', 'url("'+data.photo[2]+'")').css('background-size', 'cover');
    $edit.text(data.body).addClass('noteEdit').attr('data-id', data._id);
    $update.text('Save').addClass('noteButton').attr('data-id', data._id).val(data.userId);
    $form.addClass('noteForm').attr('data-id', data._id).attr('action', '/noteAddPic/'+ data._id).attr('method', 'post').attr('enctype', 'multipart/form-data').val(data.userId);
    $input.addClass('noteInput').attr('data-id', data._id).attr('type', 'file').attr('name', 'photo');
    $button.text('Add Photo').addClass('noteFormButton').attr('data-id', data._id).val(data.userId);

    $('#title').append($title);
    $('#date').append($date);
    $('#body').append($body);
    $('#tags').append($tags);
    $tags.append($edit);
    $tags.append($update);
    $form.append($input);
    $form.append($button);
    $('#form').append($form);
    $picture2.append($picture3);
    $picture.append($picture2);
    $('#picture').append($picture);
  }

  function updateNote(){
    var id = $(this).data('id');
    var body = $('.noteEdit[data-id="'+id+'"]').val();
    var k = {body:body};
    var data = k;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/note/' + id;
    var type = 'PUT';
    var success = function(count){
      $('.noteTitle, .noteData, .noteBody, .noteTags, .notePicture').remove();
      console.log(count);
      alert('your note has been succesfuly updated');
      window.location.replace('/notes');
    };
    $.ajax({url:url, type:type, data:data, success:success});

  }

})();

