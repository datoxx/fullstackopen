import express from 'express';
import morgan from 'morgan';

import calculator from './bmiCalculator';
import calc from './exerciseCalculator';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

app.get('/hello', (_req, res) => {
    res.send('hello full stack');
  });

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if(!height || !weight) {
        res.status(400).json({   
             error: "malformatted parameters"    
        });
    }

    const bmi = calculator(weight, height);

    res.send({weight, height, bmi});
    
    
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {exercise, target} =  req.body;

    
  if (!target || !exercise) {
    res.json({ 'error': 'parameters missing' });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.json(calc(exercise, target));
  } catch (_) {
    res.json({ 'error': 'malformatted parameters' });
  }

});






const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

