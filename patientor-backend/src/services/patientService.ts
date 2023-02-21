import patientData from '../../data/patients';
import { NewPaitent, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getNonSensistivePatientEntry = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPaitent): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensistivePatientEntry, addPatient };
