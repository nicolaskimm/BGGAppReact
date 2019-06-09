import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'atoms/Button/Button';
import './SingleGame.css';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 400px;
  background-color: ${({ theme }) => theme.color.lighterBlue};
`;

const StyledImage = styled.div`
  width: 100%;
  height: 40%;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 20%;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0;

  ${buttons =>
    buttons &&
    css`
      justify-content: flex-end;
      padding-bottom: 20px;
    `}
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.color.white};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0 0 15px;
`;

class SingleGame extends Component {
  state = {
    isClicked: false,
  };

  toggleClick(time) {
    this.setState(
      prevState => ({
        isClicked: !prevState.isClicked,
      }),
      () => {
        this.props.onClick(this.state.isClicked, time);
      },
    );
  }

  render() {
    const { index, src, title, time, playersMax, playersMin, numOfPlays } = this.props;
    const { isClicked } = this.state;

    return (
      <StyledWrapper key={index}>
        <StyledImage image={src} />
        <StyledInnerWrapper>
          <StyledParagraph> {title} </StyledParagraph>
          <StyledParagraph time> {time} min </StyledParagraph>
          <StyledParagraph>
            {playersMin} - {playersMax} players
          </StyledParagraph>
          <StyledParagraph> {numOfPlays} </StyledParagraph>
        </StyledInnerWrapper>
        <StyledInnerWrapper buttons>
          <Button isClicked={isClicked} onClick={() => this.toggleClick(time)}>
            x
          </Button>
        </StyledInnerWrapper>
      </StyledWrapper>
    );
  }
}

SingleGame.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  playersMin: PropTypes.number.isRequired,
  playersMax: PropTypes.number.isRequired,
  numOfPlays: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SingleGame;
