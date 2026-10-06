package cl.duocuc.pedidos360.productos_service.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.rabbitmq")
public record RabbitMQProperties(
        int maxRetries,
        String dlxExchange,
        String pedidosExchange,
        String routingKeyPedidoCreado,
        String queueInventarioPedido,
        String queueInventarioPedidoDlq) {
}