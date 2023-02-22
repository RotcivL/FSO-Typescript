import { useState } from 'react';
import { DiaryFormValues } from '../types';

const DiaryForm = ({
  onSubmit,
}: {
  onSubmit: (values: DiaryFormValues) => void;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const addDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      visibility,
      weather,
      comment,
    });
    setDate('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiaryEntry}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility: great
          <input
            type="radio"
            onChange={() => setVisibility('great')}
            name="visibility"
          />
          good
          <input
            type="radio"
            onChange={() => setVisibility('good')}
            name="visibility"
          />
          ok
          <input
            type="radio"
            onChange={() => setVisibility('ok')}
            name="visibility"
          />
          poor
          <input
            type="radio"
            onChange={() => setVisibility('poor')}
            name="visibility"
          />
        </div>
        <div>
          weather: sunny
          <input
            type="radio"
            onChange={() => setWeather('sunny')}
            name="weather"
          />
          rainy
          <input
            type="radio"
            onChange={() => setWeather('rainy')}
            name="weather"
          />
          cloudy
          <input
            type="radio"
            onChange={() => setWeather('cloudy')}
            name="weather"
          />
          stormy
          <input
            type="radio"
            onChange={() => setWeather('stormy')}
            name="weather"
          />
          windy
          <input
            type="radio"
            onChange={() => setWeather('windy')}
            name="weather"
          />
        </div>
        <div>
          comment
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
