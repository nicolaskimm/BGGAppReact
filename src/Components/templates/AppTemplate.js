import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
`;

const AppTemplate = ({ children }) => <StyledWrapper>{children}</StyledWrapper>;

AppTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default AppTemplate;
