/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};
var categoryArray;


App.Category = function(id, name) {
  this.id = id;
  this.name = name;
};

App.submitCategory = function(event){
  if(event.preventDefault) event.preventDefault();

  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    dataType: 'json',
    data: {
      category: {
        name: $('#post-category').val(),
      }
    },
    headers: { 'AUTHORIZATION': 'c9436520a9ef4cd099b95bb9a41738f2' },
  })
  .done(function(data) {
    trace(data);
    $('#newcategory-form .clearme').val('');
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  });

   $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
  })
  .done(function(results) {
    console.log(results);
    // results.forEach(App.showPosts);
  });
};

App.showAllCategories = function(){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET'
  })
  .done(function(results){
      console.log('category success');
      results.forEach(App.showCategories);
      categoryArray = results;
      $('.catdivs').on('click', function() {
        console.log('click works');
        var $highlightcat = $(this).closest('.catdivs');
        if ($highlightcat.hasClass('cathighlighted')){
          $highlightcat.removeClass('cathighlighted');
        } else {
          $highlightcat.addClass('cathighlighted');
        }
      });
  });
  return categoryArray;
};

App.showCategories = function(category){

  var $categoryDivs = $('<div class="catdivs" id=category id='+ category.id + '>');
  var $categoryText = $('<p>' + category.name + '</p>');
  $categoryDivs.append($categoryText);
  $('#categoriesList').append($categoryDivs);

};

//   App.iterateCategories = function(array){
//   for (var i = 0; i <= array.length; i++) {
//     console.log(array[i]);
//   }
// };



$(document).ready(function(){

  // App.iterateCategories(categoryArray);


   var $categoryForm = $('form#newcategory-form');
  $categoryForm.on('submit', function(event){
    App.submitCategory(event, $categoryForm);
  });

  App.showAllCategories();
});




// App.$categoriesDiv = $('#categories');
// App.addCategory = function(category){
//   var newCategory = new App.Category(category.id, category.name);

//   var $newCategoryHTML = $('<div class=category id='+ category.id + '>');
//   $newCategoryHTML.html('<h3>' + category.name + '</h3>' + '<input type=button class=delete id=' + category.id + ' value="Delete Category" >');

//   App.$categoriesDiv.append($newCategoryHTML);

// };

// App.allCategories = function(){
//   $.ajax({
//     url: 'http://localhost:3000/categories',
//     type: 'GET'
//   })
//   .done(function(data){
//       data.forEach(App.addOneCategory);

//       var $categoryButtons = $('[type=button].delete');
//       $categoryButtons.on('click', function(){
//         App.deleteCategory(this.id);
//       });

//     });
// };

// App.deleteCategory = function(id){

//   $.ajax({
//     url: 'http://localhost:3000/categories/' + parseInt(id),
//     type: 'DELETE',
//     headers: {'AUTHORIZATION': 'c9436520a9ef4cd099b95bb9a41738f2'},
//   }).done(function(data){
//     trace(data)
//     $('.category#'+ parseInt(id)).remove();
//   }).fail(function(jqXHR, textStatus, errorThrown){
//     trace(jqXHR, textStatus, errorThrown);
//   });
// };
