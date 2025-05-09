class AnimationRowSection {
    constructor() {
        this.modelRowElement = document.querySelector('.modelRow__list');
        this.modelRowTitle = document.querySelector('.modelRow__title')
        this.introCarSection = document.querySelector('.introCars');
        this.fincCarContainer = document.querySelector('.findCar__container');

        this.setScrollHandlers();
        this.setPlayVideoHandlers();
    }

    setScrollHandlers = () => {
        window.addEventListener('scroll', this.checkBoundaries);
        window.addEventListener('resize', this.checkBoundaries);
    }

    checkBoundaries = () => {
        const modelRowCoordinates = this.modelRowElement.getBoundingClientRect();

        // Логирование
        console.log(modelRowCoordinates.top , modelRowCoordinates.bottom);

        const minVisiblePX = 150;
        const isVisible = (modelRowCoordinates.top <= (window.innerHeight - minVisiblePX)
            && modelRowCoordinates.bottom >= minVisiblePX)

        if (isVisible) {
            this.modelRowTitle.classList.add('modelRow__title-inverse');

            this.introCarSection.classList.add('introCars-inverse');
            this.fincCarContainer.classList.add('findCar-inverse');

            document.body.classList.add('body-inverse');
        }
        else{
            this.modelRowTitle.classList.remove('modelRow__title-inverse');

            this.introCarSection.classList.remove('introCars-inverse');
            this.fincCarContainer.classList.remove('findCar-inverse');

            document.body.classList.remove('body-inverse');
        }
    }

    setPlayVideoHandlers = () => {
        const modelRowItemsCollection = document.querySelectorAll('.modelRow__item');
        modelRowItemsCollection.forEach(modelRowItem => {
            const video = modelRowItem.querySelector('.modelRow__item-video')

            modelRowItem.addEventListener('mouseenter', () => {
                video.play();

                if(modelRowItem.matches(':nth-child(odd)')){
                    modelRowItem.style.width = '900px'
                    modelRowItem.nextElementSibling.style.width = '800px'
                }
                else{
                    modelRowItem.style.width = '900px'
                    modelRowItem.previousElementSibling.style.width = '800px'
                }

            })
            modelRowItem.addEventListener('mouseleave', () => {

                if(modelRowItem.matches(':nth-child(odd)')){
                    modelRowItem.style.width = '900px'
                    modelRowItem.nextElementSibling.style.width = '850px'
                }
                else{
                    modelRowItem.style.width = '900px'
                    modelRowItem.previousElementSibling.style.width = '800px'
                }

                video.pause();
                video.currentTime = 0;
            })
        })
    }
}


new AnimationRowSection();
