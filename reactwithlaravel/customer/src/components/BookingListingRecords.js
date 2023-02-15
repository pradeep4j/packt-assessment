import React, { useState } from 'react';
import '../hide.css';
import { Paper } from '@mui/material';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { add3Dots } from '../utils/addthreedots'
import { getImageUrl } from '../utils/localStorage';

const BookingListingRecords = ({ BookingListingRecord }) => {
    const URL = getImageUrl();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        justifyContent: 'left',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [value, setValue] = useState(true);
    const imagefromjson = (BookingListingRecord.Image).search('https');
    let imageUrl = '';
    //alert(BookRecord.Image);
    if (imagefromjson === -1) {
        // alert(BookRecord.image);
        imageUrl = `${URL}/book/images/${BookingListingRecord.Image}`;
    }
    else {
        imageUrl = BookingListingRecord.Image;
    }
    return (
        <Grid container spacing={1}>
            <Grid xs={12}>
                <Item>

                    <Link to={`/bookdescription/${BookingListingRecord.id}`}>
                        <img
                            loading='lazy'
                            src={imageUrl}
                            variant='top'
                            alt={BookingListingRecord.title} height="150"
                        />
                    </Link>

                    <Link
                        to={`/bookdescription/${BookingListingRecord.id}`}
                        style={{ color: '#b91f13', textDecoration: 'none' }}>
                        <Card.Title style={{ fontSize: 15 }}>
                            {add3Dots(BookingListingRecord.title, 20)}
                        </Card.Title>
                    </Link>

                    {/*BookingListingRecord && BookingListingRecord.author && (
                        <Card.Title >
                            {add3Dots(BookingListingRecord.author, 10)}
                        </Card.Title>
                    )*/}
                    <Col>
                        <Row>

                            <p style={{ color: 'black', fontSize: '10px' }}>

                                <b> Published Date</b>:{BookingListingRecord.publishDate}

                            </p>
                            <p style={{ color: 'black', fontSize: '10px' }}>

                                <b>Publisher</b>:{BookingListingRecord.publisher}

                            </p>

                        </Row>
                    </Col>
                </Item>
            </Grid>
        </Grid >
    )
}
export default BookingListingRecords;