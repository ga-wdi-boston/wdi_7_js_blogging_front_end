// from: http://www.korenlc.com/handlebars-js-tutorial-templating-with-handlebars/
// JQUERY ANIMAL TEMPLATE

var source = $("#animalTemplate").html();
var template = Handlebars.compile(source);
var data = {animals: [
  {type: "Dog", sound: "woof"},
  {type: "Cat", sound: "meow"},
  {type: "Cow", sound: "moo"}
]};
$("#animalList").html(template(data));
