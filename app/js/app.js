/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.getUsers = function(event){
	if(event.preventDefault) event.preventDefault();
	$.ajax({
	    url: 'http://localhost:3000/users',
	    type: 'GET'
    }).done(function(data){
    	App.showUsers(data);
    });
};

App.submitUser = function(event, form){
  if(event.preventDefault) event.preventDefault();
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
        last_name: $('#lastname').val(),
      }
    },
    success: function(data,textStatus, jqXHR){
      trace('I made a new user!!!!', data, textStatus, jqXHR);
    },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR,textStatus,errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.showUsers = function(results){
	var divs = '';

	for(var i = 0; i<results.length; i++){
		var html = '';
		html += '<div>'+results[i].username + '</div>';
	    html += '<div>'+results[i].first_name +' '+results[i].last_name+ '</div>';
	    html += '<div>'+results[i].email + '</div>';
	    html += '<a href="" id='+i+' class="updateuser">Update</a><br>';
	    divs += '<div id=user'+results[i].id+'>'+ html + '</div><br>';
	  }
	$('#posts').html(divs);
	
	var $update = $('.updateuser');
  	$update.on('click',function(event){
    	App.renderUserForm(event, results[this.id]);
  	});
};

App.renderUserForm = function(event, person){
	var html = '';
	if(event.preventDefault) event.preventDefault();
	html += '<form id="updateform"><input id="usernameup" type="text"></input><br>';
	html += '<input id="firstnameup" type="text"></input><br>';
	html += '<input id="lastnameup" type="text"></input><br>';
	html += '<input id="emailup" type="text"></input><br>';
	html +=	'<input id="updatesubmit "type="submit" value="submit"/></form>';
	$('#user'+person.id).html(html);
	$('#usernameup').val(person.username);
	$('#firstnameup').val(person.first_name);
	$('#lastnameup').val(person.last_name);
	$('#emailup').val(person.email);

	var $updateForm = $('#updateform');
	$updateForm.on('submit', function(event){
		App.updateUser(event,$updateForm,person.id);
	});	
};

App.updateUser = function(event, form, id){
	if(event.preventDefault) event.preventDefault();
	$.ajax({
	    url: 'http://localhost:3000/users/'+id,
	    type: 'PATCH',
	    dataType: 'JSON',
	    data: {
	      user: {
	        username: $('#usernameup').val(),
	        email: $('#emailup').val(),
	        first_name: $('#firstnameup').val(),
	        last_name: $('#lastnameup').val(),
	      }
    	}
	}).done(function(){
		App.getUsers(event);
	});
};

App.getPosts = function(event){
	if(event.preventDefault) event.preventDefault();
	$.ajax({
	    url: 'http://localhost:3000/posts',
	    type: 'GET'
    }).done(function(data){
    	App.showPosts(data);
    });
};

App.submitPost = function(event){
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
    headers: { 'AUTHORIZATION': 'a80ede389540495fa356d2d5c5516bcf' },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.renderPostForm = function(event, post){
	var html = '';
	if(event.preventDefault) event.preventDefault();
	html += '<form id="updateform"><input id="titleup" type="text"></input><br>';
	html += '<input id="bodyup" type="text"></input><br>';
	html +=	'<input id="updatesubmit "type="submit" value="submit"/></form>';
	$('#post'+post.id).html(html);
	$('#titleup').val(post.title);
	$('#bodyup').val(post.body);

	var $updateForm = $('#updateform');
	$updateForm.on('submit', function(event){
		App.updatePost(event,$updateForm,post.id);
	});	
};

App.updatePost = function(event, form, id){
	if(event.preventDefault) event.preventDefault();

	$.ajax({
	    url: 'http://localhost:3000/post/'+id,
	    type: 'PATCH',
	    dataType: 'JSON',
	    data: {
	      post: {
	        title: $('#postup').val(),
        	body: $('#bodyup').val()
	      }
    	}
	}).done(function(){
		App.getPosts(event);
	});
};

App.showPosts = function(results){
	var html = '';
	var divs = '';


	for(var i = 0; i<results.length; i++){
		html += '<div>'+results[i].title + '</div>';
	    html += '<div>'+results[i].body + '</div>';
	    html += '<div>'+'Written: '+results[i].created_at + '</div>';
	    html += '<a href="" id='+i+' class="updatepost">Update</a><br>';
	    divs += '<div id=post'+results[i].id+'>'+ html + '</div><br>';
	  }
	$('#posts').html(divs);

	var $update = $('.updatepost');
  	$update.on('click',function(event){
    	App.renderPostForm(event, results[this.id]);
  	});
};

$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit',function(event){
    App.submitUser(event,$userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit',function(event){
    App.submitPost(event);
  });

  var $postShow = $('#showposts');
  $postShow.on('click',function(event){
    App.getPosts(event);
  });

  var $userShow = $('#showusers');
  $userShow.on('click',function(event){
    App.getUsers(event);
  });

  trace('hello world');
});



/*
token: "a80ede389540495fa356d2d5c5516bcf"

*/



