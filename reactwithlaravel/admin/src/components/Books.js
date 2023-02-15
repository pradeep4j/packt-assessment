import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../routes/api';
import BookRecords from './BookRecords';
import { Table, Row, Col } from 'react-bootstrap';
import { FormLabel, TablePagination, styled } from '@mui/material';
import Loading from './layout/Loading';
import { toast } from 'react-toastify';
import '../hide.css';
const Books = () => {

    //const {id} = useParams();
    const [books, setBooks] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [dataPage, setDataPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 2));
        setPage(0);
    };
    const getBook = async () => {
        //  getAllBooks();
        // setBooks(book.data);
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
        setSpinner(false);
        // await delay(student.data);
    }

    useEffect(() => {
        //fetchign all users
        getBook();
        setPage(0);
    }, [dataPage]);
    let count = 0;
    let listContent;
    // alert(books.length);
    if (spinner) {
        listContent = <tr><td colSpan='10'><Loading /></td></tr>//<div className="list-msg"><Spinner/></div>;
    }
    else {
        count = books.length;
        //  alert(count)
        if (count > 0) {
            listContent = books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (<BookRecords BookRecord={book} />))
        }
        else {
            listContent = <tr><td colSpan='9'><h3>No books Found!!</h3></td></tr>
        }
    }
    // alert(students.length);
    return (
        <div className='container mt-5' >
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Books Data
                                <Link to={'/add-book'} className="btn btn-primary btn-sm float-end">Add Book</Link>
                            </h4>
                        </div>
                        <Table
                            striped
                            bordered
                            responsive
                            className='table-sm text-center'>
                            <thead style={{ backgroundColor: '#757ada' }}>
                                <tr><th>Image</th><th style={{ width: '150px' }}>Title</th>
                                    <th style={{ width: '200px' }}>Author</th><th>ISBN</th><th style={{ width: '200px' }}>Genres</th><th>Published</th><th style={{ width: '150px' }}>Publisher</th><th>Edit</th><th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listContent}
                            </tbody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[0]}
                            component="div"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Books;