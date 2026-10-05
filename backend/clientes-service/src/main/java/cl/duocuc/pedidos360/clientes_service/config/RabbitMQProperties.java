package cl.duocuc.pedidos360.clientes_service.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.rabbitmq")
public record RabbitMQProperties(
        String clientesExchange,
        String routingKeyClienteCreado) {
}