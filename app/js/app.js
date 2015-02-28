/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  $posts: $('.posts'),
  $categories: $('#post-categories'),
  $categoryButtons: $('#category-buttons')
};


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
      $('#user-form .clear-me').val('');
    }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.submitPost = function(event){
  if (event.preventDefault) event.preventDefault();

  var post = {};
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val(),
      },
    },
    headers: {'AUTHORIZATION': '995c3568de8549b687dede7c6a96eb75'},
  }).done(function(data){
    // trace(data);
    App.addOnePost(data);
    post.data = data;
    $('#new-post-form .clear-me').val('');
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });

  setTimeout(function(){
    trace(post);
  },2000);

  var categories = [];
  $(':checkbox:checked').each(function(i){
    categories[i] = $(this).val();
  });




};

App.Post = function(id, title, body, created, categories) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.created_at = created;
  this.categories = categories;
};

App.addOnePost = function(post){
  var newPost = new App.Post(post.id, post.title, post.body, post.created_at, post.categories);
  var catString = '';
  post.categories.forEach(function(cat){catString += cat.name + ' '});
  var $newPostHTML = $('<div class=post id='+ post.id + ' data-categories="' + catString + '">');
  $newPostHTML.html('<h3>' + post.title + '</h3>' + '<p>' + post.body + '</p>');
  App.$posts.prepend($newPostHTML);
};

// App.patchCategories = function(post){

//   $.ajax({
//     url:
//   }).done().fail();
// };

App.getAllPosts = function(){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET'
  })
  .done(function(data){
    data.reverse().forEach(App.addOnePost);
  })
};

App.submitCategory = function(event){

};

App.Category = function(id, name) {
  this.id = id;
  this.name = name;
};

App.addOneCategory = function(category){
  var newCategory = new App.Category(category.id, category.name);
  var $newCategoryHTML = $('<input type="checkbox" name="category" class="clear-me" value="' + category.name + '"> ' + category.name + '<br>');
  var $newCategoryButton = $('<input type="button" class="category" id=' + category.name + ' value=' + category.name + '></input>')
  App.$categories.append($newCategoryHTML);
  App.$categoryButtons.append($newCategoryButton);
};

App.getAllCategories = function(){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET'
  })
  .done(function(data){
    data.forEach(App.addOneCategory);
  })

};

App.toggleCategory = function(category) {
  var $categoriesHide = $('.posts div:not([data-categories*=' + category + '])');
  var $categoriesDisplay = $('[data-categories*=' + category + ']');
    debugger
  $categoriesHide.hide();
  $categoriesDisplay.show();
}



$(document).ready(function(){
  App.getAllPosts();
  App.getAllCategories();

  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event,$userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });

  var $categoryButtons = $('[type=button].category');
  $categoryButtons.on('click', function(){
    trace('clicked');
    App.toggleCategory(this.id);
  });

});

//user token "995c3568de8549b687dede7c6a96eb75"
