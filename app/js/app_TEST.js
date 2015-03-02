App.get_all_users_posts = function(users){
  // Test: display users who have 1 or more posts & the quantity of their posts
  // console.log("All users and the quantity of their posts: ");
  // users.forEach(function(user){
  //   console.log(user.username + " , "+ user.posts.length);
  // });

  // Test: users who have more than 1 post
  // console.log("Users who have more than 1 post: ");
  // users.forEach(function(user){
  //   if(user.posts.length >= 1){
  //     console.log(user.username + " , "+ user.posts.length);
  //   }
  // });

  //works - shows all users
  // var templateSource = $("#results-template").html();
  // var template = Handlebars.compile(templateSource);
  // $(".posts").html(template(users));



  var templateSource = $("#results-template").html();
  var template = Handlebars.compile(templateSource);

  console.log("Users who have more than 1 post: ");

  // debugger;

  var users_with_posts = [];
  users.forEach(function(user){
    if(user.posts.length >= 1){
      users_with_posts.push(user);
      console.log(user.username + " , " + user.posts.length);
      console.log(users_with_posts);
    }
  });

  $(".posts").html(template(users_with_posts));


//loop through elements in users array
// $('.posts').append('<hr>');
  // $('.posts').append('USERNAME: ' + user.username);
  // $('.posts').append('<br>');

  //loop through elements in posts array
  // users.forEach(function(user){
  //     user.posts.forEach(function(post){
  //     $('.posts').append('<p>');
  //     $('.posts').append('CREATED AT: ' + post.created_at + '<br>');
  //     $('.posts').append('POST TITLE: ' + post.title + '<br>');
  //     $('.posts').append('POST BODY: ' + post.body + '<br>');
  //     $('.posts').append('IMAGES: ' + post.images.length + '<br>');

  //         //loop through elements in categories array
  //       post.categories.forEach(function(category){
  //       $('.posts').append('<p>');
  //       $('.posts').append('CATEGORY NAME: ' + category.name);
  //       });//end post.categories.forEach
  //     });//end user.posts.forEach
  // }); //end users.forEach

};//end App.get_all_users_posts
