/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var display = function(data){
  var postData = '';
  for(var i = 0; i < data.length; i++){
    if(data[i].categories.length != 0 && data[i].images.length === 0){ // post has categories and no pictures
      for(var categoryIndex = 0; categoryIndex < data[i].categories.length; categoryIndex++){
        postData += '<div id=' + i + '><p><b>' + data[i].title + '</b></p>' + '<p>' + data[i].body + '</p></div>' + '<small>' + data[i].categories[categoryIndex].id + " " + data[i].categories[categoryIndex].name + " " + data[i].categories[categoryIndex].created_at + " " + data[i].categories[categoryIndex].updated_at + '</small>';
        $('#posts').html(postData);
    };
  } else if(data[i].categories.length != 0 && data[i].images.length != 0){ // post has categories and pictures
      for(var categoryIndex = 0; categoryIndex < data[i].categories.length; categoryIndex++){
        for(var imageIndex = 0; imageIndex < data[i].images.length; imageIndex++){
          postData += '<div id=' + i + '><p><b>' + data[i].title + '</b></p>' + '<p>' + data[i].body + '</p>' + '<img src="' + data[i].images[imageIndex].url + '</div>' + '<small>' + data[i].categories[categoryIndex].id + " " + data[i].categories[categoryIndex].name + " " + data[i].categories[categoryIndex].created_at + " " + data[i].categories[categoryIndex].updated_at + '</small>';
            $('#posts').html(postData);
          };
        };
    } else if(data[i].categories.length === 0 && data[i].images.length != 0){
        for(var imageIndex = 0; imageIndex < data[i].images.length; imageIndex++){
          postData += '<div id=' + i + '><p><b>' + data[i].title + '</b></p>' + '<p>' + data[i].body + '<img src="' + data[i].images[imageIndex].url +'</p></div>';
          $('#posts').html(postData);
        };
  } else { //post has no categories and no images
      postData += '<div id=' + i + '><p><b>' + data[i].title + '</b></p>' + '<p>' + data[i].body + '</p></div>';
      $('#posts').html(postData);
    };
  };
};

var App = App || {};

$(document).ready(function(){
  trace('hello world');
});

App.displayPosts = function(event){
  // if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET'
    }).done(function(data){
      trace(data);
      display(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
    });
    return false
  };

$('document').ready(function(){
    App.displayPosts(event);
});
/*"109885dca2fc451fbca7d7795ff65355"*/
