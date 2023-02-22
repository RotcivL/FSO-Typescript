import axios from 'axios';
import { DiaryEntry, DiaryFormValues } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then(response => response.data);
};

export const create = (object: DiaryFormValues) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data);
};
