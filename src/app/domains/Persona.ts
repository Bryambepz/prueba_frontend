import { DatePipe } from "@angular/common";
import { Empresa } from "./Empresa";

export class Persona {
    id?: number;
    cedula?: string;
    nombre?: string;
    fecha_nacimiento?: Date;
    estudio?: string;
    Empresas?: Empresa[];
}