import express from 'express';
import { faker } from '@faker-js/faker';
import Airplanes from './routes/airplanes';
import Airports from './routes/airports';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    const airplane = faker.airline.airplane();
    res.send(airplane);
});

const airplanes = new Airplanes();
const airports = new Airports();
app.use('/airplanes', airplanes.getRouter());
app.use('/airports', airports.getRouter());

app.listen(8080, () => {
    console.log("Started at 8080");
})