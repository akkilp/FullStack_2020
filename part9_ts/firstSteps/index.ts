import express from 'express';
const app = express();

app.use(express.json());

interface exerciceData {
    target: number
    exerciceArray: Array<number>
}

import {calculateBMI} from './bmiCalculator';
import {calculateExercice} from './exerciceCalculator';


app.get('/hello', (_req, res) => {
    res.send('Hello!');
});

app.get('/bmi', (_req, res) => {
    const height = _req.query.height;
    const weight = _req.query.weight;
    try{
        const calculatedBMI = calculateBMI(Number(height), Number(weight));
        res.send(calculatedBMI);
    } catch(error){
        res.status(400).send(`${error as string}`);
    }
});

app.post('/calculateExercices', (req, res) => {
    try{
        const {target, exerciceArray}: exerciceData = req.body as exerciceData;
        const data = calculateExercice(exerciceArray, target);
        res.status(200).send(data);
    } catch(error){
        res.status(400).send(`${error as string}`);
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
