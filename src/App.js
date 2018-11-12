import React from 'react';
import './App.css'
import GameCollection from './Components/GameCollection/GameCollection';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsFit: [],
      itemsFitMutable: [],
      nick: 'gryfius',
      players: 5 ,
      time: 100,
      totalTime: 0,
      isSelected: false,
    }

    this.onCheckForSelection = this.onCheckForSelection.bind(this);
  }

  init(){
    this.setState({
      nick: '',
      players: '',
      time: '',
      totalTime: 0,
      itemsFitMutable: [],
      itemsFit: []
    })
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
    const prefix = 'https://cors-anywhere.herokuapp.com/';

    const req = new XMLHttpRequest();
    req.open("GET", prefix + 'https://www.boardgamegeek.com/xmlapi2/collection?username=' + this.state.nick + '&stats=1&subtype=boardgame&own=1', false);
    req.send();

    const text = req.responseText;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.getElementsByTagName("item");  
    const itemsArr = Array.from(items);
    const Arrrr = [];

    for (var x = 0 ; x <= itemsArr.length - 1 ; x++) {

      const timeInput = parseInt(this.state.time);
      const playersInput = parseInt(this.state.players);
      const playTime = itemsArr[x].getElementsByTagName('stats')[0].getAttribute('playingtime');
      const playersMinAmount = itemsArr[x].getElementsByTagName('stats')[0].getAttribute('minplayers');
      const playersMaxAmount = itemsArr[x].getElementsByTagName('stats')[0].getAttribute('maxplayers');

      if (timeInput >= parseInt(playTime) && playersInput >= playersMinAmount && playersInput <= playersMaxAmount) {
        Arrrr.push(itemsArr[x]);
      } 
    }    
    const itemsFitArr = Array.from(Arrrr);
    this.setState({itemsFitMutable: itemsFitArr, itemsFit: itemsFitArr}, function(){
    });

    const buttonSection = document.querySelector('.buttonSection');
    buttonSection.style.display = 'flex';
  }

  onCheckForSelection(e) {
    const parentEl = e.target.parentNode;
    const time = parseInt(parentEl.querySelector('.time').innerHTML);

    if (e.target.className === 'selected') {
      const actualTime = parseInt(this.state.totalTime) - time;
      this.setState({totalTime: actualTime})
      e.target.classList.remove('selected');
      e.target.classList.add('notSelected');


    } else {
      const actualTime = parseInt(this.state.totalTime) + time;
      this.setState({totalTime: actualTime})
      e.target.classList.remove('notSelected');
      e.target.classList.add('selected');    }
  }

  checkForNumOfPlays(e){
    const items = this.state.itemsFit;
    let itemsNotPlayedArr = [];
    let itemsPlayed = [];
    
    for (let x = 0; x <= items.length - 1 ; x++ ) {
      let playedGames = parseInt(items[x].getElementsByTagName('numplays')[0].innerHTML);

      if (playedGames === 0) {
        itemsNotPlayedArr.push(items[x]);
      } else {
        itemsPlayed.push(items[x])
      }
    }

    e.target.className === 'played' ? this.setState({itemsFitMutable: itemsPlayed}) : this.setState({itemsFitMutable: itemsNotPlayedArr});
    
  }

  randomGame(){
    const itemsLength = this.state.itemsFit.length;
    const result = Math.floor(Math.random() * (itemsLength));
    const itemAr = [];
    itemAr.push(this.state.itemsFit[result]);

    this.setState({itemsFitMutable: itemAr});
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
          <button className='clear' onClick={this.init.bind(this)}> x </button>
        </div>
        <section className='buttonSection'>
          <button className='notPlayed' onClick={this.checkForNumOfPlays.bind(this)}>not played</button>
          <button className='played' onClick={this.checkForNumOfPlays.bind(this)}>played at least once</button>
          <button className='random' onClick={this.randomGame.bind(this)}>random</button>
        </section>
        <h1 className='totalTime'> {this.state.totalTime} </h1>
        <div className='results'>
          <ul className='gameCollection'> 
            <GameCollection 
              itemsFit={this.state.itemsFitMutable}
              onClick={this.onCheckForSelection}
            />
          </ul>
        </div>
      </div>
    )
  }
};

export default App;