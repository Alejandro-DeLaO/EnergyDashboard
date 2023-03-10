import axios from "axios";
import { BACKEND_URL } from "../config/config"

export function getPhotovoltaicGenerations(token, parameters) {
    return axios.get(`${BACKEND_URL}photovoltaicGenerations`, { headers: { authorization: `Bearer ${token}` }, params: parameters });
}

export function getPhotovoltaicGeneration(id, token) {
    return axios.get(`${BACKEND_URL}photovoltaicGenerations/${id}`, { headers: { authorization: `Bearer ${token}` } });
}

export function postPhotovoltaicGeneration(photovoltaicGeneration, token) {
    return axios.post(`${BACKEND_URL}photovoltaicGenerations`, photovoltaicGeneration, { headers: { authorization: `Bearer ${token}` } });
}

export function updatePhotovoltaicGeneration(photovoltaicGeneration, token) {
    return axios.patch(`${BACKEND_URL}photovoltaicGenerations/${photovoltaicGeneration._id}`, photovoltaicGeneration, { headers: { authorization: `Bearer ${token}` } });
}

export function deletePhotovoltaicGeneration(id, token) {
    return axios.delete(`${BACKEND_URL}photovoltaicGenerations/${id}`, { headers: { authorization: `Bearer ${token}` } });
}