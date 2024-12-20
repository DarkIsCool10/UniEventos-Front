import { Component } from '@angular/core';
// import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import { TokenService } from '../../servicios/token.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  nombre = ''; 
  title = 'Broletos';
  isLogged = false;
  mostrarMenu = false;

  constructor(){
    //this.rol = this.tokenService.getRol();
  }

  toggleMenu() {
    this.mostrarMenu = this.mostrarMenu === false?true:false;
  }

  // constructor(private authService: AuthService, private tokenService: TokenService) {}

  // ngOnInit(): void {
  //   this.isLogged = this.tokenService.isLogged();
  //   if (this.isLogged) {
  //       this.nombre = this.tokenService.getAllTokenData().nombre;
  //   }
  // }

  // public logout() {
  //   this.tokenService.logout();
  // }

  // public editarPerfil(){
  //   this.tokenService.editarPerfil();
  // }

}
