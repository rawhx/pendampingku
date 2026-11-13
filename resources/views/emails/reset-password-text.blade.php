{{ $appName }} - Atur Ulang Kata Sandi

Halo, {{ $name }}!

Kami menerima permintaan untuk mengatur ulang kata sandi akun {{ $email }}.
Buka tautan berikut untuk membuat kata sandi baru:

{{ $url }}

Tautan ini hanya berlaku selama {{ $expire }} menit sejak email dikirim.

Jika Anda tidak meminta reset kata sandi, abaikan email ini. Kata sandi Anda tidak akan berubah.

Salam,
Tim {{ $appName }}

---
Email ini dikirim otomatis, mohon tidak dibalas.
(c) {{ date('Y') }} {{ $appName }}
