$(document).ready(function() {
    initializeSidebar();
    initializeImageCropper();
    initializeFormValidation();
    initializeTooltips();
    initializeTimeline();
});

// Sidebar Toggle
function initializeSidebar() {
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
    });
}

// Image Cropper
function initializeImageCropper() {
    let cropper;
    
    // Handle profile image change
    $('.change-photo-btn').on('click', function() {
        $('<input type="file" accept="image/*">').on('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    $('#cropImage').attr('src', e.target.result);
                    $('#cropImageModal').modal('show');
                    
                    // Initialize cropper
                    if (cropper) {
                        cropper.destroy();
                    }
                    cropper = new Cropper($('#cropImage')[0], {
                        aspectRatio: 1,
                        viewMode: 2,
                        dragMode: 'move',
                        autoCropArea: 1,
                        restore: false,
                        guides: true,
                        center: true,
                        highlight: false,
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        toggleDragModeOnDblclick: false
                    });
                };
                reader.readAsDataURL(file);
            }
        }).click();
    });

    // Handle crop and save
    $('#cropButton').on('click', function() {
        if (!cropper) return;

        const canvas = cropper.getCroppedCanvas({
            width: 300,
            height: 300
        });

        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            $('.profile-image-wrapper img').attr('src', url);
            $('#cropImageModal').modal('hide');
            
            // Here you would typically upload the blob to your server
            // uploadProfileImage(blob);
        });
    });

    // Clean up cropper when modal is hidden
    $('#cropImageModal').on('hidden.bs.modal', function() {
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    });
}

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('profileForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (form.checkValidity()) {
            const submitBtn = $(this).find('button[type="submit"]');
            submitBtn.html('<i class="fas fa-spinner fa-spin me-1"></i> Saving...');
            submitBtn.prop('disabled', true);
            
            // Simulate API call
            setTimeout(() => {
                showNotification('success', 'Profile updated successfully!');
                submitBtn.html('Save Changes');
                submitBtn.prop('disabled', false);
            }, 1500);
        }
        
        form.classList.add('was-validated');
    });
}

// Initialize Bootstrap Tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Timeline Animation
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInLeft');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Notification Helper
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

// Handle Account Settings Toggles
$('.form-check-input').on('change', function() {
    const setting = $(this).closest('.list-group-item-action').find('h6').text();
    const enabled = $(this).prop('checked');
    
    showNotification(
        enabled ? 'success' : 'info',
        `${setting} has been ${enabled ? 'enabled' : 'disabled'}`
    );
});

// Handle Connected Accounts
$('.list-group-item-action button').on('click', function(e) {
    e.preventDefault();
    const action = $(this).text();
    const service = $(this).closest('.list-group-item-action').find('h6').text();
    
    if (action === 'Connect') {
        // Simulate connection process
        $(this).html('<i class="fas fa-spinner fa-spin"></i>');
        $(this).prop('disabled', true);
        
        setTimeout(() => {
            $(this).text('Disconnect').removeClass('btn-outline-primary').addClass('btn-outline-danger');
            $(this).prop('disabled', false);
            $(this).closest('.list-group-item-action').find('small').text('Connected');
            showNotification('success', `Successfully connected to ${service}`);
        }, 1500);
    } else {
        // Handle disconnect
        if (confirm(`Are you sure you want to disconnect from ${service}?`)) {
            $(this).html('<i class="fas fa-spinner fa-spin"></i>');
            $(this).prop('disabled', true);
            
            setTimeout(() => {
                $(this).text('Connect').removeClass('btn-outline-danger').addClass('btn-outline-primary');
                $(this).prop('disabled', false);
                $(this).closest('.list-group-item-action').find('small').text('Not Connected');
                showNotification('info', `Disconnected from ${service}`);
            }, 1500);
        }
    }
});
