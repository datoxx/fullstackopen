import express from 'express';
const app = express();

import calculator from './bmiCalculator';
import calc from './exerciseCalculator';


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
    try{
        res.send({weight, height, bmi});
    } catch (e) {
        res.json({ 'error': e.message });
    }
    
});

app.post('/exercises', (req, res) => {
    const body = req.body;
    const exercise: Array<number> = body.daily_exercises;
    const target: number = body.target;

    
  if (!target || !exercise) {
    res.json({ 'error': 'parameters missing' });
  }

  try {
    res.json(calc(exercise, target));
  } catch (_) {
    res.json({ 'error': 'malformatted parameters' });
  }

});






const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

