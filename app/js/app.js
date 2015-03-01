/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

//var App = App || {};
var App = (function(){
  var categoriesData;
  var usersData;

  var init = function() {
    getCategories();
    setCategoriesData();
  //  debugger;
    getPostData();
    setUsersData();
    var $userForm = $('form#user-form'); //children for form
  $userForm.on('submit',function(e){//e shorthand for event
   // submitUser(e,$userForm);
   submitUser(e);
  });

  var $categoryForm = $('form#category-form'); //children for form
  $categoryForm.on('submit',function(e){//e shorthand for event
    submitCategory(e);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(e){
//debugger;
  submitPost(e);
  });
  };

  var setCategoriesData = function(input){
    categoriesData = input;
  };

  var setUsersData = function(input){
    usersData = input;
  };

  var getCategories = function(){
    $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET',
    }).done(function(categoriesData){
   // checkedPostCategories(categoriesData);
    setCategoriesData(categoriesData);
    showAllCategories(categoriesData);
    }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
    });
  };

  var submitCategory = function(e){
    if(e.preventDefault) e.preventDefault();
    $.ajax({
      url: "http://localhost:3000/categories",
      type: 'POST',
      dataType: 'JSON',
      data: {
        category: {
          name: $('#category-name').val(),
        }
      },
      headers: {'AUTHORIZATION': '015b0bb0383046f5ae3d2ee213fd14cc'}
    }).done(function(categoryData){
      $('#category-name').val('');
      trace(categoryData);
    }).fail(function(jqXHR, textStatus, errorThrown){
        trace(jqXHR, textStatus, errorThrown);
    });
  };

  var showAllCategories = function(categoriesData){
      // for(var i = 0; i < categories.length; i++){
      //   $('#categories').append('<li>' + categories[i].name +'</li>')
      // };
      for(var i = 0; i < categoriesData.length; i++){
      $('#post-category').append('<li><input type="checkbox" name="categories" value="' + categoriesData[i].id+'"  id="' +categoriesData[i].id + '" />' + categoriesData[i].name + '</li>' );
      };
    };

  var updateCategories = function(postID,categoryIdArr){
    debugger;
    categoryIdArr.forEach(function(categoryId){
      $.ajax({
      url: 'http://localhost:3000/posts/' + postID + '/categories/' + categoryId,
      type: 'PATCH',
      headers: {'AUTHORIZATION': '015b0bb0383046f5ae3d2ee213fd14cc'}
      }).done(function(data){
        trace(data);
      }).fail();
    });
  };

  var getPostData = function(){
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'GET',
    }).done(function(usersData){
     //trace(userData);
     setUsersData(usersData);
     App.showAllPosts(usersData);
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
  };

  var showAllPosts = function(usersData){
    for(var i = 0; i < usersData.length; i++){
       // debugger;
        App.showUserPosts(usersData[i].posts);
      };
  };

  var showUserPosts = function(postData){
   // debugger;
    for(var i = 0; i < postData.length; i++){
      $('#posts').append('<li>' + postData[i].body + '</li>' + postData[i].categoriesData) };
  };

  var showPostsCategories = function(postCategories){
   // debugger;
    for(var i = 0; i < postCategories.length; i++){
      $('#posts').append('<li>' + postCategories[i].body + '</li>' + postCategories[i]) };
  };

  var submitPost = function(e){
    if(e.preventDefault) e.preventDefault();
    $.ajax({
      url:'http://localhost:3000/posts',
      type: 'POST',
      dataType: 'JSON',
      data: {
        post: {
          title: $('#post-title').val(),
          body: $('#post-body').val()
        }
      },
      headers: {'AUTHORIZATION': '015b0bb0383046f5ae3d2ee213fd14cc'}
    }).done(function(postData){
        updateCategories(postData.id,checkedPostCategories());
        $('#post-title, #post-body').val('');
       // trace(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
        trace(jqXHR, textStatus, errorThrown);
    });
  };

  var checkedPostCategories = function(){
    var categoryIdArr = [];
    var categoryList = $('#post-category').children();
    for(var i = 0; i < categoryList.length; i++){
      if($('#'+ $(categoryList[i]).children().val()).is(':checked')){
       // categoryArr.push(categoriesData[i]);
       categoryIdArr.push($(categoryList[i]).children().val());
      };
      $('#'+ $(categoryList[i]).children().val()).prop('checked', false);
    };
    return categoryIdArr;
  };

  var submitUser = function(e){
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
       $('#username, #email,,#password,#passwordconfirmation,#role, #firstname,#lastname').val('');
       trace(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
  };

  return{
    init: init,
    submitPost:submitPost,
    submitUser:submitUser,
    checkedPostCategories:checkedPostCategories,
    showPostsCategories:showPostsCategories,
    showUserPosts:showUserPosts,
    showAllPosts:showAllPosts,
    getPostData: getPostData,
    showAllCategories:showAllCategories,
    getCategories:getCategories
    };
})();

$(document).ready(function(){
 // var currentState = App.init();
  App.init();
 // debugger;
//Categories.checkedPostCategories();

});

//015b0bb0383046f5ae3d2ee213fd14cc
