/**
 * 2024 Frey Husted
 * https://github.com/FreyHK
 */

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();

function createBoostControls () {
    boostUpBtn = document.createElement("div");
    boostUpBtn.id = 'boostUpButton';
    boostUpBtn.innerText = '🗣️⬆️';
    boostUpBtn.addEventListener('click', increaseGain);

    const captionsBtn = document.querySelector("#captionsButton");
    document.querySelector("div#transportControls").insertBefore(boostUpBtn, captionsBtn);
}

let multLevel = 0;
const maxMultLevel = 9;

function increaseGain() {
    multLevel = (multLevel + 1) % maxMultLevel;
    let newGain = Math.pow(2, multLevel);
    gainNode.gain.value = newGain;
    document.querySelector('#boostUpButton').innerText = `🗣️${newGain}×`;
}

const videoElement = document.querySelector("video#primaryVideo")

// If no element found, just do nothing.
if (videoElement) {
    const source = audioContext.createMediaElementSource(videoElement);

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    createBoostControls ();
}