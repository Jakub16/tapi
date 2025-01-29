const swaggerJsdoc = require("swagger-jsdoc");
import swaggerAutogen from "swagger-autogen";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Airplane: {
          type: "object",
          required: ["id", "name", "iataTypeCode", "type", "maxSpeed", "maxSpeedUnit", "engines"],
          properties: {
            id: { type: "string", description: "id of the airplane" },
            name: { type: "string", description: "name of the plane" },
            iataTypeCode: { type: "string", description: "iataTypeCode of the plane" },
            type: { type: "boolean", description: "type of the plane" },
            maxSpeed: { type: "integer", description: "maxSpeed of the plane" },
            maxSpeedUnit: { type: "string", description: "maxSpeed unit" },
            engines: { type: "Engines", description: "airplane's engines" }
          }
        },
        Engines: {
            type: "object",
            required: ["quantity", "power", "powerUnit", "manufacturer"],
            properties: {
                "quantity": { type: "int", description: "engines quantity" },
                "power": { type: "int", description: "engine's power" },
                "powerUnit": { type: "string", description: "engine's power unit" },
                "manufacturer": { type: "Manufacturer", description: "manufacturer of the engine" }
            }
        },
        Manufacturer: {
            required: ["name", "address"],
            properties: {
                "name": { type: "string", description: "manufacturer's name" },
                "address": { type: "Address", description: "manufacturer's address" }
            }
        },
        Address: {
            required: ["street", "city", "country"],
            properties: {
                "street": { type: "string", description: "address street" },
                "city": { type: "string", description: "address city" },
                "country": { type: "string", description: "address country" }
            }
        },
        Airport: {
            required: ["id", "name", "iataCode", "address"],
            properties: {
                "id": { type: "int", description: "airport id" },
                "name": { type: "string", description: "airport name" },
                "iataCode": { type: "string", description: "airport iataCode" },
                "address": { type: "Address", description: "airport address" }
            }
        },
        Ticket: {
            required: ["id", "name", "surname", "airportIataCode", "flightNumber", "seatNumber"],
            properties: {
                "id": { type: "int", description: "ticket id" },
                "name": { type: "string", description: "passenger name" },
                "surname": { type: "string", description: "passenger surname" },
                "airportIataCode": { type: "string", description: "airport iata code" },
                "flightNumber": { type: "string", description: "flight number" },
                "seatNumber": { type: "string", description: "seat number" }
            }
        }
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./src/index.ts", "./src/routes/*.ts"];

swaggerAutogen()(outputFile, endpointsFiles).then(() => {
  console.log("Swagger json created");
});

const swaggerSpecs = swaggerJsdoc(options);
export default swaggerSpecs;
