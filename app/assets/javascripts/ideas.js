$(document).ready(function() {
  renderHeaderLinks();
  loadAllIdeas();
  submitNewIdea();
});

function renderHeaderLinks() {
  return $('.links').append(
    '<img class="js-logo" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" />'
    + '<a href="#" class="not-a-link">Ideas</a><a id="link" href="#">All Ideas</a>'
  )
}

function loadAllIdeas() {
  $.ajax({
    type: 'GET',
    url: '/api/v1/ideas.json',
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
    + '<p>' + truncateBody(idea.body) + '<a id="full-body" class="btn btn-sm btn-default">Full</a></p>'
    + '<p><b>Quality:</b> ' + idea.quality + '</p>'
    + '</div>'
  )
}

function truncateBody(body) {
  $('#full-body').on('click', function() {
    console.log("display full body on click", body);
  });

  return body.slice(0, 100) + '...';
}

function submitNewIdea() {
  $('#submit-idea').on('click', function() {
    event.preventDefault();
    var formData = {
      idea: {
        title: $('#idea-title').val(),
        body: $('#idea-body').val()
      }
    }

    $.ajax({
      url: '/api/v1/ideas.json',
      type: 'POST',
      data: formData,
      success: function(idea) {
        appendNewIdea(idea);

        $('#idea-title').val('');
        $('#idea-body').val('');
      }
    });
  })
}

function appendNewIdea(idea) {
  $('.all-ideas').prepend(
    '<div class="idea">'
    + '<h2>' + idea.title + '</h2>'
    + '<p>' + truncateBody(idea.body) + '<a id="full-body" class="btn btn-sm btn-default">Full</a></p>'
    + '<p><b>Quality:</b> ' + idea.quality + '</p>'
    + '</div>'
  )
}
