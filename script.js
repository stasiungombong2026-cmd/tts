function proses() {
    const teks = document.getElementById("pesan").value;
    if (teks.trim() === "") {
        alert("Silakan masukkan teks terlebih dahulu!");
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(teks);
    utterance.lang = 'id-ID'; // Mengatur bahasa ke Bahasa Indonesia
    window.speechSynthesis.speak(utterance);
}
