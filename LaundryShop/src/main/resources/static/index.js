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
        await loadServiceOptions();
        createCharts();
    }

    // Gắn sự kiện cho các input trong bảng
    const serviceSelects = document.querySelectorAll('.service-type');
    const quantityInputs = document.querySelectorAll('.service-quantity');
    const discountInput = document.querySelector('#discount');

    serviceSelects.forEach(select => {
        select.addEventListener('change', calculatePrices);
    });
    quantityInputs.forEach(input => {
        input.addEventListener('input', calculatePrices);
    });
    discountInput.addEventListener('input', calculatePrices);


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

// DON HANG =====================================================================

// Hàm toàn cục: Xem chi tiết đơn hàng
async function handleViewOrder(orderId) {
    try {
        const order = await fetchData(`/orders/${orderId}`);
        console.log('Order detail:', order);

        document.querySelector('#viewOrderId').value = order.orderId || 'N/A';
        document.querySelector('#viewCustomerId').value = order.customerId;
        document.querySelector('#viewReceiveDate').value = order.receiveDate;
        document.querySelector('#viewDeliveryDate').value = order.deliveryDate;
        document.querySelector('#viewService').value = order.service || 'N/A';
        document.querySelector('#viewStatus').value = order.status;
        document.querySelector('#viewTotal').value = order.total.toLocaleString() + 'đ';
        document.querySelector('#viewNote').value = order.note || '';

        const modal = new bootstrap.Modal(document.querySelector('#viewOrderModal'));
        modal.show();
    } catch (error) {
        console.error('Lỗi khi xem chi tiết đơn hàng:', error);
        alert('Không thể tải chi tiết đơn hàng: ' + error.message);
    }
}

// Hàm toàn cục: Chỉnh sửa đơn hàng
async function handleEditOrder(orderId) {
    try {
        const order = await fetchData(`/orders/${orderId}`);
        console.log('Order to edit:', order);

        document.querySelector('#customerSelect').value = order.customerId;
        document.querySelector('#orderDate').value = order.receiveDate;
        document.querySelector('#deliveryDate').value = order.deliveryDate;
        document.querySelector('#orderStatus').value = order.status;
        document.querySelector('#totalAmount').value = order.total.toLocaleString() + 'đ';
        document.querySelector('#orderNote').value = order.note || '';

        const modalElement = document.querySelector('#newOrderModal');
        modalElement.setAttribute('data-order-id', orderId);
        document.querySelector('#newOrderModal .modal-title').textContent = 'Chỉnh sửa đơn hàng';
        document.querySelector('#newOrderModal .btn-custom').textContent = 'Lưu thay đổi';

        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } catch (error) {
        console.error('Lỗi khi tải đơn hàng để chỉnh sửa:', error);
        alert('Không thể tải đơn hàng để chỉnh sửa: ' + error.message);
    }
}

