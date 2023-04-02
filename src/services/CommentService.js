import axios from "axios";
import { BACKEND_URL } from "../config/config";

export function postComment(data) {
  return axios.post(`${BACKEND_URL}comments`, data);
}

export function getComments() {
  return axios.get(`${BACKEND_URL}comments`);
}

export function getComment(id) {
  return axios.get(`${BACKEND_URL}comments/${id}`)
}

export function updateComment(id, data) {
  return axios.patch(`${BACKEND_URL}comments/${id}`, data);
}

export function deleteComment(id) {
  return axios.delete(`${BACKEND_URL}comments/${id}`);
}