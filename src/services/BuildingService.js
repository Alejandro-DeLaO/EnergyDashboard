import axios from "axios";
import { BACKEND_URL } from "../config/config";

export const monitors = [
    {monitor: 'Instituto de Energías Renovables', SN: 1, uniqueId: '1665422534539x756577568186765000'},
    {monitor: 'Centro de Atención a Estudiantes', SN: 2, uniqueId: '1665422544135x409287320104509950'},
    {monitor: 'Biblioteca Universitaria', SN: 3, uniqueId: '1665422555569x282583791110357920'},
    {monitor: 'Ciencias de la Salud', SN: 4, uniqueId: '1665422565837x962223718280039300'},
    {monitor: 'Inversor 5', SN: 5, uniqueId: '1665422573885x109286931025065260'},
    {monitor: 'Inversor 6', SN: 6, uniqueId: '1665422580808x740219795760476800'},
    {monitor: 'Inversor 7', SN: 7, uniqueId: '1665422586254x497878311921617900'},
    {monitor: 'Inversor 8', SN: 8, uniqueId: '1665422591944x330540410142371260'},
];

export function getMonitors(){
    return monitors;
}

export function getBuildings(token) {
    return axios.get(`${BACKEND_URL}buildings`, {headers: {authorization: `Bearer ${token}`}});
}

export function getBuilding(id, token){
    return axios.get(`${BACKEND_URL}buildings/${id}`, {headers: {authorization: `Bearer ${token}`}});
}

export function postBuilding(data, token){
    return axios.post(`${BACKEND_URL}buildings`, data, {headers: {authorization: `Bearer ${token}`}});
}

export function updateBuilding(id, data, token){
    return axios.patch(`${BACKEND_URL}buildings/${id}`, data, {headers: {authorization: `Bearer ${token}`}});
}

export function deleteBuilding(id, token){
    return axios.delete(`${BACKEND_URL}buildings/${id}`, {headers: {authorization: `Bearer ${token}`}});
}