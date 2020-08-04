import React from 'react';
import { Modal, Segment, Grid, Button } from 'semantic-ui-react';
import AddHealthCheckForm from './AddHealthCheckForm';
import AddHospitalForm from './AddHospitalForm';
import AddOccupationalCheckForm from './AddOccupationalCheckForm';
import { Entry } from '../types'

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<Entry,'id'> ) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {

  const [renderEntry, setEntry] = React.useState<string>('');

  const selectForm = () => {
    switch (renderEntry) {
      case "hospital":
        return <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />;
      case "center":
        return <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />;
      case "occupational":
        return <AddOccupationalCheckForm onSubmit={onSubmit} onCancel={onClose} />;
      default:
        return <h3>Select entry type</h3>;
  }
  }
  
  return(
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add new entry</Modal.Header>
      <Modal.Content>

      <Grid columns={3}>
        <Grid.Column textAlign='center'>
          <Button type="button" onClick={()=>setEntry('hospital')}>
            Hospital
          </Button>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Button type="button" onClick={()=>setEntry('center')}>
            Health Check
          </Button>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Button type="button" onClick={()=>setEntry('occupational')}>
            Occupational Healthcare
          </Button>
        </Grid.Column>
      </Grid>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {selectForm()}
      </Modal.Content>
    </Modal>
);
}

export default AddEntryModal;
