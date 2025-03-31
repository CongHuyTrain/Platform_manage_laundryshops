document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const sections = document.querySelectorAll('.section');

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

    // Create charts
    createCharts();
});

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