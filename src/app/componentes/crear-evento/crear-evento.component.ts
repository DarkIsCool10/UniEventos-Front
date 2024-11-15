import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrearEventoDTO } from '../../dto/evento/crear-evento-dto';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';
import { TipoEvento } from '../../enums/TipoEvento';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {

  crearEventoForm!: FormGroup; 
  tiposDeEvento: string[] = [];
  
  constructor(private formBuilder: FormBuilder, private administradorService: AdministradorService) {
    this.crearFormulario();
    this.tiposDeEvento = Object.values(TipoEvento);
  }

  private crearFormulario(): void {
    this.crearEventoForm = this.formBuilder.group({
      nombreEvento: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],  
      tipo: ['', [Validators.required]],
      direccionEvento: ['', [Validators.required]],
      ciudadEvento: ['', [Validators.required]],
      localidades: this.formBuilder.array([]),
      imagenPortada: ['', [Validators.required]],
      imagenLocalidades: ['', [Validators.required]]
    });
  }

  get localidades() {
    return (this.crearEventoForm.get('localidades') as FormArray);
  }

  // Método para agregar una localidad al array
  addLocalidad() {
    const localidadGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(1)]],
      capacidad: ['', [Validators.required]]
    });
    this.localidades.push(localidadGroup);
  }

  // Método para eliminar una localidad del array
  removeLocalidad(index: number) {
    this.localidades.removeAt(index);
  }

  public onFileChange(event: any, tipo: string) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      switch (tipo) {
        case 'localidades':
          this.crearEventoForm.get('imagenLocalidades')?.setValue(files[0]);
          break;
        case 'portada':
          this.crearEventoForm.get('imagenPortada')?.setValue(files[0]);
          break;
      }
    }
  }

   crearEvento(): void {
    if (this.crearEventoForm.valid) {
      const eventoData: CrearEventoDTO = this.crearEventoForm.value;
      this.administradorService.crearEvento(eventoData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Evento creado con éxito',
            text: 'El evento ha sido creado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.crearEventoForm.reset();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error al crear evento',
          text: 'Ha ocurrido un error al crear el evento',
          icon: 'error',
          confirmButtonText: 'Aceptar'
      });
    } 
    });
    } else {
      this.crearEventoForm.markAllAsTouched();
    }
  }
} 