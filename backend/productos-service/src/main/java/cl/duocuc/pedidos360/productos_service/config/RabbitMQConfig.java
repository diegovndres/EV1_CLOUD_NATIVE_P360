package cl.duocuc.pedidos360.productos_service.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(RabbitMQProperties.class)
public class RabbitMQConfig {

    private final RabbitMQProperties props;

    public RabbitMQConfig(RabbitMQProperties props) {
        this.props = props;
    }

    @Bean
    public MessageConverter messageConverter() {
        return new JacksonJsonMessageConverter();
    }

    @Bean
    public ApplicationRunner declararTopologiaAlIniciar(ConnectionFactory connectionFactory) {
        return args -> connectionFactory.createConnection().close();
    }

    @Bean
    public TopicExchange pedidosExchange() {
        return new TopicExchange(props.pedidosExchange(), true, false);
    }

    @Bean
    public DirectExchange deadLetterExchange() {
        return new DirectExchange(props.dlxExchange(), true, false);
    }

    @Bean
    public Queue inventarioPedidoQueue() {
        return QueueBuilder.durable(props.queueInventarioPedido())
                .deadLetterExchange(props.dlxExchange())
                .deadLetterRoutingKey(props.queueInventarioPedidoDlq())
                .build();
    }

    @Bean
    public Queue inventarioPedidoDlq() {
        return QueueBuilder.durable(props.queueInventarioPedidoDlq()).build();
    }

    @Bean
    public Binding inventarioPedidoBinding() {
        return BindingBuilder.bind(inventarioPedidoQueue()).to(pedidosExchange()).with(props.routingKeyPedidoCreado());
    }

    @Bean
    public Binding inventarioPedidoDlqBinding() {
        return BindingBuilder.bind(inventarioPedidoDlq()).to(deadLetterExchange()).with(props.queueInventarioPedidoDlq());
    }
}