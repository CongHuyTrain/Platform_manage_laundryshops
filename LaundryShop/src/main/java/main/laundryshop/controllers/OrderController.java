package main.laundryshop.controllers;

import main.laundryshop.models.Order;
import main.laundryshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders(@RequestParam(required = false) String status) {
        if (status != null) {
            return orderService.getOrdersByStatus(status);
        }
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable UUID id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable UUID id, @RequestBody Order order) {
        return orderService.updateOrder(id, order);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable UUID id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}