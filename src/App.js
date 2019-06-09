import React from 'react';
import './App.css';
import swal from 'sweetalert';
import GameCollection from 'Components/GameCollection/GameCollection';
import GlobalStyle from 'theme/GlobalStyle';
import Search from 'molecules/Search/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsFit: [],
      itemsFitMutable: [],
      nick: 'nicolaskim',
      players: '3',
      time: '100',
      totalTime: 0,
    };
    this.checkForSelection = this.checkForSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  init() {
    this.setState({
      nick: '',
      players: '',
      time: '',
      totalTime: 0,
      itemsFitMutable: [],
      itemsFit: [],
    });
    const buttonSection = document.querySelector('.buttonSection');
    const totalTime = document.querySelector('.totalTime');
    const loader = document.querySelector('.loader');
    buttonSection.style.display = 'none';
    loader.style.display = 'none';
    totalTime.style.display = 'none';
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createGameList(xmlDoc) {
    const items = xmlDoc.getElementsByTagName('item');
    const itemsArray = Array.from(items);
    const Arrrr = [];

    for (let x = 0; x <= itemsArray.length - 1; x++) {
      const timeInput = parseInt(this.state.time, 10);
      const playersInput = parseInt(this.state.players, 10);
      const playTime = itemsArray[x].getElementsByTagName('stats')[0].getAttribute('playingtime');
      const playersMinAmount = itemsArray[x]
        .getElementsByTagName('stats')[0]
        .getAttribute('minplayers');
      const playersMaxAmount = itemsArray[x]
        .getElementsByTagName('stats')[0]
        .getAttribute('maxplayers');

      if (
        timeInput >= parseInt(playTime, 10) &&
        playersInput >= playersMinAmount &&
        playersInput <= playersMaxAmount
      ) {
        Arrrr.push(itemsArray[x]);
      }
    }
    this.setState({ itemsFitMutable: Arrrr, itemsFit: Arrrr });
  }

  handleClick() {
    const self = this;
    const loader = document.querySelector('.loader');
    const buttonSection = document.querySelector('.buttonSection');
    const totalTime = document.querySelector('.totalTime');
    loader.style.display = 'flex';

    const req = new XMLHttpRequest();
    req.open(
      'GET',
      `https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/collection?username=${
        this.state.nick
      }&stats=1&subtype=boardgame&own=1`,
      false,
    );
    req.onreadystatechange = () => {
      loader.style.display = 'none';
    };
    req.send();

    if (req.status === 200) {
      buttonSection.style.display = 'flex';
      totalTime.style.display = 'block';

      const text = req.responseText;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');

      if (xmlDoc.getElementsByTagName('message')[0]) {
        swal('oops..', 'Invalid username', 'error');
        self.init();
      } else if (xmlDoc.getElementsByTagName('item')) {
        loader.style.display = 'none';
        this.createGameList(xmlDoc);
      }
    } else if (req.status !== 200) {
      swal('Ooops..', 'Something went wrong, please try again', 'error');
      buttonSection.style.display = 'none';
      totalTime.style.display = 'none';
    }
  }

  checkForSelection(isClicked, time) {
    const currentTime = parseInt(time, 10);
    const prevTime = this.state.totalTime;

    const sumOfTimes = isClicked ? prevTime + currentTime : prevTime - currentTime;

    this.setState({
      totalTime: parseInt(sumOfTimes, 10),
    });
  }

  checkForNumOfPlays(e) {
    const items = this.state.itemsFit;
    const itemsNotPlayed = [];
    const itemsPlayed = [];

    for (let x = 0; x <= items.length - 1; x++) {
      const playedGames = parseInt(items[x].getElementsByTagName('numplays')[0].innerHTML, 10);

      if (playedGames === 0) {
        itemsNotPlayed.push(items[x]);
      } else {
        itemsPlayed.push(items[x]);
      }
    }

    e.target.className === 'buttonSection_played'
      ? this.setState({ itemsFitMutable: itemsPlayed })
      : this.setState({ itemsFitMutable: itemsNotPlayed });
  }

  randomGame() {
    const buttonSelected = document.querySelector('.textinfo_button-notSelected');
    buttonSelected.style.display = 'none';
    const itemsLength = this.state.itemsFit.length;
    const result = Math.floor(Math.random() * itemsLength);
    const item = [];
    item.push(this.state.itemsFit[result]);

    this.setState({ itemsFitMutable: item });

    const totalTime = document.querySelector('.totalTime');
    totalTime.style.display = 'none';
  }

  render() {
    return (
      <div className="app">
        <GlobalStyle />
        <Search
          nick={this.state.nick}
          time={this.state.time}
          players={this.state.players}
          onChange={this.handleChange}
          onClick={this.handleClick.bind(this)}
        />
        <div className="loader">
          <div className="loader_dot1" />
          <div className="loader_dot2" />
          <div className="loader_dot3" />
        </div>
        <div className="buttonSection">
          <h1>
            Something new
            <button
              className="buttonSection_notPlayed"
              onClick={this.checkForNumOfPlays.bind(this)}
            >
              click
            </button>
          </h1>
          <h1>
            Something what I know
            <button className="buttonSection_played" onClick={this.checkForNumOfPlays.bind(this)}>
              click
            </button>
          </h1>
          <h1>
            Something random{' '}
            <button className="buttonSection_random" onClick={this.randomGame.bind(this)}>
              click
            </button>
          </h1>
        </div>
        <h1 className="totalTime">
          Total time: <span>{this.state.totalTime}</span>{' '}
        </h1>
        <div className="results">
          <GameCollection itemsFit={this.state.itemsFitMutable} onClick={this.checkForSelection} />
        </div>
      </div>
    );
  }
}

export default App;
