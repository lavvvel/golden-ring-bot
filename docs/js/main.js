// Данные о местах (в реальном приложении эти данные будут загружаться с сервера)
const places = [
    {
        id: 1,
        name: "Кремль",
        description: "Исторический центр Москвы",
        type: "historical",
        latitude: 55.751999,
        longitude: 37.617734,
        hasAudioGuide: true,
        hasVirtualTour: true,
        rating: 4.8
    },
    {
        id: 2,
        name: "Парк Горького",
        description: "Центральный парк культуры и отдыха",
        type: "natural",
        latitude: 55.728926,
        longitude: 37.604602,
        hasAudioGuide: false,
        hasVirtualTour: true,
        rating: 4.5
    },
    // Добавьте больше мест по необходимости
];

let map;
let markers = [];

// Инициализация карты
function initMap() {
    map = L.map('map').setView([55.7558, 37.6173], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

// Загрузка мест на карту
function loadPlacesOnMap() {
    const type = document.getElementById('placeTypeFilter').value;
    const audioGuide = document.getElementById('audioGuideFilter').checked;
    const virtualTour = document.getElementById('virtualTourFilter').checked;
    
    // Очищаем предыдущие маркеры
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Фильтруем места
    const filteredPlaces = places.filter(place => {
        if (type && place.type !== type) return false;
        if (audioGuide && !place.hasAudioGuide) return false;
        if (virtualTour && !place.hasVirtualTour) return false;
        return true;
    });
    
    // Добавляем маркеры на карту
    filteredPlaces.forEach(place => {
        const marker = L.marker([place.latitude, place.longitude])
            .bindPopup(`
                <strong>${place.name}</strong><br>
                ${place.description}<br>
                <strong>Рейтинг:</strong> ${place.rating}
            `);
        markers.push(marker);
        marker.addTo(map);
    });
}

// Загрузка мест в список
function loadPlaces() {
    const type = document.getElementById('placeTypeFilter').value;
    const audioGuide = document.getElementById('audioGuideFilter').checked;
    const virtualTour = document.getElementById('virtualTourFilter').checked;
    
    // Фильтруем места
    const filteredPlaces = places.filter(place => {
        if (type && place.type !== type) return false;
        if (audioGuide && !place.hasAudioGuide) return false;
        if (virtualTour && !place.hasVirtualTour) return false;
        return true;
    });
    
    const container = document.getElementById('places-container');
    container.innerHTML = '';
    
    filteredPlaces.forEach(place => {
        const premiumFeatures = place.hasAudioGuide || place.hasVirtualTour ? `
            <div class="premium-features">
                ${place.hasAudioGuide ? '<span class="badge bg-info">Аудиогид</span>' : ''}
                ${place.hasVirtualTour ? '<span class="badge bg-success">Виртуальный тур</span>' : ''}
            </div>
        ` : '';
        
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card place-card">
                    <div class="card-body">
                        <h5 class="card-title">${place.name}</h5>
                        <p class="card-text">${place.description}</p>
                        <p class="card-text">
                            <strong>Тип:</strong> ${place.type}<br>
                            <strong>Рейтинг:</strong> ${place.rating}
                        </p>
                        ${premiumFeatures}
                    </div>
                </div>
            </div>
        `;
    });
}

// Показать карту
function showMap() {
    document.getElementById('map').style.display = 'block';
    document.getElementById('places-container').style.display = 'none';
    document.getElementById('about-section').style.display = 'none';
    if (!map) {
        initMap();
    }
    loadPlacesOnMap();
}

// Показать список мест
function showPlaces() {
    document.getElementById('map').style.display = 'none';
    document.getElementById('places-container').style.display = 'flex';
    document.getElementById('about-section').style.display = 'none';
    loadPlaces();
}

// Показать информацию о проекте
function showAbout() {
    document.getElementById('map').style.display = 'none';
    document.getElementById('places-container').style.display = 'none';
    document.getElementById('about-section').style.display = 'block';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    showPlaces();
    initMap();
    
    // Обработчики фильтров
    document.getElementById('placeTypeFilter').addEventListener('change', () => {
        if (document.getElementById('map').style.display !== 'none') {
            loadPlacesOnMap();
        } else {
            loadPlaces();
        }
    });
    
    document.getElementById('audioGuideFilter').addEventListener('change', () => {
        if (document.getElementById('map').style.display !== 'none') {
            loadPlacesOnMap();
        } else {
            loadPlaces();
        }
    });
    
    document.getElementById('virtualTourFilter').addEventListener('change', () => {
        if (document.getElementById('map').style.display !== 'none') {
            loadPlacesOnMap();
        } else {
            loadPlaces();
        }
    });
}); 