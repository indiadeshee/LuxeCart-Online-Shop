$(document).ready(function() {
    initializeDateRangePicker();
    initializeCharts();
    initializeEventListeners();
    initializeExport();
});

// Initialize Date Range Picker
function initializeDateRangePicker() {
    $('#dateRange').daterangepicker({
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, function(start, end) {
        updateChartData(start, end);
    });
}

// Initialize Charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    window.revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: generateDailyLabels(),
            datasets: [{
                label: 'Revenue',
                data: generateRandomData(30, 10000, 50000),
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Orders',
                data: generateRandomData(30, 100, 500),
                borderColor: '#32a852',
                backgroundColor: 'rgba(50, 168, 82, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [2, 4]
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    window.categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Fashion', 'Home & Living'],
            datasets: [{
                data: [45, 30, 25],
                backgroundColor: [
                    '#4361ee',
                    '#32a852',
                    '#ffc107'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            cutout: '70%'
        }
    });

    // Customer Chart
    const customerCtx = document.getElementById('customerChart').getContext('2d');
    window.customerChart = new Chart(customerCtx, {
        type: 'bar',
        data: {
            labels: ['New', 'Returning', 'VIP'],
            datasets: [{
                label: 'Customers',
                data: [654, 423, 125],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.7)',
                    'rgba(50, 168, 82, 0.7)',
                    'rgba(255, 193, 7, 0.7)'
                ],
                borderColor: [
                    '#4361ee',
                    '#32a852',
                    '#ffc107'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Period buttons click handler
    $('.btn-group .btn').on('click', function() {
        $('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        updateChartPeriod($(this).data('period'));
    });
}

// Initialize Export Functionality
function initializeExport() {
    $('#exportData').on('click', function() {
        const btn = $(this);
        btn.prop('disabled', true);
        btn.html('<i class="fas fa-spinner fa-spin me-1"></i> Exporting...');

        // Simulate export process
        setTimeout(() => {
            const dateRange = $('#dateRange').val();
            const blob = new Blob([generateCSV()], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', `analytics_report_${dateRange.replace(/\//g, '-')}.csv`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            btn.prop('disabled', false);
            btn.html('<i class="fas fa-download me-1"></i> Export Report');

            showNotification('success', 'Report exported successfully!');
        }, 2000);
    });
}

// Helper Functions
function generateDailyLabels() {
    const labels = [];
    for (let i = 29; i >= 0; i--) {
        labels.push(moment().subtract(i, 'days').format('MMM D'));
    }
    return labels;
}

function generateRandomData(count, min, max) {
    return Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1) + min));
}

function updateChartData(start, end) {
    // Simulate API call to get new data
    const loadingOverlay = $('<div class="loading-overlay"><i class="fas fa-spinner fa-spin"></i></div>');
    $('.chart-container').append(loadingOverlay);

    setTimeout(() => {
        // Update charts with new random data
        window.revenueChart.data.labels = generateDailyLabels();
        window.revenueChart.data.datasets[0].data = generateRandomData(30, 10000, 50000);
        window.revenueChart.data.datasets[1].data = generateRandomData(30, 100, 500);
        window.revenueChart.update();

        window.categoryChart.data.datasets[0].data = [
            Math.floor(Math.random() * 40) + 30,
            Math.floor(Math.random() * 30) + 20,
            Math.floor(Math.random() * 20) + 15
        ];
        window.categoryChart.update();

        window.customerChart.data.datasets[0].data = [
            Math.floor(Math.random() * 300) + 400,
            Math.floor(Math.random() * 200) + 300,
            Math.floor(Math.random() * 100) + 100
        ];
        window.customerChart.update();

        loadingOverlay.remove();
        showNotification('success', 'Analytics data updated!');
    }, 1500);
}

function updateChartPeriod(period) {
    // Simulate API call to get new data
    const loadingOverlay = $('<div class="loading-overlay"><i class="fas fa-spinner fa-spin"></i></div>');
    $('.chart-container').append(loadingOverlay);

    setTimeout(() => {
        let labels, data;
        switch(period) {
            case 'daily':
                labels = generateDailyLabels();
                data = generateRandomData(30, 10000, 50000);
                break;
            case 'weekly':
                labels = Array.from({length: 12}, (_, i) => `Week ${12-i}`);
                data = generateRandomData(12, 50000, 200000);
                break;
            case 'monthly':
                labels = moment.monthsShort();
                data = generateRandomData(12, 200000, 800000);
                break;
        }

        window.revenueChart.data.labels = labels;
        window.revenueChart.data.datasets[0].data = data;
        window.revenueChart.data.datasets[1].data = generateRandomData(labels.length, 100, 500);
        window.revenueChart.update();

        loadingOverlay.remove();
        showNotification('success', `Switched to ${period} view`);
    }, 1000);
}

function generateCSV() {
    // Generate sample CSV data
    const headers = ['Date', 'Revenue', 'Orders', 'Customers', 'Conversion Rate'];
    const rows = [headers];

    for (let i = 0; i < 30; i++) {
        const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
        const revenue = Math.floor(Math.random() * 40000 + 10000);
        const orders = Math.floor(Math.random() * 400 + 100);
        const customers = Math.floor(Math.random() * 600 + 200);
        const conversionRate = (orders / customers * 100).toFixed(2);

        rows.push([date, revenue, orders, customers, conversionRate]);
    }

    return rows.map(row => row.join(',')).join('\n');
}

function showNotification(type, message) {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.appendChild(toast);
    document.body.appendChild(container);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        container.remove();
    });
}

// Add custom styles for loading overlay
const styles = `
    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: #4361ee;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
