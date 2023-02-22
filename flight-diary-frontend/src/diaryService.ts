import axios from 'axios';
import { DiaryEntry, DiaryFormValues } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

export const create = async (object: DiaryFormValues) => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, object);
  return data;
};
