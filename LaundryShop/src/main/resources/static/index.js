document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const sections = document.querySelectorAll('.section');

    //let TOKEN = localStorage.getItem('token') || null;
    //let TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlIjoiIiwiaXNzIjoiZGV3dGVyaWEuY29tIiwiZXhwIjoxNzQ2ODY4MTc5LCJpYXQiOjE3NDQyNzYxNzl9.84ZqWsIaQ71A6bFxZU1iXjaPf-cO0AOrxrXfX8vxOKdW8tYPnjTL66BjtDEunifYfgzBx_77g-jR21obBv5Jkw';


    // Đăng nhập
    // async function login() {
    //     const username = prompt('Nhập username:');
    //     const password = prompt('Nhập password:');
    //     const data = { username, password };
    //     const response = await fetchData('/auth/token', 'POST', data);
    //     TOKEN = response.token;
    //     localStorage.setItem('token', TOKEN);
    //     alert('Đăng nhập thành công!');
    //     loadDashboard();
    // }
    // Tải dữ liệu dashboard
    async function loadDashboard() {
        await loadOrders();
        await loadCustomers();
        await loadServices();
        createCharts();
    }

    sidebarItems.forEach(item => {
        item.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');

            // Update active sidebar item
            sidebarItems.forEach(el => el.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Khởi động
    loadDashboard();

    // Create charts
    //createCharts();
});

// Khai báo URL cục bộ
const BASE_URL = 'http://localhost:8080'; // URL backend

// Hàm gọi API chung
async function fetchData(endpoint, method = 'GET', data = null) {
    try {
        const config = {
            method: method,
            url: `${BASE_URL}${endpoint}`,
            headers: {
                //'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        };
        //if (TOKEN) config.headers['Authorization'] = `Bearer ${TOKEN}`;
        if (data) config.data = data;
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        alert(`Lỗi: ${error.response?.data?.message || error.message}`);
        throw error;
    }
}

// Tải danh sách đơn hàng
async function loadOrders() {
    const orders = await fetchData('/orders');
    //console.log('Orders:', orders); // Kiểm tra dữ liệu trả về

    // Ánh xạ trạng thái
    const statusMap = {
        'Đang chờ': 'pending',
        'Đang xử lý': 'processing',
        'Hoàn thành': 'completed',
        'Đã giao': 'delivered',
        'Đã hủy': 'cancelled',
        'PENDING': 'pending',
        'PROCESSING': 'processing',
        'COMPLETED': 'completed',
        'DELIVERED': 'delivered',
        'CANCELLED': 'cancelled'
    };

    const tbody = document.querySelector('#allOrders tbody');
    tbody.innerHTML = orders.map(order => {
        const statusClass = statusMap[order.status] || order.status.toLowerCase();
        return `
            <tr>
                <td>${order.orderId }</td>
                <td>${order.customerId}</td>
                <td>${order.service }</td>
                <td>${order.receiveDate}</td>
                <td>${order.deliveryDate}</td>
                <td>${order.total.toLocaleString()}đ</td>
                <td><span class="status-badge status-${statusClass}">${order.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-outline-warning"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

// Tải danh sách khách hàng
async function loadCustomers() {
    const customers = await fetchData('/customers');
    const tbody = document.querySelector('#customers tbody');
    tbody.innerHTML = customers.map(customer => `
            <tr>
                <td>${customer.customerId}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.email}</td>
                <td>${customer.address}</td>
                <td>${customer.orderCount}</td>
                <td><span class="badge bg-${customer.type === 'VIP' ? 'primary' : customer.type === 'Thân thiết' ? 'info' : 'secondary'}">${customer.type}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-outline-warning"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
}

// Tải danh sách dịch vụ
async function loadServices() {
    const services = await fetchData('/services');
    const container = document.querySelector('#services .card-body');
    container.innerHTML = services.map(service => `
            <div class="service-item">
                <div class="service-icon"><i class="fas ${service.icon} fa-lg"></i></div>
                <div class="service-info">
                    <h5>${service.name}</h5>
                    <p>${service.description}</p>
                </div>
                <div class="service-price">${service.price.toLocaleString()}đ/${service.unit}</div>
                <div class="ms-3">
                    <button class="btn btn-sm btn-outline-warning"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
}

// Thêm khách hàng
document.querySelector('#newCustomerModal .btn-custom').addEventListener('click', async () => {
    try {
        const customer = {
            customerId: `#CUS${Math.floor(Math.random() * 1000)}`,
            name: document.querySelector('#customerName').value,
            phone: document.querySelector('#customerPhone').value,
            email: document.querySelector('#customerEmail').value,
            address: document.querySelector('#customerAddress').value,
            orderCount: 0,
            type: document.querySelector('#customerType').value,
            note: document.querySelector('#customerNote').value
        };
        await fetchData('/customers', 'POST', customer);
        loadCustomers();
        bootstrap.Modal.getInstance(document.querySelector('#newCustomerModal')).hide();
    } catch (error) {
        console.error('Lỗi khi thêm khách hàng:', error);
    }
});

// Thêm dịch vụ
document.addEventListener('DOMContentLoaded', function () {
    const addServiceButton = document.querySelector('#newServiceModal .btn-custom');
    if (addServiceButton) {
        addServiceButton.addEventListener('click', async () => {
            const modalElement = document.querySelector('#newServiceModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            console.log('Modal instance:', modalInstance);

            try {
                const service = {
                    name: document.querySelector('#serviceName')?.value || '',
                    description: document.querySelector('#serviceDescription')?.value || '',
                    price: parseFloat(document.querySelector('#servicePrice')?.value) || 0,
                    unit: document.querySelector('#serviceUnit')?.value || '',
                    icon: document.querySelector('#serviceIcon')?.value || ''
                };
                console.log('Service data:', service);
                await fetchData('/services', 'POST', service);
                loadServices();
            } catch (error) {
                console.error('Lỗi khi thêm dịch vụ:', error);
            } finally {
                if (modalInstance) {
                    modalInstance.hide();
                } else {
                    console.error('Không thể khởi tạo modal instance');
                }
            }
        });
    } else {
        console.error('Không tìm thấy nút .btn-custom trong #newServiceModal');
    }
});

// Thêm đơn hàng
document.querySelector('#newOrderModal .btn-custom').addEventListener('click', async () => {
    const order = {
        customerId: document.querySelector('#customerSelect').value,
        receiveDate: document.querySelector('#orderDate').value,
        deliveryDate: document.querySelector('#deliveryDate').value,
        status: document.querySelector('#orderStatus').value,
        total: parseFloat(document.querySelector('#totalAmount').value.replace('đ', '').replace(/\./g, '')),
        note: document.querySelector('#orderNote').value
        // Thêm logic để lấy danh sách dịch vụ từ bảng trong modal nếu cần
    };
    await fetchData('/orders', 'POST', order);
    loadOrders();
    bootstrap.Modal.getInstance(document.querySelector('#newOrderModal')).hide();
});

// Khởi động
//if (!TOKEN) login();
//else loadDashboard();


function createCharts() {
    // Revenue Chart
    const revenueChartCtx = document.getElementById('revenueChart');
    if (revenueChartCtx) {
        new Chart(revenueChartCtx, {
            type: 'bar',
            data: {
                labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
                datasets: [{
                    label: 'Doanh thu (triệu VND)',
                    data: [6.5, 5.9, 8.0, 7.2, 7.8, 8.5],
                    backgroundColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Services Chart
    const servicesChartCtx = document.getElementById('servicesChart');
    if (servicesChartCtx) {
        new Chart(servicesChartCtx, {
            type: 'pie',
            data: {
                labels: ['Giặt ủi thường', 'Giặt khô', 'Giặt ủi cao cấp', 'Giặt thảm', 'Khác'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#9b59b6',
                        '#f39c12',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Popular Services Chart
    const popularServicesChartCtx = document.getElementById('popularServicesChart');
    if (popularServicesChartCtx) {
        new Chart(popularServicesChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Giặt ủi thường', 'Giặt khô', 'Cao cấp', 'Thảm', 'Gấp'],
                datasets: [{
                    data: [40, 20, 15, 15, 10],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#9b59b6',
                        '#f39c12',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Revenue Time Chart
    const revenueTimeChartCtx = document.getElementById('revenueTimeChart');
    if (revenueTimeChartCtx) {
        new Chart(revenueTimeChartCtx, {
            type: 'line',
            data: {
                labels: ['T10/24', 'T11/24', 'T12/24', 'T1/25', 'T2/25', 'T3/25'],
                datasets: [{
                    label: 'Doanh thu (triệu VND)',
                    data: [6.2, 7.1, 8.5, 6.5, 7.8, 8.5],
                    fill: false,
                    borderColor: '#3498db',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Revenue Pie Chart
    const revenuePieChartCtx = document.getElementById('revenuePieChart');
    if (revenuePieChartCtx) {
        new Chart(revenuePieChartCtx, {
            type: 'pie',
            data: {
                labels: ['Giặt ủi thường', 'Giặt khô', 'Cao cấp', 'Thảm', 'Gấp'],
                datasets: [{
                    data: [35, 25, 20, 10, 10],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#9b59b6',
                        '#f39c12',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Order Status Chart
    const orderStatusChartCtx = document.getElementById('orderStatusChart');
    if (orderStatusChartCtx) {
        new Chart(orderStatusChartCtx, {
            type: 'bar',
            data: {
                labels: ['Đang chờ', 'Đang xử lý', 'Hoàn thành', 'Đã giao', 'Đã hủy'],
                datasets: [{
                    label: 'Số lượng đơn hàng',
                    data: [12, 19, 15, 75, 7],
                    backgroundColor: [
                        '#f39c12',
                        '#3498db',
                        '#2ecc71',
                        '#27ae60',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Customer Type Chart
    const customerTypeChartCtx = document.getElementById('customerTypeChart');
    if (customerTypeChartCtx) {
        new Chart(customerTypeChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Khách hàng mới', 'Khách hàng cũ'],
                datasets: [{
                    data: [35, 65],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}