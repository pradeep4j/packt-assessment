import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ImageMagnifier from '../utils/ImageMaginfier'; // to magnify image on hover
import Loading from './layout/Loading';
import { edit } from '../routes/api';
import { setProduct } from '../utils/localStorage';
import { styled } from '@mui/material';
//import {Grid ,Col, styled,Typography,Card,ListGroup,Form,Button } from '@mui/material';
import { getImageUrl } from '../utils/localStorage';
import { Row, Col, Card, Button, ListGroup, Form, FloatingLabel, } from 'react-bootstrap';

const Bookdescription = () => {
    const { id } = useParams();
    const URL = getImageUrl();
    const [books, setBooks] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    //let imageUrl = '';
    const getBookBYId = (id) => {
        // alert(id)
        setSpinner(true);
        edit(id).then(response => {
            setSpinner(false);
            //  alert(response.data.status)
            if (response.data.status === 201) {
                // alert(JSON.stringify(response.data.selectedBookRecord))
                setBooks(response.data.selectedBookRecord);
                const imagefromjson = (response.data.selectedBookRecord.Image).search('https');

                //alert(BookRecord.Image);
                if (imagefromjson === -1) {
                    // alert(BookRecord.image);
                    setImageUrl(`${URL}/book/images/${response.data.selectedBookRecord.Image}`);
                }
                else {
                    setImageUrl(response.data.selectedBookRecord.Image);
                }
            }
        }).catch(error => {
            alert(error.message)
        })
    }
    useEffect(() => {
        //  alert(id)
        getBookBYId(id);
    }, []);

    return (
        <div className='container mt-5' >
            {spinner ? <Loading /> :

                <Row><Tabs to='/books' style={{ color: 'blue', fontWeight: 'bold' }}>{'<'}&nbsp;&nbsp;&nbsp;Go Back</Tabs>{' '}
                    <Col md={4}>
                        <ImageMagnifier
                            src={books && imageUrl}
                            alt={books && books.title}
                            title={books && books.title}
                        />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{books && books.title}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <strong>Description:</strong>{' '}
                                <div style={{ justifyContent: 'center', alignContent: 'center' }}>
                                    {books && books.description}
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>

                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Author: </strong>
                                        </Col>
                                        <Col>
                                            {books && books.author}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Published Date:</strong>
                                        </Col>
                                        <Col>

                                            {books && books.publishDate}



                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Publisher:</strong>
                                        </Col>
                                        {
                                            books && books.publisher
                                        }
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Genres:</strong>
                                        </Col>
                                        {
                                            books && books.genres
                                        }
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </div>
    )

}

export default Bookdescription;
const Tabs = styled(Link)`
font-size: 15px;
margin-right: 20px;
color:white;
text-decoration:none;
`