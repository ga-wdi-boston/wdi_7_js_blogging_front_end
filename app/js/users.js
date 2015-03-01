/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.$users = $('.users');


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
        last_name: $('#lastname').val()
      }
    },
    success: function(data, textStatus, jqXHR){
      trace('I made a new user!!!!', data, textStatus, jqXHR);
      debugger
      App.addOneUser(data);
      $('#user-form .clear-me').val('');
    }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.addOneUser = function(user){
  var newUser = new App.User(user.id, user.email, user.first_name, user.last_name, user.username, user.token);

  var $newUserHTML = $('<div class=User id='+ newUser.id + '>');
  $newUserHTML.html('<h3>' + newUser.username + '</h3>' + '<p>' + newUser.first_name + ' ' + newUser.last_name + '</p>' + '<input type=button class=edit id=' + newUser.id + ' value="Edit User" >' + '<input type=button class=delete id=' + newUser.id + ' value="Delete User" >');
  App.$users.prepend($newUserHTML);
  App.setUserButtonHandlers();
};


// App.editPost = function(post){
//   var $editButtons = $('.edit');
//       $editButtons.unbind();

//   //select text and grab value
//   var postID = parseInt(post)
//   var $newTitle, $newBody;
//   var $title = $('#' + post + ' h3').text();
//   var $body = $('#' + post + ' p').text();
//   var $post = $('.post#' + post);
//   var originalHTML = $post.html();

//   $post.html('<div class="post-form"><form id="edit-post-form"><div class="form-group"><input name="post-title" type="text" value="'+ $title +'" id=' + postID + ' class="clear-me" /></div><div class="form-group"><label for="post-body">Post Body</label><textarea name="post-body"  id="post-body"></textarea></div><div class="form-group"><input type="button" id="save" value="Save Post" /><input type="button" id="cancel" value="Cancel" /></div></form></div>');
//   $('.post#' + post + ' [name=post-body]').val($body);

//   var $saveButton = $('#save');
//       $saveButton.on('click', function(){
//         $newTitle = $('[name=post-title]').val();
//         $newBody = $('[name=post-body]').val()
//         $.ajax({
//           url: 'http://localhost:3000/posts/' + postID,
//           type: 'PATCH',
//           data: {
//             post: {
//               title: $newTitle,
//               body: $newBody,
//             },
//           },
//         }).done(function(data){
//           trace(data);

//           $post.html('<h3>' + $newTitle + '</h3>' + '<p>' + $newBody + '</p>' + '<input type=button class=edit id=' + postID + ' value="Edit Post" >' + '<input type=button class=delete id=' + postID + ' value="Delete Post" >');

//           App.setPostButtonHandlers();
//         })
//         .fail(function(jqXHR, textStatus, errorThrown){
//           trace(jqXHR, textStatus, errorThrown);
//         });
//       });


//   var $cancelButton = $('#cancel');
//       $cancelButton.on('click', function(){
//         $post.html(originalHTML);
//         App.setPostButtonHandlers();
//       });
// };

App.getAllUsers = function(){
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET'
  }).done(function(data){
    data.forEach(App.addOneUser)
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.User = function(id, email, first_name, last_name, username, token) {
  this.id = id;
  this.email = email;
  this.first_name = first_name;
  this.last_name = last_name;
  this.username = username;
  this.token = token;
};

App.deleteUser = function(id){

  $.ajax({
    url: 'http://localhost:3000/users/' + parseInt(id),
    type: 'DELETE',
    headers: {'AUTHORIZATION': '995c3568de8549b687dede7c6a96eb75'},
  }).done(function(data){
    trace(data)
    $('.User#'+ parseInt(id)).remove();
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.setUserButtonHandlers = function(){
  // var $editButtons = $('.edit');
  //     $editButtons.on('click', function(){
  //       App.editUser(this.id);
  //     });

  var $deleteButtons = $('.delete');
      $deleteButtons.on('click', function(){
        App.deleteUser(this.id);
      });
};



$(document).ready(function(){
  App.getAllUsers();


  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event,$userForm);
  });
});

//user token "995c3568de8549b687dede7c6a96eb75"
