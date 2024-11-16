import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FiltroEventoDTO } from '../../dto/evento/filtro-evento-dto';
import Swal from 'sweetalert2';
import { PublicoService } from '../../servicios/publico.service';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private publicoService:PublicoService) {
    this.crearFormulario();
  }

  // Crear el formulario reactivo
  private crearFormulario() {
    this.searchForm = this.formBuilder.group(
    {
      nombre: [''],
      tipo: [null],
      ciudad: [''],
      fecha: [null]
    });
  }

  // Método para realizar la búsqueda
  public buscarEventos() {

    const filtroEventoDTO: FiltroEventoDTO = this.searchForm.value;

    // Verificar que al menos un campo esté lleno
    if (!this.alMenosUnCampoLleno(filtroEventoDTO)) {
      Swal.fire({
        title: 'Error',
        text: 'Debe llenar al menos un campo para realizar la búsqueda.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.publicoService.filtrarEventos(filtroEventoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Resultados encontrados',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error?.respuesta || 'Ocurrió un error al buscar eventos.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  // Método para verificar que al menos un campo esté lleno
  private alMenosUnCampoLleno(filtro: FiltroEventoDTO): boolean {
    return Object.values(filtro).some(value => value !== null && value !== '');
  }

}