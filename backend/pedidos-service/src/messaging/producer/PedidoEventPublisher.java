package cl.duocuc.pedidos360.pedidos_service.messaging.producer;

import cl.duocuc.pedidos360.pedidos_service.config.RabbitMQProperties;
import cl.duocuc.pedidos360.pedidos_service.messaging.event.PedidoCreadoEvent;
import cl.duocuc.pedidos360.pedidos_service.model.Pedido;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class PedidoEventPublisher {

    private static final Logger log = LoggerFactory.getLogger(PedidoEventPublisher.class);

    private final RabbitTemplate rabbitTemplate;
    private final RabbitMQProperties props;

    public PedidoEventPublisher(RabbitTemplate rabbitTemplate, RabbitMQProperties props) {
        this.rabbitTemplate = rabbitTemplate;
        this.props = props;
    }

    public void publicarPedidoCreado(Pedido pedido) {
        PedidoCreadoEvent evento = new PedidoCreadoEvent(
                pedido.getId(), pedido.getCliente(), pedido.getProducto(),
                pedido.getCantidad(), pedido.getEstado(),
                pedido.getFecha() != null ? pedido.getFecha().toString() : null);
        try {
            rabbitTemplate.convertAndSend(props.pedidosExchange(), props.routingKeyPedidoCreado(), evento);
            log.info("Evento pedido.creado publicado: pedidoId={}", pedido.getId());
        } catch (Exception e) {
            // Si RabbitMQ cae, el pedido igual se guarda (no afecta la logica existente)
            log.error("No se pudo publicar el evento del pedido {}: {}", pedido.getId(), e.getMessage());
        }
    }
}