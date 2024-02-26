import axios from "axios";

export const baseURL = process.env.API_URL;

export const api = axios.create({
  baseURL: "https://oprec-api.labse.in/api",
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: false,
});

api.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4MDdkYjJhYmNjOTBhNGM2N2IzYzEiLCJpYXQiOjE3MDg2NTc3NTgsImV4cCI6MTcxMTI0OTc1OH0.HdwEvocx3kbwZaSTlFYpLUyWBUxfCi4DIIIJciC5CuM`;

export default api;
