import React from 'react';
import {NotificationManager} from 'react-notifications';
import {deleteStudent} from '../routes/api';
import {Link} from 'react-router-dom';
import {getImageUrl} from '../utils/localStorage';



const CustomerRecords = ({CustomerRecord}) => {
 // const {getImageUrl} = AuthUser();
  const URL = getImageUrl();
  const deletestudent = async(e,id) => {
    e.currentTarget.innerText='Deleting';
    deleteStudent(id).then(resp =>{
        if(resp.data.status ===200){
          e.target.closest("tr").remove();
          NotificationManager.success('Student deleted successfully!','Deleted Success!',5000);
        }
    }).catch(err =>{
        NotificationManager.success(err.message/*'Something went wrong on deletion!'*/,'Deletion Failure!',10000);
    });
  }
 
  return (
    <tr>
        <td><img width="50px" alt='' src={`${URL}/storage/student/images/${CustomerRecord.image}`} /></td>
        <td>{CustomerRecord.name}</td>
        <td>{CustomerRecord.course}</td>
        <td>{CustomerRecord.email}</td>
        <td>{CustomerRecord.phone}</td>
        <td><Link className='btn btn-success btn-sm' to={ `/edit-student/${CustomerRecord.id}`} >Edit</Link></td>
        <td><button className='btn btn-danger btn-sm' onClick={(e) => deletestudent(e,CustomerRecord.id)}>Delete</button></td> 
    </tr>
  )
}

export default StudentRecord;