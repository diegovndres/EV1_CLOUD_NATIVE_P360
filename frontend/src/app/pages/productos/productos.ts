import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductosService } from '../../services/productos';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
  productos: any[] = [];

  private productosService = inject(ProductosService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.productosService.listar().subscribe({
      next: (data) => {
        this.productos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener los productos:', err)
    });
  }
}
