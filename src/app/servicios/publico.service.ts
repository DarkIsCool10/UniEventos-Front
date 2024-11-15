import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/autenticacion/mensaje-dto';
import { Observable } from 'rxjs';
import { FiltroEventoDTO } from '../dto/evento/filtro-evento-dto';
import { Evento } from '../models/Evento';

@Injectable({
 providedIn: 'root'
})
export class PublicoService {


 private publicoURL = "https://unieventos-0nly.onrender.com/api/publico";


 constructor(private http: HttpClient) { }

  //_______________________________ METODOS EVENTO _____________________________________________


  public filtrarEventos(filtroEventoDTO: FiltroEventoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.publicoURL}/filtrar-eventos`, filtroEventoDTO);
  }

  public listarEventos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-eventos`);
  }

  public obtenerInfoEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/obtener-evento/${id}`);
  }

}
