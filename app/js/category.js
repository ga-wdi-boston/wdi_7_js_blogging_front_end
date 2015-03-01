'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.Category = function(title){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    datatype: 'JSON',
    data: {
      category:{
        title: $('#category-title').val()
      }
   },
    headers: { 'AUTHORIZATION': '7629d6fdca39422582e71daa921234da' }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

$(document).ready(function(){
  };
