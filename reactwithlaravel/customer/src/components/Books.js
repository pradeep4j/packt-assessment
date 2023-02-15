import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks, searchBooks } from '../routes/api';
import BookRecords from './BookRecords';
import { Table, Row, Col } from 'react-bootstrap';
import { FormLabel, TablePagination, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Loading from './layout/Loading';
import '../hide.css';
const Books = () => {

    //const {id} = useParams();
    const [books, setBooks] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [searchNav, setSearch] = useState('');
    let [book, setBook] = useState('');
    const [dataPage, setDataPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 2));
        setPage(0);
    };
    const booksSearch = () => {
        setBook('');
        const bodyNav = {
            searchValue: searchNav
        }
        searchBooks(bodyNav);
    }
    const clearSearch = (e) => {
        e.preventDefault();
        document.getElementById('search').value = '';
        //  userInfoBySearch = '';
        setSearch('');
        setBook(books);
    }
    const getBook = async () => {
        const book = await getAllBooks();
        setBooks(book.data);
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

    if (spinner) {
        listContent = <tr><td colSpan='9'><Loading /></td></tr>//<div className="list-msg"><Spinner/></div>;
    }
    else {
        count = books.length;
        if (count > 0) {
            listContent = books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (<BookRecords BookRecord={book} />))
        }
        else {
            listContent = <tr><td colSpan='7'><h3>No students Found!!</h3></td></tr>
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
                        {/* <div  >
                            <input
                                id="search"
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                style={{ marginLeft: '18px', marginTop: '5px' }}
                                onChange={(e) => setSearch(e.target.value)}
                            /><SearchIcon onClick={booksSearch} />
                            <Link onClick={(e) => clearSearch(e)} style={{ textDecoration: 'none', color: 'black' }}>Clear</Link>
                        </div> */}
                        <Table
                            striped
                            bordered
                            responsive
                            className='table-sm text-center'>
                            <thead style={{ backgroundColor: '#757ada' }}>
                                <tr><th>Image</th><th>Title</th>
                                    <th>Author</th><th>ISBN</th><th>Published</th><th>Publisher</th><th>View</th>
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