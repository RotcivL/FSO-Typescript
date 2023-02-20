interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
  const trainingDays: number = hours.reduce((acc, curr) => {
    return (curr ? 1 : 0) + acc;
  }, 0);

  const average: number =
    hours.reduce((acc, curr) => {
      return acc + curr;
    }, 0) / hours.length;

  const success: boolean = average >= target;

  let rating: number;
  let ratingDescription: string;
  if (average > target) {
    rating = 1;
    ratingDescription = 'great work, target has been met';
  } else if (average > 0.8 * target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'far from target, exercise more next week';
  }

  return {
    periodLength: hours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
