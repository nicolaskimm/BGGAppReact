import React from 'react';
import styled from 'styled-components';
import InputHeader from 'atoms/InputHeader/InputHeader';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 5vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 140px;
  height: 80%;
  border: none;
  border-bottom: 1.3px solid red;
  background-color: transparent;
  color: ${({ theme }) => theme.color.white};
  text-align: center;
  align-self: flex-end;

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
  align-self: flex-end;
`;

const Search = () => (
  <StyledWrapper>
    <StyledHeader>Nick</StyledHeader>
    <StyledInput
      className="inputs_nick"
      placeholder="your nickname"
      // value={this.state.nick}
      // onChange={this.handleChange.bind(this)}
    />
    <StyledHeader>Time</StyledHeader>
    <StyledInput
      className="inputs_time"
      placeholder="only numbers!"
      // value={this.state.time}
      // onChange={this.handleChange.bind(this)}
    />
    <StyledHeader>Number of players</StyledHeader>
    <StyledInput
      className="inputs_players"
      placeholder="type the number"
      // value={this.state.players}
      // onChange={this.handleChange.bind(this)}
    />
  </StyledWrapper>
);

export default Search;
