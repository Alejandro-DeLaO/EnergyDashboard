import axios from "axios";
import { BACKEND_URL } from "../config/config"

export function getBuildings(token) {
    return axios.get(`${BACKEND_URL}buildings`, {headers: {authorization: `Bearer ${token}`}});
}

export function getBuilding(id, token){
    return axios.get(`${BACKEND_URL}buildings/${id}`, {headers: {authorization: `Bearer ${token}`}});
}

export function postBuilding(building, token){
    return axios.post(`${BACKEND_URL}buildings`, building, {headers: {authorization: `Bearer ${token}`}});
}

export function updateBuilding(building, token){
    return axios.patch(`${BACKEND_URL}buildings/${building._id}`, building, {headers: {authorization: `Bearer ${token}`}});
}

export function deleteBuilding(id, token){
    return axios.delete(`${BACKEND_URL}buildings/${id}`, {headers: {authorization: `Bearer ${token}`}});
}