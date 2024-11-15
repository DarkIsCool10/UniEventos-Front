import { Localidad } from "./localidad";
import { TipoEvento } from "../../enums/TipoEvento";
import { EstadoEvento } from "../../enums/EstadoEvento";

export interface InformacionEventoDTO {
    id: string,
    nombre: string,
    descripcion: string,
    direccion: string,
    ciudad: string,
    fecha: Date,
    imagenLocalidad: string,
    imagenPortada: string,
    localidades: Localidad[]
    estado: EstadoEvento,
    tipo: TipoEvento,
}
