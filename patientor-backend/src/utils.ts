import { NewPaitent, Gender, Entry, EntryTypes } from './types';

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
    throw new Error('Incorrect or missing weather: ' + gender);
  }
  return gender;
};

const isEntry = (entry: object): entry is Entry => {
  return (
    'type' in entry &&
    isString(entry.type) &&
    Object.values(EntryTypes)
      .map(v => v.toString())
      .includes(entry.type)
  );
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !(entries instanceof Array)) {
    throw new Error('Missing entries');
  }
  entries.forEach(entry => {
    if (typeof entry !== 'object' || !entry || !isEntry(entry)) {
      throw new Error('Incorrect entries');
    }
  });
  return entries;
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

export default toNewPatient;
