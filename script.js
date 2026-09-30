const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voiceSelect");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");
const rateValue = document.getElementById("rateValue");
const pitchValue = document.getElementById("pitchValue");

let voices = [];

// Fungsi untuk memuat semua daftar suara bawaan browser/sistem
function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        
        // Pilih bahasa Indonesia (id-ID) sebagai default jika tersedia
        if (voice.lang === 'id-ID') {
            option.selected = true;
        }
        
        voiceSelect.appendChild(option);
    });
}

// Menangani sinkronisasi daftar suara di berbagai browser
populateVoiceList();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

// Menampilkan nilai slider secara dinamis saat digeser
rateInput.addEventListener('input', () => { rateValue.textContent = rateInput.value; });
pitchInput.addEventListener('input', () => { pitchValue.textContent = pitchInput.value; });

// Fungsi utama untuk menjalankan text to speech
function proses() {
    // Menghentikan suara yang sedang berjalan jika tombol diklik ulang
    if (synth.speaking) {
        synth.cancel();
    }

    const teks = document.getElementById("pesan").value;
    if (teks.trim() === "") {
        alert("Silakan masukkan teks terlebih dahulu!");
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(teks);
    
    // Mendapatkan suara yang dipilih pengguna dari dropdown
    const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const selectedVoice = voices.find(v => v.name === selectedVoiceName);
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
    
    // Memasukkan pengaturan kecepatan dan nada suara
    utterance.rate = parseFloat(rateInput.value);
    utterance.pitch = parseFloat(pitchInput.value);
    
    synth.speak(utterance);
}
