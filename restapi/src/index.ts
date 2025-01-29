import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
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

  const options = {
definition: {
    openapi: "3.1.0",
    info: {
    title: "LogRocket Express API with Swagger",
    version: "0.1.0",
    description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
    },
    },
    servers: [
    {
        url: "http://localhost:3000",
    },
    ],
},
apis: ["./routes/*.ts"],
};
  
const specs = swaggerJsdoc(options);
  app.use(
"/api-docs",
swaggerUi.serve,
swaggerUi.setup(specs)
);

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