import { PopUpMessage } from "./popUpMessage.js";
import { TokenService } from "./tokenService.js";
import { AuthMenu } from "./AuthMenuModule.js";

export class UsersBasket {
    constructor() {
        this.basketBtnEl = document.querySelector('.header__basket-button');
        this.setBasketBtnHandler();
    }

    setBasketBtnHandler = () => {
        const popUpMessage = new PopUpMessage();

        this.basketBtnEl.addEventListener('click', async (e) => {
            e.preventDefault();

            // Проверка входа в аккаунт пользователя
            const token = localStorage.getItem('token');
            if (!token) {
                popUpMessage.show(
                    "Authorization required",
                    "To continue, you must log in."
                )
                return;
            }

            try{
                const response = await TokenService.verifyToken(token);

                // Если токен прошел верификацию
                if (response.ok) {
                    window.location.href = 'basket.html';
                }
                else{
                    const response = await TokenService.refreshToken();

                    // Если токен обновился
                    if (response.ok) {
                        const data = await response.json();

                        localStorage.setItem('token', data.accessToken);
                        window.location.href = 'basket.html';
                    }
                    // Если истек refresh токен
                    else{
                        popUpMessage.show(
                            "Session expired",
                            "Your session has expired. Please log in again."
                        )
                        setTimeout(AuthMenu.logOut, 2000)
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        })
    }
}