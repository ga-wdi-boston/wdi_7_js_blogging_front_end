var App = App || {};

App.Posts = App.Posts || {
  $posts: $('.posts'),
  $categories: $('#post-categories'),
  $buttons: $('#category-buttons')
};

App.Posts.viewAllPosts = function(){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
  })
  .done(function(data) {
    data.reverse().forEach(App.Posts.addPost);
  })
};

App.Posts.viewOnePost = function(id){
  $.ajax({
    url: 'http://localhost:3000/posts/' + id,
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    console.log(data);
  });
};


App.Posts.Post= function(id, title, body, created, categories){
  this.id = id;
  this.title = title;
  this.body = body;
  this.created_at = created;
  this.categories = categories
};


App.Posts.addPost = function(post){
  var newPost = new App.Posts.Post(post.id, post.title, post.body, post.created_at);
  var $newPostHTML = $('<div class=post>');
  $newPostHTML.html('<h3>' + post.title + '</h3>' + '<p>' + post.body + '</p>');
  App.Posts.$posts.prepend($newPostHTML);
};



App.Posts.submitPost = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data:{
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val()
      }
    },
    headers: {'AUTHORIZATION':'50a82b94c0a34e3fa66044e3c269dd18'},
  }).done(function(data){
    trace(data);
    $('#new-post-form .clear-me').val('');

  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;

  var categories = [];
};
