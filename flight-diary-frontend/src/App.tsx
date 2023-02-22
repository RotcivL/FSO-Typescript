import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaryEntries } from './diaryService';
import DiaryEntries from './components/DiaryEntries';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setEntries(data);
    });
  });

  return (
    <div>
      <h1>Flight Diary</h1>
      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;
