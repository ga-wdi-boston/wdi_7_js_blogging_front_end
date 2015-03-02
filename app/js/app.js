/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  $posts: $('.posts')
};

App.submitUser = function(event, form){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'POST',
    dataType: 'json',
    data: {
      user: {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        password_confirmation: $('#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val(),
      }
    },
    success: function(data, textStatus, jqXHR){
      console.log('New User created!', data, textStatus, jqXHR);
        }
  })
  .done(function(data) {
    trace(data);
    $('#user-form .clearme').val('');
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  });

};

App.submitPost = function(event){
  if(event.preventDefault) event.preventDefault();
  var $title = $('#post-title').val();
  var $body = $('#post-body').val();

  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'json',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val(),
      }
    },
    headers: { 'AUTHORIZATION': 'c9436520a9ef4cd099b95bb9a41738f2' },
  })
  .done(function(data) {
    trace(data);
    $('#new-post-form .clearme').val('');
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  });

   $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
  })
  .done(function(results) {
    console.log("success");
    results.forEach(App.showPosts);
  });
};

App.showOnePost = function(post){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts/' + post.id,
    type: 'GET',
    data: {
      post: {
        title: $('#post-title'),
        body: $('#post-body'),
      }
    },
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  });
};


App.showPosts = function(post) {
  if(event.preventDefault) event.preventDefault();
  var div = $('<div class="eachpost">');
  var  html = $('<h3>' + post.title + '</h3>');
  var postBody = $('<p class="pbody">' + post.body + '</p><br>');

  var catselect = $('<br><select id="cat-btn" name="category"><option value="">select category</option><option value="test1">design</option><option value="test2">development</option><option value="test3">illustration</option><option value="test4">photography</option><option value="test5">ruby</option></select>');
  var submit = $('<input id="catsubmit" type="submit" value="submit"/><br>');
  var deleteBtn = $('<button class="delbtn">delete me</button>');
  postBody.append(catselect);
  postBody.append(submit);
  postBody.append(deleteBtn);
  html.append(postBody);
  div.append(html);
  $('.posts').append(div);
};

App.showAllPosts = function(){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
  })
  .done(function(results) {
    console.log("success");
    results.forEach(App.showPosts);
    $('.pbody').hide();
    $('.eachpost').on('mouseenter', function() {
    //console.log('click works');
    $(this).closest('.eachpost').find($('.pbody')).slideDown();
    $(this).addClass('highlighted');
  });
    $('.eachpost').on('mouseleave', function() {
    //console.log('click works');
    $(this).closest('.eachpost').find($('.pbody')).slideUp();
    $(this).removeClass('highlighted');
  });
    $('.delbtn').on('click', function() {
        alert('Haha, no.');
        App.deletePost();
    });
    $('#catsubmit').on('click', function() {
        alert('Haha, no.');
    });
  });
};

// App.addCategory = function(event){
//   if(event.preventDefault) event.preventDefault();
//   $.ajax({
//     url: 'http://localhost:3000/posts/' + post.id + '/categories/' + category.id,
//     type: 'PATCH',
//     data: {
//       post: {
//         categories: $('#post-category').val()
//       }
//     }
//   })
//   .done(function(results) {
//     console.log('category added');
//   });
// };

App.deletePost = function(post){
  $.ajax({
    url: 'http://localhost:3000/posts' + post.id,
    type: 'DELETE',
    headers: { 'AUTHORIZATION': 'c9436520a9ef4cd099b95bb9a41738f2' },
  })
  .done(function() {
    console.log("post deleted");
    $('.post#'+ parseInt(id)).remove();
  })
  .fail(function() {
    console.log("error");
  });

};

$(document).ready(function(){
  trace('hello world');
  $('#new-post-form').hide();
  $('#user-form').hide();
  $('#newcategory-form').hide();

  $('#post-btn').on('click', function() {
    $('#new-post-form').slideToggle();
  });
  $('#newcategory-btn').on('click', function() {
    $('#newcategory-form').slideToggle();
  });
  $('#user-btn').on('click', function() {
    $('#user-form').slideToggle();
  });

  App.showAllPosts();
   $('h1').on('click', function() {
    console.log('click works');
    $('.togtest').toggle();
  });

  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
    App.showPosts(event);
  });
});



// merp token = 369d401a3b71418c84be93f0d3e5caa9
// katyf token = c9436520a9ef4cd099b95bb9a41738f2

