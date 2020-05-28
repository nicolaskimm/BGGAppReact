import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from 'Components/atoms/Header/Header';
import Button from 'Components/atoms/Button/Button';

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;

const InnerWrapper = styled.div`
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

const ButtonsSection = ({ isVisible, checkIfPlayed, randomGame, allGames, totalTime, sort }) => (
  <Wrapper isVisible={isVisible}>
    <InnerWrapper>
      <StyledHeader>Choose one: </StyledHeader>
      <StyledButton name="played" buttonSection onClick={checkIfPlayed}>
        already played
      </StyledButton>
      <StyledButton name="notPlayed" buttonSection onClick={checkIfPlayed}>
        not played
      </StyledButton>
      <StyledButton name="max3" buttonSection onClick={checkIfPlayed}>
        max 3
      </StyledButton>
      <StyledButton name="4to10" buttonSection onClick={checkIfPlayed}>
        4 to 10
      </StyledButton>
      <StyledButton name="moreThan10" buttonSection onClick={checkIfPlayed}>
        more than 10
      </StyledButton>
      <StyledButton buttonSection onClick={randomGame}>
        random
      </StyledButton>
      <StyledButton buttonSection onClick={allGames}>
        back to all
      </StyledButton>
    </InnerWrapper>
    <InnerWrapper>
      <StyledHeader>Sort games: </StyledHeader>
      <StyledButton name="atoz" buttonSection onClick={sort}>
        a to z
      </StyledButton>
      <StyledButton name="ztoa" buttonSection onClick={sort}>
        z to a
      </StyledButton>
      <StyledButton name="ascending" buttonSection onClick={sort}>
        sort ascending
      </StyledButton>
      <StyledButton name="decending" buttonSection onClick={sort}>
        sort decending
      </StyledButton>
    </InnerWrapper>

    <StyledHeader totalTime>
      Total time: <StyledSpan>{totalTime}</StyledSpan>
    </StyledHeader>
  </Wrapper>
);

ButtonsSection.propTypes = {
  randomGame: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  checkIfPlayed: PropTypes.func.isRequired,
  allGames: PropTypes.func.isRequired,
  totalTime: PropTypes.number.isRequired,
  sort: PropTypes.func.isRequired,
};

export default ButtonsSection;
