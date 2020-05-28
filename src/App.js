import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import parser from 'xml-js';
import GameCollection from 'views/GameCollection/GameCollection';
import GlobalStyle from 'theme/GlobalStyle';
import Search from 'Components/molecules/Search/Search';
import ButtonsSection from 'Components/molecules/ButtonsSection/ButtonsSection';
import AppTemplate from 'Components/templates/AppTemplate';
import Sidebar from 'Components/organisms/Sidebar/Sidebar';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  padding-left: 10px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsFit: [],
      itemsFitMutable: [
        {
          name: {
            _text: 'Chojrak',
          },
          image: {
            _text:
              'https://vignette.wikia.nocookie.net/chojrak/images/0/0f/Wiki_background.jpg/revision/latest?cb=20130315215827&path-prefix=pl',
          },
          numplays: {
            _text: 4,
          },
          stats: {
            _attributes: {
              playingtime: '120',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
      ],
      nick: 'nicolaskim',
      players: '3',
      time: '100',
      totalTime: 0,
      isVisible: true,
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
      isVisible: true,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createGameList(items) {
    const filteredArray = [];
    const timeInput = parseInt(this.state.time, 10);
    const playersInput = parseInt(this.state.players, 10);

    for (let x = 0; x <= items.length - 1; x++) {
      const itemStats = items[x].stats._attributes;
      const playTime = parseInt(itemStats.playingtime, 10);
      const playersMinAmount = parseInt(itemStats.minplayers, 10);
      const playersMaxAmount = parseInt(itemStats.maxplayers, 10);

      if (
        timeInput >= playTime &&
        playersInput >= playersMinAmount &&
        playersInput <= playersMaxAmount
      ) {
        filteredArray.push(items[x]);
      }
    }

    this.setState({
      itemsFitMutable: filteredArray,
      itemsFit: filteredArray,
      isVisible: true,
    });
  }

  handleClick() {
    const self = this;

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/collection?username=${self.state.nick}&stats=1&subtype=boardgame&own=1`,
      )

      .then(res => {
        const data = parser.xml2js(res.data, { compact: true, spaces: 2 });
        return data.items.item;
      })

      .then(data => {
        if (data.errors) {
          swal('oops..', 'Invalid username', 'error');
          self.init();
        } else {
          this.createGameList(data);
        }
      })

      .catch(res => {
        if (res.status !== 200) swal('Ooops..', 'Something went wrong, please try again', 'error');
        self.init();
      });
  }

  checkForSelection(isClicked, time, e) {
    console.log(e);
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
      const numOfPlays = parseInt(items[x].numplays._text, 10);

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
    const items = [...this.state.itemsFitMutable];

    switch (name) {
      case 'atoz':
        items.sort((a, b) => {
          let comparison = 0;
          if (a.name._text.toUpperCase() > b.name._text.toUpperCase()) {
            comparison = 1;
          } else comparison = -1;

          return comparison;
        });

        this.setState({
          itemsFitMutable: items,
        });

        break;

      case 'ztoa':
        items.sort((a, b) => {
          let comparison = 0;
          if (b.name._text.toUpperCase() > a.name._text.toUpperCase()) {
            comparison = 1;
          } else comparison = -1;

          return comparison;
        });

        this.setState({
          itemsFitMutable: items,
        });

        break;

      case 'decending':
        items.sort((a, b) => {
          return parseInt(b.numplays._text, 10) - parseInt(a.numplays._text, 10);
        });

        this.setState({
          itemsFitMutable: items,
        });
        break;

      case 'ascending':
        items.sort((a, b) => {
          return parseInt(a.numplays._text, 10) - parseInt(b.numplays._text, 10);
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
      <AppTemplate>
        <GlobalStyle />
        <Sidebar totalTime={this.state.totalTime} />
        <Wrapper>
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
            isVisible={this.state.isVisible}
            allGames={this.allGames.bind(this)}
            totalTime={this.state.totalTime}
            sort={this.sort.bind(this)}
          />
          {this.state.isVisible ? (
            <GameCollection
              itemsFit={this.state.itemsFitMutable}
              onClick={this.checkForSelection}
            />
          ) : null}
        </Wrapper>
      </AppTemplate>
    );
  }
}

export default App;
