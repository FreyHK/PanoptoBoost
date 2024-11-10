/**
 * 2024 Frey Husted
 * https://github.com/FreyHK
 */

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();

function createBoostControls () {
    boostUpBtn = document.createElement("div");
    boostUpBtn.id = 'boostUpButton';
    boostUpBtn.innerText = '🗣️🔊🔥';
    boostUpBtn.addEventListener('click', increaseGain);

    resetBtn = document.createElement("div");
    resetBtn.id = 'boostResetButton';
    resetBtn.innerText = '🔄';
    resetBtn.addEventListener('click', resetGain);

    const captionsBtn = document.querySelector("#captionsButton");
    document.querySelector("div#transportControls").insertBefore(resetBtn, captionsBtn);
    document.querySelector("div#transportControls").insertBefore(boostUpBtn, resetBtn);
}

const maxGain = 256;
const gainMultiplier = 2;

function increaseGain() {
    let newGain = gainNode.gain.value == 1 ? 2 : Math.min(gainNode.gain.value * gainMultiplier, maxGain);
    gainNode.gain.value = newGain;
    alert(`Increased gain to ${newGain}x\n🗣️🗣️🔥🔥🔥🆙🆙`);
}

function resetGain() {
    gainNode.gain.value = 1;
    alert(`Reset gain to default.`);
}

const videoElement = document.querySelector("video#primaryVideo")

// If no element found, just do nothing.
if (videoElement) {
    const source = audioContext.createMediaElementSource(videoElement);

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    createBoostControls ();
}