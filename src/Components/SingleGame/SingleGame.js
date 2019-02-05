import React from 'react';
import './SingleGame.css';

const SingleGame = (props) => (
    <li className='singleGame' key={props.index}>
        <img className='photo'
            src={props.src}
            alt='game'
        />
        <div className='textInfo'> 
            <p className='textInfo_title'> {props.title} </p>
            <p className='textInfo_time'> {props.time} min </p> 
            <p className='textInfo_players'> {props.playersMin} - {props.playersMax} players </p>
            <p className='textInfo_numOfPlays'> {props.numOfPlays} </p> 
            <button className='textinfo_button-notSelected' onClick={props.onClick}></button>
        </div>
    </li>
);

export default SingleGame;