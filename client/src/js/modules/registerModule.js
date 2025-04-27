import { showMessage } from "../services/showNotification.js";

// Реализиция иконки глаза
const iconEye = () => {
    const iconElement = document.querySelector("[data-js-icon]");
    const inputElement = document.querySelector("[data-js-passwordInput]");

    iconElement.addEventListener("mousedown", () => {
        inputElement.setAttribute("type", "text");
        iconElement.src = "./assetsAuth/icons/openedEye.png"
    })
    iconElement.addEventListener("mouseup", () => {
        inputElement.setAttribute("type", "password");
        iconElement.src = "./assetsAuth/icons/closedEye.png";
    })
}

const submitForm = () => {
    const formElement = document.querySelector(".login__form");
    formElement.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userName = document.querySelector(".input__name").value;
        const userSurname = document.querySelector(".input__surname").value;
        const userPassword = document.querySelector(".input__password").value;
        const userEmail = document.querySelector(".input__email").value;
        const userConfirmPassword = document.querySelector(".user__ConfirmPassword").value;

        if(!userName || !userSurname || !userPassword || !userEmail || !userConfirmPassword) {
            showMessage(false,"All fields are required!" )
            return;
        }

        if(userPassword !== userConfirmPassword) {
            showMessage(false,"Passwords don't match!" )
            return;
        }

        if(userPassword.length < 8) {
            showMessage(false,"Password must be at least 8 characters long!")
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(userEmail)) {
            alert();
            showMessage(false,"Please enter a valid email address \n (e.g., example@domain.com)")
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/API/auth/register",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    userSurname,
                    userPassword,
                    userEmail,
                })
            })
            if (response.ok) {
                const resData = await response.json();
                showMessage(true, resData.message);
                setTimeout(() => {
                    window.location.href = "/Porshe Project/client/public/auth.html";
                }, 3000);
            }
            else{
                const errorData = await response.json();
                showMessage(false, errorData.message);
            }
        }
        catch(e) {
            console.log(e);
        }
    })
}

iconEye()
submitForm()





