var App = App || {};

App.Categories = App.Categories || {};

App.Categories.addCategory = function(name){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    dataType: 'JSON',
    data: {
      category: {
        name: name
      }
    },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.Categories.getCategories = function(){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET',
    dataType: 'JSON',
  }).done(App.Categories.directCategories);
};

App.Categories.directCategories = function(categories){
  var category;
  var htmlNav = '';
  var htmlForm = '';
  categories.forEach(function(category){
    category = new App.Categories.Category(category);
    htmlNav += App.Categories.renderCategoryNav(category);
    htmlForm += App.Categories.renderCategoryForm(category);
  })
  $('#post-category').append(htmlForm);
  $('#categories').append(htmlNav);
};

App.Categories.Category =function(category){
  this.name = category.name;
  this.id = category.id;
};

App.Categories.renderCategoryNav = function(category){
  html = "<li class='" + category.name.replace(/ /g, '-') + "'>";
  html += "<a>" + category.name + "</a>";
  html += '</li>';
  return html
};

App.Categories.renderCategoryForm = function(category){
  html = "<option value='" + category.id + "'>";
  html += "<a>" + category.name + "</a>";
  html += '</option>';
  return html
};

App.Categories.deleteCategory = function(id){
  $.ajax({
    url: 'http://localhost:3000/categories/' + id,
    type: 'DELETE',
    dataType: 'JSON',
  }).done(function(){
    console.log('aaannnndddddddd . . . its gone')
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false
};

App.Categories.updateCategory = function(post){
  $.ajax({
    url: 'http://localhost:3000/posts/' + post.id + '/categories/' + $('#post-category').val(),
    type: 'PATCH',
    dataType: 'JSON',
    headers: {'AUTHORIZATION': '532bb38210474ac1964eeb66ba454508'}
  }).done(function(){
    console.log('you did it!')
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false
};
