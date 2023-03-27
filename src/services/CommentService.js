import axios from "axios";
import { BACKEND_URL } from "../config/config";

export function postComment(data) {
  return axios.post(`${BACKEND_URL}comments`, data)
}

export function getComments() {
  return axios.get(`${BACKEND_URL}comments`)
}