import { newPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (dob: string): boolean => {
    return Boolean(Date.parse(dob));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error(`Incorrect or missing Name ${name}`);
    }
    return name;
};

const parseDOB = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error(`Incorrect or missing DOB ${dateOfBirth}`);
    }
    return dateOfBirth;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error(`Incorrect or missing SSN ${ssn}`);
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
  };

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error(`Incorrect or missing Occupation ${occupation}`);
    }
    return occupation;
};

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): newPatient => {
    const patient: newPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDOB(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };

    return patient
}; 


export default toNewPatient;