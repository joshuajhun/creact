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
  var newIdea = $('<div class="idea" data-id="' + idea.id + '">' +
                    '<h2>' + idea.title + '</h2>' +
                    '<p>' + truncateBody(idea.body) + '</p>' +
                    '<p id="quality"><b>Quality:</b> ' + idea.quality + '</p>' +
                    '<div class="quality-change">' +
                      '<label id="quality-options"><input type="radio" name="radio-button' + idea.id + '" value="Swill">  Swill</label>' +
                      '<label id="quality-options"><input type="radio" name="radio-button' + idea.id + '" value="Plausible">  Plausible</label>' +
                      '<label id="quality-options"><input type="radio" name="radio-button' + idea.id + '" value="Genius">  Genius</label>' +
                    '</div></p>' +
                    '<a id="full-body" class="btn btn-sm btn-default">Full</a>' +
                    '<a id="remove-idea" class="btn btn-sm btn-default">Remove</a>' +
                    '<a id="edit-idea-' + idea.id + '" class="btn btn-sm btn-default">Edit</a>' +
                    '<div class="row hidden" id="edit-form-' + idea.id + '">' +
                      '<div class="col-md-6">' +
                        '<div class="idea-form form-group">' +
                          '<label>Title</label>' +
                            '<input class="form-control" type="text" id="idea-title" value="' + idea.title + '">' +
                          '<label>Content</label>' +
                          '<input class="form-control" type="textfield" id="idea-body" value="' + idea.body + '">' +
                        '</div>' +
                        '<input class="btn btn-default pull-right" id="submit-idea" type="button" name="submit" value="Create Idea">' +
                      '</div>' +
                    '</div>' +
                  '</div>');

  addListenerForQualityChange(newIdea);
  addListenerForEdit(newIdea);
  $('.ideas').prepend(newIdea);
}

function truncateBody(body) {
  $('#full-body').on('click', function() {
    console.log("display full body on click", body);
  });

  return body.slice(0, 100) + '...';
}

function addListenerForQualityChange(idea) {
  idea.find('.quality-change input').on('click', function() {
    var quality = $(this).val();

    $.ajax({
      url: '/api/v1/ideas/' + $(idea).data('id') + '.json',
      type: 'PUT',
      data: {idea: { quality: quality } },
      success: function() {
        idea.find('#quality').html('<b>Quality:</b> ' + quality);
      }
    });
  });

  return idea;
}

function addListenerForEdit(idea) {
  idea.find('#edit-idea-' + idea.data('id')).on('click', function() {
    idea.find('#edit-form-' + idea.data('id')).toggleClass('hidden')
  });
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
        appendIdeaToDom(idea);

        $('#idea-title').val('');
        $('#idea-body').val('');
      }
    });
  })
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
