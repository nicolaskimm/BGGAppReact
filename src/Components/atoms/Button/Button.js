import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  margin: 0;
  padding: 0;
  width: ${({ buttonSection }) => (buttonSection ? '100px' : '40px')};
  height: 30px;
  font-size: 12px;
  border: none;
  background-color: ${({ isClicked }) => (isClicked ? 'red' : 'transparent')};
  color: ${({ pick }) => (pick ? 'white' : 'black')};
  outline: none;
`;

export default Button;
