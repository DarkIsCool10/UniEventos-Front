import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { Evento } from '../../models/Evento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-evento-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-evento-admin.component.html',
  styleUrls: ['./info-evento-admin.component.css']
})
export class InfoEventoAdminComponent implements OnInit {
  evento: Evento= {
    id: '',
    imagenPortada: '',
    imagenLocalidad: '',
    nombre: '', 
    descripcion: '',
    direccion: '',
    ciudad: '',
    fecha: new Date,
    tipoEvento: '',
    estado: '',
    listaLocalidades: [],
  }

  constructor(
    private route: ActivatedRoute,
    private publicoService: PublicoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerEvento(id);
    } else {
      console.error('ID del evento no encontrado en la ruta');
    }
  }


  obtenerEvento(id: string): void {
    this.publicoService.obtenerInfoEvento(id).subscribe({
      next: (data) => {
        this.evento = data.respuesta
      },
      error: (error) => {
        console.error(error);
      }
    })

  }
  

  editEvent(): void {
    // Redirige a la ruta de edición (ajusta la ruta según tu configuración de rutas)
    const eventId = this.evento?.id;
    if (eventId) {
      // Suponiendo que tienes una ruta configurada para editar un evento
      window.location.href = `/editar-evento`;
    }
  }
  
  goBack(): void {
    window.history.back(); // Regresa a la página anterior
  }


}
