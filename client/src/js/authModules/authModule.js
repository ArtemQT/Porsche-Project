import { PopUpMessage } from "../services/popUpMessage.js";

const authModule = () => {
    const formElement = document.querySelector('.login__form');
    const popUpMessage = new PopUpMessage();

    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userEmail = formElement.querySelector('.input__email').value;
        const userPassword = formElement.querySelector('.input__password').value;

        if (userEmail === "" || userPassword === "") {
            popUpMessage.show(
                "Authorization failed",
                "All fields are required!"
            )
            return;
        }

        if(userPassword.length < 8) {
            popUpMessage.show(
                "Authorization failed",
                "Password must be at least 8 characters long!"
            )

            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(userEmail)) {
            popUpMessage.show(
                "Authorization failed",
                "Please, enter a valid email address (example@domain.com)"
            )

            return;
        }
        try{
            const response = await fetch('http://localhost:3000/API/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userEmail,
                    userPassword
                })
            })

            if (response.ok){
                const userData = await response.json();
                console.log(userData);

                popUpMessage.show(
                    "Authorization successful",
                    `${userData.message}`
                )

                localStorage.setItem('token', userData.accessToken);
                setTimeout(() => {
                    window.history.back();
                }, 3000);
            }
            else{
                const errorData = await response.json();
                popUpMessage.show(
                    "Authorization failed",
                    `${errorData.message}`
                )

            }
        }
        catch(err){
            popUpMessage.show(
                "Authorization failed",
                "An error occurred during login"
            )

            console.error(err);
        }
    })
}

authModule();