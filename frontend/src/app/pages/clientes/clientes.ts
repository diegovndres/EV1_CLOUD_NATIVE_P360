import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit {
  clientes: any[] = [];

  private clientesService = inject(ClientesService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.clientesService.listar().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener los clientes:', err)
    });
  }
}
