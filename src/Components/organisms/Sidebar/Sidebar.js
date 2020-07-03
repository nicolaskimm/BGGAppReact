import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  padding: 25px 30px;
  height: 100vh;
  width: 30vw;
  background-color: #1f2041;
  color: white;
`;

const HeadingWrapper = styled.div`
  margin-bottom: 80px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;

  &:first-child {
    color: yellow;
    margin-top: 800px;
  }

  p:last-of-type {
    width: 100px;
    text-align: end;
    font-size: 1.4em;
  }
`;

const StyledHeading = styled.h1`
  margin: 0;
  font-weight: ${({ big }) => (big ? 'bold' : '300')};
  font-size: ${({ big }) => (big ? '4.5em' : '1.2em')};
  color: ${({ big }) => (big ? '#AD2B2B' : 'white')};

  &:nth-child(2) {
    margin-bottom: 15px;
  }
`;

const StyledParagraph = styled.p`
  width: 300px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  font-size: 1.2em;
  margin: 0;
`;

const StyledButton = styled.button`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border: none;
  border-radius: 50px;
  background-color: #ad2b2b;
  color: white;
`;

const Sidebar = ({ time, totalTime, itemsArr, removeItem, handleLog }) => (
  <Wrapper>
    <HeadingWrapper>
      <StyledHeading> Your time:</StyledHeading>
      <StyledHeading big> {time} min</StyledHeading>
      <StyledHeading> Time of selected games:</StyledHeading>
      <StyledHeading big>{totalTime} min</StyledHeading>
    </HeadingWrapper>
    {itemsArr.map(item => {
      return (
        <ItemWrapper key={item.title}>
          <StyledButton onClick={() => removeItem(item.time, item.title)}>x</StyledButton>
          <StyledParagraph>{item.title}</StyledParagraph>
          <StyledParagraph time>{item.time}</StyledParagraph>
        </ItemWrapper>
      );
    })}
    <button onClick={() => handleLog()}>back to all</button>
  </Wrapper>
);

Sidebar.propTypes = {
  totalTime: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  itemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItem: PropTypes.func.isRequired,
  handleLog: PropTypes.func.isRequired,
};

export default Sidebar;
