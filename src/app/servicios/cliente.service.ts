import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditarCuentaDTO } from '../dto/cuenta/editar-cuenta-dto';
import { MensajeDTO } from '../dto/autenticacion/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearPQRDTO } from '../dto/PQR/crear-pqrdto';
import { DetalleCarritoDTO } from '../dto/carrito/detalle-carrito-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteURL = "http://localhost:8081/api/cuenta";


  constructor(private http: HttpClient) { }
 
   //_______________________________ METODOS EVENTO _____________________________________________
   
   public editarCuenta(editarCuentaDTO: EditarCuentaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.clienteURL}/editar-perfil`, editarCuentaDTO);
  }

  public eliminarCuenta(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.clienteURL}/eliminar-cuenta/${id}`);
  }

  public obtenerInformacionCuenta(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/obtener-informacion/${id}`);
  }

   //_______________________________ METODOS PQR _____________________________________________

   public crearPQR(crearPQRDTO: CrearPQRDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/crear-pqr`, crearPQRDTO);
  }

  public listarPQRs(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/listar-pqr`);
  }

  public obtenerPQRsPorUsuario(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/obtener-pqr-usuario/${id}`);
  }

   //_______________________________ METODOS CARRITO _____________________________________________

   public agregarItemsAlCarrito(idUsuario: string, itemsCarritoDTO: DetalleCarritoDTO[]): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.clienteURL}/agregar-items-carrito/${idUsuario}`, itemsCarritoDTO);
  }

  public obtenerCarrito(idUsuario: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/obtener-carrito-idUsuario/${idUsuario}`);
  }

  public eliminarItemDelCarrito(idUsuario: string, nombreLocalidad: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.clienteURL}/eliminar-item-carrito/${idUsuario}/${nombreLocalidad}`);
  }

  public vaciarCarrito(idUsuario: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.clienteURL}//vaciar-carrito/${idUsuario}`);
  }

  public listarProductosEnCarrito(idUsuario: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/listar-productos-carrito/${idUsuario}`);
  }

  public calcularTotalCarrito(idUsuario: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/total-carrito/${idUsuario}`);
  }

  public validarDisponibilidadEntradas(idUsuario: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/validar-disponibilidad/${idUsuario}`);
  }

}