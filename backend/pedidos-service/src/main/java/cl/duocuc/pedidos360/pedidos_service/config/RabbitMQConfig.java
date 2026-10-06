package cl.duocuc.pedidos360.pedidos_service.config;

import org.springframework.amqp.core.TopicExchange;
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
    public TopicExchange pedidosExchange() {
        return new TopicExchange(props.pedidosExchange(), true, false);
    }

    /** Abre una conexion al iniciar para que Spring cree el exchange de inmediato. */
    @Bean
    public ApplicationRunner declararTopologiaAlIniciar(ConnectionFactory connectionFactory) {
        return args -> connectionFactory.createConnection().close();
    }
}