import express from 'express';
import { faker } from '@faker-js/faker';

const app = new express();

app.get('/', (req, res) => {
    const airplane = faker.airline.airplane();
    res.send(airplane);
});

app.listen(8080, () => {
    console.log("Started at 8080");
})