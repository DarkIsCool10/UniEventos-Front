import { TipoEvento } from "../../enums/TipoEvento"

export interface ItemEventoDTO {
    id: string,
    urlImagenPortada: string,
    nombre: string,
    tipoEvento: TipoEvento,
    fecha: Date,
    direccion: string,
    ciudad: string
}
