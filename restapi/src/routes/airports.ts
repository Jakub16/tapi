import express, { Router, Request, Response } from 'express';
import airports from "../data/airports.json";
import { Airport } from '../data/types/airport';

class Airports {
    private readonly router: Router;

    constructor() {
        this.router = express.Router();

        this.router.get("/", this.getAirports);
        this.router.post("/", this.createAirport);
        this.router.get("/:airportId", this.getAirport);
        this.router.put("/:airportId", this.putAirport);
        this.router.delete("/:airportId", this.deleteAirport);
    }

    // Pobieranie listy wszystkich lotnisk
    private getAirports = (req: Request, res: Response) => {
        res.status(200).json({
            airports: airports,
            _links: [{ rel: "self", method: "GET", href: "/airports" }]
        });
    };

    // Tworzenie nowego lotniska
    private createAirport = (req: Request, res: Response) => {
        const airport: Airport = req.body;

        // Walidacja requestu
        if (
            !airport.id || !airport.name || !airport.iataCode || !airport.address
        ) {
            res.status(400)
                .json({ 
                    statusCode: 400,
                    message: "Bad Request. Some fields are missing" 
                });
        }
        if(airports.some(a => a.id === airport.id)) {
            res.status(400)
            .json({
                statusCode: 400,
                message: "Bad Request. Airport with given id already exists"
            })
        }

        airports.push(airport);

        res.status(201).json({
            message: "Airport created successfully",
            _links: [{ rel: "self", method: "POST", href: "/airports" }]
        });
    };

    // Pobieranie lotniska o podanym id
    private getAirport = (req: Request, res: Response) => {
        var id: number = Number(req.params.airportId);
        var airport: Airport | undefined = airports.find((airport) => airport.id == id);

        if(!airport) {
            res.status(404)
            .json({
                statusCode: 404,
                message: `Airport with id ${id} not found`
            })
        }

        res.status(200).json({
            airport: airport,
            _links: [{ rel: "self", method: "GET", href: `/airports/${id}` }]
        });
    };

    // Aktualizacja lotniska o podanym id
    private putAirport = (req: Request, res: Response) => {
        var id: number = Number(req.params.airportId);
        const airportIndex = airports.findIndex((airport) => airport.id == id);

        if (airportIndex === -1) {
            res.status(404)
            .json({
                statusCode: 404,
                message: `Airport with id ${id} not found`
            });
        }

        var newAirport: Airport = req.body;

        // Walidacja requestu
        if (
            !newAirport.id || !newAirport.name || !newAirport.iataCode || !newAirport.address
        ) {
            res.status(400)
                .json({ 
                    statusCode: 400,
                    message: "Bad Request. Some fields are missing" 
                });
        }

        airports[airportIndex] = { ...airports[airportIndex], ...newAirport };

        res.status(200).json({
            message: "Airport updated successfully",
            _links: [{ rel: "self", method: "PUT", href: `/airports/${id}` }]
        });
    };

    // Usuwanie lotniska o podanym id
    private deleteAirport = (req: Request, res: Response) => {
        var id: number = Number(req.params.airportId);
        const airportIndex = airports.findIndex((airport) => airport.id == id);

        if (airportIndex === -1) {
            res.status(404)
            .json({
                statusCode: 404,
                message: `Airport with id ${id} not found`
            });
        }

        airports.splice(airportIndex, 1);

        res.json(204);
    };

    public getRouter(): Router {
        return this.router;
    }
}

export default Airports;