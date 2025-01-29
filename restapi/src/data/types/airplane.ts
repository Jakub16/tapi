import { Engines } from "./engines";

export type Airplane = {
    id: number;
    name: string;
    iataTypeCode: string;
    type: string;
    maxSpeed: number;
    maxSpeedUnit: string;
    length: number;
    width: number;
    unit: string;
    engines: Engines;
}