var AllIdeas  = React.createClass({
  render: function(){
  var ideas = this.props.ideas.map(function(idea){
    return (
    // idea.name, idea.description, idea.quality
    <div>
    <h3> {idea.title}</h3>
    <h4> Quality: {idea.quality} </h4>
    <p>{idea.body}</p>
    </div>
    )
  });
  console.log('props in AllIdeas',this.props)
    return (
    <div>
      <h1> All Ideas </h1>
      {ideas}
    </div>
    )
  }

});
