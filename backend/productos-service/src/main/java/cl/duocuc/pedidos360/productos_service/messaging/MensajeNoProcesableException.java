package cl.duocuc.pedidos360.productos_service.messaging;

/** Error NO recuperable: el mensaje va directo a la DLQ (reintentar no sirve). */
public class MensajeNoProcesableException extends RuntimeException {
    public MensajeNoProcesableException(String message) {
        super(message);
    }
}