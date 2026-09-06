package cl.duocuc.pedidos360.pedidos_service.repository;

import cl.duocuc.pedidos360.pedidos_service.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}