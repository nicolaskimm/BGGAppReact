import React from 'react';
import './App.css'
import GameCollection from './Components/GameCollection/GameCollection';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsFit: [],
      itemsFitMutable: [],
      nick: '',
      players: '',
      time: '',
      totalTime: 0,
    }

    this.checkForSelection = this.checkForSelection.bind(this);
  }

  init(){
    this.setState({
      nick: '',
      players: '',
      time: '',
      totalTime: 0,
      itemsFitMutable: [],
      itemsFit: [],
    })
    const buttonSection = document.querySelector('.buttonSection');
    buttonSection.style.display = 'none';
  }

  handleChange(event) {    
    switch (event.target.className) {
      case "inputs_nick":
        this.setState({nick: event.target.value});
        break;
      case "inputs_time":
      this.setState({time: event.target.value});
        break;
      case "inputs_players":
        this.setState({players: event.target.value});
        break;
      default:
    }
  }

  handleClick(){ 
    const prefix = 'https://cors-anywhere.herokuapp.com/';

    const req = new XMLHttpRequest();
    req.open("GET", prefix + 'https://www.boardgamegeek.com/xmlapi2/collection?username=' + this.state.nick + '&stats=1&subtype=boardgame&own=1', false);
    req.send();

    const text = req.responseText;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.getElementsByTagName("item");  
    const itemsArray = Array.from(items);
    const Arrrr = [];

    for (var x = 0 ; x <= itemsArray.length - 1 ; x++) {

      const timeInput = parseInt(this.state.time);
      const playersInput = parseInt(this.state.players);
      const playTime = itemsArray[x].getElementsByTagName('stats')[0].getAttribute('playingtime');
      const playersMinAmount = itemsArray[x].getElementsByTagName('stats')[0].getAttribute('minplayers');
      const playersMaxAmount = itemsArray[x].getElementsByTagName('stats')[0].getAttribute('maxplayers');

      if (timeInput >= parseInt(playTime) && playersInput >= playersMinAmount && playersInput <= playersMaxAmount) {
        Arrrr.push(itemsArray[x]);
      } 
    }    

    this.setState({itemsFitMutable: Arrrr, itemsFit: Arrrr});

    const buttonSection = document.querySelector('.buttonSection');
    const totalTime = document.querySelector('.totalTime');
    buttonSection.style.display = 'flex';
    totalTime.style.display = 'block';
  }

  checkForSelection(e) {
    const parentEl = e.target.parentNode;
    const time = parseInt(parentEl.querySelector('.textInfo_time').innerHTML);

    if (e.target.className === 'selected') {
      const actualTime = parseInt(this.state.totalTime) - time;
      this.setState({totalTime: actualTime})
      e.target.classList.remove('selected');
      e.target.classList.add('notSelected');
    } else {
      const actualTime = parseInt(this.state.totalTime) + time;
      this.setState({totalTime: actualTime})
      e.target.classList.remove('notSelected');
      e.target.classList.add('selected');
    }
  }

  checkForNumOfPlays(e){
    const items = this.state.itemsFit;
    let itemsNotPlayed = [];
    let itemsPlayed = [];
    
    for (let x = 0; x <= items.length - 1 ; x++ ) {
      let playedGames = parseInt(items[x].getElementsByTagName('numplays')[0].innerHTML);

      if (playedGames === 0) {
        itemsNotPlayed.push(items[x]);
      } else {
        itemsPlayed.push(items[x])
      }
    }

    e.target.className === 'buttonSection_played' ? this.setState({itemsFitMutable: itemsPlayed}) : this.setState({itemsFitMutable: itemsNotPlayed});
    
  }

  randomGame(){
    const itemsLength = this.state.itemsFit.length;
    const result = Math.floor(Math.random() * (itemsLength));
    const item = [];
    item.push(this.state.itemsFit[result]);

    this.setState({itemsFitMutable: item});

    const totalTime = document.querySelector('.totalTime');
    totalTime.style.display = 'none';
  }
  
  render () {
   
    return (
      <div>
        <div className='inputs'>
          <h1> Who are you? </h1>
          <input className='inputs_nick' placeholder='your nickname' value={this.state.nick} onChange={this.handleChange.bind(this)} />
          <h1> How much time do we have? </h1>
          <input className='inputs_time' placeholder='only numbers!' value={this.state.time} onChange={this.handleChange.bind(this)} />
          <h1> How many people?</h1>
          <input className='inputs_players' placeholder='type the number' value={this.state.players} onChange={this.handleChange.bind(this)} />
          <button className='inputs_button_search' onClick={this.handleClick.bind(this)}> <FontAwesomeIcon icon='search' /> </button>
          <button className='inputs_button_clear' onClick={this.init.bind(this)}> x </button>
        </div>
        <div className='buttonSection'>
          <h1>Something new<button className='buttonSection_notPlayed' onClick={this.checkForNumOfPlays.bind(this)}>></button></h1>
          <h1>Something what I know<button className='buttonSection_played' onClick={this.checkForNumOfPlays.bind(this)}>></button></h1> 
          <h1> Something random <button className='buttonSection_random' onClick={this.randomGame.bind(this)}>></button></h1>
        </div>
        <h1 className='totalTime'> Total time: <span>{this.state.totalTime}</span> </h1>
        <div className='results'>
          <ul className='gameCollection'> 
            <GameCollection 
              itemsFit={this.state.itemsFitMutable}
              onClick={this.checkForSelection}
            />
          </ul>
        </div>
      </div>
    )
  } 
};


export default App;