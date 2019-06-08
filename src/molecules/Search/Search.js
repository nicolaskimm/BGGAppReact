import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputHeader from 'atoms/InputHeader/InputHeader';
import Button from 'atoms/Button/Button';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;

  > * {
    align-self: flex-end;
  }
`;

const StyledButtonWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: row;

  :first-child {
    margin-right: 5px;
  }
`;

const StyledInput = styled.input`
  width: 140px;
  height: 80%;
  border: none;
  border-bottom: 1.3px solid red;
  background-color: transparent;
  color: ${({ theme }) => theme.color.white};
  text-align: center;

  &:placeholder-shown {
    padding-top: 20px;
    outline: none;
  }

  &:hover {
    @media screen and (max-width: 1101px) {
      width: 120px;
      font-size: 12px;
    }

    @media screen and (max-width: 899px) {
      width: 100px;
      font-size: 12px;
    }

    @media screen and (max-width: 699px) {
      width: 80px;
      font-size: 10px;
    }

    @media screen and (max-width: 599px) {
      margin-bottom: 40px;
    }
  }
`;

const StyledHeader = styled(InputHeader)`
  margin: 0 30px;
`;

const Search = props => (
  <StyledWrapper>
    <StyledHeader>Nick</StyledHeader>
    <StyledInput
      name="nick"
      placeholder="your nickname"
      value={props.nick}
      onChange={props.onChange}
    />
    <StyledHeader>Time</StyledHeader>
    <StyledInput
      name="time"
      placeholder="only numbers!"
      value={props.time}
      onChange={props.onChange}
    />
    <StyledHeader>Number of players</StyledHeader>
    <StyledInput
      name="players"
      placeholder="type the number"
      value={props.players}
      onChange={props.onChange}
    />
    <StyledButtonWrapper>
      <Button onClick={props.onClick}>go</Button>
      <Button>x</Button>
    </StyledButtonWrapper>
  </StyledWrapper>
);

Search.propTypes = {
  nick: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  players: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Search;
