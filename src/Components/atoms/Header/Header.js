import styled from 'styled-components';

const Header = styled.h1`
  font-size: 30px;
  color: black;

  @media screen and (max-width: xxl) {
    font-size: 18px;
  }

  @media screen and (max-width: xl) {
    font-size: 15px;
  }

  @media screen and (max-width: l) {
    font-size: 13px;
  }

  @media screen and (max-width: m) {
    font-size: 10px;
  }

  @media screen and (max-width: s) {
    margin: 0 0 10px;
  }
`;

export default Header;
