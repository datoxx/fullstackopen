/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.fetchPatientsNoSSN());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(Number(req.params.id));

  if(patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addPatient = patientService.addPatient(newPatient);
    res.json(addPatient);

  } catch (error: unknown) {

    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

  
export default router;