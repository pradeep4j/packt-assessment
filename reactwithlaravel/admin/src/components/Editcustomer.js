import React, { useState, useEffect } from 'react';
import { Typography, FormGroup, FormControl, TextField, styled, Button, FormLabel, ImageListItem, ImageList, Avatar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { getStudentWithId, updateStudent } from '../routes/api';
//import swal from 'sweetalert';
import { deepOrange } from '@mui/material/colors'; //for avatar icon background color
import * as Yup from 'yup'; // Yup is a JavaScript object schema validator.
import { useFormik } from 'formik'; //formik is third party React form library. It provides basic form programming and validation
import { getImageUrl } from '../utils/localStorage';


const Editstudent = () => {
  // const {getImageUrl} = AuthUser();
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  //const [password,setPassword] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imagePreviewDb, setImagePreviewDb] = useState('');
  //const [errors,setErrors]= useState([]);
  const { id } = useParams();
  let navigate = useNavigate();
  const URL = getImageUrl();
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreviewDb('');
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
  //for inline validations via Yup and formik
  const schema = Yup.object({
    name: Yup.string('name')
      .required('Name is required'),
    course: Yup.string('course')
      .required('Course is required'),
    email: Yup.string('email')
      .email('Enter a valid email')
      .required('Email is required'),
    /* password: Yup.string('password')
       .min(8, 'Password should be of minimum 6 characters length')
       .max(30, 'Password should be of minimum 30 characters length')
       .required('Password is required'),
     repassword: Yup.string('repassword')
       .min(8, 'Password should be of minimum 6 characters length')
       .max(30, 'Password should be of minimum 30 characters length')
       .required('Password is required')
       .when('password', {
         is: (val) => !!(val && val.length > 0),
         then: Yup.string().oneOf(
           [Yup.ref('password')],
           'Password and Retype Password do not match')
       }),*/
    phone: Yup.string('phone')
      .min(10, 'Phone minimum 10 characters length')
      .max(10, 'Phone maximum 10  characters length')
      .required('Phone is required')/*,
    image: Yup.string('image')
    .required('Image is required'),   */

  });
  const savedValues = {
    name: name,
    course: course,
    email: email,
    password: '',
    repassword: '',
    phone: phone
  };
  // alert(savedValues.name+'-'+savedValues.course+'--'+savedValues.email);
  const initialValues = {
    name: '',
    course: '',
    email: '',
    password: '',
    repassword: '',
    phone: ''
  };

  const formik = useFormik({
    initialValues: savedValues || initialValues,
    validationSchema: schema,
    enableReinitialize: true,  //this variable must be true if data comes from API
    onSubmit: (values, { resetForm }) => {
      onUserUpdate(values, resetForm);
    }
  });
  //alert(imagePreview)
  const getStudent = (id) => {

    getStudentWithId(id).then((resp) => {
      if (resp.data.status === 201) {
        setName(resp.data.selectedStudenRecord.name);
        setCourse(resp.data.selectedStudenRecord.course);
        setEmail(resp.data.selectedStudenRecord.email);
        setPhone(resp.data.selectedStudenRecord.phone);
        //alert(`${URL}/storage/student/images/${resp.data.selectedStudenRecord.image}`)
        setImagePreviewDb(`${URL}/storage/student/images/${resp.data.selectedStudenRecord.image}`);
      }
      else {
        /*swal({
            title: "Warning!",
            text: 'No Student ID Found!',
            icon: "warning",
            button: "OK!",
        });  */
        NotificationManager.error('No Student ID Found!', 'Error', 5000);
        navigate("/student");
      }
    });
  }
  const onUserUpdate = async (val) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('name', val.name)
    formData.append('course', val.course)
    formData.append('email', val.email)
    formData.append('phone', val.phone)
    //   formData.append('password',password)

    if (image !== null) {
      formData.append('image', image)
    }

    /*const postBody = {
      name:name,
  course:course,
  email:email,
  phone:phone,
      image:image       
  }*/
    await updateStudent(formData, id).then(resp => {

      /*    alert(resp.data.status+'=='+JSON.stringify(resp.data.message));
          return;*/
      if (resp.data.status === 201) {
        setName('');
        setCourse('');
        setEmail('');
        setPhone('');
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
        //setErrors(resp.data.message);
      }

    });
  }

  useEffect(() => {
    getStudent(id);

    // enableReinitialize();
  }, []);
  return (
    <form method="POST" enctype="multipart/form-data" >
      <Container>
        <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
        <Typography variant="h5">Update Student<Ptags>(All the field having * are required)</Ptags></Typography>
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
              required
            />
          </Ptags>
          <ImagePreview>
            {(imagePreviewDb || imagePreview) ? (
              <>
                <img src={imagePreviewDb ? imagePreviewDb : imagePreview} alt="error!" />
              </>
            ) : (
              <p>Student image upload preview will appear here!</p>
            )}
          </ImagePreview>
        </ImageList>
        <Spanning id="iamges"></Spanning>
        <FormControl>
          <Buttons variant="contained" component="label" type="submit" onClick={(e) => formik.handleSubmit()}>Update Student</Buttons>
        </FormControl>
      </Container>
    </form>
  )
}

export default Editstudent;

const Container = styled(FormGroup)`
width: 30%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
}
`
const Spanning = styled(FormLabel)`
color: red;
font-size:12px;
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