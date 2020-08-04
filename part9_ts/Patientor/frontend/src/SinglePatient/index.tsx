import React from 'react';
import axios from "axios";
import { Header, Container, Item, Icon, Button} from "semantic-ui-react";
import { useParams } from 'react-router-dom';

import { useStateValue } from "../state/state";
import { apiBaseUrl } from "../constants";
import { Patient, RouteParams, Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, Diagnosis} from "../types";
import { getPatient } from "../state/reducer";
import AddEntryModal from '../AddEntryModal'


import { addEntry } from "../state/reducer";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
    const [{diagnoses}] = useStateValue();
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryComponent entry={entry} diagnoses={diagnoses}/>;
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry} diagnoses={diagnoses}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent entry={entry} diagnoses={diagnoses}/>;
        default:
            return assertNever(entry);
    }
};

const HospitalEntryComponent: React.FC<{entry: HospitalEntry; diagnoses: Diagnosis[]}> = ({entry, diagnoses}) => {
        const {date, diagnosisCodes, description} = entry;
        return (
            <Item>
            <Item.Content>
            <Icon name='hospital' size='huge'/>
            <Item.Header >{date}</Item.Header>
            <Item.Description>{description}</Item.Description>
                <ul>
                    {diagnosisCodes && diagnosisCodes.map(code => {
                        const diagnoseDescription = diagnoses.find(diagnose => diagnose.code===code);
                        return <li key={code}>{code} : {diagnoseDescription ? diagnoseDescription.name : 'No description'}</li>;
                        })}
                </ul>
            </Item.Content>
        </Item>  
          );
};

const OccupationalHealthcareEntryComponent: React.FC<{entry: OccupationalHealthcareEntry; diagnoses: Diagnosis[]}> = ({entry,diagnoses}) => {
    const {date, diagnosisCodes, description} = entry;
    return (
        <Item>
            <Item.Content>
            <Icon name='plus circle' size='huge'/>
            <Item.Header>{date}</Item.Header>
            <Item.Description>{description}</Item.Description>
                <ul>
                    {diagnosisCodes && diagnosisCodes.map(code => {
                        const diagnoseDescription = diagnoses.find(diagnose => diagnose.code===code);
                        return <li key={code}>{code} : {diagnoseDescription ? diagnoseDescription.name : 'No description'}</li>;
                        })}
                </ul>
            </Item.Content>
        </Item>
      );
};

const HealthCheckEntryComponent: React.FC<{entry: HealthCheckEntry; diagnoses: Diagnosis[]}> = ({entry, diagnoses}) => {
    const {date, diagnosisCodes, description} = entry;
    return (
        <Item>
            <Item.Content>

            <Icon name='heart' size='huge'/>
            <Item.Header >{date}</Item.Header>
            <Item.Description>{description}</Item.Description>
                <ul>
                    {diagnosisCodes && diagnosisCodes.map(code => {
                        const diagnoseDescription = diagnoses.find(diagnose => diagnose.code===code);
                        return <li key={code}>{code} : {diagnoseDescription ? diagnoseDescription.name : 'No description'}</li>;
                        })}
                </ul>
            </Item.Content>
        </Item>
      );
};

const Entries: React.FC<{entries: Entry[]}> = ({entries}) => {
  
    return (
        <Item.Group divided>  
            {entries.map((entry) => <EntryDetails key={entry.id} entry={entry}/> )}
        </Item.Group>
    );

};


const ShowPatient: React.FC = () => {
    const [{ target }, dispatch] = useStateValue();
    const [error, setError] = React.useState<string | undefined>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const id = useParams<RouteParams>().id;
    React.useEffect(() => {
        const fetchTargetPatient = async () => {
            try {
                const { data: targetPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(getPatient(targetPatient));
            } catch (e) {
                console.error(e);
            }
        };

        const doExists = target.find(patient => patient.id === id);
        doExists ? dispatch(getPatient(doExists)) : fetchTargetPatient();

    }, [dispatch]);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewPatient = async (values: Omit<Entry, 'id'>) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(addEntry(newEntry, id));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    const currentTarget = target[0];
    
    if(!currentTarget){
        return null;
    }
    
      return(
        <>
            <Container>
                <Header>
                    {currentTarget.name}
                </Header>
                <p> ssn: {currentTarget.ssn}</p>
                <p> occupation: {currentTarget.occupation}</p>

                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewPatient}
                    error={error}
                    onClose={closeModal}
                />
                <Button onClick={() => openModal()}>Add New Entry</Button>

                <Header as='h3'>
                    entries
                </Header>
                {currentTarget.entries&&currentTarget.entries.length>0 
                  ? <Entries entries={currentTarget.entries}/>
                  : <p>no entries existing</p>
                }
            </Container>

        </>
      );
};



export default ShowPatient;
