import { Component,OnInit } from '@angular/core';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {

  totalEventos: number = 120;  // Datos de ejemplo
  totalCupones: number = 350;  // Datos de ejemplo


  rol: string;


  constructor(private tokenService: TokenService) {
    this.rol = this.tokenService.getRol();
    console.log(this.rol);
  }

  ngOnInit(): void {
    // Aquí podrías obtener los datos desde un servicio o API
  }
}