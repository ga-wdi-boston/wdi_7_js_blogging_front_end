/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};


var App = App || {};
  var categoriesData;

  App.getCategories = function(){
    $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET',
  }).done(function(categoriesData){
   // checkedPostCategories(categoriesData);
    App.showAllCategories(categoriesData);
    debugger;
    return(categoriesData);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown)});
  };

  App.showAllCategories = function(categoriesData){
    // for(var i = 0; i < categories.length; i++){
    //   $('#categories').append('<li>' + categories[i].name +'</li>')
    // };
    for(var i = 0; i < categoriesData.length; i++){
    $('#post-category').append('<li><input type="checkbox" name="categories" value="' + categoriesData[i].id+'"  id="' +categoriesData[i].id + '" />' + categoriesData[i].name + '</li>' )
    };
  };

App.getData = function(){
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
  }).done(function(usersData){
   //trace(userData);
   App.showAllPosts(usersData);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.showAllPosts = function(usersData){
  for(var i = 0; i < usersData.length; i++){
     // debugger;
      App.showUserPosts(usersData[i].posts)
    };
};

App.showUserPosts = function(postData){
 // debugger;
  for(var i = 0; i < postData.length; i++){
    $('#posts').append('<li>' + postData[i].body + '</li>' + postData[i].categoriesData) };
};

App.showPostsCategories = function(postCategories){
 // debugger;
  for(var i = 0; i < postCategories.length; i++){
    $('#posts').append('<li>' + postCategories[i].body + '</li>' + postCategories[i]) };
};

  App.checkedPostCategories = function(){
  var categoryArr = [];
  var categoryList = $('#post-category').children();
  for(var i = 0; i < categoryList.length; i++){
    if($('#'+ $(categoryList[i]).children().val()).is(':checked')){
      categoryArr.push($(categoryList[i]).children().val())
    };
  };
  debugger;
  return categoryArr;
};

App.findCategoryObjects = function(idArr){
  debugger;
  for(var i = 0; i<idArr.length; i++){
   // catgeoryData.find();
  };
};

App.submitUser = function(e, form){
  if(e.preventDefault) e.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'POST',
    dataType: 'JSON',
    data: {
      user:{
        username:$('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        password_confirmation: $('#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val()
        }
    },
    success: function(data,textStatus, jqXHR){ //setting in my ajax object
      trace('I made a new user!!!', data, textStatus, jqXHR);
    }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.submitPost = function(e){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url:"http://localhost:3000/posts",
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val(),
        categories: App.findCategoryObjects(App.checkedPostCategories())
      }
    },
    headers: {'AUTHORIZATION': '015b0bb0383046f5ae3d2ee213fd14cc'}
  }).done(function(data){
      debugger;
      trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
  });
}

$(document).ready(function(){
  var $userForm = $('form#user-form'); //children for form
  $userForm.on('submit',function(e){//e shorthand for event
    App.submitUser(e,$userForm);
  });
  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(e){
    App.submitPost(e);
  });
 App.getCategories();
  //Categories.checkedPostCategories();
  App.getData();
});

//015b0bb0383046f5ae3d2ee213fd14cc
