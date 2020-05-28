import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px 10px;
  margin-bottom: 30px;

  > * {
    justify-self: center;
  }
`;

const GamesTemplate = ({ children }) => <StyledWrapper>{children}</StyledWrapper>;

GamesTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default GamesTemplate;
