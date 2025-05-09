import { AudioPlayer } from "./audioRoadModule.js";
import { AuthMenu } from "../services/AuthMenuModule.js";
import { PopUpMessage } from "../services/popUpMessage.js";
import { UsersBasket } from "../services/usersBasketService.js"

AuthMenu.AuthMenuInit();
new UsersBasket();

const player_GT3_rs = new AudioPlayer(
    {
        container: '.introCars__container-car-audio-player',
        waveColor: 'black',
        progressColor: 'red',
        height: 100,
        width: 400,
        responsive: true,
        url: "/client/public/assetsMainPage/audio/991-gt3-rs-engine-sound.mp3",
    },
    document.querySelector('.introCars__container-car-audio-button'),
    document.querySelector('.introCars__container-car-audio-player'),
);


const handleConfigureButton = () => {
        const messageToLogIn = new PopUpMessage();

        const configureBtnElement = document.querySelector('.introCars__car-order-button');
        configureBtnElement.addEventListener('click', async (e) => {
                e.preventDefault();
                // Проверка существования токена
                const token = localStorage.getItem('token');
                if(!token){
                        messageToLogIn.show(
                            "Authorization required",
                            "To continue, you must log in."
                        )
                        return;
                }

                // Верификация токена
                try{
                        const verifyUrl = 'http://localhost:3000/API/verifyJwt'

                        const response = await fetch(verifyUrl, {
                                method: "GET",
                                headers: {
                                        "content-type": "application/json",
                                        Authorization: `Bearer ${token}`
                                }
                        })

                        // Если токен валиден
                        if (response.ok) {
                                window.location.href = configureBtnElement.getAttribute('href');
                        }
                        // Если токен не валиден, то делаем новый access токен через refresh токен
                        else{
                                const refreshUrl = 'http://localhost:3000/API/refreshJwt';
                                const response = await fetch(refreshUrl, {
                                        method: "GET",
                                        credentials: "include",

                                        headers: {
                                                "content-type": "application/json",
                                        },
                                })

                                // Если успешно обновлен
                                if (response.ok) {
                                        const data = await response.json();
                                        localStorage.setItem('token', data.accessToken);
                                        window.location.href = configureBtnElement.getAttribute('href');
                                }
                                else{
                                        messageToLogIn.show(
                                            "Authorization required",
                                            "To continue, you must log in."
                                        )
                                }
                        }
                }
                catch(err) {
                        console.log(err);
                }
        })

}
handleConfigureButton()
