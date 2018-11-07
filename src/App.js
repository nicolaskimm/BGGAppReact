import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsy: []
    }
  }

  handleChange(event) {    
    /*switch (event.target.className) {
      case "nick":
        this.setState({nick: event.target.value});
        break;
      case "time":
      this.setState({time: event.target.value});
        break;
      case "players":
        this.setState({players: event.target.value});
        break;
    }
    console.log('wpisuje sie');
    */
  }

  handleClick(){
    console.log('klik');
    const prefix = 'https://cors-anywhere.herokuapp.com/';


    var req = new XMLHttpRequest();
    req.open("GET", prefix + "https://www.boardgamegeek.com/xmlapi2/collection?username=nicolaskim&stats=1&subtype=boardgame&own=1", false);
    req.send();

    var text = req.responseText;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(text, "text/xml");
    var items = xmlDoc.getElementsByTagName("item");  
    this.setState({itemsy: items}, function () {
      console.log(this.state.itemsy[0]);
    });    
  }

  render () {
    let { itemsy } = this.state;
    return (
      <div className='inputs'>
        <h1> Who are you? </h1>
        <input className='nick' placeholder='your ninckname' value={this.state.nick} onChange={this.handleChange.bind(this)} />
        <h1> How much time do we have? </h1>
        <input className='time' placeholder='only numbers!' value={this.state.time} onChange={this.handleChange.bind(this)} />
        <h1> How many people?</h1>
        <input className='players' placeholder='type the number' value={this.state.players} onChange={this.handleChange.bind(this)} />
        <button className='searchButton' onClick={this.handleClick.bind(this)}> find </button>
        <div className='results'>
        </div>
      </div>
    )
  }
};

export default App;