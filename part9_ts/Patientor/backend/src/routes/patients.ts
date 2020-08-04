import express from 'express';
import patientService from '../services/patients';
import {NewPatient, Entry} from '../types/types';
import {validatePatientData, validateEntryData} from '../utils/utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsNoSSN());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if(patient) res.send(patient);
  else res.sendStatus(404);
});

router.post('/', (req, res) => {
  try {
    const newPatientData = validatePatientData(req.body as NewPatient);
    const newPatient = patientService.addPatient(newPatientData);
    res.json(newPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntryData = validateEntryData(req.body as Entry);
    const newEntry = patientService.addEntry(newEntryData, req.params.id);
    res.json(newEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});



export default router;