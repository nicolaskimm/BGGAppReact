import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import parser from 'xml-js';
import styled from 'styled-components';

import GameCollection from 'views/GameCollection/GameCollection';
import GlobalStyle from 'theme/GlobalStyle';
// import Search from 'Components/molecules/Search/Search';
import AppTemplate from 'Components/templates/AppTemplate';
import Sidebar from 'Components/organisms/Sidebar/Sidebar';
import Dropdown from 'Components/molecules/Dropdown/Dropdown';
import WelcomeView from 'Components/molecules/WelcomeView/WelcomeView';

const Wrapper = styled.div`
  width: 100%;
  padding-left: 10px;
`;

const InnerWrapper = styled.div`
  display: inline-block;
  margin-bottom: 50px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsFit: [
        {
          name: {
            _text: 'Chojrak',
          },
          image: {
            _text:
              'https://vignette.wikia.nocookie.net/chojrak/images/0/0f/Wiki_background.jpg/revision/latest?cb=20130315215827&path-prefix=pl',
          },
          numplays: {
            _text: 7,
          },
          stats: {
            _attributes: {
              playingtime: '120',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Buffy',
          },
          image: {
            _text:
              'https://fashionista.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQ5NDY2OTU2NTAyOTM0NTgw/buffy-the-vampire-slayer-long-red-leather-jacketjpg.jpg',
          },
          numplays: {
            _text: 0,
          },
          stats: {
            _attributes: {
              playingtime: '200',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Bojack Horseman, son of Beatrice Sugarsomething',
          },
          image: {
            _text:
              'https://internewscast.com/wp-content/uploads/2020/03/bojack-horseman-season-7-major-updates-on-the-show-you-need-to-know.jpg',
          },
          numplays: {
            _text: 3,
          },
          stats: {
            _attributes: {
              playingtime: '60',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Nick',
          },
          image: {
            _text:
              'https://i.guim.co.uk/img/media/dfd119b4b760baee2bcdf1750d3cae684132b322/0_1028_4912_2947/master/4912.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=4312c3a4494105dfe0d838c76690ee52',
          },
          numplays: {
            _text: 11,
          },
          stats: {
            _attributes: {
              playingtime: '60',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Cast',
          },
          image: {
            _text:
              'https://static.antyweb.pl/wp-content/uploads/2020/03/08102930/castlevania-4-1420x670.jpg',
          },
          numplays: {
            _text: 15,
          },
          stats: {
            _attributes: {
              playingtime: '60',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Pinkman',
          },
          image: {
            _text:
              'https://images.amcnetworks.com/blogs.amctv.com/wp-content/uploads/2015/02/breaking-bad-episode-304-jesse-paul-1200.jpg',
          },
          numplays: {
            _text: 2,
          },
          stats: {
            _attributes: {
              playingtime: '60',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
      ],
      itemsPickedSidebar: [],
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
            _text: 7,
          },
          stats: {
            _attributes: {
              playingtime: '120',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Buffy',
          },
          image: {
            _text:
              'https://fashionista.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQ5NDY2OTU2NTAyOTM0NTgw/buffy-the-vampire-slayer-long-red-leather-jacketjpg.jpg',
          },
          numplays: {
            _text: 0,
          },
          stats: {
            _attributes: {
              playingtime: '200',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Bojack Horseman, son of Beatrice Sugarsomething',
          },
          image: {
            _text:
              'https://internewscast.com/wp-content/uploads/2020/03/bojack-horseman-season-7-major-updates-on-the-show-you-need-to-know.jpg',
          },
          numplays: {
            _text: 3,
          },
          stats: {
            _attributes: {
              playingtime: '60',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Nick',
          },
          image: {
            _text:
              'https://i.guim.co.uk/img/media/dfd119b4b760baee2bcdf1750d3cae684132b322/0_1028_4912_2947/master/4912.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=4312c3a4494105dfe0d838c76690ee52',
          },
          numplays: {
            _text: 11,
          },
          stats: {
            _attributes: {
              playingtime: '60',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Cast',
          },
          image: {
            _text:
              'https://static.antyweb.pl/wp-content/uploads/2020/03/08102930/castlevania-4-1420x670.jpg',
          },
          numplays: {
            _text: 15,
          },
          stats: {
            _attributes: {
              playingtime: '60',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
        {
          name: {
            _text: 'Pinkman',
          },
          image: {
            _text:
              'https://images.amcnetworks.com/blogs.amctv.com/wp-content/uploads/2015/02/breaking-bad-episode-304-jesse-paul-1200.jpg',
          },
          numplays: {
            _text: 2,
          },
          stats: {
            _attributes: {
              playingtime: '60',
              minplayers: '2',
              maxplayers: '4',
            },
          },
        },
      ],
      totalTime: 0,
      isClicked: false,
      isLogged: false,
      numOfPlaysFilters: [
        {
          id: 0,
          title: 'all',
          selected: true,
          key: 'numOfPlays',
        },
        {
          id: 1,
          title: '0',
          selected: false,
          key: 'numOfPlays',
        },
        {
          id: 2,
          title: '1-3',
          selected: false,
          key: 'numOfPlays',
        },
        {
          id: 3,
          title: '4-10',
          selected: false,
          key: 'numOfPlays',
        },
        {
          id: 4,
          title: '10+',
          selected: false,
          key: 'numOfPlays',
        },
      ],
      filters: [
        {
          id: 0,
          title: 'A-Z',
          selected: true,
          key: 'filters',
        },
        {
          id: 1,
          title: 'Z-A',
          selected: false,
          key: 'filters',
        },
        {
          id: 2,
          title: '0-99',
          selected: false,
          key: 'filters',
        },
        {
          id: 3,
          title: '99-0',
          selected: false,
          key: 'filters',
        },
      ],
    };
    this.checkForSelection = this.checkForSelection.bind(this);
  }

  init() {
    this.setState({
      totalTime: 0,
      itemsFitMutable: [],
      itemsFit: [],
    });
  }

  createGameList(items, time, players) {
    const filteredArray = [];
    const timeInput = parseInt(time, 10);
    const playersInput = parseInt(players, 10);

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
    });
  }

  handleLog() {
    this.setState(prevState => ({
      isLogged: !prevState.isLogged,
    }));
  }

  handleClick(nick, time, players) {
    this.handleLog();

    const self = this;

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/collection?username=${nick}&stats=1&subtype=boardgame&own=1`,
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
          this.createGameList(data, time, players);
        }
      })

      .catch(res => {
        if (res.status !== 200) swal('Ooops..', 'Something went wrong, please try again', 'error');
        self.init();
      });
  }

  checkForSelection(isClicked, time, title) {
    const currentTime = parseInt(time, 10);
    const prevTime = this.state.totalTime;
    const selectedItem = {
      title,
      time,
    };

    /*
    this.setState(
      prevState => ({
        isClicked: !prevState.isClicked,
      }),
      () => {
        const sumOfTimes = isClicked ? prevTime + currentTime : prevTime - currentTime;
        this.setState(prevState => ({
          totalTime: parseInt(sumOfTimes, 10),
          itemsPickedSidebar: isClicked
            ? [...prevState.itemsPickedSidebar, selectedItem]
            : prevState.itemsPickedSidebar.filter(item => item.title !== title),
        }));
      },
    );
    */

    const sumOfTimes = isClicked ? prevTime + currentTime : prevTime - currentTime;

    this.setState(prevState => ({
      totalTime: parseInt(sumOfTimes, 10),
      itemsPickedSidebar: isClicked
        ? [...prevState.itemsPickedSidebar, selectedItem]
        : prevState.itemsPickedSidebar.filter(item => item.title !== title),
    }));
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

  sort(id, key) {
    const itemsNotM = this.state.itemsFit.map(x => x);
    const itemsM = this.state.itemsFitMutable.map(x => x);
    let filterArr = [];

    if (key === 'numOfPlays') {
      switch (id) {
        case 0:
          filterArr = itemsNotM;
          break;
        case 1:
          filterArr = itemsM.filter(item => parseInt(item.numplays._text, 10) === 0);
          break;
        case 2:
          filterArr = itemsM.filter(
            item =>
              parseInt(item.numplays._text, 10) >= 1 && parseInt(item.numplays._text, 10) <= 3,
          );

          break;
        case 3:
          filterArr = itemsM.filter(
            item =>
              parseInt(item.numplays._text, 10) >= 4 && parseInt(item.numplays._text, 10) <= 10,
          );
          break;
        case 4:
          filterArr = itemsM.filter(item => parseInt(item.numplays._text, 10) > 10);
          break;
        default:
          break;
      }

      this.setState({
        itemsFitMutable: filterArr,
      });
    } else {
      switch (id) {
        case 0:
          itemsM.sort((a, b) => {
            let comparison = 0;
            if (a.name._text.toUpperCase() > b.name._text.toUpperCase()) {
              comparison = 1;
            } else comparison = -1;

            return comparison;
          });

          this.setState({
            itemsFitMutable: itemsM,
          });

          break;
        case 1:
          itemsM.sort((a, b) => {
            let comparison = 0;
            if (b.name._text.toUpperCase() > a.name._text.toUpperCase()) {
              comparison = 1;
            } else comparison = -1;

            return comparison;
          });
          this.setState({
            itemsFitMutable: itemsM,
          });
          break;
        case 2:
          itemsM.sort((a, b) => {
            return parseInt(a.numplays._text, 10) - parseInt(b.numplays._text, 10);
          });

          this.setState({
            itemsFitMutable: itemsM,
          });

          break;
        case 3:
          itemsM.sort((a, b) => {
            return parseInt(b.numplays._text, 10) - parseInt(a.numplays._text, 10);
          });

          this.setState({
            itemsFitMutable: itemsM,
          });
          break;
        default:
          break;
      }
    }
  }

  removeItem(time, title) {
    const timeNumber = parseInt(time, 10);
    this.setState(prevState => ({
      itemsPickedSidebar: prevState.itemsPickedSidebar.filter(item => item.title !== title),
      totalTime: prevState.totalTime - timeNumber,
      isClicked: !prevState.isClicked,
    }));
  }

  render() {
    const { isLogged } = this.state;
    return (
      <AppTemplate>
        <GlobalStyle />
        {isLogged ? (
          <>
            <Sidebar
              totalTime={this.state.totalTime}
              time={this.state.time}
              itemsArr={this.state.itemsPickedSidebar}
              removeItem={this.removeItem.bind(this)}
              handleLog={this.handleLog.bind(this)}
            />
            <Wrapper>
              <InnerWrapper>
                <Dropdown
                  filterArr={this.state.numOfPlaysFilters}
                  title="Number of plays:"
                  sortItems={this.sort.bind(this)}
                />
                <Dropdown
                  filterArr={this.state.filters}
                  title="Sort by:"
                  sortItems={this.sort.bind(this)}
                />
              </InnerWrapper>
              <GameCollection
                itemsFit={this.state.itemsFitMutable}
                checkForSelection={this.checkForSelection}
                isClicked={this.state.isClicked}
              />
            </Wrapper>
          </>
        ) : (
          <WelcomeView getFormValues={this.handleClick.bind(this)} nick={this.state.nick} />
        )}
      </AppTemplate>
    );
  }
}

export default App;

/*
<Sidebar
          totalTime={this.state.totalTime}
          time={this.state.time}
          itemsArr={this.state.itemsPickedSidebar}
          removeItem={this.removeItem.bind(this)}
        />
        <Wrapper>
          <InnerWrapper>
            <Dropdown
              filterArr={this.state.numOfPlaysFilters}
              title="Number of plays:"
              sortItems={this.sort.bind(this)}
            />
            <Dropdown
              filterArr={this.state.filters}
              title="Sort by:"
              sortItems={this.sort.bind(this)}
            />
          </InnerWrapper>
          {this.state.isVisible ? (
            <GameCollection
              itemsFit={this.state.itemsFitMutable}
              checkForSelection={this.checkForSelection}
              isClicked={this.state.isClicked}
            />
          ) : null}
        </Wrapper>
        */
