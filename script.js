document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');

    // Синхронизация количества
    document.getElementById('quantity').addEventListener('change', function() {
        document.getElementById('quantityForm').value = this.value;
    });

    function changeSlideGlobal(direction) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function changeQtyGlobal(direction) {
        const qty = document.getElementById('quantity');
        let value = parseInt(qty.value);
        value = Math.max(1, value + direction);
        qty.value = value;
        document.getElementById('quantityForm').value = value;
    }

    function showOrderFormGlobal() {
        document.getElementById('orderForm').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideOrderFormGlobal() {
        document.getElementById('orderForm').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function toggleDeliveryFieldsGlobal() {
        const delivery = document.getElementById('deliveryType').value;
        const streetFields = document.getElementById('streetFields');
        const branchSelect = document.getElementById('branchSelect');
        
        if (delivery === 'Нова Пошта') {
            streetFields.style.display = 'none';
            branchSelect.style.display = 'block';
            document.getElementById('branch').required = true;
            document.getElementById('street').required = false;
            document.getElementById('house').required = false;
        } else {
            streetFields.style.display = 'block';
            branchSelect.style.display = 'none';
            document.getElementById('branch').required = false;
            document.getElementById('street').required = true;
            document.getElementById('house').required = true;
        }
    }

    // Закрытие по клику вне модалки
    window.onclick = function(e) {
        if (e.target.id === 'orderForm') hideOrderFormGlobal();
    }

    // Авто-карусель
    setInterval(() => changeSlideGlobal(1), 4000);
    
    // Инициализация
    toggleDeliveryFieldsGlobal();
});
