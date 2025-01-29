import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import Airplanes from './routes/airplanes';
import Airports from './routes/airports';
import Tickets from './routes/tickets';
import cors from 'cors';
import swaggerSpecs from "./swagger";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];


// konfiguracja cors
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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