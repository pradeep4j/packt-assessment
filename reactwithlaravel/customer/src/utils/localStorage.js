//import React,{useState} from 'react';
import axios from 'axios';


export const storeToken = (user, token) => {
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))
}
export const getToken = () => {
      let token = localStorage.getItem('token');
      const userToken = JSON.parse(token);
      return userToken;
}
export const getUser = () => {
      let user = localStorage.getItem('user');
      const user_detail = JSON.parse(user);
      return user_detail;
      // let token = localStorage.getItem('token')     return user
}
export const removeToken = (value) => {
      localStorage.removeItem(value)
      // localStorage.removeItem(value)
}
export const getAPIUrl = () => {
      let URL = 'http://localhost:8000/api';
      return URL;
}
export const getAPICustomerUrl = () => {
      let URL = 'http://localhost:8000/api/user';
      return URL;
}
export const getAPIBookUrl = () => {
      let URL = 'http://localhost:8000/api';
      return URL;
}

export const getImageUrl = () => {
      let URL = 'http://localhost:8000';
      return URL;
}
/*export const isLoggedIn = () => {
      if (getToken())
            return true;
}*/
export const isLoggedIn = () => {
      // alert(getUser())
      if (getUser() === null)
            return false;
      else
            return true;
}
export const http = axios.create({
      baseURL: `${getAPICustomerUrl()}`,
      headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${getToken()}`
      }
});
export const httpbook = axios.create({
      baseURL: `${getAPIBookUrl()}`,
      headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${getToken()}`
      }
});


