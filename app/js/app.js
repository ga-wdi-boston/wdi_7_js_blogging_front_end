/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.submitUser = function(event, form){
  if (event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'POST',
    dataType: 'JSON',
    data: {
      user: {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        password_confirmation: $('#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('lastname').val(),
      }
    },
    success: function(data, textStatus, jqXHR){
      trace(data, textStatus, jqXHR);
    }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
}

// App.addCategory = function(event){
//   if(event.preventDefault) event.preventDefault();
//   $.ajax({
//     url: 'http://localhost:3000/posts',
//     type: 'POST',
//     dataType: 'JSON',
//     data: {
//       post: {
//         categories: {
//           name: $('#post-category').val()
//         }
//       }
//     },
//     headers: { 'AUTHORIZATION': '3993a861c060430b82c24f9b6c8fd7d8' },
//   }).done(function(data){
//     trace(data);
//     debugger
//   }).fail(function(jqXHR, textStatus, errorThrown){
//     trace(jqXHR, textStatus, errorThrown);
//     debugger // this is currently failing
//   });
// }

App.submitPost = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val(),
      }
    },
    headers: { 'AUTHORIZATION': '3993a861c060430b82c24f9b6c8fd7d8' },
  }).done(function(data){
    trace(data);
    debugger
    data.categories.name.push($('#post-category').val());
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
}

App.showPosts = function(event){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON'
  }).done(function(data){
    trace('success');
    trace(data);
    for (var i = 0; i < data.length; i++) {
      var html = "<div id='post-" + data[i].id + "'>";
      html += "<h3>" + data[i].title + "</h3>";
      html += "<p>" + data[i].body + "</p>";
      html += "<h4>Categories:</h4>";
      if (data[i].categories.length > 0){
        data[i].categories.forEach(function(category){
          html += "<article>" + category.name + "</article>";
        });
      }
      html += "</div>";
      $('.posts').append(html);
    }
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
}

$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
    App.addCategory(event);
  });

  App.showPosts();

  trace('if you can read this, you are probably a web developer');
});

// javy
//3993a861c060430b82c24f9b6c8fd7d8
