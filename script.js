let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

function changeQty(direction) {
    const qty = document.getElementById('quantity');
    let value = parseInt(qty.value);
    value = Math.max(1, value + direction);
    qty.value = value;
}

function showOrderForm() {
    document.getElementById('orderForm').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideOrderForm() {
    document.getElementById('orderForm').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function toggleDeliveryFields() {
    const delivery = document.getElementById('deliveryType').value;
    const streetFields = document.getElementById('streetFields');
    const branchSelect = document.getElementById('branchSelect');
    
    if (delivery === 'nova') {
        streetFields.style.display = 'none';
        branchSelect.style.display = 'block';
    } else {
        streetFields.style.display = 'block';
        branchSelect.style.display = 'none';
    }
}

// Отправка формы
document.getElementById('orderFormEl').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('Кількість', document.getElementById('quantity').value);
    formData.append('Доставка', document.getElementById('deliveryType').value);
    formData.append('Індекс', document.getElementById('index').value);
    formData.append('Місто', document.getElementById('city').value);
    formData.append('Вулиця', document.getElementById('street').value);
    formData.append('Будинок', document.getElementById('house').value);
    formData.append('Відділення', document.getElementById('branch').value);
    formData.append('Ім\'я', document.getElementById('firstName').value);
    formData.append('Прізвище', document.getElementById('lastName').value);
    formData.append('Телефон', document.getElementById('phone').value);
    formData.append('Месенджер', document.getElementById('messenger').value);
    
    const subject = '🛒 Нове замовлення Одноразка';
    const body = Object.fromEntries(formData).map(([key, value]) => `${key}: ${value}`).join('\n');
    
    const mailto = `mailto:astrajker@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    
    alert('✅ Замовлення відправлено! Ми зв\'яжемося з вами.');
    hideOrderForm();
});

// Закрытие модалки по клику вне её
window.onclick = function(e) {
    const modal = document.getElementById('orderForm');
    if (e.target == modal) hideOrderForm();
}

// Инициализация
toggleDeliveryFields();
