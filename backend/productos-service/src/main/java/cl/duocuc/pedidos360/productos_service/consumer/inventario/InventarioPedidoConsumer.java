package cl.duocuc.pedidos360.productos_service.consumer.inventario;

import cl.duocuc.pedidos360.productos_service.messaging.MensajeNoProcesableException;
import cl.duocuc.pedidos360.productos_service.messaging.MensajeriaSupport;
import cl.duocuc.pedidos360.productos_service.messaging.event.PedidoCreadoEvent;
import cl.duocuc.pedidos360.productos_service.service.InventarioService;
import com.rabbitmq.client.Channel;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
public class InventarioPedidoConsumer {

    private final InventarioService inventarioService;
    private final MensajeriaSupport support;

    public InventarioPedidoConsumer(InventarioService inventarioService, MensajeriaSupport support) {
        this.inventarioService = inventarioService;
        this.support = support;
    }

    @RabbitListener(queues = "${app.rabbitmq.queue-inventario-pedido}")
    public void onPedidoCreado(PedidoCreadoEvent evento,
                               Channel channel,
                               @Header(AmqpHeaders.DELIVERY_TAG) long tag,
                               @Header(AmqpHeaders.CONSUMER_QUEUE) String queue,
                               @Header(name = MensajeriaSupport.HEADER_RETRY, required = false, defaultValue = "0") int retries) {
        support.procesar(channel, tag, queue, retries, evento, "INVENTARIO", () -> {
            if (evento == null || evento.pedidoId() == null) {
                throw new MensajeNoProcesableException("Evento de pedido invalido");
            }
            inventarioService.descontarStock(evento.producto(), evento.cantidad());
        });
    }
}