// Hàm toàn cục: Xóa đơn hàng
async function handleDeleteOrder(orderId) {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
        try {
            await fetchData(`/orders/${orderId}`, 'DELETE');
            alert('Xóa đơn hàng thành công!');
            loadOrders();
        } catch (error) {
            console.error('Lỗi khi xóa đơn hàng:', error);
            alert('Không thể xóa đơn hàng: ' + error.message);
        }
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
    tbody.innerHTML = orders.map(order => `
            <tr data-order-id="${order.id}">
                <td>${order.orderId || 'N/A'}</td>
                <td>${order.customerId || ''}</td>
                <td>${order.service || 'N/A'}</td>
                <td>${order.receiveDate || ''}</td>
                <td>${order.deliveryDate || ''}</td>
                <td>${order.total ? order.total.toLocaleString() + 'đ' : '0đ'}</td>
                <td><span class="status-badge status-${statusMap[order.status] || order.status?.toLowerCase()}">${order.status || ''}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary btn-view-order" data-order-id="${order.id}"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-outline-warning btn-edit-order" data-order-id="${order.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger btn-delete-order" data-order-id="${order.id}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    // Gắn sự kiện cho các nút
    document.querySelectorAll('.btn-view-order').forEach(button => {
        button.addEventListener('click', () => handleViewOrder(button.getAttribute('data-order-id')));
    });
    document.querySelectorAll('.btn-edit-order').forEach(button => {
        button.addEventListener('click', () => handleEditOrder(button.getAttribute('data-order-id')));
    });
    document.querySelectorAll('.btn-delete-order').forEach(button => {
        button.addEventListener('click', () => handleDeleteOrder(button.getAttribute('data-order-id')));
    });
}

// Thêm đơn hàng
document.addEventListener('DOMContentLoaded', function () {
    const addOrderButton = document.querySelector('#newOrderModal .btn-custom');
    if (addOrderButton) {
        addOrderButton.addEventListener('click', async () => {
            const modalElement = document.querySelector('#newOrderModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            const orderId = modalElement.getAttribute('data-order-id');

            try {
                const order = {
                    orderId:`#ORD${Math.floor(Math.random() * 1000)}`,
                    customerId: document.querySelector('#customerSelect')?.value || '',
                    service: document.querySelector('#serviceType')?.value || '',
                    receiveDate: document.querySelector('#orderDate')?.value || '',
                    deliveryDate: document.querySelector('#deliveryDate')?.value || '',
                    status: document.querySelector('#orderStatus')?.value || '',
                    total: parseFloat(document.querySelector('#totalAmount')?.value.replace('đ', '').replace(/\./g, '')) || 0,
                    note: document.querySelector('#orderNote')?.value || ''
                };
                console.log('Order data:', order);

                if (orderId) {
                    await fetchData(`/orders/${orderId}`, 'PUT', order);
                    alert('Cập nhật đơn hàng thành công!');
                } else {
                    await fetchData('/orders', 'POST', order);
                    alert('Tạo đơn hàng thành công!');
                }
                loadOrders();
            } catch (error) {
                console.error('Lỗi khi xử lý đơn hàng:', error);
                alert('Lỗi: ' + error.message);
            } finally {
                if (modalInstance) {
                    modalInstance.hide();
                    document.querySelector('#newOrderModal .modal-title').textContent = 'Tạo đơn hàng mới';
                    document.querySelector('#newOrderModal .btn-custom').textContent = 'Tạo đơn hàng';
                    modalElement.removeAttribute('data-order-id');
                }
            }
        });
    }
});

// Tải danh sách dịch vụ vào dropdown
async function loadServiceOptions() {
    try {
        const services = await fetchData('/services');
        console.log('Danh sách dịch vụ cho dropdown:', services);

        // Lưu danh sách dịch vụ vào một biến toàn cục để sử dụng sau
        window.servicesList = services;

        const serviceSelects = document.querySelectorAll('.service-type');
        serviceSelects.forEach(select => {
            select.innerHTML = '<option value="">-- Chọn dịch vụ --</option>';
            services.forEach(service => {
                const option = document.createElement('option');
                option.value = service.name;
                option.textContent = `${service.name} (${service.price.toLocaleString()}đ/${service.unit})`;
                select.appendChild(option);
            });
        });
    } catch (error) {
        console.error('Lỗi khi tải danh sách dịch vụ cho dropdown:', error);
    }
}

