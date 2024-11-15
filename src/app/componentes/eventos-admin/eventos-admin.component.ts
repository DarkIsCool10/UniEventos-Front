import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-eventos-admin',
    standalone: true,
    imports: [RouterModule, CommonModule, NavbarAdminComponent, NgxPaginationModule],
    templateUrl: './eventos-admin.component.html',
    styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {
    availablePage: number = 1;   // Página de eventos disponibles
    unavailablePage: number = 1; // Página de eventos no disponibles

    availableEvents = [
        { id: 1, title: 'Concierto en Vivo', type: 'Música', location: 'Madrid', date: '2024-11-15', image: 'concierto.jpg' },
        { id: 2, title: 'Teatro Musical', type: 'Teatro', location: 'Barcelona', date: '2024-11-18', image: 'teatro.jpg' },
        { id: 3, title: 'Festival de Cine', type: 'Cine', location: 'Valencia', date: '2024-12-01', image: 'cine.jpg' },
        { id: 4, title: 'Exposición de Arte', type: 'Arte', location: 'Sevilla', date: '2024-12-10', image: 'arte.jpg' },
        { id: 5, title: 'Concierto de Jazz', type: 'Música', location: 'Madrid', date: '2024-11-25', image: 'jazz.jpg' },
        { id: 6, title: 'Teatro en Vivo', type: 'Teatro', location: 'Valencia', date: '2024-12-05', image: 'teatro2.jpg' },
        { id: 7, title: 'Teatro en Vivo', type: 'Teatro', location: 'Barcelona', date: '2024-12-05', image: 'concierto.jpg' },
        { id: 8, title: 'Teatro en Vivo', type: 'Teatro', location: 'Valencia', date: '2024-12-05', image: 'concierto.jpg' }
    ];

    unavailableEvents = [
        { id: 7, title: 'Festival de Música', type: 'Música', location: 'Barcelona', date: '2024-12-15', image: 'festival.jpg' },
        { id: 8, title: 'Concierto de Rock', type: 'Música', location: 'Sevilla', date: '2024-12-20', image: 'rock.jpg' }
    ];

    constructor() { }

    ngOnInit(): void {}

    // Métodos de paginación para eventos disponibles
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
        return Math.ceil(this.availableEvents.length / 5);
    }

    // Métodos de paginación para eventos no disponibles
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
        return Math.ceil(this.unavailableEvents.length / 5);
    }
}
