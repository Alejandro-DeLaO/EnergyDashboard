import axios from "axios";
import { BACKEND_URL } from "../config/config"

export function postEnergyConsumptionFile(data, token) {
    return axios.post(`${BACKEND_URL}energyConsumptions/loadFile`, data, { headers: { 'content-type': 'multipart/form-data', authorization: `Bearer ${token}` } });
}

export function postPhotovoltaicGenerationFile(data, token) {
    return axios.post(`${BACKEND_URL}photovoltaicGenerations/loadFile`, data, { headers: { 'content-type': 'multipart/form-data', authorization: `Bearer ${token}` } });
}