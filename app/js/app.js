/*global $:false*/
'use strict';

var App = App || {};

$(document).ready(function(){
  trace('hello world');
});

App.post = function(id, title, body, created_at, categories){
  this.id = id;
  this.title = title;
  this.body = body;
  this.created_at = created_at;
  this.categories = categories;
};

App.displayPosts = function(event){
  // if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET'
    }).done(function(posts){
      display(posts);
      renderButtons(posts);
    }).fail(function(jqXHR, textStatus, errorThrown){
    });
    return false;
  };

App.deletePost = function(event){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'DELETE'
    }).done(function(post){
      trace(post);
      display(post);
    }).fail(function(jqXHR, textStatus, errorThrown){
    });
    return false;
  };

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var display = function(posts){
  var postData = '';
  for(var i = 0; i < posts.length; i++){
    var buttonHTML = '<input type=button class=edit id=' + posts[i].id + ' value="Edit Post" >' + '<input type=button class=delete id=' + posts[i].id + ' value="Delete Post" >';
    if(posts[i].categories.length === 0 && posts[i].images.length === 0){ // post has no categories and no pictures
      postData += '<div id=' + i + '><p><h3>' + posts[i].title + '</h3></p>' + '<p>' + posts[i].body + '</p></div>';
      $('#posts').html(postData);
      $('#' + posts[i].id).append(buttonHTML);
  } else if(posts[i].categories.length === 0 && posts[i].images.length != 0){ // post has no catagories but has pictures
        for(var imageIndex = 0; imageIndex < posts[i].images.length; imageIndex++){
          postData += '<div id=' + i + '><p><h3>' + posts[i].title + '</h3></p>' + '<p>' + posts[i].body + '<br><img src="' + posts[i].images[imageIndex].url +'</br></p></div>';
          $('#posts').html(postData);
          $('#' + posts[i].id).append(buttonHTML);
        };
      } else if(posts[i].categories.length != 0 && posts[i].images.length === 0){ // post has categories but no pictures
      for(var categoryIndex = 0; categoryIndex < posts[i].categories.length; categoryIndex++){
        postData += '<div id=' + i + '><h3>' + posts[i].title + '</h3></p>' + '<p>' + posts[i].body + '</p></div>' + '<small>' + posts[i].categories[categoryIndex].id + " " + posts[i].categories[categoryIndex].name + " " + posts[i].categories[categoryIndex].created_at + " " + posts[i].categories[categoryIndex].updated_at + '</small>';
        $('#posts').html(postData);
        $('#' + posts[i].id).append(buttonHTML);
      };
  } else { //post has no categories and no images
      for(var categoryIndex = 0; categoryIndex < posts[i].categories.length; categoryIndex++){
        for(var imageIndex = 0; imageIndex < posts[i].images.length; imageIndex++){
          postData += '<div id=' + i + '><p><h3>' + posts[i].title + '</h3></p>' + '<p>' + posts[i].body + '</p>' + '<br><img src="' + posts[i].images[imageIndex].url + '</br></div>' + '<small>' + posts[i].categories[categoryIndex].id + " " + posts[i].categories[categoryIndex].name + " " + posts[i].categories[categoryIndex].created_at + " " + posts[i].categories[categoryIndex].updated_at + '</small>';
            $('#posts').html(postData);
            $('#' + posts[i].id).append(buttonHTML);
        };
      };
    };
  };
};

var renderButtons = function(data){

};

var buttonEventHandler = function(data){
  var $editButtons = $('.edit');
      $editButtons.on('click', function(){
        App.editPost(this.id);
      });
  var $deleteButtons = $('.delete');
      $deleteButtons.on('click', function(){
        App.deletePost(this.id);
      });
};

$('document').ready(function(){
    App.displayPosts(event);

    var $postForm = $('form#new-post-form');
    $postForm.on('submit', function(event){
      App.deletePost(event);
  });

});
/*"109885dca2fc451fbca7d7795ff65355"*/
