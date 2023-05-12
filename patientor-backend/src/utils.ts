import {
  NewPaitent,
  Gender,
  Entry,
  EntryTypes,
  Diagnosis,
  Discharge,
  TypeEntry,
  HealthCheckRating,
  sickLeave,
  NewEntry,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (param: unknown, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}`);
  }

  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map(v => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isEntryArray = (entries: unknown): entries is Entry[] => {
  return (
    entries instanceof Array &&
    entries.every((entry: NewEntry) => {
      return (
        typeof entry === 'object' &&
        'type' in entry &&
        isString(entry.type) &&
        isEntryType(entry.type)
      );
    })
  );
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntryArray(entries)) {
    throw new Error('Missing entries');
  }
  return entries;
};

const parseDiagnosisCodes = (
  entry: object
): Array<Diagnosis['code']> | undefined => {
  // we will just trust the data to be in correct form
  if ('diagnosisCodes' in entry) {
    return entry.diagnosisCodes as Array<Diagnosis['code']>;
  }
  return undefined;
};

const isEntryType = (param: string): param is EntryTypes => {
  return Object.values(EntryTypes)
    .map(v => v.toString())
    .includes(param);
};

const parseType = (type: unknown): EntryTypes => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing entry type:' + type);
  }

  return type;
};

const isDischarge = (param: object): param is Discharge => {
  return (
    'date' in param &&
    isString(param.date) &&
    isDate(param.date) &&
    'criteria' in param &&
    isString(param.criteria)
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object' || !isDischarge(discharge)) {
    throw new Error('Inccorect or missing discharge');
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria, 'Criteria'),
  };
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    typeof healthCheckRating !== 'number' ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseSickLeave = (entry: object): sickLeave | undefined => {
  if (
    'sickleave' in entry &&
    entry.sickleave &&
    typeof entry.sickleave === 'object' &&
    'startDate' in entry.sickleave &&
    'endDate' in entry.sickleave
  ) {
    return {
      startDate: parseDate(entry.sickleave.startDate),
      endDate: parseDate(entry.sickleave.endDate),
    };
  }
  return undefined;
};

const parseEntryType = (object: object): TypeEntry => {
  if ('type' in object) {
    const type: EntryTypes = parseType(object.type);
    switch (type) {
      case EntryTypes.Hospital:
        if ('discharge' in object) {
          return {
            type: type,
            discharge: parseDischarge(object.discharge),
          };
        }
        throw new Error('Missing discharge field in Hospital entry');
      case EntryTypes.HealthCheck:
        if ('healthCheckRating' in object) {
          console.log(object);
          return {
            type: type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        }
        throw new Error('Missing health check rating in HealthCheck entry');
      case EntryTypes.OccupationalHealthcare:
        if ('employerName' in object) {
          return {
            type: type,
            employerName: parseString(object.employerName, 'Employer name'),
            sickLeave: parseSickLeave(object),
          };
        }
        throw new Error(
          'Missing employername in Occupational Healthcare entry'
        );
    }
  }
  throw new Error('Missing type data');
};

const toNewPatient = (object: unknown): NewPaitent => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newEntry: NewPaitent = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: parseEntries(object.entries),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object) {
    const newEntry: NewEntry = {
      description: parseString(object.description, 'Description'),
      date: parseDate(object.date),
      specialist: parseString(object.specialist, 'Specialist'),
      diagnosisCodes: parseDiagnosisCodes(object),
      ...parseEntryType(object),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default {
  toNewEntry,
  toNewPatient,
};
