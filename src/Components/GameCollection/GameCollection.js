import React from 'react';
import SingleGame from '../SingleGame/SingleGame';

const GameCollection = props => {
    
    let gameColl = props.itemsFit.map((item, index) => (
        <SingleGame
            key = {index}
            index = {index}
            src = {item.getElementsByTagName('image')[0].innerHTML}
            title = {item.getElementsByTagName('name')[0].innerHTML} 
            time = {item.getElementsByTagName('stats')[0].getAttribute('playingtime')} 
            playersMin = {item.getElementsByTagName('stats')[0].getAttribute('minplayers')}
            playersMax = {item.getElementsByTagName('stats')[0].getAttribute('maxplayers')} 
            numOfPlays = {parseInt(item.getElementsByTagName('numplays')[0].innerHTML) === 0 ? 'ouch, you didn\'t play this one' : 'Number of plays: ' + item.getElementsByTagName('numplays')[0].innerHTML } 
            onClick = {props.onClick}
        />
    ))

    return gameColl;
}

export default GameCollection;

