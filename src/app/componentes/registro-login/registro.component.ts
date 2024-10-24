import { Component, OnInit, Inject } from '@angular/core';
// import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
// import { PublicoService } from '../../servicios/publico.service';
// import { AuthService } from '../../servicios/auth.service';
// import { AlertaComponent } from '../alerta/alerta.component';
// import { Alerta } from '../../dto/alerta';
// import { LoginDTO } from '../../dto/login-dto';
// import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, 
    // AlertaComponent
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroLoginComponent implements OnInit {

  container: HTMLElement | null = null;
  // registroClienteDTO: RegistroClienteDTO;
  // loginDTO: LoginDTO;
  archivos!:FileList;
  showPassword = false;
  activeIcon = 'fa-eye'; //el icono de ojo abierto está activo
  // alerta!:Alerta;


  constructor(@Inject(DOCUMENT) private document: Document, 
  // private publicoService: PublicoService, 
    // private authService: AuthService, 
    // private tokenService: TokenService
  ) {
    // this.registroClienteDTO = new RegistroClienteDTO();
    // this.loginDTO = new LoginDTO();
  }

  // public sonIguales(): boolean {
  //   return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
  // }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      // this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
  }

  public registrar() {
    // this.authService.registrarCliente(this.registroClienteDTO).subscribe({
    //   next: (data) => {
    //     this.alerta = new Alerta(data.respuesta, "success");
    //   },
    //   error: (error) => {
    //     this.alerta = new Alerta(error.error.respuesta, "danger");
    //   }
    // });
  }

  ngOnInit(): void {
    this.container = this.document.getElementById('container'); // Get container reference

    if (this.container) {
      const signUpButton = this.document.getElementById('signUp');
      const signInButton = this.document.getElementById('signIn');

      if (signUpButton && signInButton) {
        signUpButton.addEventListener('click', () => this.togglePanel('right'));
        signInButton.addEventListener('click', () => this.togglePanel('left'));
      }
    }
  }

  togglePanel(direction: 'left' | 'right'): void {
    if (!this.container) {
      return;
    }
    this.container.classList.toggle('right-panel-active');
  }

  togglePasswordVisibility() {
    this.showPassword =!this.showPassword;
    this.activeIcon = this.activeIcon === 'fa-eye'? 'fa-eye-slash' : 'fa-eye'; // Cambia el icono activo
  }

  //__________________________________________________________________________________________________________________
  
  public login() {
      // this.authService.loginCliente(this.loginDTO).subscribe({
      //   next: data => {
      //     this.tokenService.login(data.respuesta.token);
      //   },
      //   error: error => {
      //     this.alerta = new Alerta(error.error.respuesta, "danger" );
      //   }
      //   });
  }
  
}