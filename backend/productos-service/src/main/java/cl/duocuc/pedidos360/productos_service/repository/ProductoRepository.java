package cl.duocuc.pedidos360.productos_service.repository;

import cl.duocuc.pedidos360.productos_service.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}