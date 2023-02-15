import React, { useContext } from 'react';
import { Typography, FormGroup, FormControl, TextField, styled, Button, Avatar } from '@mui/material';
import { login } from '../routes/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deepOrange } from '@mui/material/colors'; //for avatar icon background color
import * as Yup from 'yup'; // Yup is a JavaScript object schema validator.
import { useFormik } from 'formik'; //formik is third party React form library. It provides basic form programming and validation
//import swal from 'sweetalert';  //for better alert notification like react-notifications
import { storeToken } from '../utils/localStorage';
import AuthContext from "../store/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const loginUser = authCtx.loginUser;
  const schema = Yup.object({
    email: Yup.string('')
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string('')
      .min(8, 'Password should be of minimum 8 characters length')
      .max(30, 'Password should be of minimum 30 characters length')
      .required('Password is required'),
  });
  //for inline validations via Yup and formik
  const formik = useFormik({
    initialValues: {
      email: 'customer@customer.com',
      password: '12345678',
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      onCustomerLogin(values, resetForm);
    }
  });

  const onCustomerLogin = (val) => {
    const postBody = {
      email: val.email,
      password: val.password
    }
    // api call
    login(postBody).then(response => {
      if (response.data.status === 201) {
        storeToken(response.data.message.user, response.data.message.access_token);
        toast.success('Customer is Logged in Successfully!', {
          position: "bottom-right",
          hideProgressBar: false,
          progress: undefined,
        });
        loginUser();
        navigate('/dashboard');
      }
      else if (response.data.status === 400) {
        toast.error(response.data.message, {
          position: "bottom-right",
          hideProgressBar: false,
          progress: undefined,
        });
      }
      else {
        toast.error(response.message, {
          position: "bottom-right",
          hideProgressBar: false,
          progress: undefined,
        });
      }

    }).catch(error => {
      toast.error(error.message, {
        position: "bottom-right",
        hideProgressBar: false,
        progress: undefined,
      });
    });
  }

  return (

    <Container>
      <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
      <Typography variant="h5">Login<Ptags>(All the field having * are required)</Ptags></Typography>
      {/* <Form metod="post" onSubmit={(e) =>{ onSubmit(e)}}> */}
      <FormControl>
        <TextField value={formik.values.email}
          required='required'
          id='email'
          name='email'
          label="Email"
          onChange={formik.handleChange}
          /* inputProps={{ maxLength: 50 }} */
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </FormControl>
      <FormControl>
        <TextField value={formik.values.password}
          required='required'
          id='password'
          name='password'
          label="Password"
          onChange={formik.handleChange}
          /* inputProps={{ maxLength: 50 }} */
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          type="password"
        />
      </FormControl>

      <FormControl>
        <Buttons variant="contained" type="submit" onClick={formik.handleSubmit}>Login</Buttons>
      </FormControl>
      <FormControl>
        <Link to="/adminregister" >
          {"Don't have an account? Sign Up"}
        </Link>
      </FormControl>
    </Container>

  )
}

export default Login;
const Container = styled(FormGroup)`
width: 30%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
}
`
/*const Spanning =  styled(FormLabel)`
color: red;
font-size:12px;
`*/
const Ptags = styled('p')`
font-size:10px;
`
const Buttons = styled(Button)`
width: 40%;
`