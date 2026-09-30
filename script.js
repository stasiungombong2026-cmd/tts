const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voiceSelect");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");
const rateValue = document.getElementById("rateValue");
const pitchValue = document.getElementById("pitchValue");
const statusDiv = document.getElementById("status");

let voices = [];
let currentUtterance = null;

function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        
        if (voice.lang === 'id-ID' || voice.lang.startsWith('id')) {
            option.selected = true;
        }
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

rateInput.addEventListener('input', () => { rateValue.textContent = rateInput.value; });
pitchInput.addEventListener('input', () => { pitchValue.textContent = pitchInput.value; });

function updateStatus(msg) {
    statusDiv.textContent = msg;
}

function proses() {
    if (synth.speaking) {
        synth.cancel();
    }

    const teks = document.getElementById("pesan").value;
    if (teks.trim() === "") {
        alert("Silakan masukkan teks terlebih dahulu!");
        return;
    }
    
    currentUtterance = new SpeechSynthesisUtterance(teks);
    const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const selectedVoice = voices.find(v => v.name === selectedVoiceName);
    
    if (selectedVoice) {
        currentUtterance.voice = selectedVoice;
    }
    
    currentUtterance.rate = parseFloat(rateInput.value);
    currentUtterance.pitch = parseFloat(pitchInput.value);
    
    currentUtterance.onstart = () => updateStatus("💬 Sedang bersuara...");
    currentUtterance.onend = () => updateStatus("✅ Selesai.");
    currentUtterance.onerror = () => updateStatus("❌ Terjadi kesalahan.");

    synth.speak(currentUtterance);
}

function pauseAudio() {
    if (synth.speaking && !synth.paused) {
        synth.pause();
        updateStatus("⏸ Suara dijeda (Pause).");
    }
}

function resumeAudio() {
    if (synth.paused) {
        synth.resume();
        updateStatus("💬 Melanjutkan suara...");
    }
}

function stopAudio() {
    if (synth.speaking) {
        synth.cancel();
        updateStatus("⏹ Suara dihentikan.");
    }
}
