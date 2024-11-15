import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/autenticacion/mensaje-dto';
import { CrearEventoDTO } from '../dto/evento/crear-evento-dto';
import { EditarEventoDTO } from '../dto/evento/editar-evento-dto';
import { ResponderPQRDTO } from '../dto/PQR/responder-pqrdto';
import { CrearCuponDTO } from '../dto/cupon/crear-cupon-dto';
import { EditarCuponDTO } from '../dto/cupon/editar-cupon-dto';
import { ItemsCuponDTO } from '../dto/cupon/items-cupon-dto';


@Injectable({
 providedIn: 'root'
})
export class AdministradorService {


 private adminURL = "http://localhost:8081/api/admin";


 constructor(private http: HttpClient) { }


//  _______________________________ METODOS EVENTOS _________________________________________________
 
  public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-evento`, crearEventoDTO);
  }


 public actualizarEvento(editarEventoDTO: EditarEventoDTO): Observable<MensajeDTO> {
   return this.http.put<MensajeDTO>(`${this.adminURL}/editar-evento`, editarEventoDTO);
 }


 public obtenerEvento(id: string): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-evento/${id}`);
 }


 public eliminarEvento(id: string): Observable<MensajeDTO> {
   return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-evento/${id}`);
 }


//  public listarEventosAdmin(): Observable<MensajeDTO> {
//    return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener-todos`);
//  }
// Este metodo está en el controlador publico, no sé si se toma esa url o qué

public obtenerLocalidad(nombre: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-localidad/${nombre}`);
}


//  _______________________________ METODOS PQR _________________________________________________

public responderPQR(responderPQRDTO: ResponderPQRDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.adminURL}/responder-pqr`, responderPQRDTO);
}

public obtenerInformacionPQR(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/obterner-informacion-pqr/${id}`);
}

public eliminarPQR(id: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-pqr/${id}`);
}

//  _______________________________ METODOS CUPON _________________________________________________

public crearCupon(crearCuponDTO: CrearCuponDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.adminURL}/crear-cupon`, crearCuponDTO);
}


public editarCupon(editarCuponDTO: EditarCuponDTO, cuponId: string): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.adminURL}/editar-cupon/${cuponId}`, editarCuponDTO);
}


public obtenerInformacionCupon(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/${id}`);
}

public obtenerTodosLosCupones(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/cupones`);
}


public eliminarCupon(id: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-cupon/${id}`);
}

public obtenerCuponesFiltrados(itemCuponDTO: ItemsCuponDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.adminURL}/filtrar-cupones`, itemCuponDTO);
}

//  _______________________________ METODOS IMAGENES _________________________________________________

 public subir(imagen: FormData): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/subir`, imagen);
 }

 public eliminar(idImagen: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar/${idImagen}`);
}

}
