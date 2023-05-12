import patientData from '../../data/patients';
import {
  NewEntry,
  NewPaitent,
  NonSensitivePatient,
  Patient,
  Entry,
} from '../types';
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

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getPatients = (): Patient[] => {
  return patients;
};

const addEntry = (
  patientId: Patient['id'],
  entry: NewEntry
): Entry | undefined => {
  const patient = getPatientById(patientId);
  if (!patient) return;
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensistivePatientEntry,
  addPatient,
  getPatientById,
  getPatients,
  addEntry,
};
