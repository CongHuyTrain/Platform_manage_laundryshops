package main.laundryshop.service;

import main.laundryshop.models.Order;
import main.laundryshop.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, Order order) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        existingOrder.setCustomerId(order.getCustomerId());
        existingOrder.setService(order.getService());
        existingOrder.setReceiveDate(order.getReceiveDate());
        existingOrder.setDeliveryDate(order.getDeliveryDate());
        existingOrder.setTotal(order.getTotal());
        existingOrder.setStatus(order.getStatus());
        existingOrder.setNote(order.getNote());
        return orderRepository.save(existingOrder);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}