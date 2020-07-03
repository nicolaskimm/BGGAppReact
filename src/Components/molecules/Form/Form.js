import React from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 500px;
`;

const StyledInput = styled.input`
  appearance: none;
  margin: 0;
  width: 500px;
  height: 60px;
  margin-bottom: 70px;
  border: none;
  background-color: rgba(40, 41, 84, 0.5);
  padding: 0 20px;
  color: white;
  font-size: 1.5em;

  &:focus {
    outline: none;
    background-color: rgba(40, 41, 84, 1);
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    appearance: none;
  }
`;

const StyledLabel = styled.label`
  font-size: 2em;
  align-self: start;
  margin-bottom: 12px;
  letter-spacing: 4px;
  transition: 0.6s;

  &:hover {
    letter-spacing: initial;
  }
`;

const StyledButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background-color: #282954;
  color: white;
  font-size: 2em;
  transition: 0.3s;
  align-self: flex-end;

  &:hover {
    color: #5bff89;
  }
`;

const Form = ({ getFormValues }) => {
  const formik = useFormik({
    initialValues: {
      nick: '',
      time: '',
      players: '',
    },
    onSubmit: values => getFormValues(values.nick, values.time, values.players),
  });
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Wrapper>
        <StyledLabel htmlFor="nick">nick </StyledLabel>

        <StyledInput
          id="nick"
          name="nick"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nick}
        />
        <StyledLabel htmlFor="time">time</StyledLabel>
        <StyledInput
          id="time"
          name="time"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.time}
        />
        <StyledLabel htmlFor="players">players</StyledLabel>
        <StyledInput
          id="players"
          name="players"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.players}
        />
        <StyledButton type="submit">go</StyledButton>
      </Wrapper>
    </form>
  );
};

Form.propTypes = {
  getFormValues: PropTypes.func.isRequired,
};

export default Form;
