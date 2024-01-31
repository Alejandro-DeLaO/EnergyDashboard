import axios from "axios";
import { BACKEND_URL, BACKEND_URL_LAST_VALUE, BACKEND_URL_SET_OF_VALUES } from "../config/config"

export function getEnergyConsumptions(token, parameters) {
    return axios.get(`${BACKEND_URL}energyConsumptions`, { headers: { authorization: `Bearer ${token}` }, params: parameters });
}

/* export function getEnergyConsumptionsPerDay(token, parameters) {
    return axios.get(`${BACKEND_URL}energyConsumptions/day`, { headers: { authorization: `Bearer ${token}` }, params: parameters });
} */

export function getLastRegister(uniqueId) {
    return axios.get(`${BACKEND_URL_LAST_VALUE}${uniqueId}`);
}

export function getDataFromADate(SN, startDate, cursor) {
    return axios.get(`${BACKEND_URL_SET_OF_VALUES}?constraints=[{"key":"SN","constraint_type":"equals","value":"${SN}"},{"key":"CreatedDate","constraint_type":"greater than","value":"${startDate}"}]&cursor=${cursor}`);
}

export function getDataUntilADate(SN, untilDate, cursor) {
    return axios.get(`${BACKEND_URL_SET_OF_VALUES}?constraints=[{"key":"SN","constraint_type":"equals","value":"${SN}"},{"key":"CreatedDate","constraint_type":"less than","value":"${untilDate}"}]&cursor=${cursor}`);
}

export function getDataInARange(SN, startDate, endDate, cursor) {
    // console.log(`${BACKEND_URL_SET_OF_VALUES}?constraints=[{"key":"SN","constraint_type":"equals","value":"${SN}"},{"key":"CreatedDate","constraint_type":"greater than","value":"${startDate}"},{"key":"CreatedDate","constraint_type":"less than","value":"${endDate}"}]&cursor=${cursor}`);
    return axios.get(`${BACKEND_URL_SET_OF_VALUES}?constraints=[{"key":"SN","constraint_type":"equals","value":"${SN}"},{"key":"CreatedDate","constraint_type":"greater than","value":"${startDate}"},{"key":"CreatedDate","constraint_type":"less than","value":"${endDate}"}]&cursor=${cursor}`);
}

export function getEnergyConsumptionsPerDay(parameters) {
    return axios.get(`${BACKEND_URL}energyConsumptions/day`, { params: parameters });
}

export function getEnergyConsumptionsPerWeek(token, parameters) {
    return axios.get(`${BACKEND_URL}energyConsumptions/week`, { headers: { authorization: `Bearer ${token}` }, params: parameters });
}

export function getEnergyConsumptionsPerMonth(token, parameters) {
    return axios.get(`${BACKEND_URL}energyConsumptions/month`, { headers: { authorization: `Bearer ${token}` }, params: parameters });
}

export function getEnergyConsumption(id, token) {
    return axios.get(`${BACKEND_URL}energyConsumptions/${id}`, { headers: { authorization: `Bearer ${token}` } });
}

export function postEnergyConsumption(energyConsumption, token) {
    return axios.post(`${BACKEND_URL}energyConsumptions`, energyConsumption, { headers: { authorization: `Bearer ${token}` } });
}

export function updateEnergyConsumption(energyConsumption, token) {
    return axios.patch(`${BACKEND_URL}energyConsumptions/${energyConsumption._id}`, energyConsumption, { headers: { authorization: `Bearer ${token}` } });
}

export function deleteEnergyConsumption(id, token) {
    return axios.delete(`${BACKEND_URL}energyConsumptions/${id}`, { headers: { authorization: `Bearer ${token}` } });
}