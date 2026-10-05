package cl.duocuc.pedidos360.pedidos_service.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.rabbitmq")
public record RabbitMQProperties(
        String pedidosExchange,
        String routingKeyPedidoCreado) {
}