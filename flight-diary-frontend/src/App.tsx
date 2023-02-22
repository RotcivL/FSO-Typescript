import { useEffect, useState } from 'react';
import { DiaryEntry, DiaryFormValues } from './types';
import { getAll, create } from './diaryService';
import DiaryEntries from './components/DiaryEntries';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';
import axios from 'axios';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getAll();
      setEntries(data);
    };
    fetchEntries();
  }, []);

  const submitNewDiaryEntry = async (values: DiaryFormValues) => {
    try {
      const newEntry = await create(values);
      setEntries(entries.concat(newEntry));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <Notification message={error} />
      <DiaryForm onSubmit={submitNewDiaryEntry} />
      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;