// Hàm tính toán giá
function calculatePrices() {
    const serviceRows = document.querySelectorAll('.service-row');
    const subtotalInput = document.querySelector('#subTotal');
    const taxInput = document.querySelector('#taxAmount');
    const discountInput = document.querySelector('#discount');
    const totalAmountInput = document.querySelector('#totalAmount');

    let subtotal = 0;
    let tax = 0;
    let discount = parseFloat(discountInput.value.replace('đ', '').replace(/\./g, '')) || 0;
    let total = 0;

    serviceRows.forEach(row => {
        const serviceSelect = row.querySelector('.service-type');
        const quantityInput = row.querySelector('.service-quantity');
        const unitPriceInput = row.querySelector('.service-unit-price');

        const selectedServiceName = serviceSelect.value;
        const quantity = parseInt(quantityInput.value) || 1;

        if (selectedServiceName && window.servicesList) {
            const selectedService = window.servicesList.find(service => service.name === selectedServiceName);
            if (selectedService) {
                const unitPrice = selectedService.price;
                unitPriceInput.value = unitPrice.toLocaleString() + 'đ';
                const rowTotal = unitPrice * quantity;
                subtotal += rowTotal;
            } else {
                unitPriceInput.value = '0đ';
            }
        } else {
            unitPriceInput.value = '0đ';
        }
    });

    tax = subtotal * 0.1; // Thuế 10%
    total = subtotal + tax - discount;

    subtotalInput.value = subtotal.toLocaleString() + 'đ';
    taxInput.value = tax.toLocaleString() + 'đ';
    totalAmountInput.value = total.toLocaleString() + 'đ';
}

// DỊCH VỤ =====================================================================

// Hàm toàn cục: Chỉnh sửa dịch vụ
async function handleEditService(serviceId) {
    try {
        const service = await fetchData(`/services/${serviceId}`);
        console.log('Service to edit:', service);

        document.querySelector('#serviceName').value = service.name;
        document.querySelector('#serviceDescription').value = service.description;
        document.querySelector('#servicePrice').value = service.price;
        document.querySelector('#serviceUnit').value = service.unit;
        document.querySelector('#serviceIcon').value = service.icon;

        const modalElement = document.querySelector('#newServiceModal');
        modalElement.setAttribute('data-service-id', serviceId);
        document.querySelector('#newServiceModal .modal-title').textContent = 'Chỉnh sửa dịch vụ';
        document.querySelector('#newServiceModal .btn-custom').textContent = 'Lưu thay đổi';

        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } catch (error) {
        console.error('Lỗi khi tải dịch vụ để chỉnh sửa:', error);
        alert('Không thể tải dịch vụ để chỉnh sửa: ' + error.message);
    }
}

// Hàm toàn cục: Xóa dịch vụ
async function handleDeleteService(serviceId) {
    if (confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
        try {
            await fetchData(`/services/${serviceId}`, 'DELETE');
            alert('Xóa dịch vụ thành công!');
            loadServices();
            loadServiceOptions();
        } catch (error) {
            console.error('Lỗi khi xóa dịch vụ:', error);
            alert('Không thể xóa dịch vụ: ' + error.message);
        }
    }
}

// Tải danh sách dịch vụ
async function loadServices() {
    const services = await fetchData('/services');
    const container = document.querySelector('#services .card-body');
    container.innerHTML = services.map(service => `
        <tr data-service-id="${service.id}">
            <div class="service-item">
                <div class="service-icon"><i class="fas ${service.icon} fa-lg"></i></div>
                <div class="service-info">
                    <h5>${service.name}</h5>
                    <p>${service.description}</p>
                </div>
                <div class="service-price">${service.price.toLocaleString()}đ ${service.unit}</div>
                <div class="ms-3">
                    <button class="btn btn-sm btn-outline-warning btn-edit-service" data-service-id="${service.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger btn-delete-service" data-service-id="${service.id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </tr>
    `).join('');
    // Gắn sự kiện cho các nút
    document.querySelectorAll('.btn-edit-service').forEach(button => {
        button.addEventListener('click', () => handleEditService(button.getAttribute('data-service-id')));
    });
    document.querySelectorAll('.btn-delete-service').forEach(button => {
        button.addEventListener('click', () => handleDeleteService(button.getAttribute('data-service-id')));
    });
}

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
                loadServiceOptions();
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

// KHACH HANG =====================================================================

