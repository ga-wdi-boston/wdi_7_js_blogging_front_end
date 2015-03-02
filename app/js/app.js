/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = (function(){
  var categoriesData;
  var usersData;
  var postsData;

  var init = function() {
    getCategories();
    getPostsData();

    var $userForm = $('form#user-form');
    $userForm.on('submit',function(e){
    submitUser(e);
    });
    var $categoryForm = $('form#category-form');
    $categoryForm.on('submit',function(e){
    submitCategory(e);
    });
    var $removeCategoryForm = $('form#remove-category-form');
    $removeCategoryForm.on('submit',function(e){
    removeCategory(e);
    });
    var $removePostForm = $('form#remove-post-form');
    $removePostForm.on('submit',function(e){
    removePost(e);
    });
    var $postForm = $('form#new-post-form');
    $postForm.on('submit', function(e){
    submitPost(e);
    });

    var $filterForm = $('form#filter-form');
    $filterForm.on('submit', function(e){
    if(e.preventDefault) e.preventDefault();
    showFilterPosts(getFilterPosts($('#filter-category').val()));
    });
  };

  var getFilterPosts = function(categoryId){
    var postsArr=[];
    if(categoryId == 0){
      return postsData;
    }else{
      for(var i = 0; i < postsData.length; i++){
        if(postsData[i].id == categoryId){
          postsArr.push(postsData[i]);
        };
      };
    return postsArr;
    };
  };

  var showFilterPosts = function(postCategories){
    $('#posts').children().remove();
    for(var i = 0; i < postCategories.length; i++){
      $('#posts').append('<li>' + postCategories[i].body + '</li>'); };
  };

  var setCategoriesData = function(input){
    categoriesData = input;
  };

  var getCategories = function(){
    $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET',
    }).done(function(data){
    setCategoriesData(data);
    showAllCategories(data);
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
      getCategories();
    }).fail(function(jqXHR, textStatus, errorThrown){
        trace(jqXHR, textStatus, errorThrown);
    });
  };

  var showAllCategories = function(categoriesData){
      for(var i = 0; i < categoriesData.length; i++){
      $('#post-category').append('<li><input type="checkbox" name="categories" value="' + categoriesData[i].id+'"  id="' +categoriesData[i].id + '" />' + categoriesData[i].name + '</li>' );

      $('.select-category').append('<option id="category' + categoriesData[i].id + '" value="'+categoriesData[i].id +'">' +categoriesData[i].name +'</option>');
      };
    };

  var updateCategories = function(postID,categoryIdArr){
    categoryIdArr.forEach(function(categoryId){
      $.ajax({
      url: 'http://localhost:3000/posts/' + postID + '/categories/' + categoryId,
      type: 'PATCH',
      headers: {'AUTHORIZATION': '015b0bb0383046f5ae3d2ee213fd14cc'}
      }).done(function(data){
        getPostData();
        trace(data);
      }).fail();
    });
  };

  var removeCategory = function(e){
    if(e.preventDefault) e.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/categories/'+ $('#delete-category').val(),
      type: 'DELETE',
      headers: {'AUTHORIZATION': '015b0bb0383046f5ae3d2ee213fd14cc'}
    }).done(function(categoryData){
      $('#category'+$('#delete-category').val()).remove();
      $('#delete-category').prop('selectedIndex', 0);
     // trace(categoryData);
     //getCategories();
     getPostsData();
    }).fail(function(jqXHR, textStatus, errorThrown){
        trace(jqXHR, textStatus, errorThrown);
    });
  };

  var setPostsData = function(input){
    postsData = input;
  };

  var getPostsData = function(){
    $.ajax({
      url: 'http://localhost:3000/posts',
      type: 'GET',
    }).done(function(postsData){
     setPostsData(postsData);
    // showAllPosts(postsData);
    showFilterPosts(getFilterPosts($('#filter-category').val()));
    showSelectPostOptions(postsData);
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
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

  // var showAllPosts = function(){
  //   for(var i = 0; i < postsData.length; i++){
  //     $('#posts').append('<li id="lipost' + postsData[i].id + '">' + postsData[i].body + '</li>');
  //   };
  // };

  var showSelectPostOptions = function(postsData){
    for(var i = 0; i < postsData.length; i++){
      $('#delete-post').append('<option id="post'+postsData[i].id+ '" value="'+postsData[i].id +'">' +postsData[i].title +'</option>');
    };
  };

  var updatePost = function(){
   // /posts/:id(.:format)
  };

  var removePost = function(e){
    if(e.preventDefault) e.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/posts/'+ $('#delete-post').val(),
      type: 'DELETE',
      headers: {'AUTHORIZATION': '015b0bb0383046f5ae3d2ee213fd14cc'}
    }).done(function(postsData){
      $('#lipost'+$('#delete-post').val()).remove();
      $('#post'+$('#delete-post').val()).remove();
      $('#delete-post').prop('selectedIndex', 0);
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

  var setUsersData = function(input){
    usersData = input;
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

  var showUserPosts = function(postData){
   // debugger;
    for(var i = 0; i < postData.length; i++){
      $('#posts').append('<li>' + postData[i].body + '</li>' + postData[i].categoriesData) };
  };

  return{
    init: init,
    getCategories:getCategories,
    getPostsData:getPostsData
    };
})();

$(document).ready(function(){
  App.init();
});

