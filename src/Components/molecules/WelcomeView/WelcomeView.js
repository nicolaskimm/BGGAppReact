import React from 'react';
import styled, { css } from 'styled-components';
import Form from 'Components/molecules/Form/Form';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  margin: 0;
  height: 100vh;
  background-color: #282954;
  color: #fcfcfc;
`;

const InnerWrapper = styled.div`
  height: 100vh;
  padding: 200px 40px 0;

  ${({ right }) =>
    right &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 100px 0 0 0;
      color: black;
      position: initial;
      background-color: white;
    `}
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

const WelcomeView = ({ getFormValues }) => (
  <Wrapper>
    <InnerWrapper>
      <Heading>Boardime.</Heading>
      <StyledParagraph>
        Boardime is an app for all board games lovers, who like many of us, has problem with picking
        the right boxes considering number of playmates and time. You simply need to have a BGG
        account and after writing your parameteres and nick (to BGG of course), Boardime will
        provide you titles, that exactly matches your requirements. Inside you will find options to
        look through your collection and sort results.
      </StyledParagraph>
    </InnerWrapper>
    <InnerWrapper right>
      <Form getFormValues={getFormValues} />
    </InnerWrapper>
  </Wrapper>
);

export default WelcomeView;
