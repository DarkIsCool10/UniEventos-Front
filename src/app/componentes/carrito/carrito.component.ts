import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute, Router  } from '@angular/router';
import { InformacionEventoCarritoDTO } from '../../dto/carrito/informacion-evento-carrito-dto';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  items: InformacionEventoCarritoDTO[];

  constructor(private clienteService: ClienteService, private tokenService: TokenService) {
    this.items = [];
    this.obtenerEventos();
  }

  public obtenerEventos(){
    const idUsuario = this.tokenService.getAllTokenData().id;

    this.clienteService.listarProductosEnCarrito(idUsuario).subscribe({
      next: (data) => {
        this.items = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  eliminarItem(nombreLocalidad: string): void {
    const idUsuario = this.tokenService.getAllTokenData().id;
  
    // Mostrar Swal antes de llamar al backend
    Swal.fire({
      title: '¿Eliminar elemento del carrito?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Si confirma, realiza el llamado al backend
        this.clienteService.eliminarItemDelCarrito(idUsuario, nombreLocalidad).subscribe({
          next: (data) => {
            Swal.fire("Elemento eliminado!", "", "success");
            // Opcional: refrescar la lista del carrito
            this.obtenerEventos();
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el ítem del carrito',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Cancelado", "", "info");
      }
    });
  }
  
}
