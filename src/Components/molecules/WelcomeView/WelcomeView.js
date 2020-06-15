import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
  padding: 0 90px;
  width: 40vw;
  height: 100vh;
  background-color: #282954;
  color: #fcfcfc;
`;

const InnerWrapper = styled.div`
  position: relative;
  top: 200px;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 5.5em;
  letter-spacing: 3px;
`;

const StyledParagraph = styled.p`
  font-size: 1.3em;
  margin-top: 60px;
  letter-spacing: 1.2px;
  line-height: 35px;
  padding: 0 40px;
`;

const WelcomeView = () => (
  <Wrapper>
    <InnerWrapper>
      <Heading>Boardime.</Heading>
      <StyledParagraph>
        Boardime is an app for all board games lovers, who like many of us, have problem with
        picking the right boxes considering number of playmates and time. You simply need to have a
        BGG account and after writing your parameteres and nick (to BGG o course), Boardime will
        provide you titles, that eexactly matches your requirements. Inside you will find options to
        look through your collection and sort results.
      </StyledParagraph>
    </InnerWrapper>
  </Wrapper>
);

export default WelcomeView;
