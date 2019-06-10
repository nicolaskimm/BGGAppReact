import React from 'react';
import PropTypes from 'prop-types';
import SingleGame from 'views/SingleGame/SingleGame';
import GridTemplate from 'Components/templates/GridTemplate';

const GameCollection = props => (
  <GridTemplate>
    {props.itemsFit.map((item, index) => (
      <SingleGame
        key={index}
        src={item.getElementsByTagName('image')[0].innerHTML}
        title={item.getElementsByTagName('name')[0].innerHTML}
        time={item.getElementsByTagName('stats')[0].getAttribute('playingtime')}
        playersMin={item.getElementsByTagName('stats')[0].getAttribute('minplayers')}
        playersMax={item.getElementsByTagName('stats')[0].getAttribute('maxplayers')}
        numOfPlays={
          parseInt(item.getElementsByTagName('numplays')[0].innerHTML, 10) === 0
            ? "ouch, you didn't play this one"
            : `Number of plays: ${item.getElementsByTagName('numplays')[0].innerHTML}`
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