import { State } from "./state";
import { Patient, Diagnosis, HealthCheckEntry, Entry } from "../types";

export const SET_PATIENT_LIST = "SET_PATIENT_LIST";
export const ADD_PATIENT = "ADD_PATIENT";
export const GET_PATIENT_DATA = "GET_PATIENT_DATA";
export const GET_DIAGNOSES =  "GET_DIAGNOSES";
export const ADD_ENTRY = "ADD_ENTRY";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT_DATA";
      payload: Patient;
  } 
  | {
      type: "GET_DIAGNOSES";
      payload: Diagnosis[];
  }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
      id: string,
  };

export const addEntry = (payload: Entry, id: string): Action => {
  console.log('penetroidun toimitsijaan')
  return {
    type: "ADD_ENTRY" as typeof ADD_ENTRY,
    payload: payload,
    id
  };
};

export const setDiagnoses = (payload: Diagnosis[]): Action => {
  return {
    type: "GET_DIAGNOSES" as typeof GET_DIAGNOSES,
    payload: payload
  };
};


export const setPatients = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST" as typeof SET_PATIENT_LIST,
    payload: payload
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT" as typeof ADD_PATIENT,
    payload: payload
  };
};

export const getPatient = (payload: Patient): Action => {
  return {
    type: "GET_PATIENT_DATA" as typeof GET_PATIENT_DATA,
    payload: payload
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT_DATA":
      const alreadyExists = state.target.findIndex(item=>item.id===action.payload.id);
      if(alreadyExists!==-1){
        state.target.splice(alreadyExists, 1);
      }
      return {
        ...state,
        target: [action.payload,...state.target]
      };
    case "GET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY":
      const targetPatient = state.target.find((patient)=>patient.id===action.id)
      if(!targetPatient) {
        return state
      }
      let copyTarget = state.target
      copyTarget = [...copyTarget, {...copyTarget[0], entries: [...targetPatient.entries, action.payload]}]
      copyTarget.splice(0,1)
      return {
        ...state,
        target: copyTarget
      };  
    default:
      return state;
  }
};
