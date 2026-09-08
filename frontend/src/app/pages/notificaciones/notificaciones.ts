import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NotificacionesService } from '../../services/notificaciones';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css',
})
export class Notificaciones implements OnInit {
  notificaciones: any[] = [];

  private notificacionesService = inject(NotificacionesService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.notificacionesService.listar().subscribe({
      next: (data) => {
        this.notificaciones = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener las notificaciones:', err)
    });
  }
}
