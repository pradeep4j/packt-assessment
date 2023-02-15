import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/localStorage';

const Dashboard = () => {
    // const {http} = AuthUser();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        fetchUsersDetail();

    }, []);

    const fetchUsersDetail = () => {
        const user = getUser();
        if (user) {
            setEmail(user.email);
            setName(user.name);
        }
    }

    const renderElement = () => {
        if (name && email) {
            return <div>
                <h4>Name</h4>
                <p>{name}</p>
                <h4>Email</h4>
                <p>{email}</p>
            </div>
        } else {
            return <p>Loading.....</p>
        }

    }

    return (
        <div>
            <h1 className='mb-4 mt-4'>Dashboard page</h1>
            {renderElement()}
        </div>
    )
}
export default Dashboard;