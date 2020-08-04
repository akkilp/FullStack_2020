export interface Diagnose {
    code: string,
    name: string,
    latin?: string,
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Discharge {
    date: string,
    criteria: string,
}

export interface SickLeaveDates {
        startDate: string,
        endDate: string
}
  
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string,
  sickLeave?: SickLeaveDates
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: WebGLRenderbuffer,
    occupation?: string,
    entries?: Entry[]
}

export enum Gender {
    Male = "male",
    Female = "female"
} 

export type Patients = Array<Patient>;
export type PatientsNoSSN = Array<Omit<Patient, "ssn">>;
export type PublicPatient = Array<Omit<Patient, "ssn" | "entries">>;
export type NewPatient = Omit<Patient, "id">;
