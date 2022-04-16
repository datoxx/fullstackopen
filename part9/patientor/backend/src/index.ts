import express from 'express';
import cors from 'cors';

// routers
import diagnoseRouter from './routes/diagnose';
import patientRouter from './routes/patient'

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});