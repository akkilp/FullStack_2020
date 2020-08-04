import diagnosesData from '../data/diagnoses.json';

import {Diagnose} from '../types/types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry
};