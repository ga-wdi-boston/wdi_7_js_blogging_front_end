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


App.Posts.Post= function(post){
  this.id = post.id;
  this.title = post.title;
  this.body = post.body;
  this.created_at = post.created;
  this.categories = post.categories
};


App.Posts.addPost = function(post){
  var newPost = new App.Posts.Post(post.id, post.title, post.body, post.created_at);
  var $newPostHTML = $('<div class=post>');
  $newPostHTML.html('<h3>' + post.title + '</h3>' + '<p>' + post.body + '</p>' + '<hr>');
  App.Posts.$posts.prepend($newPostHTML);
};


// not working yet, but we will see.
// App.Posts.deletePost = function(id){
//   $.ajax({
//     url: 'http://localhost:3000/posts/' + parseInt(id),
//     type: 'DELETE',
//     dataType: 'JSON',
//     headers: {'AUTHORIZATION':'50a82b94c0a34e3fa66044e3c269dd18'}
//   }).done(function(data){
//     trace(data)
//     ('post/'+ id).remove();
//   }).fail(function(jqXHR, textStatus, errorThrown){
//     trace(jqXHR, textStatus, errorThrown);
//   });
// };


App.Posts.addCategoriesToPost = function(post, categories){

  categories.forEach(function(category){
    $.ajax({
    url: 'http://localhost:3000/posts/' + post.id + '/categories/' + category,
    type: 'PATCH',
    headers: {'AUTHORIZATION': '50a82b94c0a34e3fa66044e3c269dd18'},
    }).done(function(data){

    }).fail();
  })
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
