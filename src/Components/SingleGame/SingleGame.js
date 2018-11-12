import React from 'react';
import './SingleGame.css'

/*const SingleGame = (props) => (
    <li className='singleGame' key={props.index}>
        <img className='photo'
            src={props.src}
            alt='game'
        />
        <div className='textInfo'> 
            <p className='title'> {props.title} </p>
            <p className='time'> {props.time} min </p> 
            <p className='players'> {props.playersMin} - {props.playersMax} players </p>
            <p className='numOfPlays'> {props.numOfPlays} </p> 
            <button className={props.className} id={props.index} onClick={props.onClick}> </button>
        </div>
    </li>
);*/

class SingleGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChosen: false
        }
    }

    selectedButton() {

    }

    render(){
        return (
            <li className='singleGame' key={this.props.index}>
                <img className='photo'
                    src={this.props.src}
                    alt='game'
                />
                <div className='textInfo'> 
                    <p className='title'> {this.props.title} </p>
                    <p className='time'> {this.props.time} min </p> 
                    <p className='players'> {this.props.playersMin} - {this.props.playersMax} players </p>
                    <p className='numOfPlays'> {this.props.numOfPlays} </p> 
                    <button className='notSelected' id={this.props.index} onClick={this.props.onClick}> </button>
                </div>
            </li>
        )
    }   
    
}

export default SingleGame;