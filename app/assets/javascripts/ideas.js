$(document).ready(function() {
  renderHeaderLinks();
  loadAllIdeas();
  submitNewIdea();
  deleteIdea();
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
  $('.ideas').prepend(
    '<div class="idea" data-id="'
    + idea.id
    + '"><h2>' + idea.title + '</h2>'
    + '<p>' + truncateBody(idea.body) + '</p>'
    + '<p><b>Quality:</b> ' + idea.quality
    + '<div class="quality-change"><label id="quality-change-options"><input type="radio" name="optradio">  Swill</label>'
    + '<label id="quality-change-options"><input type="radio" name="optradio">  Plausible</label>'
    + '<label id="quality-change-options"><input type="radio" name="optradio">  Genius</label>'
    + '</div></p>'
    + '<a id="full-body" class="btn btn-sm btn-default">Full</a>'
    + '<a id="remove-idea" class="btn btn-sm btn-default">Remove</a>'
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
  $('.ideas').prepend(
    '<div class="idea" data-id="'
    + idea.id
    + '"><h2>' + idea.title + '</h2>'
    + '<p>' + truncateBody(idea.body) + '</p>'
    + '<p><b>Quality:</b> ' + idea.quality
    + '<div class="quality-change"><label id="quality-change-options"><input type="radio" name="optradio">  Swill</label>'
    + '<label id="quality-change-options"><input type="radio" name="optradio">  Plausible</label>'
    + '<label id="quality-change-options"><input type="radio" name="optradio">  Genius</label>'
    + '</div></p>'
    + '<a id="full-body" class="btn btn-sm btn-default">Full</a>'
    + '<a id="remove-idea" class="btn btn-sm btn-default">Remove</a>'
    + '</div>'
  )
}

function deleteIdea() {
  $('.ideas').delegate('#remove-idea', 'click', function() {
    var $idea = $(this).closest('.idea');

    $.ajax({
      url: '/api/v1/ideas/' + $idea.attr('data-id') + '.json',
      type: 'DELETE',
      success: function() {
        $idea.remove();
      }
    });
  });
}
