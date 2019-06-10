import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from 'Components/atoms/Header/Header';
import Button from 'Components/atoms/Button/Button';

const StyledWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  margin: 60px 0 100px;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
`;

const StyledButton = styled(Button)`
  margin: 0 15px;
`;

const StyledHeader = styled(Header)`
  margin: 0;
`;

const StyledSpan = styled.span`
  font-size: 70px;
  color: ${({ theme }) => theme.color.main};
`;

const ButtonsSection = props => (
  <StyledWrapper isVisible={props.buttonsVisibility}>
    <StyledInnerWrapper>
      <StyledHeader>Choose one: </StyledHeader>
      <StyledButton name="played" buttonSection onClick={props.checkForNumOfPlays}>
        already played
      </StyledButton>
      <StyledButton name="notPlayed" buttonSection onClick={props.checkForNumOfPlays}>
        not played
      </StyledButton>
      <StyledButton buttonSection onClick={props.randomGame}>
        random
      </StyledButton>
      <StyledButton buttonSection onClick={props.allGames}>
        back to all
      </StyledButton>
    </StyledInnerWrapper>
    <StyledHeader totalTime>
      Total time: <StyledSpan>{props.totalTime}</StyledSpan>
    </StyledHeader>
  </StyledWrapper>
);

ButtonsSection.propTypes = {
  randomGame: PropTypes.func.isRequired,
  buttonsVisibility: PropTypes.bool.isRequired,
  checkForNumOfPlays: PropTypes.func.isRequired,
  allGames: PropTypes.func.isRequired,
  totalTime: PropTypes.number.isRequired,
};

export default ButtonsSection;