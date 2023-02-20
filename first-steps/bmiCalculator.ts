interface bmiArgs {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): bmiArgs => {
  console.log(process.argv);

  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return 'Underweight (Unhealthy)';
  } else if (bmi < 23) {
    return 'Normal (Healthy weight)';
  } else if (bmi < 25) {
    return 'Overweight I (At risk)';
  } else if (bmi < 30) {
    return 'Overweight II (Moderately obese)';
  } else {
    return 'Overweight III (Severely obese)';
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
