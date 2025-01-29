import express, { Router, Request, Response } from 'express';
import airplanes from "../data/airplanes.json";
import { Airplane } from '../data/types/airplane';

class Airplanes {
    private readonly router: Router;

    constructor() {
        this.router = express.Router();

    /**
     * @swagger
     * /airplanes:
     *   get:
     *     summary: Pobiera listę wszystkich samolotów
     *     tags: [Airplanes]
     *     responses:
     *       200:
     *         description: Lista samolotów
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Airplane'
     */
        this.router.get("/", this.getAirplanes);
    /**
     * @swagger
     * /airplanes:
     *   post:
     *     summary: Tworzenie nowego samolotu
     *     tags: [Airplanes]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Airplane'
     *     responses:
     *       201:
     *         description: Samolot utworzony pomyślnie
     *       400:
     *         description: Bad Request
     *       
     */
        this.router.post("/", this.createAirplane);
        /**
     * @swagger
     * /airplanes/{airplaneId}:
     *   get:
     *     summary: Zwraca samolot o podanym id
     *     tags: [Airplanes]
     *     parameters:
     *       - in: path
     *         name: airplaneId
     *         required: true
     *         schema:
     *           type: integer
     *         description: id samolotu
     *     responses:
     *       200:
     *         description: Samolot
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Airplane'
     */
        this.router.get("/:airplaneId", this.getAirplane);
     /**
     * @swagger
     * /airplanes/{airplaneId}:
     *   put:
     *     summary: Aktualizuje samolot o podanym id
     *     tags: [Airplanes]
     *     parameters:
     *       - in: path
     *         name: airplaneId
     *         required: true
     *         schema:
     *           type: integer
     *         description: id samolotu
     *     responses:
     *       200:
     *         description: Airport updated successfully
     *       404:
     *         description: Airplane with id ${id} not found
     */
        this.router.put("/:airplaneId", this.putAirplane);
/**
     * @swagger
     * /airplanes/{airplaneId}:
     *   delete:
     *     summary: Usuwa samolot o podanym id
     *     tags: [Airplanes]
     *     parameters:
     *       - in: path
     *         name: airplaneId
     *         required: true
     *         schema:
     *           type: integer
     *         description: id samolotu
     *     responses:
     *       204:
     *         description: No Content
     *       404:
     *         description: Airplane with id ${id} not found
     */
        this.router.delete("/:airplaneId", this.deleteAirplane);
    }

    // Pobieranie listy wszystkich samolotów
    private getAirplanes = (req: Request, res: Response) => {
        res.status(200).json({
            airplanes: airplanes,
            _links: [{ rel: "self", method: "GET", href: "/airplanes" }]
        });
    };

    // Tworzenie nowego samolotu
    private createAirplane = (req: Request<{}, {}, Airplane>, res: Response) => {
        const airplane: Airplane = req.body;

        // Walidacja requestu
        if (
            !airplane.id || !airplane.name || !airplane.iataTypeCode ||
            !airplane.type || !airplane.maxSpeed || !airplane.maxSpeedUnit ||
            !airplane.length || !airplane.width || !airplane.unit || !airplane.engines
        ) {
            res.status(400)
                .json({ 
                    statusCode: 400,
                    message: "Bad Request. Some fields are missing" 
                });
        }
        if(airplanes.some(a => a.id === airplane.id)) {
            res.status(400)
            .json({
                statusCode: 400,
                message: "Bad Request. Airplane with given id already exists"
            })
        }

        airplanes.push(airplane);

        res.status(201).json({
            message: "Airplane created successfully",
            _links: [{ rel: "self", method: "POST", href: "/airplanes" }]
        });
    };

    // Pobieranie samolotu o podanym id
    private getAirplane = (req: Request, res: Response) => {
        var id: number = Number(req.params.airplaneId);
        var airplane: Airplane | undefined = airplanes.find((airplane) => airplane.id == id);

        if(!airplane) {
            res.status(404)
            .json({
                statusCode: 404,
                message: `Airplane with id ${id} not found`
            })
        }

        res.status(200).json({
            airplane: airplane,
            _links: [{ rel: "self", method: "GET", href: `/airplanes/${id}` }]
        });
    };

    // Aktualizacja samolotu o podanym id
    private putAirplane = (req: Request, res: Response) => {
        var id: number = Number(req.params.airplaneId);
        const airplaneIndex = airplanes.findIndex((airplane) => airplane.id == id);

        if (airplaneIndex === -1) {
            res.status(404)
            .json({
                statusCode: 404,
                message: `Airplane with id ${id} not found`
            });
        }

        var newAirplane: Airplane = req.body;

        // Walidacja requestu
        if (
            !newAirplane.id || !newAirplane.name || !newAirplane.iataTypeCode ||
            !newAirplane.type || !newAirplane.maxSpeed || !newAirplane.maxSpeedUnit ||
            !newAirplane.length || !newAirplane.width || !newAirplane.unit || !newAirplane.engines
        ) {
            res.status(400)
                .json({ 
                    statusCode: 400,
                    message: "Bad Request. Some fields are missing" 
                });
        }

        airplanes[airplaneIndex] = { ...airplanes[airplaneIndex], ...newAirplane };

        res.status(200).json({
            message: "Airplane updated successfully",
            _links: [{ rel: "self", method: "PUT", href: `/airplanes/${id}` }]
        });
    };

    // Usuwanie samolotu o podanym id
    private deleteAirplane = (req: Request, res: Response) => {
        var id: number = Number(req.params.airplaneId);
        const airplaneIndex = airplanes.findIndex((airplane) => airplane.id == id);

        if (airplaneIndex === -1) {
            res.status(404)
            .json({
                statusCode: 404,
                message: `Airplane with id ${id} not found`
            });
        }

        airplanes.splice(airplaneIndex, 1);

        res.json(204);
    };

    public getRouter(): Router {
        return this.router;
    }
}

export default Airplanes;