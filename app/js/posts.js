'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var BlogApp = BlogApp || {};

BlogApp.showPosts = function(){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET'
  })
  .done(function(data) {
    console.table(data);
  BlogApp.renderAllPosts(data);
  });
};

BlogApp.renderAllPosts = function(posts){
  posts.forEach(function(post){
    var post_html = '<article><h4>' + post.title + '</h4><p>' + post.body + '</p><p>' + post.categories + '</p></article>';
    $('.posts').append(post_html);
  });
};

BlogApp.submitPost = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val()
      }
    },
    headers: { 'AUTHORIZATION': 'fa2beb3f8c2d4918a848286c8add092f' },
  }).done(function(new_post) {
    trace(new_post);
    BlogApp.addOnePost(new_post);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

BlogApp.addOnePost = function(post) {
  var one_post_html = '<article><h4>' + post.title + '</h4><p>' + post.body + '</p><p>' + post.categories + '</p></article>';
  $('.posts').append(one_post_html);
};
