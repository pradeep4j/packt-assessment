import React from 'react';
import { Typography, FormGroup, FormControl, TextField, styled, Button, FormLabel, ImageListItem, ImageList, Avatar, Stack } from '@mui/material';
import { useState } from 'react';
import { createBooks } from '../routes/api';
//import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import swal from 'sweetalert';
import { deepOrange } from '@mui/material/colors'; //for avatar icon background color
import * as Yup from 'yup'; // Yup is a JavaScript object schema validator.
import { useFormik } from 'formik'; //formik is third party React form library. It provides basic form programming and validation
import Loading from './layout/Loading';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
//import dayjs, { Dayjs } from 'dayjs';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const Addbook = () => {
    const [Image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [spinner, setSpinner] = useState(false);

    const initialValues = {
        title: 'Pradeep',
        author: 'Pradeep',
        genres: 'Pradeep',
        description: 'Pradeep',
        ISBN: '2222222222222',
        publishDate: '',
        publisher: 'Pradeep',
        Image: ''

    };
    //for inline validations via Yup and formik
    const schema = Yup.object({
        title: Yup.string('')
            .required('Title is required')
            .min(3, 'Title should be of minimum 3 characters length'),
        author: Yup.string('')
            .required('Auther is required')
            .min(3, 'Auther should be of minimum 3 characters length'),
        genres: Yup.string('')
            .required('Genre is required'),
        description: Yup.string('')
            .required('Description is required')
            .min(3, 'Description should be of minimum 3 characters length')
            .max(4000, 'Description should be of maximumu 4000 characters length'),
        ISBN: Yup.string('')
            .min(13, 'ISBN should be of minimum 13 characters length')
            .max(13, 'ISBN should be of Maximum 13 characters length')
            .required('ISBN is requred'),
        publishDate: Yup.date()
            .required('Published date is required'),
        publisher: Yup.string('')
            .required('Publisher is required'),
        Image: Yup.mixed().required("Image is required"),

    });

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
            };
        } else {
            setImagePreview("");
        }
    };

    const onUserRegister = (val) => {

        const formData = new FormData();
        formData.append('Image', Image)
        formData.append('title', val.title)
        formData.append('author', val.author)
        formData.append('genres', val.genres)
        formData.append('description', val.description)
        formData.append('ISBN', val.ISBN)
        formData.append('publishDate', val.publishDate)
        formData.append('publisher', val.publisher)

        //alert(image); return;
        createBooks(formData).then(resp => {
            setSpinner(true);
            if (resp.data.status === 201) {
                // navigate('/');
                /*swal({
                    title: "Successful!",   
                    text: resp.data.message,
                    icon: "success",
                    button: "OK!",
                  });*/
                toast.success(resp.data.message, {
                    position: "bottom-right",
                    hideProgressBar: false,
                    progress: undefined,
                });
                navigate("/books");
            }
            else if (resp.data.status === 400) {
                toast.success(resp.data.message, {
                    position: "bottom-right",
                    hideProgressBar: false,
                    progress: undefined,
                });
            }
            else {
                toast.success(resp.data.message, {
                    position: "bottom-right",
                    hideProgressBar: false,
                    progress: undefined,
                });
            }
        }).catch(error => {
            toast.success(error.message, {
                position: "bottom-right",
                hideProgressBar: false,
                progress: undefined,
            });
        });
    }
    return (

        <form method="POST" enctype="multipart/form-data" >
            <Container>
                <LibraryBooksIcon sx={{ bgcolor: deepOrange[500] }} />
                <Typography variant="h5">Add Books<Ptags>(All the field having * are required)</Ptags></Typography>
                {spinner && <Loading />}
                <FormControl>
                    <TextField value={formik.values.title}
                        required='required'
                        id='title'
                        name='title'
                        label="Title"
                        onChange={formik.handleChange}
                        inputProps={{ maxLength: 50 }}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />

                </FormControl>
                <FormControl>
                    <TextField value={formik.values.author}
                        required='required'
                        id='author'
                        name='author'
                        label="Author"
                        onChange={formik.handleChange}
                        /* inputProps={{ maxLength: 50 }} */
                        error={formik.touched.author && Boolean(formik.errors.author)}
                        helperText={formik.touched.author && formik.errors.author}
                    />
                </FormControl>
                <FormControl>
                    <TextField value={formik.values.genres}
                        required='required'
                        id='genres'
                        name='genres'
                        label="Genre"
                        onChange={formik.handleChange}
                        /* inputProps={{ maxLength: 50 }} */
                        error={formik.touched.genres && Boolean(formik.errors.genres)}
                        helperText={formik.touched.genres && formik.errors.genres}
                    />
                </FormControl>
                <FormControl>
                    <TextField value={formik.values.description}
                        required='required'
                        id='description'
                        name='description'
                        label="Description"
                        onChange={formik.handleChange}
                        /* inputProps={{ maxLength: 50 }} */
                        multiline
                        rows={4}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}

                    />
                </FormControl>
                <FormControl>
                    <TextField value={formik.values.ISBN}
                        required='required'
                        id='ISBN'
                        name='ISBN'
                        label="ISBN"
                        onChange={formik.handleChange}
                        /* inputProps={{ maxLength: 50 }} */
                        error={formik.touched.ISBN && Boolean(formik.errors.ISBN)}
                        helperText={formik.touched.ISBN && formik.errors.ISBN}
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 13)
                        }}
                        type="number"
                    />
                </FormControl>
                <FormControl>
                    <Stack component="form" noValidate spacing={3}>
                        <TextField
                            id="date"
                            label="Published"
                            type="date"
                            name="publishDate"
                            defaultValue={new Date()}
                            sx={{ width: 420 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            onChange={formik.handleChange}
                            error={formik.touched.publishDate && Boolean(formik.errors.publishDate)}
                            helperText={formik.touched.publishDate && formik.errors.publishDate}
                        />
                    </Stack>
                    {/* <Spannings id="iamges">{formik.errors.published && formik.touched.published ? (
                        <div >{formik.errors.published}</div>
                    ) : null}</Spannings> */}
                    {/* <TextField value={formik.values.phone}
                        required='required'
                        id='published'
                        name='published'
                        label="Published"
                        onChange={formik.handleChange}
                        error={formik.touched.published && Boolean(formik.errors.published)}
                        helperText={formik.touched.published && formik.errors.published}

                    /> */}
                </FormControl>
                <FormControl>
                    <TextField value={formik.values.publisher}
                        required='required'
                        id='publisher'
                        name='publisher'
                        label="Publisher"
                        onChange={formik.handleChange}
                        error={formik.touched.publisher && Boolean(formik.errors.publisher)}
                        helperText={formik.touched.publisher && formik.errors.publisher}

                    />
                </FormControl>
                <ImageList>

                    <Ptags id="descriptionq"><Typography >Choose an image</Typography>

                        <input
                            id="image"
                            accept="image/*"
                            name="Image"
                            type="file"
                            onChange={(e) => {
                                handleProductImageUpload(e); formik.setTouched({
                                    ...formik.touched.Image
                                }); formik.setFieldValue("Image", e.target.files[0])
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
                </ImageList><Spannings id="iamges">{(formik.touched.Image && formik.errors.Image) ? <div>{formik.errors.Image}</div> : null}</Spannings>
                <FormControl>
                    <Buttons variant="contained" component="label" type="submit" onClick={(e) => formik.handleSubmit()}>Add Book</Buttons>
                </FormControl>
            </Container>
        </form>

    )
}

export default Addbook;
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
const Spannings = styled(FormLabel)`
color: #d32f2f;
font-size:13px;
`