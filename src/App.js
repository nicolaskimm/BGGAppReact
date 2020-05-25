import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import GameCollection from 'views/GameCollection/GameCollection';
import GlobalStyle from 'theme/GlobalStyle';
import Search from 'Components/molecules/Search/Search';
import ButtonsSection from 'Components/molecules/ButtonsSection/ButtonsSection';

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
      buttonsVisibility: false,
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
      buttonsVisibility: false,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createGameList(xmlDoc) {
    const itemsArray = Array.from(xmlDoc.getElementsByTagName('item'));
    const filteredArray = [];
    const timeInput = parseInt(this.state.time, 10);
    const playersInput = parseInt(this.state.players, 10);

    for (let x = 0; x <= itemsArray.length - 1; x++) {
      const itemStats = itemsArray[x].getElementsByTagName('stats')[0];
      const playTime = parseInt(itemStats.getAttribute('playingtime'), 10);
      const playersMinAmount = parseInt(itemStats.getAttribute('minplayers'), 10);
      const playersMaxAmount = parseInt(itemStats.getAttribute('maxplayers'), 10);

      if (
        timeInput >= playTime &&
        playersInput >= playersMinAmount &&
        playersInput <= playersMaxAmount
      ) {
        filteredArray.push(itemsArray[x]);
      }
    }
    this.setState({
      itemsFitMutable: filteredArray,
      itemsFit: filteredArray,
      buttonsVisibility: true,
    });
  }

  handleClick() {
    const self = this;

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/collection?username=${self.state.nick}&stats=1&subtype=boardgame&own=1`,
      )

      .then(res => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(res.data, 'text/xml');
        return xmlDoc;
      })

      .then(xmlDoc => {
        if (xmlDoc.getElementsByTagName('message')[0]) {
          swal('oops..', 'Invalid username', 'error');
          self.init();
        } else if (xmlDoc.getElementsByTagName('item')) {
          this.createGameList(xmlDoc);
        }
      })

      .catch(res => {
        if (res.status !== 200) swal('Ooops..', 'Something went wrong, please try again', 'error');
        self.init();
      });
  }

  checkForSelection(isClicked, time) {
    const currentTime = parseInt(time, 10);
    const prevTime = this.state.totalTime;

    const sumOfTimes = isClicked ? prevTime + currentTime : prevTime - currentTime;

    this.setState({
      totalTime: parseInt(sumOfTimes, 10),
    });
  }

  checkIfPlayed(e) {
    const items = this.state.itemsFit;
    const type = e.target.name;
    const notPlayed = [];
    const played = [];
    const maxThree = [];
    const fourToTen = [];
    const moreThantTen = [];

    for (let x = 0; x <= items.length - 1; x++) {
      const numOfPlays = parseInt(items[x].getElementsByTagName('numplays')[0].innerHTML, 10);

      switch (true) {
        case numOfPlays <= 3 && numOfPlays > 0:
          maxThree.push(items[x]);
          played.push(items[x]);
          break;

        case numOfPlays >= 4 && numOfPlays <= 10:
          fourToTen.push(items[x]);
          played.push(items[x]);
          break;

        case numOfPlays > 10:
          moreThantTen.push(items[x]);
          played.push(items[x]);
          break;

        case numOfPlays === 0:
          notPlayed.push(items[x]);
          break;

        default:
          break;
      }
    }

    switch (type) {
      case 'played':
        this.setState({ itemsFitMutable: played });
        break;

      case 'notPlayed':
        this.setState({ itemsFitMutable: notPlayed });
        break;

      case 'max3':
        this.setState({ itemsFitMutable: maxThree });
        break;

      case '4to10':
        this.setState({ itemsFitMutable: fourToTen });
        break;

      case 'moreThan10':
        this.setState({ itemsFitMutable: moreThantTen });
        break;

      default:
        break;
    }
  }

  randomGame() {
    const itemsLength = this.state.itemsFit.length;
    const result = Math.floor(Math.random() * itemsLength);
    const item = [];
    item.push(this.state.itemsFit[result]);

    this.setState({ itemsFitMutable: item });
  }

  allGames() {
    this.setState(prevState => ({
      itemsFitMutable: prevState.itemsFit,
    }));
  }

  sort(e) {
    const { name } = e.target;
    const items = [...this.state.itemsFit];
    console.log(items[0].name);

    switch (name) {
      case 'atoz':
        this.setState({
          itemsFitMutable: items.sort(),
        });

        break;

      case 'ztoa':
        this.setState({
          itemsFitMutable: items.sort().reverse(),
        });
        break;

      case 'mosttoless':
        items.sort((a, b) => {
          return (
            parseInt(b.getElementsByTagName('numplays')[0].innerHTML, 10) -
            parseInt(a.getElementsByTagName('numplays')[0].innerHTML, 10)
          );
        });

        this.setState({
          itemsFitMutable: items,
        });
        break;

      case 'lesstomost':
        items.sort((a, b) => {
          return (
            parseInt(a.getElementsByTagName('numplays')[0].innerHTML, 10) -
            parseInt(b.getElementsByTagName('numplays')[0].innerHTML, 10)
          );
        });

        this.setState({
          itemsFitMutable: items,
        });
        break;

      default:
        break;
    }
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
          init={this.init.bind(this)}
        />
        <ButtonsSection
          checkIfPlayed={this.checkIfPlayed.bind(this)}
          randomGame={this.randomGame.bind(this)}
          buttonsVisibility={this.state.buttonsVisibility}
          allGames={this.allGames.bind(this)}
          totalTime={this.state.totalTime}
        />
        <button onClick={this.sort.bind(this)} name="atoz">
          sortuj od a do z
        </button>
        <button onClick={this.sort.bind(this)} name="ztoa">
          sortuj od z do a
        </button>
        <button onClick={this.sort.bind(this)} name="mosttoless">
          najczęściej grane
        </button>
        <button onClick={this.sort.bind(this)} name="lesstomost">
          najrzadziej
        </button>
        <GameCollection itemsFit={this.state.itemsFitMutable} onClick={this.checkForSelection} />
      </div>
    );
  }
}

export default App;
