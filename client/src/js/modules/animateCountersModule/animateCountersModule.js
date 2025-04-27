document.addEventListener('DOMContentLoaded', function() {
    // Конфигурация анимации
    const animationConfig = {
        duration: 3000, // Длительность анимации
        easing: 'easeOutQuad', // Плавное замедление
        decimalPlaces: 1 // Количество знаков после запятой для ускорения
    };

    // Элементы для анимации
    const elements = [
        {
            element: document.querySelector('[data-js-GT3RS-Acceleration]'),
            target: 3.2,
            isDecimal: true
        },
        {
            element: document.querySelector('[data-js-GT3RS-Power]'),
            target: 386,
            isDecimal: false
        },
        {
            element: document.querySelector('[data-js-GT3RS-TopSpeed]'),
            target: 296,
            isDecimal: false
        },
        {
            element: document.querySelector('[data-js-GT3RS-HorsePower]'),
            target: 525,
            isDecimal: false
        }

    ];

    // Функция анимации
    function animateValue(element, target, isDecimal) {
        let start = 0;
        const duration = animationConfig.duration;
        const startTime = performance.now();

        function updateValue(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Эффект ease-out
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = easedProgress * target;

            // Обновление значения
            if (isDecimal) {
                element.textContent = currentValue.toFixed(1).replace('.', ',');
            } else {
                element.textContent = Math.floor(currentValue);
            }

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        }

        requestAnimationFrame(updateValue);
    }

    // Запуск анимации после окончания лоадера
    setTimeout(() => {
        elements.forEach(item => {
            animateValue(item.element, item.target, item.isDecimal);
        });
    }, 1000); // Задержка, равная времени анимации лоадера
});