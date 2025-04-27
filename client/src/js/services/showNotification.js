export const showMessage = (successFlag, message) => {
    const messageElement = document.querySelector(".message");
    const messageTextElement = document.querySelector(".message__text")
    const messageConditionIcon = document.querySelector(".message__condition-icon");

    if (!messageElement || !messageTextElement || !messageConditionIcon) return;

    messageTextElement.textContent = message;
    messageElement.classList.remove('hidden');

    messageConditionIcon.src = successFlag
        ? "./assetsAuth/icons/check-mark.png"
        : "./assetsAuth/icons/check-cancel.png";

    // Очищаем предыдущий таймаут
    if (messageElement.timeoutId) {
        clearTimeout(messageElement.timeoutId);
    }

    messageElement.timeoutId = setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 10000);
}

// Добавляем обработчики один раз при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const messageButtonElement = document.querySelector(".message__close-button");
    const messageElement = document.querySelector(".message");

    if (messageButtonElement && messageElement) {
        messageButtonElement.addEventListener('click', () => {
            messageElement.classList.add('hidden');
            if (messageElement.timeoutId) {
                clearTimeout(messageElement.timeoutId);
            }
        });
    }
});