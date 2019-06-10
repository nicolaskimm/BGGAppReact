import styled from 'styled-components';

const Input = styled.input`
  width: 140px;
  height: 80%;
  border: none;
  border-bottom: ${({ theme }) => `1.3px solid ${theme.color.main}`};
  background-color: transparent;
  color: black;
  text-align: center;

  &:placeholder-shown {
    padding-top: 20px;
    outline: none;
  }

  @media screen and (max-width: 1101px) {
    width: 120px;
    font-size: 12px;
  }

  @media screen and (max-width: 899px) {
    width: 100px;
    font-size: 12px;
  }

  @media screen and (max-width: 699px) {
    width: 80px;
    font-size: 10px;
  }

  @media screen and (max-width: 599px) {
    margin-bottom: 40px;
  }
`;

export default Input;
