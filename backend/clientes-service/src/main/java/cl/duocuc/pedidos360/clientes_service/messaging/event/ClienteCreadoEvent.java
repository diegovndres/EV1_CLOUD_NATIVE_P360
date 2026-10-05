package cl.duocuc.pedidos360.clientes_service.messaging.event;

public record ClienteCreadoEvent(Long clienteId, String nombre, String email) {
}