$(document).ready(function() {
  renderHeaderLinks();
  loadAllIdeas();
});

function renderHeaderLinks() {
  return $('.links').append(
    '<img class="js-logo" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" />'
    + '<a href="#" class="not-a-link">Ideas</a><a id="link" href="#">All Ideas</a>'
  )
}

function loadAllIdeas() {
  $.ajax({
    type: "GET",
    url: "/api/v1/ideas.json",
    success: function(response) {
      response.map(function(element) {
        appendIdeaToDom(element);
      });
    }
  });
}

function appendIdeaToDom(idea) {
  $('.all-ideas').prepend(
    '<div class="idea">'
    + '<h2>' + idea.title + '</h2>'
    + '<p>' + idea.body + '</p>'
    + '<p><b>Quality:</b> ' + idea.quality + '</p>'
    + '</div>'
  )
}
