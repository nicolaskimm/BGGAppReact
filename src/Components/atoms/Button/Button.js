import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  margin: 0;
  padding: 0;
  width: ${({ buttonSection }) => (buttonSection ? '100px' : '40px')};
  height: 30px;
  font-size: 12px;
  background-color: ${({ isClicked }) => (isClicked ? 'red' : 'transparent')};
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.main};
  color: ${({ pick }) => (pick ? 'white' : 'black')};
  outline: none;
`;

export default Button;
