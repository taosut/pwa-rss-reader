import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpError } from '../models/HttpError';

export const axiosInstance = axios.create({
  baseURL: '/api/',
  timeout: 3000,
});

axiosInstance.interceptors.response.use(handleResponse, handleError);

function handleResponse<T>(response: AxiosResponse<T>): T {
  return response.data;
}

function handleError(error: AxiosError): never {
  if (error.response) {
    throw new HttpError(error.response.data);
  }

  if (error.message === 'Network Error') {
    throw new HttpError({ error: 'Offline', message: 'Looks, you are offline.', statusCode: 503 });
  }

  throw new HttpError({ message: error.message });
}
