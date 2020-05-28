import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from 'Components/atoms/Header/Header';
import Button from 'Components/atoms/Button/Button';
import Input from 'Components/atoms/Input/Input';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px 0;

  > * {
    align-self: flex-end;
  }
`;

const StyledButtonWrapper = styled.div`
  padding-left: 10px;

  :first-child {
    margin-right: 5px;
  }
`;

const StyledHeader = styled(Header)`
  margin: 0 30px;
`;

const Search = props => (
  <StyledWrapper>
    <StyledHeader>Nick</StyledHeader>
    <Input name="nick" placeholder="your nickname" value={props.nick} onChange={props.onChange} />
    <StyledHeader>Time</StyledHeader>
    <Input name="time" placeholder="only numbers!" value={props.time} onChange={props.onChange} />
    <StyledHeader>Number of players</StyledHeader>
    <Input
      name="players"
      placeholder="type the number"
      value={props.players}
      onChange={props.onChange}
    />
    <StyledButtonWrapper>
      <Button onClick={props.onClick}>go</Button>
      <Button onClick={props.init}>x</Button>
    </StyledButtonWrapper>
  </StyledWrapper>
);

Search.propTypes = {
  nick: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  players: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
};

export default Search;
