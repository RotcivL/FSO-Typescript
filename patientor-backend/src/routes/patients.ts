import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).end();
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = utils.toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    if (addedEntry) res.json(addedEntry);
    else res.status(404).send();
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
