import React from 'react';
import { Typography, FormGroup, FormControl, TextField, styled, Button, FormLabel, ImageListItem, ImageList, Avatar } from '@mui/material';
import { useState } from 'react';
import { createStudents } from '../routes/api';
//import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
//import swal from 'sweetalert';
import { deepOrange } from '@mui/material/colors'; //for avatar icon background color
import * as Yup from 'yup'; // Yup is a JavaScript object schema validator.
import { useFormik } from 'formik'; //formik is third party React form library. It provides basic form programming and validation
//import { connect } from 'react-redux';

const Addstudent = () => {
  // const dispatch = useDispatch();
  //const { createStatus } = useSelector((state) => state.products);
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  //const [errors,setErrors]= useState([]);
  //const [spinner,setSpinner] = useState(true);

  //for inline validations via Yup and formik
  const schema = Yup.object({
    name: Yup.string('')
      .required('Name is required'),
    course: Yup.string('')
      .required('Course is required'),
    email: Yup.string('')
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string('')
      .min(8, 'Password should be of minimum 6 characters length')
      .max(30, 'Password should be of minimum 30 characters length')
      .required('Password is required'),
    repassword: Yup.string('')
      .min(8, 'Password should be of minimum 6 characters length')
      .max(30, 'Password should be of minimum 30 characters length')
      .required('Password is required')
      .when('password', {
        is: (val) => !!(val && val.length > 0),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Password and Retype Password do not match')
      }),
    phone: Yup.string('phone')
      .min(10, 'Phone minimum 10 characters length')
      .max(10, 'Phone maximum 10  characters length')
      .required('Phone is required')/*,
      image: Yup.string('image')
      .required('Image is required'),   */

  });
  const initialValues = {
    name: '',
    course: '',
    email: '',
    password: '',
    repassword: '',
    phone: ''
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,

    onSubmit: (values, { resetForm }) => {
      onUserRegister(values, resetForm);
    }
  });
  const navigate = useNavigate();
  /*eslint-disable-next
  const validateEmail = (email) => {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //   another regex   /\S+@\S+\.\S+/  
      return re.test(email);
    };
  const validatePhone = (phone) => {
      var re = /^\d{10}$/;
      return re.test(phone);
  };*/
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
      };
    } else {
      setImagePreview("");
    }
  };

  const onUserRegister = async (val) => {

    const formData = new FormData();
    formData.append('name', val.name)
    formData.append('course', val.course)
    formData.append('email', val.email)
    formData.append('phone', val.phone)
    formData.append('password', val.password)
    formData.append('image', image)
    createStudents(formData).then(resp => {

      if (resp.data.status === 201) {
        navigate('/');
        /*swal({
            title: "Successful!",
            text: resp.data.message,
            icon: "success",
            button: "OK!",
          });*/
        NotificationManager.success(resp.data.message, 'Successful!', 5000);
        navigate("/student");
      }
      else if (resp.data.status === 400) {
        NotificationManager.error(resp.data.message.email, 'Failure!', 5000);
        //setErrors(resp.data.message);
      }
      else {
        NotificationManager.error(resp.data.message, 'Failure!', 5000);
      }
    });
  }
  return (

    <form method="POST" enctype="multipart/form-data" >
      <Container>
        <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
        <Typography variant="h5">Sign Up<Ptags>(All the field having * are required)</Ptags></Typography>
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
          <TextField value={formik.values.course}
            required='required'
            id='course'
            name='course'
            label="Course"
            onChange={formik.handleChange}
            /* inputProps={{ maxLength: 50 }} */
            error={formik.touched.course && Boolean(formik.errors.course)}
            helperText={formik.touched.course && formik.errors.course}
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
        <FormControl>
          <TextField value={formik.values.phone}
            required='required'
            id='phone'
            name='phone'
            label="Phone"
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
            }}
            type="number"
          />
        </FormControl>
        <ImageList>

          <Ptags id="description"><Typography >Choose an image</Typography>
            <input
              id="image"
              accept="image/*"
              type="file"
              name="image"
              // value={photo}
              onChange={handleProductImageUpload}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              required
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
        </ImageList>
        <Spanning id="iamges"></Spanning>
        <FormControl>
          <Buttons variant="contained" component="label" type="submit" onClick={(e) => formik.handleSubmit()}>Add Student</Buttons>
        </FormControl>
      </Container>
    </form>

  )
}

export default Addstudent;
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
const Ptags = styled('p')`
font-size:10px;
`
const Buttons = styled(Button)`
width: 40%;
`
const ImagePreview = styled(ImageListItem)`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
