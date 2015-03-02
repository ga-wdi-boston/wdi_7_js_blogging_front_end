var App = App || {};

console.log('yo');

App.Categories = function(event){
  $.ajax({
    url: 'http://localhost:3000/category',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  });
}

$(document).ready(function(){
  App.Categories();
});
