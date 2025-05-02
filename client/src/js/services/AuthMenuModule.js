import { PopUpMessage } from "./popUpMessage.js"

export class AuthMenu{
    static AuthMenuInit(){
        this.menuButtonElement = document.querySelector('.header__user-button');
        this.menuDivElement = document.querySelector('.header__dropdown-menu');
        this.popUpLogOutMessage = new PopUpMessage()

        this.setHandlers();
    }

    static setHandlers(){
        this.menuButtonElement.addEventListener('click', e => {
            e.stopPropagation();
            this.showMenu();
        })

        document.addEventListener('click', e => {
                this.menuDivElement.classList.remove('visible');
        });

        this.menuDivElement.addEventListener('click', e => {
            if (e.target.closest('[data-js-btn-logOut]')){
                this.logOut(e);
                this.popUpLogOutMessage.show(
                    "Log out",
                    "Successfully logged out"
                );
            }
        })
    }

    static showMenu(){
        const isAuth = this.isAuthenticated();

        this.menuDivElement.innerHTML = isAuth ?
            `<ul class="header__dropdown-menu-list">
                <li class="header__dropdown-menu-item">
                    <a class="header__dropdown-menu-button" title="Профиль" data-js-btn-profile>Profile</a>
                </li>
                <li class="header__dropdown-menu-item">
                    <a class="header__dropdown-menu-button" title="Выйти из аккаунта" data-js-btn-logOut>Log Out</a>
                </li>
            </ul>`
            :
            `<ul class="header__dropdown-menu-list">
                <li class="header__dropdown-menu-item">
                    <a href="auth.html" target="_self" class="header__dropdown-menu-button" title="Войти" data-js-btn-logIn>Log In</a>
                </li>
                <li class="header__dropdown-menu-item">
                    <a href="reg.html"  target="_self" class="header__dropdown-menu-button" title="Зарегистрироваться" data-js-btn-singIn>Sign In</a>
                </li>
            </ul>`

        this.menuDivElement.classList.add('visible');
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        return true;

    }

    static async logOut(e){
        try{
            const response = await fetch("http://localhost:3000/API/auth/logout", {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const body = await response.json();
            console.log(body);
            if (response.ok){
                localStorage.removeItem('token');
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}