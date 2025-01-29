import express, { Router, Request, Response } from 'express';
import tickets from "../data/tickets.json";
import { Ticket } from '../data/types/ticket';

class Tickets {
    private readonly router: Router;

    constructor() {
        this.router = express.Router();

     /**
     * @swagger
     * /tickets:
     *   get:
     *     summary: Pobiera listę wszystkich biletów
     *     tags: [Tickets]
     *     responses:
     *       200:
     *         description: Lista biletów
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Ticket'
     */
        this.router.get("/", this.getTickets);
     /**
     * @swagger
     * /tickets:
     *   post:
     *     summary: Tworzenie nowego biletu
     *     tags: [Tickets]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Ticket'
     *     responses:
     *       201:
     *         description: Bilet utworzony pomyślnie
     *       400:
     *         description: Bad Request
     *       
     */
        this.router.post("/", this.createTicket);
     /**
     * @swagger
     * /tickets/{ticketId}:
     *   get:
     *     summary: Zwraca bilet o podanym id
     *     tags: [Tickets]
     *     parameters:
     *       - in: path
     *         name: ticketId
     *         required: true
     *         schema:
     *           type: integer
     *         description: id biletu
     *     responses:
     *       200:
     *         description: Bilet
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     */
        this.router.get("/:ticketId", this.getTicket);
     /**
     * @swagger
     * /tickets/{ticketId}:
     *   put:
     *     summary: Aktualizuje bilet o podanym id
     *     tags: [Tickets]
     *     parameters:
     *       - in: path
     *         name: ticketId
     *         required: true
     *         schema:
     *           type: integer
     *         description: id biletu
     *     responses:
     *       200:
     *         description: Ticket updated successfully
     */
        this.router.put("/:ticketId", this.putTicket);
     /**
     * @swagger
     * /tickets/{ticketId}:
     *   delete:
     *     summary: Usuwa bilet o podanym id
     *     tags: [Tickets]
     *     parameters:
     *       - in: path
     *         name: ticketid
     *         required: true
     *         schema:
     *           type: integer
     *         description: id biletu
     *     responses:
     *       204:
     *         description: No Content
     *       404:
     *         description: Ticket with id ${id} not found
     */
        this.router.delete("/:ticketId", this.deleteTicket);
    }

    // Pobieranie listy wszystkich biletów
    private getTickets = (req: Request, res: Response) => {
        res.status(200).json({
            tickets: tickets,
            _links: [{ rel: "self", method: "GET", href: "/tickets" }]
        });
    };

    // Tworzenie nowego biletu
    private createTicket = (req: Request, res: Response) => {
        const ticket: Ticket = req.body;

        // Walidacja requestu
        if (
            !ticket.id || !ticket.name || !ticket.surname ||
            !ticket.airportIataCode || !ticket.flightNumber || !ticket.seatNumber
        ) {
            res.status(400)
                .json({ 
                    statusCode: 400,
                    message: "Bad Request. Some fields are missing" 
                });
        }
        if(tickets.some(t => t.id === ticket.id)) {
            res.status(400)
            .json({
                statusCode: 400,
                message: "Bad Request. Ticket with given id already exists"
            })
        }

        tickets.push(ticket);

        res.status(201).json({
            message: "Ticket created successfully",
            _links: [{ rel: "self", method: "POST", href: "/tickets" }]
        });
    };

    // Pobieranie biletu o podanym id
    private getTicket = (req: Request, res: Response) => {
        var id: number = Number(req.params.ticketId);
        var ticket: Ticket | undefined = tickets.find((ticket) => ticket.id == id);

        if(!ticket) {
            res.status(404)
            .json({
                statusCode: 404,
                message: `Ticket with id ${id} not found`
            })
        }

        res.status(200).json({
            airport: ticket,
            _links: [{ rel: "self", method: "GET", href: `/tickets/${id}` }]
        });
    };

    // Aktualizacja biletu o podanym id
    private putTicket = (req: Request, res: Response) => {
        var id: number = Number(req.params.ticketId);
        const ticketIndex = tickets.findIndex((ticket) => ticket.id == id);

        if (ticketIndex === -1) {
            res.status(404)
            .json({
                statusCode: 404,
                message: `Ticket with id ${id} not found`
            });
        }

        var newTicket: Ticket = req.body;

        // Walidacja requestu
        if (
            !newTicket.id || !newTicket.name || !newTicket.surname ||
            !newTicket.airportIataCode || !newTicket.flightNumber || !newTicket.seatNumber
        ) {
            res.status(400)
                .json({ 
                    statusCode: 400,
                    message: "Bad Request. Some fields are missing" 
                });
        }

        tickets[ticketIndex] = { ...tickets[ticketIndex], ...newTicket };

        res.status(200).json({
            message: "Ticket updated successfully",
            _links: [{ rel: "self", method: "PUT", href: `/tickets/${id}` }]
        });
    };

    // Usuwanie biletu o podanym id
    private deleteTicket = (req: Request, res: Response) => {
        var id: number = Number(req.params.ticketId);
        const ticketIndex = tickets.findIndex((ticket) => ticket.id == id);

        if (ticketIndex === -1) {
            res.status(404)
            .json({
                statusCode: 404,
                message: `Ticket with id ${id} not found`
            });
        }

        tickets.splice(ticketIndex, 1);

        res.json(204);
    };

    public getRouter(): Router {
        return this.router;
    }
}

export default Tickets;