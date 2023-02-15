import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks, searchBooks } from '../routes/api';
import BookingListingRecords from './BookingListingRecords';
import { Table, Row, Col } from 'react-bootstrap';
import { FormLabel, TablePagination, styled } from '@mui/material';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import Loading from './layout/Loading';
import '../hide.css';
const Books = () => {
    let count = 0;
    //const {id} = useParams();
    const [books, setBooks] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [searchNav, setSearch] = useState('');
    let [book, setBook] = useState('');
    const [dataPage, setDataPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 2));
        setPage(0);
    };
    const booksSearch = async () => {
        setBook('');
        const bodyNav = {
            searchValue: searchNav
        }
        setSpinner(false);
        await searchBooks(bodyNav).then(response => {
            //alert(response.data.status + '--')

            if (response.data.status === 201) {
                // alert('asas')
                setSpinner(true);
                //alert(JSON.stringify(response.data.selectedBookRecord))
                setBooks(response.data.selectedBookRecord);
            }
            else {
                alert('sdsd')
                //     setSpinner(true);
                setBooks('');
            }
        });
    }
    const clearSearch = (e) => {
        e.preventDefault();
        document.getElementById('search').value = '';
        //  userInfoBySearch = '';
        booksSearch('');
        //  alert(books)
        getBook();
    }
    const getBook = async () => {
        setSpinner(true);
        await getAllBooks().then(response => {
            if (response.data.status === 201) {
                setBooks(response.data.message);
                setSpinner(false);
            }
            else {
                setBooks(response.data.message);
                setSpinner(false);
            }
        }).catch(error => {
            setSpinner(false);
            toast.success(error.message, {
                position: "bottom-right",
                hideProgressBar: false,
                progress: undefined,
            });
        })

        // await delay(student.data);
    }

    useEffect(() => {
        //fetchign all users
        getBook();
        setPage(0);
    }, [dataPage]);

    let listContent;

    if (spinner) {
        listContent = <tr><td colSpan='9'><Loading /></td></tr>//<div className="list-msg"><Spinner/></div>;
    }
    else {
        count = books.length;
        if (count > 0) {
            listContent = books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (<BookingListingRecords BookingListingRecord={book} />))
        }
        else {
            listContent = <tr><td colSpan='7'><h3>No students Found!!</h3></td></tr>
        }
    }
    // alert(students.length);
    return (<center><div  >
        <input
            id="search"
            name="search"
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            style={{ marginLeft: '18px', marginTop: '5px' }}
            onChange={(e) => setSearch(e.target.value)}
        /><SearchIcon onClick={booksSearch} />
        <Link onClick={(e) => clearSearch(e)} style={{ textDecoration: 'none', color: 'black' }}>Clear</Link>
    </div>
        <div className='container mt-5' >
            <Row>{books?.length > 0
                ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book, i) => {
                    return (
                        <Col
                            sm={12}
                            md={6}
                            lg={4}
                            xl={3} key={i}>
                            <BookingListingRecords BookingListingRecord={book} />
                        </Col>
                    );
                }) : <Loading />}
            </Row>
            {count > 0 ?
                <TablePagination
                    rowsPerPageOptions={[0]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> : ''}
        </div>
    </center>
    )
}

export default Books;