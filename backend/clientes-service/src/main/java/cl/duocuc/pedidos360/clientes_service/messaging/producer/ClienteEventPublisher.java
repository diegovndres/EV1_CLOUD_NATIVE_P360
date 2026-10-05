package cl.duocuc.pedidos360.clientes_service.messaging.producer;

import cl.duocuc.pedidos360.clientes_service.config.RabbitMQProperties;
import cl.duocuc.pedidos360.clientes_service.messaging.event.ClienteCreadoEvent;
import cl.duocuc.pedidos360.clientes_service.model.Cliente;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class ClienteEventPublisher {

    private static final Logger log = LoggerFactory.getLogger(ClienteEventPublisher.class);

    private final RabbitTemplate rabbitTemplate;
    private final RabbitMQProperties props;

    public ClienteEventPublisher(RabbitTemplate rabbitTemplate, RabbitMQProperties props) {
        this.rabbitTemplate = rabbitTemplate;
        this.props = props;
    }

    public void publicarClienteCreado(Cliente cliente) {
        ClienteCreadoEvent evento = new ClienteCreadoEvent(cliente.getId(), cliente.getNombre(), cliente.getEmail());
        try {
            rabbitTemplate.convertAndSend(props.clientesExchange(), props.routingKeyClienteCreado(), evento);
            log.info("Evento cliente.creado publicado: clienteId={}", cliente.getId());
        } catch (Exception e) {
            log.error("No se pudo publicar el evento del cliente {}: {}", cliente.getId(), e.getMessage());
        }
    }
}