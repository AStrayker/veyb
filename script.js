let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// БАЗА ДАННЫХ УКРАИНСКИХ ИНДЕКСОВ И ГОРОДОВ
const ukrainianCities = {
    // Киев
    "01001": ["Київ", "Шевченківський"],
    "01054": ["Київ", "Печерський"],
    "01103": ["Київ", "Подільський"],
    "02000": ["Київ", "Дарницький"],
    "03048": ["Київ", "Солом'янський"],
    "04071": ["Київ", "Голосіївський"],
    "03150": ["Київ", "Святославський"],
    
    // Днепр
    "49000": ["Дніпро", "Соборний"],
    "49005": ["Дніпро", "Індустріальний"],
    "49018": ["Дніпро", "Центральний"],
    
    // Харьков
    "61001": ["Харків", "Київський"],
    "61105": ["Харків", "Шевченківський"],
    "61058": ["Харків", "Основ'янський"],
    
    // Одесса
    "65001": ["Одеса", "Приморський"],
    "65101": ["Одеса", "Малиновський"],
    "65014": ["Одеса", "Суворівський"],
    
    // Львов
    "79000": ["Львів", "Галицький"],
    "79005": ["Львів", "Личаківський"],
    "79010": ["Львів", "Шевченківський"],
    
    // Популярные города
    "40000": ["Суми", "Центральний"],
    "36000": ["Полтава", ""],
    "33000": ["Вінниця", ""],
    "30000": ["Запоріжжя", ""],
    "25000": ["Ужгород", ""],
    "20000": ["Чернігів", ""],
    "18000": ["Черкаси", ""],
    "16000": ["Рівне", ""],
    "14000": ["Івано-Франківськ", ""],
    "12000": ["Тернопіль", ""],
    "10000": ["Херсон", ""],
    "08000": ["Миколаїв", ""],
    "06000": ["Кропивницький", ""],
    "05000": ["Маріуполь", ""],
    "87500": ["Бахмут", ""],
    
    // Другие популярные
    "02125": ["Бровари", ""],
    "08631": ["Буча", ""],
    "07300": ["Бориспіль", ""],
    "08200": ["Ірпінь", ""],
    "07400": ["Переяслав", ""]
};

// Список всех городов для поиска по буквам
const allCities = [
    "Київ", "Дніпро", "Харків", "Одеса", "Львів", "Суми", "Полтава", "Вінниця", 
    "Запоріжжя", "Ужгород", "Чернігів", "Черкаси", "Рівне", "Івано-Франківськ", 
    "Тернопіль", "Херсон", "Миколаїв", "Кропивницький", "Маріуполь", "Бахмут",
    "Бровари", "Буча", "Бориспіль", "Ірпінь", "Переяслав", "Краматорськ", 
    "Слов'янськ", "Павлоград", "Нікополь", "Кременчук", "Біла Церква", 
    "Мелітополь", "Керч", "Сімферополь", "Ялта", "Феодосія"
];

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

// 🔍 ПОИСК ПО ИНДЕКСУ
function findCityByIndex() {
    const index = document.getElementById('index').value.replace(/\D/g, '');
    
    if (index.length === 5 && ukrainianCities[index]) {
        const [city, district] = ukrainianCities[index];
        document.getElementById('city').value = city;
        hideSuggestions();
        alert(`✅ Знайдено: ${city}${district ? ` (${district})` : ''}`);
    }
}

// 🔍 ПОИСК ПО ПЕРВЫМ БУКВАМ
let selectedIndex = -1;

function searchCities() {
    const input = document.getElementById('city');
    const query = input.value.toLowerCase().trim();
    const suggestions = document.getElementById('citySuggestions');
    
    if (query.length < 2) {
        hideSuggestions();
        return;
    }
    
    const matches = allCities.filter(city => 
        city.toLowerCase().includes(query)
    ).slice(0, 8);
    
    if (matches.length === 0) {
        hideSuggestions();
        return;
    }
    
    let html = '';
    matches.forEach((city, index) => {
        html += `<div class="suggestion-item" onclick="selectCity('${city}')">${city}</div>`;
    });
    
    suggestions.innerHTML = html;
    suggestions.style.display = 'block';
    selectedIndex = -1;
}

function selectCity(city) {
    document.getElementById('city').value = city;
    hideSuggestions();
}

function hideSuggestions() {
    document.getElementById('citySuggestions').style.display = 'none';
    selectedIndex = -1;
}

// Обработка стрелок клавиатуры
document.addEventListener('keydown', function(e) {
    const suggestions = document.getElementById('citySuggestions');
    const items = suggestions.querySelectorAll('.suggestion-item');
    
    if (suggestions.style.display === 'none') return;
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelection(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelection(items);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        selectCity(items[selectedIndex].textContent);
    } else if (e.key === 'Escape') {
        hideSuggestions();
    }
});

function updateSelection(items) {
    items.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
    });
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
