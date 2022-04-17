import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { patientsWithoutSSN, Patient, newPatient } from '../types';


const patientData = (): Patient[] => {
    return patients;
};

const findById = (id: number): Patient | undefined => {
    const patient = patients.find(p => Number(p.id) === id);
    return patient;
};

const fetchPatientsNoSSN = (): patientsWithoutSSN[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name,
        dateOfBirth,
        gender, 
        occupation
    }));
};

const addPatient = (patient: newPatient): Patient => {
    
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
}


export default {
    fetchPatientsNoSSN,
    patientData,
    findById,
    addPatient
}