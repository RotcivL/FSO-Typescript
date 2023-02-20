import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (!height || !weight || isNaN(Number(weight)) || isNaN(Number(height))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  return res.send({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call,
  if (isNaN(Number(target)) || daily_exercises.some(isNaN)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  return res.send(result);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
