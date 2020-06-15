import styled, { css } from 'styled-components';

const Paragraph = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.light};
  margin: 0 0 15px;
  font-size: 16px;

  ${({ time }) =>
    time &&
    css`
      font-weight: ${({ theme }) => theme.fontWeight.bold};

      font-size: 30px;
    `}
`;

export default Paragraph;
