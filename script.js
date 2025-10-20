// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
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

    // Отправка формы (ИСПРАВЛЕНО!)
    document.getElementById('orderFormEl').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const qty = document.getElementById('quantity').value;
        const delivery = document.getElementById('deliveryType').value;
        const index = document.getElementById('index').value;
        const city = document.getElementById('city').value;
        const street = document.getElementById('street').value;
        const house = document.getElementById('house').value;
        const branch = document.getElementById('branch').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;
        const messenger = document.getElementById('messenger').value;
        
        const body = `🛒 Нове замовлення Одноразка\n\n` +
                    `Кількість: ${qty}\n` +
                    `Доставка: ${delivery === 'nova' ? 'Нова Пошта' : 'Укр Пошта'}\n` +
                    `Індекс: ${index || 'Не вказано'}\n` +
                    `Місто: ${city}\n` +
                    `${delivery === 'nova' ? `Відділення: ${branch}` : `Вулиця: ${street}\nБудинок: ${house}`}\n` +
                    `Ім'я: ${firstName}\n` +
                    `Прізвище: ${lastName}\n` +
                    `Телефон: ${phone}\n` +
                    `Месенджер: ${messenger}`;
        
        const subject = '🛒 Нове замовлення Одноразка';
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
    
    // Авто-прокрутка карусели каждые 4 секунды
    setInterval(() => changeSlide(1), 4000);
});

// Глобальные функции для кнопок (доступны из HTML)
function changeSlideGlobal(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function changeQtyGlobal(direction) {
    const qty = document.getElementById('quantity');
    let value = parseInt(qty.value);
    value = Math.max(1, value + direction);
    qty.value = value;
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
    
    if (delivery === 'nova') {
        streetFields.style.display = 'none';
        branchSelect.style.display = 'block';
    } else {
        streetFields.style.display = 'block';
        branchSelect.style.display = 'none';
    }
}
