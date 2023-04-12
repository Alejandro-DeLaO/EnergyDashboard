import axios from "axios";
import { BACKEND_URL } from "../config/config"

export function getUsers(token) {
    return axios.get(`${BACKEND_URL}users`, {headers: {authorization: `Bearer ${token}`}});
}

export function getUser(id, token){
    return axios.get(`${BACKEND_URL}users/${id}`, {headers: {authorization: `Bearer ${token}`}});
}

export function postUser(user, token){
    return axios.post(`${BACKEND_URL}users`, user, {headers: {authorization: `Bearer ${token}`}});
}

export function updateUser(id, data, token){
    return axios.patch(`${BACKEND_URL}users/${id}`, data, {headers: {authorization: `Bearer ${token}`}});
}

export function deleteUser(id, token){
    return axios.delete(`${BACKEND_URL}users/${id}`, {headers: {authorization: `Bearer ${token}`}});
}