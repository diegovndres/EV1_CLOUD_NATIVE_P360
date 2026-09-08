package cl.duocuc.pedidos360.notificaciones_service.repository;

import cl.duocuc.pedidos360.notificaciones_service.model.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
}