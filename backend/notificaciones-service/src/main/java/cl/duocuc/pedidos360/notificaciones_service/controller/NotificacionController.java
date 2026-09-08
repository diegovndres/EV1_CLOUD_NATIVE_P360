package cl.duocuc.pedidos360.notificaciones_service.controller;

import cl.duocuc.pedidos360.notificaciones_service.model.Notificacion;
import cl.duocuc.pedidos360.notificaciones_service.repository.NotificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    @Autowired
    private NotificacionRepository notificacionRepository;

    @GetMapping
    public List<Notificacion> listar() {
        return notificacionRepository.findAll();
    }

    @PostMapping
    public Notificacion crear(@RequestBody Notificacion notificacion) {
        return notificacionRepository.save(notificacion);
    }
}