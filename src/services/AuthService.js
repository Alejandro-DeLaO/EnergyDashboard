import axios from "axios";
import { BACKEND_URL } from "../config/config"

export const ACCESS_TOKEN = () => sessionStorage.getItem('token');
export const ACCESS_USER = () => sessionStorage.getItem('user');

export function logIn(data) {
    return axios.post(`${BACKEND_URL}users/login`, data);
}

export function signUp(data) {
    return axios.post(`${BACKEND_URL}users/signup`, data);
}