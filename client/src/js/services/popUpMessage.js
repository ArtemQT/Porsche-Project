export class PopUpMessage {

    constructor(){
        this.messageElement = document.createElement("div");
        this.hideTimeout = null;
    }

    show = (messageTitle, messageText) => {
        this.messageElement.innerHTML = `
            <div class="auth-popup">
                <div class="auth-popup__icon">
                    <img src="favicon/porsche.svg"
                         alt="Porsche"
                         width="50"
                         height="50"
                    >
                </div>
                <div class="auth-popup__content">
                    <h3 class="auth-popup__title">${messageTitle}</h3>
                    <p class="auth-popup__description">${messageText}</p>
                </div>
                <div class="auth-popup__buttons">
                    <button class="auth-popup__close">Close</button>
                </div>
            </div>
        `
        document.body.appendChild(this.messageElement);

        this.setCloseBtnHandler();

        const popUpElement = document.querySelector(".auth-popup");
        requestAnimationFrame(()=>{
            popUpElement.classList.add("show");
        })
        // popUpElement.classList.remove("hide");

        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }

        this.hideTimeout = setTimeout(() => this.hide(), 5000);
    }

    hide = () => {
        if (this.messageElement.parentNode) {
            const popUpElement = document.querySelector(".auth-popup");

            popUpElement.classList.remove("show");

            setTimeout(()=>{
                document.body.removeChild(this.messageElement);
            }, 1000)
        }
    }

    setCloseBtnHandler = () => {
        const closeBtnElement = document.querySelector(".auth-popup__close");
        closeBtnElement.addEventListener("click", this.hide);
    }
}