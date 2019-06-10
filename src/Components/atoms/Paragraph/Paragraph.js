import styled, { css } from 'styled-components';

const Paragraph = styled.p`
  color: black;
  font-weight: ${({ theme }) => theme.fontWeight.light};
  margin: 0 0 15px;
  font-size: 16px;

  ${({ time }) =>
    time &&
    css`
      color: ${({ theme }) => theme.color.main};
      font-weight: ${({ theme }) => theme.fontWeight.bold};

      font-size: 30px;
    `}
`;

export default Paragraph;
