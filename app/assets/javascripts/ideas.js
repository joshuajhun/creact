$(document).ready(function() {
  renderHeader();
  renderSectionTitle();
});


function renderHeader() {
  return $('.links').append(
    '<img class="js-logo" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" />'
    + '<a id="link" href="#">All Ideas</a>'
  )
}

function renderSectionTitle() {
  var title = $('a#link').on('click', function(event) {
    $('.section-title').empty();
    event.preventDefault();

    var clicked = $(this).text();

    $('.section-title').append(
      '<h1>' + clicked + '</h1>'
    )
  });
}


