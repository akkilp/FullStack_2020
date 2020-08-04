/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { NewPatient, Gender, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Discharge, SickLeaveDates, HealthCheckRating} from '../types/types';


export const validateEntryData = (object: any): Omit<Entry, 'id'> => {
  switch (object.type) {
    case "Hospital":
      return validateHospital(object);
    case "HealthCheck":
      return validateHealthCheck(object);
    case "OccupationalHealthcare":
      return validateOccHealth(object);
    default:
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Invalid type in posted object: ${object.type}`
      );
  }
};

const validateHospital = (object: any): Omit<HospitalEntry, 'id'> => {
  return {
      description: parseDescription(object.description),
      type: object.type as "Hospital",
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseCodes(object.diagnosisCodes),
      discharge: parseDischarge(object.discharge)
  };
};


const validateHealthCheck = (object: any): Omit<HealthCheckEntry,'id'> => {
  return {
    description: parseDescription(object.description),
    type: object.type as "HealthCheck",
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseCodes(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
  };
};

const validateOccHealth = (object: any): Omit<OccupationalHealthcareEntry,'id'> => {
  return {
    description: parseDescription(object.description),
    type: object.type as "OccupationalHealthcare",
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseCodes(object.diagnosisCodes),
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave)
  };
};

export const validatePatientData = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};

const parseSickLeave = ({startDate, endDate}: any): SickLeaveDates => {
  if(!startDate || !isString(startDate)){
    throw new Error('Invalid sickleave: startDate');
  }
  if(!endDate || !isString(endDate)){
    throw new Error('Invalid sickleave: endDate');
  }
  return {startDate, endDate};
};

const parseHealthCheckRating = (rating: HealthCheckRating): HealthCheckRating => {
  if(!rating){
    throw new Error('Invalid HealthCheckRating');
  }
  return rating;
};

const parseEmployerName = (name: any): string => {
  if(!name || !isString(name)){
    throw new Error('Invalid employerName value');
  }
  return name;
};

const parseDischarge = ({date, criteria}:any): Discharge => {
  if(!date || !isString(date)){
    throw new Error('Invalid discharge date');
  }
  if(!criteria || !isString(criteria)){
    throw new Error('Invalid discharge criteria');
  }
  return {date, criteria};
};

const parseDescription = (description:any): string => {
  if(!description || !isString(description)){
    throw new Error('Invalid description');
  }
  return description;
};

const parseSpecialist = (specialist:any): string => {
  if(!specialist || !isString(specialist)){
    throw new Error('Invalid specialist');
  }
  return specialist;
};

const mapCodes = (codes: any[]): boolean => {
  codes.map((code:any) => {
    if(!isString(code)) throw new Error(`Invalid code format`);
  });
  return true;
};

const parseCodes = (codes:any): string[] | [] => {
  if(!codes){
    return [];
  }
  if(!mapCodes(codes)) throw new Error(`Invalid code format`);
  return codes as string[];
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseName = (name: any): string => {
  if(!name || !isString(name)){
    throw new Error('Invalid name value');
  }
  return name;
};

const parseSSN = (SSN: any): string => {
    if(!SSN || !isString(SSN)){
      throw new Error('Invalid SSN value');
    }
    return SSN;
};

const parseOccupation = (occupation: any): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Invalid occupation value');
  }
  return occupation;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
