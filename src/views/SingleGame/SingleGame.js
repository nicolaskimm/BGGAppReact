import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'Components/atoms/Button/Button';
import Paragraph from 'Components/atoms/Paragraph/Paragraph';
import Image from 'Components/atoms/Image/Image';
import plus from 'assets/plus.png';
import check from 'assets/check.png';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 400px;
  background-color: #fcfcfc;
  box-shadow: ${({ isClicked }) => (isClicked ? '0px 12px 16px 2px rgb(0, 0, 0, 0.3)' : 'none')};
  position: relative;
  border: ${({ isClicked }) => (isClicked ? '4px solid green' : '1px solid #d1cecd')};
  transition: 0.45s;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 33%;
  left: 75%;
  z-index: 999;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border: 5px solid white;
  transition: all 0.3s;
  background: ${({ isClicked }) => (isClicked ? `url(${check})` : `url(${plus})`)};
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: 50% 50%;
  background-color: ${({ isClicked }) => (isClicked ? 'green' : 'black')};
`;

class SingleGame extends Component {
  state = {
    isClicked: false,
  };

  toggleClick(time, title) {
    this.setState(
      prevState => ({
        isClicked: !prevState.isClicked,
      }),
      () => {
        this.props.selectItem(this.state.isClicked, time, title);
      },
    );
  }

  render() {
    const { src, title, time, playersMax, playersMin, numOfPlays } = this.props;
    const { isClicked } = this.state;

    return (
      <StyledWrapper isClicked={isClicked}>
        <Image image={src} />
        <StyledButton isClicked={isClicked} onClick={() => this.toggleClick(time, title)} />
        <StyledInnerWrapper>
          <Paragraph> {title} </Paragraph>
          <Paragraph time> {time} min </Paragraph>
          <Paragraph>
            {playersMin} - {playersMax} players
          </Paragraph>
          <Paragraph> {numOfPlays} </Paragraph>
        </StyledInnerWrapper>
      </StyledWrapper>
    );
  }
}

SingleGame.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  playersMin: PropTypes.string.isRequired,
  playersMax: PropTypes.string.isRequired,
  numOfPlays: PropTypes.string.isRequired,
  selectItem: PropTypes.func.isRequired,
};

export default SingleGame;
