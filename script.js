document.addEventListener("DOMContentLoaded", () => {
    const coordsElement = document.querySelector('.coords');
    const targetCoords = "−16°42′58.02.75′"; // Итоговые координаты
    let interval;
    
    // Функция для генерации случайных координат
    function getRandomCoords() {
      const degrees = Math.floor(Math.random() * 180 - 90); // От -90 до 90
      const minutes = Math.floor(Math.random() * 60); // От 0 до 59
      const seconds = Math.floor(Math.random() * 60); // От 0 до 59
      const fractions = Math.floor(Math.random() * 100); // От 0 до 99
      return `${degrees}°${minutes}′${seconds}<span>${fractions}</span>.75′`;
    }
  
    // Функция для обновления координат
    function updateCoords() {
      coordsElement.innerHTML = getRandomCoords();
    }
  
    // Начинаем обновлять координаты с интервалом
    interval = setInterval(updateCoords, 100); // Каждые 100 мс меняем координаты
  
    // Через 5 секунд выставляем итоговые координаты и останавливаем смену
    setTimeout(() => {
      clearInterval(interval);
      coordsElement.innerHTML = targetCoords;
    }, 5000); // Время ожидания в миллисекундах
  });
  


  const cards = document.querySelectorAll('.thirdBlockCard');
let currentIndex = 0;
let isScrolling = false;
let isThirdBlockActive = false;

const thirdBlock = document.querySelector('.thirdBlock');

// Функция для обновления позиций карточек
function updateParallax() {
  cards.forEach((card, index) => {
    card.style.transform = `translateY(${(index - currentIndex) * 100}%)`;
  });
}

// Функция для проверки, занимает ли thirdBlock 100vh
function checkThirdBlockHeight() {
  const rect = thirdBlock.getBoundingClientRect();
  const isFullHeight = rect.top <= 0 && rect.bottom >= window.innerHeight;

  if (isFullHeight) {
    isThirdBlockActive = true;
    document.body.style.overflow = 'hidden'; // Отключаем прокрутку, когда thirdBlock занимает 100% экрана
  } else {
    isThirdBlockActive = false;
    document.body.style.overflow = ''; // Восстанавливаем прокрутку, если thirdBlock меньше 100% экрана
  }
}

// Обрабатываем скролл и проверяем видимость блока
window.addEventListener('scroll', checkThirdBlockHeight);

// Обработка прокрутки карточек внутри thirdBlock
window.addEventListener('wheel', (event) => {
  if (!isThirdBlockActive || isScrolling) return;

  isScrolling = true;

  if (event.deltaY > 0 && currentIndex < cards.length - 1) {
    currentIndex++;
  } else if (event.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  }

  updateParallax();

  // Задержка перед следующим изменением позиции карточек
  setTimeout(() => isScrolling = false, 800);
});

// Инициализируем начальную позицию карточек
updateParallax();
checkThirdBlockHeight(); // Проверить состояние при загрузке страницы
