const airports = require("./data/airports.json");
const airplanes = require("./data/airplanes.json");
const tickets = require("./data/tickets.json");

const resolvers = {
  Query: {
    getAirport: (_, { id }) => airports.find((airport) => airport.id == parseInt(id)),
    getAirports: () => airports,
    getAirplane: (_, { id }) => airplanes.find((airplane) => airplane.id == parseInt(id)),
    getAirplanes: () => airplanes,
    getTicket: (_, { id }) => tickets.find((ticket) => ticket.id == parseInt(id)),
    getTickets: () => tickets
  },
  Mutation: {
    createAirport: (_, { id, name }) => {
      const newAirport = { id, name };
      airports.push(newAirport);
      return newAirport;
    }
  },
  Mutation: {
    createAirplane: (_, { id, name, iataTypeCode, type, maxSpeed, maxSpeedUnit, length, width, unit }) => {
      const newAirplane = { id, name, iataTypeCode, type, maxSpeed, maxSpeedUnit, length, width, unit };
      airplanes.push(newAirplane);
      return newAirplane;
    }
  },
  Mutation: {
    createTicket: (_, { id, name, surname, flightNumber, seatNumber }) => {
      const newTicket = { id, name, surname, flightNumber, seatNumber };
      tickets.push(newTicket);
      return newTicket;
    }
  }
};

module.exports = resolvers;
