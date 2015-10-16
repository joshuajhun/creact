var Dashboard = React.createClass({
  getInitialState: function() {
    return {value: 'what\'s up?'}
  },
  onButtonBoxClick: function() {
    this.setState({value: "You clicked a button, and here I am all of a sudden."});
  },
  render: function() {
    return (
      <div className='dashboard'>
        <h1>Preparation is key!!!!</h1>

        <ButtonBox onButtonClick={this.onButtonBoxClick} />
        <ContentBox text={this.state.value} />
      </div>
    )
  }
});

var ButtonBox = React.createClass({
  handleClick: function() {
    this.props.onButtonClick()
  },
  render: function() {
    return (
      <div>
        <button onClick={this.handleClick} >
          Click me!
        </button>
      </div>
    )
  }
});

var ContentBox = React.createClass({
  render: function() {
    return (
      <div className='content-box'>
        <h1>{this.props.text}</h1>
      </div>
    )
  }
});
