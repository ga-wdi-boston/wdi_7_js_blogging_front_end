var App = App || {};

App.Posts = App.Posts || {};

App.Posts.getPosts = function(){
  $.ajax({
    url: ' http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON',
  }).done(App.Posts.directPosts);
};

App.Posts.getPost = function(id){
  $.ajax({
    url: ' http://localhost:3000/posts/' + id,
    type: 'GET',
    dataType: 'JSON',
  }).done(function(data){
    console.log(data);
  })
};

App.Posts.directPosts = function(posts){
  var post;
  var html = '<div>';
  posts.forEach(function(post){
    post = new App.Posts.Post(post);
    html += App.Posts.renderPost(post);
  })
  html += '</div>'
  $('#posts').append(html);
};

App.Posts.Post = function(post){
  this.id = post.id;
  this.title = post.title;
  this.body = post.body;
  this.categories = post.categories;
  this.birthday = post.created_at;
};

App.Posts.renderPost = function(post){
  var html = '<div class="' + post.categories[0].name.replace(/ /g, '-') + '">';
  html += '<h2>' + post.title + '</h2>';
  html += '<article>' + post.body + '</article>';
  html += '</div>';
  return html
}

App.Posts.deletePost = function(id){
  $.ajax({
    url: 'http://localhost:3000/posts/' + id,
    type: 'DELETE',
    dataType: 'JSON',
  }).done(function(){
    console.log('fun times its gooone!');
  })
  return false
};

App.Posts.updatePost = function(id){
  $.ajax({
    url: 'http://localhost:3000/posts/' + id,
    type: 'PATCH',
    dataType: 'JSON',
    data: {
      post: {
        title: 'hi',
        body: 'hi'
      }
    },
  }).done(function(){
    console.log('fun times its gooone!');
  })
  return false
};


App.Posts.submitPost = function(event){
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
    headers: {'AUTHORIZATION': '532bb38210474ac1964eeb66ba454508'}
  }).done(App.Categories.updateCategory)
};


