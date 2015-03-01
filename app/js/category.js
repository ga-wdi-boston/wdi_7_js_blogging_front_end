var App = App || {};

App.Category = App.Category || {};

App.Category.addCategory = function(name){
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

App.Category.deleteCategory = function(id){
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

App.Category.updateCategory = function(id, name){
  $.ajax({
    url: 'http://localhost:3000/categories/' + id,
    type: 'PATCH',
    dataType: 'JSON',
    data: {
      category: {
        name: name
      }
    },
  }).done(function(){
    console.log('you did it!')
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false
};
