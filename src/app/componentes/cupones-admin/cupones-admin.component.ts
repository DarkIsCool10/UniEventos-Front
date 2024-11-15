import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdministradorService } from '../../servicios/administrador.service';
import { InformacionCuponDTO } from '../../dto/cupon/informacion-cupon-dto';

@Component({ 
  selector: 'app-cupones-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, NgxPaginationModule],
  templateUrl: './cupones-admin.component.html',
  styleUrls: ['./cupones-admin.component.css']
})
export class CuponesAdminComponent implements OnInit {
  availablePage: number = 1;   // Página de cupones disponibles
  unavailablePage: number = 1; // Página de cupones no disponibles

  availableCoupons: InformacionCuponDTO[] = []; // Cupones disponibles
  unavailableCoupons: InformacionCuponDTO[] = []; // Cupones no disponibles
  loading: boolean = false; // Indicador de carga
  errorMessage: string | null = null; // Mensaje de error

  constructor(private administradorService: AdministradorService) {}

  ngOnInit(): void {
    this.cargarCupones();
  }

  public cargarCupones(): void {
    this.loading = true;
    this.administradorService.obtenerTodosLosCupones().subscribe({
      next: (response) => {
        if (!response.error) {
          const cupones: InformacionCuponDTO[] = response.respuesta;
          this.availableCoupons = cupones.filter(cupon => new Date(cupon.fechaVencimiento) > new Date());
          this.unavailableCoupons = cupones.filter(cupon => new Date(cupon.fechaVencimiento) <= new Date());
        } else {
          this.errorMessage = 'No se pudieron cargar los cupones.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los cupones:', err);
        this.errorMessage = 'Error al conectar con el servidor.';
        this.loading = false;
      }
    });
  }

  // Métodos de paginación para cupones disponibles
  prevAvailablePage(): void {
    if (this.availablePage > 1) {
      this.availablePage--;
    }
  }

  nextAvailablePage(): void {
    if (this.availablePage < this.maxAvailablePage()) {
      this.availablePage++;
    }
  }

  maxAvailablePage(): number {
    return Math.ceil(this.availableCoupons.length / 5);
  }

  // Métodos de paginación para cupones no disponibles
  prevUnavailablePage(): void {
    if (this.unavailablePage > 1) {
      this.unavailablePage--;
    }
  }

  nextUnavailablePage(): void {
    if (this.unavailablePage < this.maxUnavailablePage()) {
      this.unavailablePage++;
    }
  }

  maxUnavailablePage(): number {
    return Math.ceil(this.unavailableCoupons.length / 5);
  }
}
