import React from 'react';
import PropTypes from 'prop-types';

import SingleGame from 'views/SingleGame/SingleGame';
import GamesTemplate from 'Components/templates/GamesTemplate';

const GameCollection = props => (
  <GamesTemplate>
    {props.itemsFit.map(item => (
      <SingleGame
        key={item.name._text}
        src={item.image._text}
        title={item.name._text}
        time={item.stats._attributes.playingtime}
        playersMin={item.stats._attributes.minplayers}
        playersMax={item.stats._attributes.maxplayers}
        numOfPlays={
          parseInt(item.numplays._text, 10) === 0
            ? "ouch, you didn't play this one"
            : `Number of plays: ${item.numplays._text}`
        }
        selectItem={props.checkForSelection}
        isClicked={props.isClicked}
      />
    ))}
  </GamesTemplate>
);

GameCollection.propTypes = {
  itemsFit: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkForSelection: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
};

export default GameCollection;
