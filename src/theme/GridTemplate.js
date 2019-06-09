import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 50px 10px;

  > * {
    justify-self: center;
  }
`;

const GridTemplate = ({ children }) => <StyledWrapper>{children}</StyledWrapper>;

GridTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GridTemplate;
