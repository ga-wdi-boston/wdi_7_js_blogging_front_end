'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var BlogApp = BlogApp || {};

BlogApp.showCategories = function(){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET'
  })
  .done(function(data) {
    console.table(data);
  BlogApp.renderAllCategories(data);
  });
};

BlogApp.renderAllCategories = function(categories) {
  categories.forEach(function(category){
    var category_html = "<li class='category'><button type='button' id='category-" + category.id + "-button'>Delete</button>" + category.name + "</li>";
    $('.categories').append(category_html);
  });
};

BlogApp.submitCategory = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    dataType: 'JSON',
    data: {
      category: {
        name: $('#category-name').val(),
      }
    },
    // headers: { 'AUTHORIZATION': 'fa2beb3f8c2d4918a848286c8add092f' },
  }).done(function(new_category) {
    trace(new_category);
    BlogApp.addOneCategory(new_category);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

BlogApp.addOneCategory = function(category) {
  var one_category_html = '<li>' + category.name + '</li>';
  $('.categories').append(one_category_html);
};

BlogApp.deleteCategory = function(category){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/categories/' + this.id,
    type: 'DELETE'
  }).done(function(deleted_category){
    trace(deleted_category);
    // BlogApp.deleteOneCategory;
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};
