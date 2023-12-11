import { Persona } from "./Persona";

export class Empresa {
    id?: number;
    nombre?: string;
    telefono?: string;
    direccion?: string;
    personas?: Persona[];
}