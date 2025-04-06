    package main.laundryshop.service;

    import main.laundryshop.models.LaundryService;
    import main.laundryshop.repositories.LaundryServiceRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class LaundryServiceService {
        @Autowired
        private LaundryServiceRepository laundryServiceRepository;

        public List<LaundryService> getAllServices() {
            return laundryServiceRepository.findAll();
        }

        public LaundryService createService(LaundryService service) {
            return laundryServiceRepository.save(service);
        }

        public LaundryService updateService(Long id, LaundryService laundryService) {
            LaundryService service = laundryServiceRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Service not found"));
            service.setName(laundryService.getName());
            service.setDescription(laundryService.getDescription());
            service.setPrice(laundryService.getPrice());
            service.setUnit(laundryService.getUnit());
            service.setIcon(laundryService.getIcon());
            service.setActive(laundryService.isActive());
            return laundryServiceRepository.save(service);
        }

        public void deleteService(Long id) {
            laundryServiceRepository.deleteById(id);
        }
    }