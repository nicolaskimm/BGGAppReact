import styled from 'styled-components';

const Image = styled.div`
  width: 100%;
  height: 40%;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 20%;
`;

export default Image;
