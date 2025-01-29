import express, { Router, Request, Response } from 'express';
import airports from "../data/airports.json";
import { Airport } from '../data/types/airport';

class Airports {
    private readonly router: Router;

    constructor() {
        this.router = express.Router();

     /**
     * @swagger
     * /airports:
     *   get:
     *     summary: Pobiera listę wszystkich lotnisk
     *     tags: [Airports]
     *     responses:
     *       200:
     *         description: Lista lotnisk
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Airport'
     */
        this.router.get("/", this.getAirports);
     /**
     * @swagger
     * /airports:
     *   post:
     *     summary: Tworzenie nowego lotniska
     *     tags: [Airports]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Airport'
     *     responses:
     *       201:
     *         description: Lotnisko utworzone pomyślnie
     *       400:
     *         description: Bad Request
     *       
     */
        this.router.post("/", this.createAirport);
        /**
     * @swagger
     * /airports/{airportId}:
     *   get:
     *     summary: Zwraca lotnisko o podanym id
     *     tags: [Airports]
     *     parameters:
     *       - in: path
     *         name: airportId
     *         required: true
     *         schema:
     *           type: integer
     *         description: id lotniska
     *     responses:
     *       200:
     *         description: Samolot
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Airport'
     */
        this.router.get("/:airportId", this.getAirport);
        /**
     * @swagger
     * /airports/{airportId}:
     *   put:
     *     summary: Aktualizuje lotnisko o podanym id
     *     tags: [Airports]
     *     parameters:
     *       - in: path
     *         name: airportId
     *         required: true
     *         schema:
     *           type: integer
     *         description: id lotniska
     *     responses:
     *       200:
     *         description: Airport updated successfully
     */
        this.router.put("/:airportId", this.putAirport);
    /**
     * @swagger
     * /airports/{airportId}:
     *   delete:
     *     summary: Usuwa lotnisko o podanym id
     *     tags: [Airports]
     *     parameters:
     *       - in: path
     *         name: airportId
     *         required: true
     *         schema:
     *           type: integer
     *         description: id lotniska
     *     responses:
     *       204:
     *         description: No Content
     *       404:
     *         description: Airport with id ${id} not found
     */
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