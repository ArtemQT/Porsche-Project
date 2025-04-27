import { showMessage } from "../services/showNotification.js";

const authModule = () => {
    const formElement = document.querySelector('.login__form');
    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userEmail = formElement.querySelector('.input__email').value;
        const userPassword = formElement.querySelector('.input__password').value;

        if (userEmail === "" || userPassword === "") {
            showMessage(false, "All fields are required!");
            return;
        }

        if(userPassword.length < 8) {
            showMessage(false, "Password must be at least 8 characters long!");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(userEmail)) {
            showMessage(false, "Please enter a valid email address (example@domain.com)");
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

                showMessage(true, userData.message);
                localStorage.setItem('token', userData.accessToken);
                setTimeout(() => {
                    window.location.href = "/Porshe Project/client/public/index.html";
                }, 3000);
            }
            else{
                const errorData = await response.json();
                showMessage(false, errorData.message);
            }
        }
        catch(err){
            showMessage(false, "An error occurred during login");
            console.error(err);
        }
    })
}

authModule();