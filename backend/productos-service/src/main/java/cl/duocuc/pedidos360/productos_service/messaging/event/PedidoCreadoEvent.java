package cl.duocuc.pedidos360.productos_service.messaging.event;

public record PedidoCreadoEvent(Long pedidoId, String cliente, String producto,
                                Integer cantidad, String estado, String fecha) {
}