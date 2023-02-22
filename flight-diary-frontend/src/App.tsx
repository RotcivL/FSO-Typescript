import { useEffect, useState } from 'react';
import { DiaryEntry, DiaryFormValues } from './types';
import { getAll, create } from './diaryService';
import DiaryEntries from './components/DiaryEntries';
import DiaryForm from './components/DiaryForm';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getAll().then(data => {
      setEntries(data);
    });
  });

  const submitNewDiaryEntry = (values: DiaryFormValues) => {
    create(values).then(data => {
      setEntries(entries.concat(data));
    });
  };

  return (
    <div>
      <h1>Flight Diary</h1>

      <DiaryForm onSubmit={submitNewDiaryEntry} />
      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;
