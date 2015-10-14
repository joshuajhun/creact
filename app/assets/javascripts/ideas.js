$(document).ready(function() {
  renderHeaderLinks();
  loadIdeas();
  submitNewIdea();
  searchIdeas();
  deleteIdea();
});

function loadIdeas() {
  loadAllIdeas(function(ideas) {
    renderIdeas(ideas);
    bindEvents();
  });
}

function loadAllIdeas(callback) {
  ideaService.index(function(response) {
      callback(response);
  });
}

function renderIdeas(ideas) {
  ideas.map(function(idea) {
    appendIdeaToDom(idea);
  });
}

function renderHeaderLinks() {
  return $('.links').append(
    '<img class="js-logo" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" />'
    + '<a href="#" class="not-a-link">Ideas</a>'
  )
}

function appendIdeaToDom(idea) {
  var newIdea = $('<div class="idea" data-id="' + idea.id + '">' +
                    '<h2 id="title-' + idea.id + '">' + idea.title + '</h2>' +
                    '<p id="body-' + idea.id + '">' + truncateBody(idea.body) + '</p>' +
                    '<p class="quality"><b>Quality:</b> ' + idea.quality + '</p>' +
                    '<div class="quality-change">' +
                      '<label class="quality-options"><input type="radio" name="radio-button' + idea.id + '" value="Swill">  Swill</label>' +
                      '<label class="quality-options"><input type="radio" name="radio-button' + idea.id + '" value="Plausible">  Plausible</label>' +
                      '<label class="quality-options"><input type="radio" name="radio-button' + idea.id + '" value="Genius">  Genius</label>' +
                    '</div></p>' +
                    '<a class="remove-idea btn btn-sm btn-default">Remove</a>' +
                    '<a class="edit-idea-' + idea.id + ' btn btn-sm btn-default">Edit</a>' +
                    '<div class="row" style="display: none;" id="edit-form-' + idea.id + '">' +
                      '<div class="col-md-6">' +
                        '<div class="idea-form form-group">' +
                          '<label>Title</label>' +
                            '<input class="form-control" type="text" id="idea-title-' + idea.id + '" value="' + idea.title + '">' +
                          '<label>Content</label>' +
                          '<input class="form-control" type="textfield" id="idea-body-' + idea.id + '" value="' + idea.body + '">' +
                        '</div>' +
                        '<input class="btn btn-default pull-right" id="submit-idea-' + idea.id + '" type="button" name="submit" value="Create Idea">' +
                      '</div>' +
                    '</div>' +
                  '</div>');

  $('.ideas').prepend(newIdea);
}

function bindEvents() {
  $('.ideas').on('click', '.quality-change input', function() {
    onQualityChange.call(this, $(this).closest('.idea'));
  })

  $('.quality-buttons').on('click', 'a', function() {
    var filter = $(this).html();
    filter === 'All' ? loadIdeas() : renderFilteredIdeas(filter);
  });

  $('.idea').each(function(index, el) {
    onClickEdit($(el));
    onClickSubmit($(el));
  });
}

function onClickEdit(idea) {
  idea.find('.edit-idea-' + idea.data('id')).on('click', function() {
    idea.find('#edit-form-' + idea.data('id')).toggle('fast');
  });
}

function onClickSubmit(idea) {
  idea.find('#submit-idea-' + idea.data('id')).on('click', function() {
    event.preventDefault();

    var $idea = $(this).closest('.idea');
    var newTitle = $('#idea-title-' + $idea.attr('data-id')).val()
    var newBody = $('#idea-body-' + $idea.attr('data-id')).val()

    var formData = {
      idea: {
        title: newTitle,
        body: newBody
      }
    }

    ideaService.edit($idea.attr('data-id'), formData, function() {
      $('#title-' + $idea.attr('data-id')).html(newTitle);
      $('#body-' + $idea.attr('data-id')).html(newBody);

      $('.edit-idea-' + $idea.attr('data-id')).click();
    });
  });
}

function renderFilteredIdeas(filter) {
  $('.idea').each(function() {
    var quality = $(this).find('.quality').html();

    var isMatching = quality.indexOf(filter) !== -1;
    $(this).toggle(isMatching);
  });
}

function truncateBody(body) {
  return body.length > 100 ? body.slice(0, 100) + '...' : body;
}

function searchIdeas() {
  $('#search').keyup(function() {
    var input = $('#search').val().toLowerCase();

    $('.idea').each(function (index, idea) {
      var title = $(idea).find('h2').text().toLowerCase();
      var body = $(idea).find('p').text().toLowerCase();

      var isMatching = (title + body).indexOf(input) !== -1;
      $(idea).toggle(isMatching);
    });
  });
}

function onQualityChange(idea) {
  var quality = $(this).val();
  var data = {idea: { quality: quality } }

  ideaService.edit($(idea).data('id'), data, function() {
    idea.find('.quality').html('<b>Quality:</b> ' + quality);
  });

  return idea;
}

function submitNewIdea() {
  $('#submit-idea').on('click', function() {
    event.preventDefault();

    ideaService.new(formData(), function(err, idea) {
      appendIdeaToDom(idea);
      resetForm();
    });
  })
}

function formData() {
  return {idea: {
      title: $('#idea-title').val(),
      body: $('#idea-body').val()
    }
  }
}

function resetForm() {
  $('#idea-title').val('');
  $('#idea-body').val('');
}

function deleteIdea() {
  $('.ideas').delegate('.remove-idea', 'click', function() {
    var idea = $(this).closest('.idea');
    var id   = idea.attr('data-id')

    ideaService.delete(id, function() {
      idea.remove();
    });
  });
}

var ideaService = {
  index: function(cb) {
    $.ajax({
      type: 'GET',
      url: '/api/v1/ideas.json',
      success: function(response) {
        cb(response);
      }
    });
  },

  new: function(data, cb) {
    $.ajax({
      url: '/api/v1/ideas.json',
      type: 'POST',
      data: data,
      success: function(idea) {
        cb(null, idea);
      }
    });
  },

  edit: function(id, data, cb) {
    $.ajax({
      url: '/api/v1/ideas/' + id + '.json',
      type: 'PUT',
      data: data,
      success: function() {
        cb()
      }
    });
  },

  delete: function(data, cb) {
    $.ajax({
      url: '/api/v1/ideas/' + data + '.json',
      type: 'DELETE',
      success: function() {
        cb();
      }
    });
  }
}

