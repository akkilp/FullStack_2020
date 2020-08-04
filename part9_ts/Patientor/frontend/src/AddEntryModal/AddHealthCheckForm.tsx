import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import * as Yup from 'yup';

import { TextField, SelectField, HealtRatingOptions } from "./FormField";
import { HealthCheckEntry } from "../types";

import { useStateValue } from "../state/state";
import { DiagnosisSelection } from "./FormField"



export type EntryFormValues = Omit<HealthCheckEntry, "id" | "entries">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HealthCheckFormSchema = Yup.object().shape({
  date: Yup.date()
    .min(new Date(), 'Data cannot be in past')
    .required('Field is required')
    .typeError('Date includes invalid characters'),
  description: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Field is required!'),
  specialist: Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Field is required!'),
  healthCheckRating: Yup.number()
    .required('Health Check Rating required')
})


const healthCheckOptions: HealtRatingOptions[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low Risk" },
  { value: 2, label: "High Risk" },
  { value: 3, label: "Critical Risk" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        healthCheckRating: 1,
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validationSchema={HealthCheckFormSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
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
            <SelectField
              label="Health rating"
              name="healthCheckRating"
              options={healthCheckOptions}
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

export default AddEntryForm;
