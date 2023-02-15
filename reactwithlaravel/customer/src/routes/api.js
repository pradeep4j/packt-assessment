import axios from 'axios';
import { getToken, getAPIUrl, getAPICustomerUrl, getAPIBookUrl } from '../utils/localStorage';

const URL = getAPIUrl();
const URLCustomer = getAPICustomerUrl();
const URLBook = getAPIBookUrl();

/////
export const register = async (data) => {
        return await axios.post(`${URLCustomer}/register`, data);
}
export const login = async (data) => {
        return await axios.post(`${URLCustomer}/login`, data);
}
export const logout = async () => {
        const config = {
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`
                }
        }
        return await axios.get(`${URLCustomer}/logout`);
}

export const getAllBooks = async () => {
        const config = {
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`
                }
        }
        //alert(`${URLBook}/view-book`)
        return await axios.get(`${URLCustomer}/view-book`, config);
}
export const searchBooks = async (data) => {
        const config = {
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`
                }
        }
        return await axios.post(`${URLCustomer}/searchBookRecords`, data, config);
}
export const edit = async (id) => {
        const config = {
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`
                }
        }
        //  alert(`${URLBook}/edit/${id}`)
        return await axios.get(`${URLBook}/edit-book/${id}`, config);
}


