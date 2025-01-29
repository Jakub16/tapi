import express from 'express';
import Airplanes from './routes/airplanes';
import Airports from './routes/airports';
import Tickets from './routes/tickets';

const app = express();
app.use(express.json());

// dodawanie nagłówków
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache");
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

// rejestracja routów
const airplanes = new Airplanes();
const airports = new Airports();
const tickets = new Tickets();
app.use('/airplanes', airplanes.getRouter());
app.use('/airports', airports.getRouter());
app.use('/tickets', tickets.getRouter());


app.listen(3000, () => {
    console.log("Started at 3000");
})