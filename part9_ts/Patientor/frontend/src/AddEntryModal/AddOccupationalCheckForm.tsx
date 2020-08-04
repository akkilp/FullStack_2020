import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import * as Yup from 'yup';

import { TextField, SelectField, HealtRatingOptions } from "./FormField";
import { OccupationalHealthcareEntry } from "../types";

import { useStateValue } from "../state/state";
import { DiagnosisSelection } from "./FormField"



export type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry, "id" | "entries">;

interface Props {
  onSubmit: (values: OccupationalEntryFormValues) => void;
  onCancel: () => void;
}

const OccupationalFormSchema = Yup.object().shape({
  date: Yup.date()
    .min(new Date(), 'Data cannot be in past')
    .required('Field is required')
    .typeError('Date includes invalid characters'),
  description: Yup.string()
    .min(4, 'Too Short')
    .max(50, 'Too Long')
    .required('Field is required'),
  specialist: Yup.string()
    .min(4, 'Too Short')
    .max(10, 'Too Long')
    .required('Field is required'),
  employerName: Yup.string()
    .min(4, 'Too Short')
    .max(10, 'Too Long')
    .required('Field is required'),
  sickLeave: Yup.object().shape({
    startDate: Yup.date()
     .min(new Date(), 'Data cannot be in past')
     .typeError('Date includes invalid characters'),
    endDate: Yup.date()
     .min(Yup.ref('startDate'), 'End must be past starting date')
     .typeError('Date includes invalid characters'),
    })
})


export const AddOccupationalCheckForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {startDate: "", endDate: ""}
      }}
      onSubmit={onSubmit}
      validationSchema = {OccupationalFormSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="MM-DD-YYYY"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name of the specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
            />
            
            <Field
              label="Employer Name"
              placeholder="Name of the employer"
              name="employerName"
              component={TextField}
            />    

            <Field
              label="Start of sick leave"
              placeholder="MM-DD-YYYY"
              name="sickLeave.startDate"
              component={TextField}
            />   

            <Field
              label="End of sick leave"
              placeholder="MM-DD-YYYY"
              name="sickLeave.endDate"
              component={TextField}
            />    

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalCheckForm;
