import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import * as Yup from 'yup';

import { TextField, SelectField} from "./FormField";
import { HospitalEntry } from "../types";

import { useStateValue } from "../state/state";
import { DiagnosisSelection } from "./FormField"



export type HospitalEntryFormValues = Omit<HospitalEntry, "id" | "entries">;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

const HostipalFormSchema = Yup.object().shape({
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
    discharge: Yup.object().shape({
      date: Yup.date()
        .min(new Date(), 'Data cannot be in past')
        .required('Field is required')
        .typeError('Date includes invalid characters'),
      criteria: Yup.string()
        .required("Field is required")
    })
})

export const AddHospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {date: "", criteria: ""}
      }}
      onSubmit={onSubmit}
      validationSchema={HostipalFormSchema}
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
              label="Date of discharge"
              placeholder="MM-DD-YYYY"
              name="discharge.date"
              component={TextField}
            />

            <Field
              label="Criteria of discharge"
              placeholder="Criteria"
              name="discharge.criteria"
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

export default AddHospitalForm;
