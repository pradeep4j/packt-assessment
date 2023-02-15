import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudents } from '../routes/api';
import StudentRecords from './StudentRecords';

const Customers = () => {

    //const {id} = useParams();
    const [students, setStudents] = useState([]);
    const [spinner, setSpinner] = useState(true);

    //   resolve => setTimeout(resolve, ms)
    // );
    const getStudent = async () => {
        const student = await getAllStudents();
        setStudents(student.data);
        setSpinner(false);
        // await delay(student.data);
    }
    useEffect(() => {
        //fetchign all users
        getStudent();

    }, []);

    let listContent;

    if (spinner) {
        listContent = <tr><td colSpan='7'><h3>Loading...</h3></td></tr>//<div className="list-msg"><Spinner/></div>;
    }
    else {
        if (students.length > 0) {
            listContent = students.map((user) => (<CustomerRecords CustomerRecord={user} />))
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
                            <h4>Student Data
                                <Link to={'/add-student'} className="btn btn-primary btn-sm float-end">Add Student</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered table-striped'>
                                <thead>
                                    <tr><th>Image</th><th>Name</th>
                                        <th>Email</th><th>Phone</th><th>Course</th><th>Edit</th><th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listContent}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers;