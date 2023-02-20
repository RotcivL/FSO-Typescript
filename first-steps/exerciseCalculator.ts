interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Input {
  hours: number[];
  target: number;
}

const parse = (args: string[]): Input => {
  const hours: number[] = [];

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values are not numbers!');
    }
    if (i > 2) {
      hours.push(Number(args[i]));
    }
  }

  return {
    hours,
    target: Number(args[2]),
  };
};

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

try {
  const { hours, target } = parse(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
