//import React,{useState} from 'react';
import axios from 'axios';


export const storeToken = (user, token) => {
      localStorage.setItem('admintoken', JSON.stringify(token))
      localStorage.setItem('adminuser', JSON.stringify(user))
}
export const getToken = () => {
      let token = localStorage.getItem('admintoken');
      const userToken = JSON.parse(token);
      return userToken;
}
export const getUser = () => {
      let user = localStorage.getItem('adminuser');
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
export const getAPIAdminUrl = () => {
      let URL = 'http://localhost:8000/api/admin';
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
      baseURL: `${getAPIAdminUrl()}`,
      headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${getToken()}`
      }
});



