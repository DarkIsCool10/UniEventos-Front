import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InformacionEventoDTO } from '../../dto/evento/informacion-evento-dto';
import { PublicoService } from '../../servicios/publico.service';
import { RouterModule, ActivatedRoute, Router  } from '@angular/router';
import { Localidad } from '../../dto/evento/localidad';
import { ClienteService } from '../../servicios/cliente.service';
import { DetalleCarritoDTO } from '../../dto/carrito/detalle-carrito-dto';
import { TokenService } from '../../servicios/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento-unidad',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule ],
  templateUrl: './evento-unidad.component.html',
  styleUrl: './evento-unidad.component.css'
})
export class EventoUnidadComponent {

  evento!: InformacionEventoDTO;
  eventoId: any;
  cantidadSeleccionada: number;
  localidad!: Localidad;
  maxCantidad: number;

  constructor(private publicoService: PublicoService, private route: ActivatedRoute, private clienteService: ClienteService,
              private tokenServe: TokenService, private router: Router) 
    {
    this.obtenerEvento();
    this.cantidadSeleccionada = 0;
    this.maxCantidad = 0;
  }

  public obtenerEvento(){
      this.eventoId = this.route.snapshot.paramMap.get('id');
      this.publicoService.obtenerInfoEvento(this.eventoId).subscribe({
        next: (data) => {
          this.evento = data.respuesta
        },
        error: (error) => {
          console.error(error);
        }
      })
   }

  // Método que se ejecuta al seleccionar una localidad
  localidadSeleccionada() {

    if (this.localidad) {

      const maxCapacidad = this.localidad.capacidadMaxima;
      const vendidas = this.localidad.entradasVendidas;

      // Configurar el máximo permitido para la cantidad seleccionada
      this.maxCantidad = maxCapacidad - vendidas;

      // Ajustar la cantidad seleccionada si es mayor que el máximo
      this.cantidadSeleccionada = Math.min(
        this.cantidadSeleccionada,
        this.maxCantidad
      );
    } else {
    // Si no hay localidad seleccionada, resetear valores
      this.maxCantidad = 0;
      this.cantidadSeleccionada = 0;
    }
  }

  // Validar que la cantidad esté dentro del rango permitido
  validarCantidad() {
    if (this.cantidadSeleccionada < 0) {
      this.cantidadSeleccionada = 0;
    } else if (this.cantidadSeleccionada > this.maxCantidad) {
      this.cantidadSeleccionada = this.maxCantidad;
    }
  }

  agregarAlCarrito() {

    const idUsuario = this.tokenServe.getAllTokenData().id;
    const detalleCarritoDTO: DetalleCarritoDTO = { 
      cantidad: this.cantidadSeleccionada,
      nombreLocalidad: this.localidad.nombre,
      idEvento: this.eventoId,
      fechaAgregacion: new Date
    };

    const itemsCarritoDTO = [detalleCarritoDTO];

    this.clienteService.agregarItemsAlCarrito(idUsuario, itemsCarritoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Agregado al carrito',
          text: 'La localidad se ha agregado correctamente al carrito de compras',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
           this.router.navigate(["/carrito"]);
          }
        })
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido agregar correctamente, verifique los datos ingresados',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }

}
