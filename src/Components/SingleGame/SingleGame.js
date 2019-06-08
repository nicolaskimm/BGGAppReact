import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './SingleGame.css';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  background-color: ${({ theme }) => theme.color.lighterBlue};
`;

/* const StyledImage = styled.img`
  width: 100%;
  height: 30%;
`;
*/

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.color.white};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const SingleGame = props => (
  <StyledWrapper key={props.index}>
    <StyledInnerWrapper>
      <StyledParagraph> {props.title} </StyledParagraph>
      <StyledParagraph> {props.time} min </StyledParagraph>
      <StyledParagraph>
        {props.playersMin} - {props.playersMax} players
      </StyledParagraph>
      <StyledParagraph> {props.numOfPlays} </StyledParagraph>
      <button onClick={props.onClick} />
    </StyledInnerWrapper>
  </StyledWrapper>
);

SingleGame.propTypes = {
  index: PropTypes.number.isRequired,
  // src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  playersMin: PropTypes.number.isRequired,
  playersMax: PropTypes.number.isRequired,
  numOfPlays: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SingleGame;

//     <StyledImage src={props.src} alt="game" />
