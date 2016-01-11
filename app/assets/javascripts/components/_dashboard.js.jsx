
var Dashboard = React.createClass({
  getInitialState: function() {
    return { ideas: [] }
  },

  componentDidMount: function() {
    $.ajax({
      url: '/api/v1/ideas.json',
      type: 'GET',
      success: function(response) {
        this.setState({ ideas: response });
      }.bind(this)
    });
  },

  onDelete: function(id) {
    $.ajax({
      url: '/api/v1/ideas/'+ id + '.json',
      type: 'DELETE',
      success: function() {
        this.updateState(id)
      }.bind(this)
    });
  },

  updateState: function(id) {
    var filteredIdeas = this.state.ideas.filter(function(idea) {
      return idea.id != id;
    });

    this.setState({ ideas: filteredIdeas });
  },

  render: function() {
    return (
      <div className='container'>
        <h1>Hello, Turing</h1>

        <AllIdeas ideas={this.state.ideas} handleDeleteIdea={this.onDelete} />
      </div>
    )
  }
});   
