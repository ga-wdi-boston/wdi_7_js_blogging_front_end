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
  var categories = [];
  $(':checkbox:checked').each(function(i){
    categories[i] = $(this).val();
  });

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
  }).done(function(post){

    App.addOnePost(post);
    App.addCategoriesToPost(post, categories);

    $('.post#' + post.id).attr("data-categories", categories.join(' '));
    $('#new-post-form .clear-me').val('');

  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.editPost = function(post){
  var $editButtons = $('.edit');
      $editButtons.unbind();

  //select text and grab value
  var postID = parseInt(post)
  var $newTitle, $newBody;
  var $title = $('#' + post + ' h3').text();
  var $body = $('#' + post + ' p').text();
  var $post = $('.post#' + post);
  var originalHTML = $post.html();

  $post.html('<div class="post-form"><form id="edit-post-form"><div class="form-group"><input name="post-title" type="text" value="'+ $title +'" id=' + postID + ' class="clear-me" /></div><div class="form-group"><label for="post-body">Post Body</label><textarea name="post-body"  id="post-body"></textarea></div><div class="form-group"><input type="button" id="save" value="Save Post" /><input type="button" id="cancel" value="Cancel" /></div></form></div>');
  $('.post#' + post + ' [name=post-body]').val($body);

  var $saveButton = $('#save');
      $saveButton.on('click', function(){
        $newTitle = $('[name=post-title]').val();
        $newBody = $('[name=post-body]').val()
        $.ajax({
          url: 'http://localhost:3000/posts/' + postID,
          type: 'PATCH',
          data: {
            post: {
              title: $newTitle,
              body: $newBody,
            },
          },
        }).done(function(data){
          trace(data);

          $post.html('<h3>' + $newTitle + '</h3>' + '<p>' + $newBody + '</p>' + '<input type=button class=edit id=' + postID + ' value="Edit Post" >' + '<input type=button class=delete id=' + postID + ' value="Delete Post" >');

          App.setPostButtonHandlers();
        })
        .fail(function(jqXHR, textStatus, errorThrown){
          trace(jqXHR, textStatus, errorThrown);
        });
      });


  var $cancelButton = $('#cancel');
      $cancelButton.on('click', function(){
        $post.html(originalHTML);
        App.setPostButtonHandlers();
      });
};

App.addCategoriesToPost = function(post, categories){

  categories.forEach(function(category){
    $.ajax({
    url: 'http://localhost:3000/posts/' + post.id + '/categories/' + category,
    type: 'PATCH',
    headers: {'AUTHORIZATION': '995c3568de8549b687dede7c6a96eb75'},
    }).done(function(data){

    }).fail();
  })
};

App.deletePost = function(id){

  $.ajax({
    url: 'http://localhost:3000/posts/' + parseInt(id),
    type: 'DELETE',
    headers: {'AUTHORIZATION': '995c3568de8549b687dede7c6a96eb75'},
  }).done(function(data){
    trace(data)
    $('.post#'+ parseInt(id)).remove();
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
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
  post.categories.forEach(function(cat){catString += cat.id + ' '});
  var $newPostHTML = $('<div class=post id='+ post.id + ' data-categories="' + catString + '">');
  $newPostHTML.html('<h3>' + post.title + '</h3>' + '<p>' + post.body + '</p>' + '<input type=button class=edit id=' + post.id + ' value="Edit Post" >' + '<input type=button class=delete id=' + post.id + ' value="Delete Post" >');
  App.$posts.prepend($newPostHTML);
  App.setPostButtonHandlers();
};

App.setPostButtonHandlers = function(){
  var $editButtons = $('.edit');
      $editButtons.on('click', function(){
        App.editPost(this.id);
      });

  var $deleteButtons = $('.delete');
      $deleteButtons.on('click', function(){
        App.deletePost(this.id);
      });
};

App.getAllPosts = function(){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET'
  })
  .done(function(data){
    data.reverse().forEach(App.addOnePost);

  })
};

App.submitCategory = function(){
    var $allPosts = $('.post');

    var newCategory = prompt('Enter a new category:');
    if (typeof newCategory !== 'string') return false;

    $.ajax({
    url: 'http://localhost:3000/categories/',
    type: 'POST',
    data: {
      category: {
        name: newCategory
      },
    },
    headers: {'AUTHORIZATION': '995c3568de8549b687dede7c6a96eb75'},
    }).done(function(data){
      trace(data);
      App.addOneCategory(data);
      App.setCategoryButtons();
      $allPosts.show();



    }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
    $allPosts.show();
  });
};

App.Category = function(id, name) {
  this.id = id;
  this.name = name;
};

App.addOneCategory = function(category){
  var newCategory = new App.Category(category.id, category.name);
  var $newCategoryHTML = $('<input type="checkbox" name="category" class="clear-me" value="' + category.id + '"> ' + category.name + '<br>');
  var $newCategoryButton = $('<input type="button" class="category" id=' + category.id + ' value=' + category.name + '></input>')
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

      App.setCategoryButtons();

    });
};

App.toggleCategory = function(category) {
  var $categoriesHide = $('.posts div:not([data-categories*=' + category + '])');
  var $categoriesDisplay = $('[data-categories*=' + category + ']');

  $categoriesHide.hide();
  $categoriesDisplay.show();
}


App.setCategoryButtons = function(){
    var $categoryButtons = $('[type=button].category');
    $categoryButtons.on('click', function(){
      App.toggleCategory(this.id);
    });

    var $allPosts = $('.post');
    $('[value="Show All"]').on('click', function(){
      $allPosts.show();
    });
};



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

  var $newCategory = $('#new-category');
  $newCategory.on('click', function(){
    App.submitCategory();
  });
});

//user token "995c3568de8549b687dede7c6a96eb75"
