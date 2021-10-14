import React, { useEffect, useState } from 'react';

import {
  Box,
  Container,
  TextField,
  Button,
  Link,
  Alert,
  Typography,
  FilledInput,
  FormControl,
} from '@mui/material';

import { login } from '../../api';
import StandardInput from '../../components/StandardInput';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// let errors = [];

function Register(props) {
  const [userdata, setUserdata] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: new Date(),
  });

  const [alert, setAlert] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [errors, setErrors] = useState({ username: false, password: false, firstName: false, lastName: false, email: false, })

  function saveUserToDB() {
    console.log(userdata);
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    let length = inputs.length
    let validInputs = 0

    Array.from(inputs).filter((input) => {
    //   if (input.id !== "dateOfBirthInput") {
          console.log(input.validity)
        if (input.validity.valid) {
          validInputs += 1;
        }
    //   }
    });

    let isError = false;

    for(const prop in errors) {
        if(errors[prop] === true) {
            isError = true
        }
    }
    console.log(isError)

    if(validInputs === length && !isError) {
        setSubmitDisabled(false)
    } else {
        setSubmitDisabled(true)
    }
  }, [userdata]);

  return (
    <Container
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      maxWidth="xs"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
          maxWidth: '80vw',
        }}
      >
        <Typography
          sx={{
            mb: 2,
          }}
          variant="h5"
        >
          Register
        </Typography>
        <Box sx={{ width: '300px' }}>{alert}</Box>
        <StandardInput
          id="username"
          label="Username"
          name="username"
          value={userdata.username}
          setValue={setUserdata}
          required={true}
          type="text"
          error={errors.username}
          setErrors={setErrors}
        />
        <StandardInput
          id="password"
          label="Password"
          name="password"
          value={userdata.password}
          setValue={setUserdata}
          required={true}
          type="text"
          error={errors.password}
          setErrors={setErrors}
        />
        <StandardInput
          id="firstName"
          label="First name"
          name="firstName"
          value={userdata.firstName}
          setValue={setUserdata}
          required={true}
          type="text"
            error={errors.firstName}
            setErrors={setErrors}
        />
        <StandardInput
          id="lastName"
          label="Last name"
          name="lastName"
          value={userdata.lastName}
          setValue={setUserdata}
          required={true}
          type="text"
        error={errors.lastName}
        setErrors={setErrors}
        />
        <StandardInput
          id="email"
          label="Email"
          name="email"
          value={userdata.email}
          setValue={setUserdata}
          required={true}
          type="email"
          error={errors.email}
          setErrors={setErrors}
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <FormControl margin="dense" variant="filled">
            <Typography
              sx={{ fontSize: '15px', fontWeight: 600 }}
              margin="none"
            >
              Date of birth
            </Typography>
            <DatePicker
              id="dateOfBirth"
              value={userdata.dateOfBirth}
              disableFuture
              onChange={(newValue) => {
                setUserdata((prev) => ({ ...prev, dateOfBirth: newValue }));
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FilledInput
                    sx={{
                      width: '300px',
                      height: '40px',
                      borderRadius: '5px',
                      '&.Mui-error': {
                        background: '#FBB5B1',
                        border: '1px solid #F9202B',
                      },
                      '& input:not(:placeholder-shown)': {
                        height: '0px',
                      },
                    }}
                    id="dateOfBirthInput"
                    disableUnderline={true}
                    hiddenLabel={true}
                    endAdornment={InputProps?.endAdornment}
                    ref={inputRef}
                    {...inputProps}
                  />
                </Box>
              )}
            />
          </FormControl>
        </LocalizationProvider>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'right',
            mb: 2,
          }}
        ></Box>
        <Button
          sx={{
            width: 300,
            my: '10px',
            '&.MuiButton-disableElevation': {
              boxShadow: `(${submitDisabled} && 'none') || '4px 4px 20px 5px rgba(223, 120, 97, 0.25)'`,
            },
          }}
          color="primary"
          variant="contained"
          disableElevation
          disabled={submitDisabled}
          onClick={saveUserToDB}
        >
          Save
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
