'use strict';

var Categories = Categories || {};

Categories.submitCategory = function(event, form){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    dataType: 'JSON',
    data: {
      user: {
        name: $('#name').val()
      }
    },
  }).done(function(data){
    console.log(data);
  })
};

Categories.showCategory = function(){

};


$(document).ready(function(){
  var $categoryForm = $('form#category-form');
  $categoryForm.on('submit', function(event){
    Categories.submitCategory(event, $categoryForm);
  });

  console.log('this shows');
};
