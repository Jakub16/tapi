import { Manufacturer } from "./manufacturer";

export type Engines = {
    quantity: number;
    power: number;
    powerUnit: string;
    manufacturer: Manufacturer;
}