// Hàm toàn cục: Xem chi tiết khách hàng
async function handleViewCustomer(customerId) {
    try {
        const customer = await fetchData(`/customers/${customerId}`);
        console.log('Customer detail:', customer);

        document.querySelector('#viewCustomerId').value = customer.customerId;
        document.querySelector('#viewCustomerName').value = customer.name;
        document.querySelector('#viewCustomerPhone').value = customer.phone;
        document.querySelector('#viewCustomerEmail').value = customer.email;
        document.querySelector('#viewCustomerAddress').value = customer.address;
        document.querySelector('#viewCustomerOrderCount').value = customer.orderCount;
        document.querySelector('#viewCustomerType').value = customer.type;
        document.querySelector('#viewCustomerNote').value = customer.note || '';

        const modal = new bootstrap.Modal(document.querySelector('#viewCustomerModal'));
        modal.show();
    } catch (error) {
        console.error('Lỗi khi xem chi tiết khách hàng:', error);
        alert('Không thể tải chi tiết khách hàng: ' + error.message);
    }
}

// Hàm toàn cục: Chỉnh sửa khách hàng
async function handleEditCustomer(customerId) {
    try {
        const customer = await fetchData(`/customers/${customerId}`);
        console.log('Customer to edit:', customer);

        document.querySelector('#customerName').value = customer.name;
        document.querySelector('#customerPhone').value = customer.phone;
        document.querySelector('#customerEmail').value = customer.email;
        document.querySelector('#customerAddress').value = customer.address;
        document.querySelector('#customerType').value = customer.type;
        document.querySelector('#customerNote').value = customer.note || '';

        const modalElement = document.querySelector('#newCustomerModal');
        modalElement.setAttribute('data-customer-id', customerId);
        document.querySelector('#newCustomerModal .modal-title').textContent = 'Chỉnh sửa khách hàng';
        document.querySelector('#newCustomerModal .btn-custom').textContent = 'Lưu thay đổi';

        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } catch (error) {
        console.error('Lỗi khi tải khách hàng để chỉnh sửa:', error);
        alert('Không thể tải khách hàng để chỉnh sửa: ' + error.message);
    }
}

// Hàm toàn cục: Xóa khách hàng
async function handleDeleteCustomer(customerId) {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
        try {
            await fetchData(`/customers/${customerId}`, 'DELETE');
            alert('Xóa khách hàng thành công!');
            loadCustomers();
        } catch (error) {
            console.error('Lỗi khi xóa khách hàng:', error);
            alert('Không thể xóa khách hàng: ' + error.message);
        }
    }
}

// Tải danh sách khách hàng
async function loadCustomers() {
    const customers = await fetchData('/customers');
    console.log('Customers:', customers); // Kiểm tra dữ liệu trả về
    const tbody = document.querySelector('#customers tbody');
    tbody.innerHTML = customers.map(customer => `
            <tr data-customer-id="${customer.id}">
                <td>${customer.customerId || 'N/A'}</td>
                <td>${customer.name || 'N/A'}</td>
                <td>${customer.phone || 'N/A'}</td>
                <td>${customer.email || 'N/A'}</td>
                <td>${customer.address || 'N/A'}</td>
                <td>${customer.orderCount || 'N/A'}</td>
                <td><span class="badge bg-${customer.type === 'VIP' ? 'primary' : customer.type === 'Thân thiết' ? 'info' : 'secondary'}">${customer.type}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary btn-view-customer" data-customer-id="${customer.id}"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-outline-warning btn-edit-customer" data-customer-id="${customer.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger btn-delete-customer" data-customer-id="${customer.id}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>  
        `).join('')
        // Gắn sự kiện cho các nút
        document.querySelectorAll('.btn-view-customer').forEach(button => {
            button.addEventListener('click', () => handleViewCustomer(button.getAttribute('data-customer-id')));
        });
        document.querySelectorAll('.btn-edit-customer').forEach(button => {
            button.addEventListener('click', () => handleEditCustomer(button.getAttribute('data-customer-id')));
        });
        document.querySelectorAll('.btn-delete-customer').forEach(button => {
            button.addEventListener('click', () => handleDeleteCustomer(button.getAttribute('data-customer-id')));
        });
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