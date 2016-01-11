var Dashboard = React.createClass({
  getInitialState: function(){
    return { ideas: [] }
  },

  componentDidMount: function() {
    $.ajax({
      url: '/api/v1/ideas.json',
      type: 'GET',
      success: function(response){
      console.log('SUCCESS', response);
      }, error: function(xhr) {
      console.log('FAIL', xhr);
      }
    });
  },

  render: function(){
    console.log("state in Dashboard", this.state);

  return (
    <div className = 'container'>
      <h1> Hello, Turing </h1>

      <AllIdeas ideas = {this.state.ideas}/>
    </div>
    )
  }
});
