// Initialize DataTables
$(document).ready(function() {
    // Initialize Select2
    $('.select2').select2({
        width: '100%'
    });

    // Initialize DataTable
    const table = $('#inventoryTable').DataTable({
        responsive: true,
        processing: true,
        // serverSide: true, // Enable for real backend integration
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: '<i class="fas fa-file-excel me-1"></i> Export Excel',
                className: 'btn btn-success btn-sm me-2'
            },
            {
                extend: 'pdf',
                text: '<i class="fas fa-file-pdf me-1"></i> Export PDF',
                className: 'btn btn-danger btn-sm'
            }
        ],
        data: generateMockData(), // Remove this when using real backend
        columns: [
            {
                data: null,
                defaultContent: '',
                orderable: false,
                className: 'text-center',
                render: function (data, type, row) {
                    return '<input type="checkbox" class="form-check-input product-checkbox">';
                }
            },
            {
                data: 'product',
                render: function(data, type, row) {
                    return `
                        <div class="d-flex align-items-center">
                            <img src="${data.image}" class="product-image me-2">
                            <div>
                                <div class="fw-bold">${data.name}</div>
                                <small class="text-muted">${data.barcode}</small>
                            </div>
                        </div>
                    `;
                }
            },
            { data: 'sku' },
            { data: 'category' },
            {
                data: 'price',
                render: function(data) {
                    return `$${data.toFixed(2)}`;
                }
            },
            { data: 'stock' },
            {
                data: 'status',
                render: function(data) {
                    const badges = {
                        'low': 'stock-badge stock-low',
                        'medium': 'stock-badge stock-medium',
                        'high': 'stock-badge stock-high'
                    };
                    return `<span class="${badges[data]}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                }
            },
            { data: 'supplier' },
            {
                data: 'lastUpdated',
                render: function(data) {
                    return new Date(data).toLocaleDateString();
                }
            },
            {
                data: null,
                orderable: false,
                render: function(data, type, row) {
                    return `
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${row.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${row.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                }
            }
        ]
    });

    // Select All Checkbox
    $('#selectAll').on('change', function() {
        const isChecked = $(this).prop('checked');
        $('.product-checkbox').prop('checked', isChecked);
    });

    // Filter Change Events
    $('#categoryFilter, #stockFilter, #supplierFilter').on('change', function() {
        table.draw();
    });

    // Price Range Filter
    let priceDebounceTimer;
    $('#priceMin, #priceMax').on('input', function() {
        clearTimeout(priceDebounceTimer);
        priceDebounceTimer = setTimeout(() => {
            table.draw();
        }, 500);
    });

    // Custom Filtering Function
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
        const category = $('#categoryFilter').val();
        const stockStatus = $('#stockFilter').val();
        const supplier = $('#supplierFilter').val();
        const minPrice = parseFloat($('#priceMin').val()) || 0;
        const maxPrice = parseFloat($('#priceMax').val()) || Infinity;
        
        const rowCategory = data[3];
        const rowStatus = $(data[6]).text().toLowerCase();
        const rowSupplier = data[7];
        const rowPrice = parseFloat(data[4].replace('$', ''));

        const categoryMatch = !category || rowCategory === category;
        const stockMatch = !stockStatus || rowStatus === stockStatus;
        const supplierMatch = !supplier || rowSupplier === supplier;
        const priceMatch = rowPrice >= minPrice && rowPrice <= maxPrice;

        return categoryMatch && stockMatch && supplierMatch && priceMatch;
    });

    // Import Button Click
    $('#importInventory').on('click', function() {
        $('#importModal').modal('show');
    });

    // Generate SKU Button Click
    $('#generateSKU').on('click', function() {
        const sku = generateSKU();
        $(this).closest('.input-group').find('input').val(sku);
    });

    // Delete Button Click
    $('#inventoryTable').on('click', '.delete-btn', function() {
        const productId = $(this).data('id');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Here you would typically make an API call to delete the product
                Swal.fire(
                    'Deleted!',
                    'Product has been deleted.',
                    'success'
                );
                table.row($(this).closest('tr')).remove().draw();
            }
        });
    });

    // Form Validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});

// Generate Mock Data
function generateMockData() {
    const products = [];
    const categories = ['Electronics', 'Fashion', 'Home & Living'];
    const suppliers = ['TechCorp Inc.', 'Fashion Hub', 'Home Essentials Ltd.'];
    const statuses = ['low', 'medium', 'high'];

    for (let i = 1; i <= 50; i++) {
        const stock = Math.floor(Math.random() * 1000);
        let status;
        if (stock < 100) status = 'low';
        else if (stock < 500) status = 'medium';
        else status = 'high';

        products.push({
            id: i,
            product: {
                name: `Product ${i}`,
                image: `https://picsum.photos/48/48?random=${i}`,
                barcode: generateBarcode()
            },
            sku: generateSKU(),
            category: categories[Math.floor(Math.random() * categories.length)],
            price: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
            stock: stock,
            status: status,
            supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
            lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
        });
    }
    return products;
}

// Generate SKU
function generateSKU() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sku = '';
    for (let i = 0; i < 8; i++) {
        sku += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return sku;
}

// Generate Barcode
function generateBarcode() {
    let barcode = '';
    for (let i = 0; i < 13; i++) {
        barcode += Math.floor(Math.random() * 10);
    }
    return barcode;
}
