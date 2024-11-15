import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/autenticacion/mensaje-dto';
import { LoginDTO } from '../dto/cuenta/login-dto';
import { CrearCuentaDTO } from '../dto/cuenta/crear-cuenta-dto';
import { ValidarCodigoDTO } from '../dto/cuenta/validar-codigo-dto';
import { CambiarPasswordDTO } from '../dto/cuenta/cambiar-password-dto';
import { CodigoContraseniaDTO } from '../dto/cuenta/codigo-contrasenia-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8081/api/auth ";

  private emailTemp: string;

  constructor(private http: HttpClient) { 
    this.emailTemp = this.getEmailTemp();
  }


  setEmailTemp(email: string) {
    this.emailTemp = email;
  }

  getEmailTemp() {
    return this.emailTemp;
  }
  //_______________________________ METODOS CUENTA _____________________________________________

   public crearCuenta(cuentaDTO: CrearCuentaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/crear-cuenta`, cuentaDTO);
   }

   public validarCodigo(validarCodigoDTO: ValidarCodigoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/validar-codigo-registro`, validarCodigoDTO);
   }

   public enviarCodigoRecuperacion(codigoContraseniaDTO: CodigoContraseniaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/enviar-codigo-recuperacion-contasenia`, codigoContraseniaDTO);
   }

   public cambiarPassword(cambiarPasswordDTO: CambiarPasswordDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/cambiar-password`, cambiarPasswordDTO);
   }
   
     //_______________________________ METODOS AUTENTICACION _____________________________________________________

   public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
   }
   
}
