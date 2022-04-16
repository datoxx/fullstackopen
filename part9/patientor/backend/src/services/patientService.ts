import patients from '../../data/patients';

import { patientsWithoutSSN } from '../types';

const fetchPatientsNoSSN = (): patientsWithoutSSN[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name,
        dateOfBirth,
        gender, 
        occupation
    }));
};

export default {
    fetchPatientsNoSSN
}