import React from 'react';
import { toast } from 'react-toastify';
import {deleteBook} from '../routes/api';
import {Link} from 'react-router-dom';
import {getImageUrl} from '../utils/localStorage';

const BookRecords = ({BookRecord}) => {
 // const {getImageUrl} = AuthUser();
  const URL = getImageUrl();
  const deletebook = async(e,id) => {
    const choice = window.confirm('Are you really want to delete this record?');
    if (choice) {
     e.currentTarget.innerText='Deleting';
    deleteBook(id).then(resp =>{
        if(resp.data.status ===201)
        {
          e.target.closest("tr").remove();
              toast.success(resp.data.message, {
                position: "bottom-right",
                hideProgressBar: false,
                progress: undefined,
              });
        }
    }).catch(err =>{
       toast.success(err.message, {
          position: "bottom-right",
          hideProgressBar: false,
          progress: undefined,
        });
    });
    }
    
  }
 const imagefromjson = (BookRecord.Image).search('https');
 let imageUrl = '';
 //alert(BookRecord.Image);
 if(imagefromjson === -1)
  {
   // alert(BookRecord.image);
    imageUrl = `${URL}/book/images/${BookRecord.Image}`;
  }
  else{
    imageUrl = BookRecord.Image;
  }
   // alert(imagefromjson);
  return (
    <tr>
        <td><img width="50px" alt='' src={imageUrl} /></td>
        <td>{BookRecord.title}</td>
        <td>{BookRecord.author}</td>
        <td>{BookRecord.ISBN}</td>
        <td>{BookRecord.genres}</td>
        <td>{BookRecord.publishDate}</td>
        <td>{BookRecord.publisher}</td>
        <td><Link className='btn btn-success btn-sm' to={ `/edit-book/${BookRecord.id}`} >Edit</Link></td>
        <td><button className='btn btn-danger btn-sm' onClick={(e) => deletebook(e,BookRecord.id)}>Delete</button></td> 
    </tr>
  )
}

export default BookRecords;