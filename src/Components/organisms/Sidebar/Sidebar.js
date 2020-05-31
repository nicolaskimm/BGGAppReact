import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  padding: 0 0 0 12px;
  height: 100vh;
  overflow: scroll;
  width: 300px;
  border-right: 2px solid black;
`;

const Sidebar = ({ totalTime, itemsArr }) => (
  <Wrapper>
    <h1> total time: {totalTime}</h1>
    {itemsArr.map((item, index) => {
      return (
        <h1 key={item.title}>
          {index + 1}. {item.title} {item.time}
        </h1>
      );
    })}
  </Wrapper>
);

Sidebar.propTypes = {
  totalTime: PropTypes.number.isRequired,
  itemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidebar;
