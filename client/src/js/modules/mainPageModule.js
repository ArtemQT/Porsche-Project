import { AudioPlayer } from "./audioRoadModules/audioRoadModule.js";
import { AuthMenu } from "./AuthMenuModules/AuthMenuModule.js";

AuthMenu.AuthMenuInit();
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

