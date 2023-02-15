import React, { useState, useEffect } from 'react';
import { FormGroup, Button, FormControl, styled, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


const Viewbookdesc = ({ viewOption, recordForView }) => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [openPopup, setOpenPopup] = useState(true);
    const handleClose = () => {
        // alert('lll')
        setTitle('');
        setDescription('');
        setOpenPopup(false);
        viewOption(false)
    };

    useEffect(() => {
        /* if (recordForView != null) {
             setTitle(recordForView.title);
             setDescription(recordForView.description);
         }*/
    }, [])
    return (
        <Container>

            <Grid container spacing={1} >
                <Grid style={{ width: '350px' }}>
                    <Item style={{ backgroundColor: 'lightgreen' }}>
                        <span >
                            <p>
                                <b><h3 style={{ color: 'black' }}>{title}</h3></b>
                                <p className="wrapword"><b><h6>{description}</h6></b></p>
                            </p>
                        </span>
                    </Item>
                </Grid>
            </Grid>
            <FormControl>
                <Button variant="contained" type="submit" onClick={handleClose}>Close</Button>
            </FormControl>

        </Container>

    );
}
export default Viewbookdesc;
const Container = styled(FormGroup)`
width: 70%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
}`
