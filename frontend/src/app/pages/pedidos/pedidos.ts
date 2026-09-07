import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { PedidosService } from '../../services/pedidos';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  pedidos: any[] = [];

  // Reemplazamos el constructor por la función inject()
  private pedidosService = inject(PedidosService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.pedidosService.listar().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cdr.detectChanges(); // Obliga a Angular a dibujar la tabla con los datos
      },
      error: (err) => console.error('Error al obtener los datos:', err)
    });
  }
}