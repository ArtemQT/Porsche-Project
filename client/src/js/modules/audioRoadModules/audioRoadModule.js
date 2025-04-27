export class AudioPlayer {
    constructor(waveSurf, button, playerWrapper) {
        this.waveSurf = WaveSurfer.create(waveSurf);
        this.buttonControlElement = button;
        this.audioPlayerWrapper = playerWrapper;

        this.setHandlers();
    }

    setHandlers() {
        this.buttonControlElement.addEventListener('mousedown', (e) => {
            this.startPlay(e)
        })
        this.audioPlayerWrapper.addEventListener('mouseup', (e) => {
            this.stopPlay(e)
        })
        this.audioPlayerWrapper.addEventListener('mouseout', (e) => {
            this.stopPlay(e)
        })
    }

    startPlay(e){
        this.buttonControlElement.classList.add("hidden")
        this.audioPlayerWrapper.classList.remove("hidden")
        this.waveSurf.play();
    }

    stopPlay(e){
        this.waveSurf.stop();
        this.buttonControlElement.classList.remove("hidden")
        this.audioPlayerWrapper.classList.add("hidden")
    }
}


