import React from 'react';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsy: [],
      itemsFit: [],
      nick: '',
      players: '',
      time: ''
    }
  }

  handleChange(event) {    
    switch (event.target.className) {
      case "nick":
        this.setState({nick: event.target.value});
        break;
      case "time":
      this.setState({time: event.target.value});
        break;
      case "players":
        this.setState({players: event.target.value});
        break;
      default:
    }
  }

  handleClick(){
    console.log('klik');
    const prefix = 'https://cors-anywhere.herokuapp.com/';


    var req = new XMLHttpRequest();
    req.open("GET", prefix + 'https://www.boardgamegeek.com/xmlapi2/collection?username=' + this.state.nick + '&stats=1&subtype=boardgame&own=1', false);
    req.send();

    var text = req.responseText;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(text, "text/xml");
    var items = xmlDoc.getElementsByTagName("item");  
    var itemsArr = Array.from(items);
    const Arr = [];
    this.setState({itemsy: itemsArr}, function() {
      for (var x = 0 ; x <= this.state.itemsy.length - 1 ; x++) {

        const gamesArr = this.state.itemsy;
        const timeInput = this.state.time;
        const playTime = gamesArr[x].getElementsByTagName('stats')[0].getAttribute('playingtime');
        //const playersMinAmount = gamesArr[x].getElementsByTagName('stats')[0].getAttribute('minplayers');
        //const playersMaxAmount = gamesArr[x].getElementsByTagName('stats')[0].getAttribute('maxplayers');

        if (timeInput >= parseInt(playTime)) {
          this.setState({itemsFit: gamesArr[x]});
        } 
      }        
    });
    console.log(this.state.itemsFit)
  }

  render () {
    return (
      <div>
        <div className='inputs'>
          <h1> Who are you? </h1>
          <input className='nick' placeholder='your ninckname' value={this.state.nick} onChange={this.handleChange.bind(this)} />
          <h1> How much time do we have? </h1>
          <input className='time' placeholder='only numbers!' value={this.state.time} onChange={this.handleChange.bind(this)} />
          <h1> How many people?</h1>
          <input className='players' placeholder='type the number' value={this.state.players} onChange={this.handleChange.bind(this)} />
          <button className='searchButton' onClick={this.handleClick.bind(this)}> find </button>
        </div>
        <div className='results'>
          <ul>
            { 
              this.state.itemsFit.map((item, index) => (
              <li key={index}> 
                <p> {item.getElementsByTagName('name')[0].innerHTML} </p>
                <p> {item.getElementsByTagName('stats')[0].getAttribute('playingtime')} </p> 
                <p> {item.getElementsByTagName('stats')[0].getAttribute('minplayers')} - {item.getElementsByTagName('stats')[0].getAttribute('maxplayers')} players </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
};

export default App;