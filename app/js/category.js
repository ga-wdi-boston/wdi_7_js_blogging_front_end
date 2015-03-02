/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.Category = App.Category || {};

App.Category.Category = function(id, name) {
  this.id = id;
  this.name = name;
};

App.$categoriesDiv = $('#categories');

App.Category.addCategory = function(category){
  var newCategory = new App.Category(category.id, category.name);

  var $newCategoryHTML = $('<div class=category id='+ category.id + '>');
  $newCategoryHTML.html('<h3>' + category.name + '</h3>' + '<input type=button class=delete id=' + category.id + ' value="Delete Category" >');

  App.$categoriesDiv.append($newCategoryHTML);

};

App.Category.viewAllCategories = function(){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET'
  })
  .done(function(data){
      data.forEach(App.addCategory);

      var $categoryButtons = $('[type=button].delete');
      $categoryButtons.on('click', function(){
        App.deleteCategory(this.id);
      });

    });
};


App.Category.deleteCategory = function(id){

  $.ajax({
    url: 'http://localhost:3000/categories/' + parseInt(id),
    type: 'DELETE',
    headers: {'AUTHORIZATION': '50a82b94c0a34e3fa66044e3c269dd18'},
  }).done(function(data){
    trace(data)
    $('.category#'+ parseInt(id)).remove();
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};



$(document).ready(function(){
  App.Category.viewAllCategories();
});

//user token "50a82b94c0a34e3fa66044e3c269dd18"
