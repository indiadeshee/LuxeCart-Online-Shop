// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // Sales Analytics Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#2c3e50',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(44, 62, 80, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
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
    new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Fashion', 'Home', 'Beauty'],
            datasets: [{
                data: [30, 25, 20, 25],
                backgroundColor: [
                    '#2c3e50',
                    '#e74c3c',
                    '#f1c40f',
                    '#2ecc71'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Load Recent Orders
    loadRecentOrders();
});

// Sample Orders Data
const recentOrders = [
    {
        id: '#ORD001',
        customer: 'John Doe',
        product: 'Premium Watch',
        amount: '$299.99',
        status: 'Delivered',
        statusClass: 'success'
    },
    {
        id: '#ORD002',
        customer: 'Jane Smith',
        product: 'Designer Handbag',
        amount: '$499.99',
        status: 'Processing',
        statusClass: 'warning'
    },
    {
        id: '#ORD003',
        customer: 'Mike Johnson',
        product: 'Wireless Headphones',
        amount: '$199.99',
        status: 'Pending',
        statusClass: 'pending'
    }
];

// Load Recent Orders
function loadRecentOrders() {
    const tbody = document.querySelector('.recent-orders table tbody');
    
    recentOrders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.amount}</td>
            <td><span class="status ${order.statusClass}">${order.status}</span></td>
            <td>
                <button class="btn-view" onclick="viewOrder('${order.id}')">View</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// View Order Details
function viewOrder(orderId) {
    Swal.fire({
        title: `Order Details - ${orderId}`,
        html: `
            <div class="order-details">
                <p><strong>Customer:</strong> ${recentOrders.find(o => o.id === orderId).customer}</p>
                <p><strong>Product:</strong> ${recentOrders.find(o => o.id === orderId).product}</p>
                <p><strong>Amount:</strong> ${recentOrders.find(o => o.id === orderId).amount}</p>
                <p><strong>Status:</strong> ${recentOrders.find(o => o.id === orderId).status}</p>
            </div>
        `,
        confirmButtonText: 'Close',
        confirmButtonColor: '#2c3e50'
    });
}

// Add these styles to the document
const styles = `
    .status {
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
    }
    
    .success {
        background-color: rgba(46, 204, 113, 0.2);
        color: #2ecc71;
    }
    
    .warning {
        background-color: rgba(241, 196, 15, 0.2);
        color: #f1c40f;
    }
    
    .pending {
        background-color: rgba(52, 152, 219, 0.2);
        color: #3498db;
    }
    
    .btn-view {
        padding: 0.3rem 0.8rem;
        background-color: #2c3e50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    .btn-view:hover {
        background-color: #34495e;
    }
    
    .order-details {
        text-align: left;
        margin-top: 1rem;
    }
    
    .order-details p {
        margin: 0.5rem 0;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Initialize all components when document is ready
$(document).ready(function() {
    initializeSidebar();
    initializeCharts();
    initializeDataTables();
    initializeSelect2();
    initializeQuill();
    initializeDropzone();
    initializeToastr();
    loadDashboardData();
});

// Sidebar Toggle
function initializeSidebar() {
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
    });
}

// Charts Initialization
function initializeCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#4361ee',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(67, 97, 238, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
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
    new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Fashion', 'Home & Living', 'Others'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    '#4361ee',
                    '#3f37c9',
                    '#4caf50',
                    '#ff9800'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            cutout: '70%'
        }
    });
}

// DataTables Initialization
function initializeDataTables() {
    $('.table').DataTable({
        responsive: true,
        pageLength: 10,
        order: [[0, 'desc']],
        language: {
            search: '',
            searchPlaceholder: 'Search...'
        }
    });
}

// Select2 Initialization
function initializeSelect2() {
    $('.select2').select2({
        width: '100%',
        placeholder: $(this).data('placeholder')
    });
}

// Quill Editor Initialization
function initializeQuill() {
    const quill = new Quill('#productDescription', {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ]
        }
    });
}

// Dropzone Initialization
function initializeDropzone() {
    Dropzone.autoDiscover = false;
    new Dropzone("#productImages", {
        url: "/api/upload",
        maxFiles: 5,
        maxFilesize: 2,
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        dictDefaultMessage: "Drop files here or click to upload"
    });
}

// Toastr Notification Settings
function initializeToastr() {
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: 3000
    };
}

// Load Dashboard Data
function loadDashboardData() {
    // Simulate API call
    setTimeout(() => {
        // Add recent orders
        const orders = [
            { id: "ORD-1234", customer: "John Doe", product: "iPhone 13", amount: "$999", status: "Completed" },
            { id: "ORD-1235", customer: "Jane Smith", product: "MacBook Pro", amount: "$1299", status: "Processing" },
            { id: "ORD-1236", customer: "Mike Johnson", product: "AirPods Pro", amount: "$249", status: "Pending" }
        ];

        const orderTableBody = $('.table tbody');
        orders.forEach(order => {
            const statusClass = getStatusClass(order.status);
            orderTableBody.append(`
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.product}</td>
                    <td>${order.amount}</td>
                    <td><span class="badge ${statusClass}">${order.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `);
        });

        // Show success message
        toastr.success('Dashboard data loaded successfully!');
    }, 1000);
}

// Helper Functions
function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'completed':
            return 'bg-success';
        case 'processing':
            return 'bg-primary';
        case 'pending':
            return 'bg-warning';
        default:
            return 'bg-secondary';
    }
}

// Form Validation
$('#addProductForm').on('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (this.checkValidity()) {
        // Simulate form submission
        const formData = new FormData(this);
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Adding...');
        submitBtn.prop('disabled', true);
        
        // Simulate API call
        setTimeout(() => {
            toastr.success('Product added successfully!');
            $('#addProductModal').modal('hide');
            submitBtn.html('Add Product');
            submitBtn.prop('disabled', false);
            this.reset();
        }, 1500);
    }
    
    $(this).addClass('was-validated');
});

// Real-time Search
$('.search-bar input').on('keyup', function() {
    const searchTerm = $(this).val().toLowerCase();
    $('.table tbody tr').each(function() {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.indexOf(searchTerm) > -1);
    });
});
