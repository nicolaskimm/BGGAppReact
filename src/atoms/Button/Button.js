import styled from 'styled-components';

const Button = styled.button`
  display: block;
  width: 40px;
  height: 30px;
  font-size: 12px;
  background-color: transparent;
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.pink};
  color: ${({ theme }) => theme.color.white};
  outline: none;
`;

export default Button;
