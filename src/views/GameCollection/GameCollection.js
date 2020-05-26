import React from 'react';
import PropTypes from 'prop-types';
import SingleGame from 'views/SingleGame/SingleGame';
import GridTemplate from 'Components/templates/GridTemplate';

const GameCollection = props => (
  <GridTemplate>
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
        onClick={props.onClick}
      />
    ))}
  </GridTemplate>
);

GameCollection.propTypes = {
  itemsFit: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GameCollection;
