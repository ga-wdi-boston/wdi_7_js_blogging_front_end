'use strict';

var App = App || {};

// App.submitCategory = function ( event ) {
//   event.preventDefault();
//   $.ajax({
//     url: 'http://localhost:3000/categories',
//     type: 'POST',
//     dataType: 'JSON',
//     data: {
//       post: { // may have to give it post id?
//         category: $('#post-category').val()
//       }
//     },
//   }).then(function(data) {
//     console.log(data);
//   }, function(jqXHR, textStatus, errorThrown) {
//     console.log(jqXHR, textStatus, errorThrown);
//   });
//   return false;
// };

App.categoryMenu = function () {
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET',
    dataType: 'JSON',
    data: {
      post: {
        category: []
      }
    },
  }).then(function(data) {
    console.log(data);
  }, function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  });
};

// App.deleteCategory = function ( Category ) {
//   $.ajax({
//     url: 'http://localhost:3000/categories/' + Category.id,
//     type: 'DELETE',
//     dataType: 'JSON',
//   }).then(function(data) {
//     console.log(data);
//   }, function(jqXHR, textStatus, errorThrown) {
//     console.log(jqXHR, textStatus, errorThrown);
//   });
//   return false;
// };

// App.updateCategory = function ( id ) {
//   $.ajax({
//     url: 'http://localhost:3000/categories/' + id,
//     type: 'PATCH',
//     dataType: 'JSON',
//     data: {
//       post: {
//         category: []
//       }
//     },
//   }).done(function(data){
//     console.log(data);
//   }, function(jqXHR, textStatus, errorThrown) {
//     console.log(jqXHR, textStatus, errorThrown);
//   });
//   return false;
// };