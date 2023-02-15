import axios from 'axios';
import { getAPIAdminUrl, getAPIBookUrl, getToken } from '../utils/localStorage';

const URLAdmin = getAPIAdminUrl();
const URLBook = getAPIBookUrl();

///admin users sign up,login and logout etc.
export const adminregister = async (data) => {
        return await axios.post(`${URLAdmin}/register`, data);
}
export const adminlogin = async (data) => {
        return await axios.post(`${URLAdmin}/login`, data);
}
/////
export const adminlogout = async () => {
        const config = {
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`
                }
        }
        return await axios.get(`${URLAdmin}/logout`, config);
}
///students sign up,login and logout etc.
export const createBooks = async (data) => {
        try {
                const config = {
                        headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${getToken()}`
                        }
                }
                return await axios.post(`${URLBook}/add-book`, data);
        }
        catch (err) {
                console.log(err.message);
        }
}
export const updateBook = async (data, id) => {
        try {
                const config = {
                        headers: {
                                "Content-Type": "application/json",
                                'enctype': 'multipart/form-data',
                                Authorization: `Bearer ${getToken()}`
                        }
                }
                return await axios.post(`${URLBook}/update-book/${id}`, data);
        }
        catch (err) {
                console.log(err.message);
        }
}
export const getBookWithId = async (id) => {
        const config = {
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`
                }
        }
        return await axios.get(`${URLBook}/edit-book/${id}`, config);
}
export const getAllBooks = async () => {
        const config = {
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`
                }
        }
        // alert(`${URLBook}/view-book`);
        return await axios.get(`${URLBook}/view-book`, config);
}
export const deleteBook = async (id) => {
        const config = {
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`
                }
        }
        return await axios.delete(`${URLBook}/delete-book/${id}`, config);
}

