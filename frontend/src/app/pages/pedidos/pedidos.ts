import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PedidosService } from '../../services/pedidos';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  pedidos: any[] = [];

  private pedidosService = inject(PedidosService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.pedidosService.listar().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener los datos:', err)
    });
  }
}
