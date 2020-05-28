import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  padding: 0 0 0 12px;
  height: 100vh;
  width: 300px;
  border-right: 2px solid black;
`;

const Sidebar = ({ totalTime }) => (
  <Wrapper>
    <h1> total time: {totalTime}</h1>
  </Wrapper>
);

export default Sidebar;
