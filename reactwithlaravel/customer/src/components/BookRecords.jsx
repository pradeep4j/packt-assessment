import React,{useState} from 'react';
import { toast } from 'react-toastify';
import {deleteBook} from '../routes/api';
import {Link} from 'react-router-dom';
import {getImageUrl} from '../utils/localStorage';
import Modals from '../utils/Modal';
import Viewbookdesc from './Viewbookdesc';

const BookRecords = ({BookRecord}) => {
const URL = getImageUrl();
const [openPopup, setOpenPopup] = useState(false);
const [pageTitle, setPageTitle] = useState('');
const [recordForView, setRecordForView] = useState(null);
//alert(recordForView);
<Modals opens={openPopup} pageTitle={pageTitle} setOpenPopup={setOpenPopup}>
                {openPopup && <Viewbookdesc recordForView={recordForView} />}
</Modals>
const viewdesc = () => {
        setOpenPopup(false)
} 
const openInPopupForView = (item) => {
         setRecordForView(item);
         setOpenPopup(true);
         setPageTitle('View Book Description');
 }
 //alert(`${URL}/storage/user/images/images.jpg`);
  return (
    <tr>
        <td><img width="50px" alt='' src={BookRecord.Image} /></td>
        <td>{BookRecord.title}</td>
        <td>{BookRecord.author}</td>
        <td>{BookRecord.ISBN}</td>
        <td>{BookRecord.publishDate}</td>
        <td>{BookRecord.publisher}</td>
        <td><a className='btn btn-success btn-sm' onClick={(e) => openInPopupForView(BookRecord.id) } >View</a></td>
    </tr>
  )
}

export default BookRecords;