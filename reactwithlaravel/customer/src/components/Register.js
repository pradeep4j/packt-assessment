import React from 'react';
import { Typography, FormGroup, FormControl, TextField, styled, Button, FormLabel, ImageListItem, ImageList, Avatar } from '@mui/material';
import { useState } from 'react';
import { register } from '../routes/api';
//import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import swal from 'sweetalert';
import { deepOrange } from '@mui/material/colors'; //for avatar icon background color
import * as Yup from 'yup'; // Yup is a JavaScript object schema validator.
import { useFormik } from 'formik'; //formik is third party React form library. It provides basic form programming and validation



const Register = () => {
  // const {http,setToken} = AuthUser();
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  //for inline validations via Yup and formik
  const schema = Yup.object({
    name: Yup.string('')
      .required('Name is required'),
    email: Yup.string('')
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string('')
      .min(8, 'Password should be of minimum 8 characters length')
      .max(30, 'Password should be of minimum 30 characters length')
      .required('Password is required'),
    repassword: Yup.string('')
      .min(8, 'Re Password should be of minimum 8 characters length')
      .max(30, 'Re Password should be of minimum 30 characters length')
      .required('Re Password is required')
      .when('password', {
        is: (val) => !!(val && val.length > 0),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Password and Retype Password do not match')
      }),
    image: Yup.mixed().required("Image is required")

  });
  const initialValues = {
    name: 'customer',
    email: 'customer@customer.com',
    password: '12345678',
    repassword: '',
    image: ''
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,

    onSubmit: (values, { resetForm }) => {
      onUserRegister(values, resetForm);
    }
  });

  const navigate = useNavigate();
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

    TransformFileData(file);
  };
  //reading image using The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
  const TransformFileData = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {

        setImagePreview(reader.result);
      }
    } else {
      setImagePreview("");
    }
  };

  const onUserRegister = (val) => {

    const formData = new FormData();
    formData.append('name', val.name)
    formData.append('email', val.email)
    formData.append('password', val.password)
    formData.append('image', image)
    //calling api
    register(formData).then(resp => {
      if (resp.data.status === 201) {
        navigate('/login');
        /*swal({
            title: "Successful!",
            text: resp.data.message,
            icon: "success",
            button: "OK!",
          });*/
        toast.success('Customer is created in Successfully!', {
          position: "bottom-right",
          hideProgressBar: false,
          progress: undefined,
        });
      }
      else if (resp.data.status === 400) {
        // alert(resp.data.message.email);
        toast.error('Email has alreay been taken!', {
          position: "bottom-right",
          hideProgressBar: false,
          progress: undefined,
        });
      }
      else {
        // alert(resp.data.message + 'else');
        toast.error(resp.data.message, {
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

    <form method="POST" enctype="multipart/form-data" >
      <Container>
        <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
        <Typography variant="h5">Sign Up Customer<Ptags>(All the field having * are required)</Ptags></Typography>
        <FormControl>
          <TextField value={formik.values.name}
            required='required'
            id='name'
            name='name'
            label="Name"
            onChange={formik.handleChange}
            inputProps={{ maxLength: 50 }}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

        </FormControl>
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
          <TextField value={formik.values.repassword}
            required='required'
            id='repassword'
            name='repassword'
            label="Retype Password"
            onChange={formik.handleChange}
            /* inputProps={{ maxLength: 50 }} */
            error={formik.touched.repassword && Boolean(formik.errors.repassword)}
            helperText={formik.touched.repassword && formik.errors.repassword}
            type="password"
          />
        </FormControl>
        <ImageList>

          <Ptags id="description"><Typography >Choose an image</Typography>
            <input
              id="image"
              accept="image/*"
              name="image"
              type="file"
              onChange={(e) => {
                handleProductImageUpload(e); formik.setTouched({
                  ...formik.touched.image
                }); formik.setFieldValue("image", e.target.files[0])
              }}
            />
          </Ptags>
          <ImagePreview>
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="error!" />
              </>
            ) : (
              <p>Student image upload preview will appear here!</p>
            )}
          </ImagePreview>
        </ImageList><Spannings id="iamges">{(formik.touched.image && formik.errors.image) ? <div>{formik.errors.image}</div> : null}</Spannings>
        <FormControl>
          <Buttons variant="contained" component="label" type="submit" onClick={(e) => formik.handleSubmit()}>Add Student</Buttons>
        </FormControl>
      </Container>
    </form>

  )
}

export default Register;
const Container = styled(FormGroup)`
width: 30%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
}
`
const Spanning = styled(FormLabel)`
color: red;
font-size:10px;
`
const Spannings = styled(FormLabel)`
color: #d32f2f;
font-size:13px;
`
const Ptags = styled('p')`
font-size:10px;
`
const Buttons = styled(Button)`
width: 40%;
`
const ImagePreview = styled(ImageListItem)`
 border: 1px solid rgb(183, 183, 183);
  max-width: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`
