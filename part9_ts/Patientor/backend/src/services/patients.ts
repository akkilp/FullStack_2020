import patientsData from '../data/patients';

import {Patient, Patients, PatientsNoSSN, NewPatient, Entry} from '../types/types';

const patients: Patients = patientsData;
const patientsNoSSN: PatientsNoSSN = patientsData;

const getPatients = (): Patients => {
  return patients;
};

const getPatientsNoSSN = ():  PatientsNoSSN  => {
    return patientsNoSSN.map(({id,name,dateOfBirth,gender,occupation,entries})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
  };

const findPatientById = (id: string): Patient|undefined => {
    const person = patients.find(p => p.id === id.toString());
    return person;
};  

const addPatient = ( data: NewPatient ): Patient => {
  const newPatientObject = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    entries: []
  };
  patients.push(newPatientObject);
  return newPatientObject;
};

const addEntry = (data: Omit<Entry, 'id'>, patientId:string): Entry => {
  const newEntryObject = {
    id: Math.random().toString(36).substr(2, 9),
    ...data
  };
  const targetPatient = patients.find(patient=>patient.id===patientId);
  if(!targetPatient || !targetPatient.entries) throw new Error('Error occurred in pushing entry to target patient');
  targetPatient.entries?.push(newEntryObject as Entry);
  return newEntryObject as Entry;
};


export default {
  getPatients,
  getPatientsNoSSN,
  addPatient,
  findPatientById,
  addEntry
};