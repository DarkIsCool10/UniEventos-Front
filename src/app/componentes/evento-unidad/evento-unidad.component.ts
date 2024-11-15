import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InformacionEventoDTO } from '../../dto/evento/informacion-evento-dto';
import { PublicoService } from '../../servicios/publico.service';
import { RouterModule, ActivatedRoute  } from '@angular/router';
import { Localidad } from '../../dto/evento/localidad';


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
  maxCantidad: number;
  cantidadSeleccionada: number;
  localidad!: Localidad;

  constructor(private publicoService: PublicoService, private route: ActivatedRoute) {
    this.obtenerEvento();
    this.cantidadSeleccionada = 1;
    this.maxCantidad = 1;
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
        console.log("MaxCantidad", this.maxCantidad)
        console.log("maxCapacidad", maxCapacidad)
        console.log("vendidas", vendidas)

        // Reiniciar la cantidad seleccionada a 1 si el valor anterior es mayor que el nuevo máximo
        this.cantidadSeleccionada = Math.min(this.cantidadSeleccionada, this.maxCantidad);
      } else {
        // Resetear el máximo y la cantidad si no hay localidad seleccionada
        this.maxCantidad = 0;
        this.cantidadSeleccionada = 0;
      }
    }

      // Validar que la cantidad seleccionada esté dentro del rango permitido
  validarCantidad() {
    if (this.cantidadSeleccionada < 1) {
      this.cantidadSeleccionada = 0;
    } else if (this.cantidadSeleccionada > this.maxCantidad) {
      this.cantidadSeleccionada = this.maxCantidad;
    }
  }

  locations = [
    { selectedLocalidad: '', cantidad: null }
  ];
  
  agregarUbicacion() {
    if (this.locations.length < 3) {
      this.locations.push({ selectedLocalidad: '', cantidad: null });
    }
  }

  agregarAlCarrito() {
    console.log('Entradas seleccionadas:', this.locations);
    // Aquí podrías llamar un servicio que agregue las entradas al carrito o procesarlas
  }

}
