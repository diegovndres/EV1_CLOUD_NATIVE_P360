import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos';

@Component({
  selector: 'app-pedidos',
  imports: [],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.pedidosService.listar().subscribe(data => this.pedidos = data);
  }
}