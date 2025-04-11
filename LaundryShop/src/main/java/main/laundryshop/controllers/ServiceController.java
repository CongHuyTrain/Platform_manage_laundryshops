package main.laundryshop.controllers;

import main.laundryshop.models.LaundryService;
import main.laundryshop.service.LaundryServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/services")
public class ServiceController {
    @Autowired
    private LaundryServiceService serviceService;

    @GetMapping
    public List<LaundryService> getAllServices() {
        return serviceService.getAllServices();
    }

    @PostMapping
    public LaundryService createService(@RequestBody LaundryService service) {
        return serviceService.createService(service);
    }

    @PutMapping("/{id}")
    public LaundryService updateService(@PathVariable UUID id, @RequestBody LaundryService service) {
        return serviceService.updateService(id, service);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable UUID id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
