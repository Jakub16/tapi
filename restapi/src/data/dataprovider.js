import { faker } from '@faker-js/faker';
import * as fs from 'fs';

var airplanesToSave = [];
var airportsToSave = [];
var ticketsToSave = [];

for (var i=1; i<=500; i++) {
    var airplane = {};
    airplane.engines = {};
    airplane.engines.manufacturer = {};
    airplane.engines.manufacturer.address = {};
    airplane.id = i;
    airplane.name = faker.airline.airplane().name;
    airplane.iataTypeCode = faker.airline.airplane().iataTypeCode;
    airplane.type = faker.airline.aircraftType();
    airplane.maxSpeed = faker.number.int({ min: 300, max: 800 });
    airplane.maxSpeedUnit = 'km/h';
    airplane.length = faker.number.int({ min: 100, max: 300 });
    airplane.width = faker.number.int({ min: 10, max: 50 });
    airplane.unit = 'metres';
    airplane.engines.quantity = faker.number.int({ min: 2, max: 4, multipleOf: 2 });
    airplane.engines.power = faker.number.int({ min: 30000, max: 60000 });
    airplane.engines.powerUnit = 'horsepower';
    airplane.engines.manufacturer.name = faker.company.name();
    airplane.engines.manufacturer.address.street = faker.location.streetAddress();
    airplane.engines.manufacturer.address.city = faker.location.city();
    airplane.engines.manufacturer.address.country = faker.location.country();
    airplanesToSave.push(airplane);

    var airport = {};
    airport.address = {};
    airport.id = i;
    airport.name = faker.airline.airport().name;
    airport.iataCode = faker.airline.airport().iataCode;
    airport.address.street = faker.location.streetAddress();
    airport.address.city = faker.location.city();
    airport.address.country = faker.location.country();
    airportsToSave.push(airport);

    var ticket = {};
    ticket.id = i;
    ticket.name = faker.person.firstName();
    ticket.surname = faker.person.lastName();
    ticket.aiirportIataCode = airport.iataCode;
    ticket.flightNumber = faker.airline.flightNumber();
    ticket.seatNumber = faker.airline.seat();
    ticketsToSave.push(ticket);
  }

fs.writeFile('src/data/airplanes.json', JSON.stringify(airplanesToSave, null, '\t'), (err) => {
    if (err) throw err;
    console.log('Airplanes saved');
});

fs.writeFile('src/data/airports.json', JSON.stringify(airportsToSave, null, '\t'), (err) => {
  if (err) throw err;
  console.log('Airports saved');
});

fs.writeFile('src/data/tickets.json', JSON.stringify(ticketsToSave, null, '\t'), (err) => {
  if (err) throw err;
  console.log('Tickets saved');
});