package cl.duocuc.pedidos360.notificaciones_service.messaging.event;

public record ClienteCreadoEvent(Long clienteId, String nombre, String email) {
}