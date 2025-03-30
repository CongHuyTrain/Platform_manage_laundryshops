public class Giat_Ui {

    private Long id;
    private String customerName;
    private String serviceType;  // Ví dụ: "Giặt", "Sấy", "Giặt + Sấy"
    private String status;       // Ví dụ: "Đang xử lý", "Hoàn thành", "Đã hủy"

    // Constructor mặc định và Constructor có tham số

    public Giat_Ui (String customerName, String serviceType, String status) {
        this.customerName = customerName;
        this.serviceType = serviceType;
        this.status = status;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}