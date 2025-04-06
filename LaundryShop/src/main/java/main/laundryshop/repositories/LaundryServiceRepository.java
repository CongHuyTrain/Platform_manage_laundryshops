package main.laundryshop.repositories;

import main.laundryshop.models.LaundryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaundryServiceRepository extends JpaRepository<LaundryService, Long> {
}
