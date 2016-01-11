var AllIdeas = React.createClass({
  handleClick: function(id) {
    this.props.handleDeleteIdea(id);
  },

  render: function() {
    var ideas = this.props.ideas.map(function(idea) {
      return (
        <div key={idea.id}>
          <h3>{idea.title}</h3>
          <h4>Quality: {idea.quality}</h4>
          <p>{idea.body}</p>
          <button onClick={this.handleClick.bind(null, idea.id)}>Delete</button>
        </div>
      )
    }.bind(this));

    return (
      <div>
        <h1>All Ideas</h1>

        {ideas}
      </div>
    )
  }
});
