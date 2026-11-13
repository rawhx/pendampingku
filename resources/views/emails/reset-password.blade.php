<!DOCTYPE html>
<html lang="id" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>{{ $appName }} — Atur Ulang Kata Sandi</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
        }
        a {
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .container {
                width: 100% !important;
            }
            .px {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }
            .heading {
                font-size: 22px !important;
                line-height: 30px !important;
            }
        }
    </style>
</head>
<body style="margin:0;padding:0;background-color:#fafafa;">
    <div style="display:none;font-size:1px;color:#fafafa;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Tautan atur ulang kata sandi {{ $appName }} berlaku {{ $expire }} menit.
        &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa;">
        <tr>
            <td align="center" style="padding:32px 16px;">
                <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:24px;overflow:hidden;">
                    <!-- Aksen atas -->
                    <tr>
                        <td style="background-color:#0081F2;height:6px;font-size:0;line-height:0;">&nbsp;</td>
                    </tr>

                    <!-- Logo -->
                    <tr>
                        <td class="px" style="padding:32px 40px 0 40px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td width="36" height="36" align="center" valign="middle" style="width:36px;height:36px;background-color:#0081F2;border-radius:10px;color:#ffffff;font-family:-apple-system,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;line-height:36px;">
                                        P
                                    </td>
                                    <td style="padding-left:10px;font-family:-apple-system,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;font-weight:700;color:#191919;letter-spacing:-0.31px;">
                                        {{ $appName }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Judul -->
                    <tr>
                        <td class="px" style="padding:28px 40px 0 40px;">
                            <h1 class="heading" style="margin:0;font-family:-apple-system,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:24px;line-height:32px;font-weight:700;color:#191919;letter-spacing:-0.5px;">
                                Atur Ulang Kata Sandi
                            </h1>
                        </td>
                    </tr>

                    <!-- Isi -->
                    <tr>
                        <td class="px" style="padding:16px 40px 0 40px;font-family:-apple-system,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;color:#464646;">
                            <p style="margin:0 0 12px 0;font-weight:600;color:#191919;">
                                Halo, {{ $name }}!
                            </p>
                            <p style="margin:0;">
                                Kami menerima permintaan untuk mengatur ulang kata sandi akun
                                <strong style="color:#191919;">{{ $email }}</strong>.
                                Tekan tombol di bawah untuk membuat kata sandi baru.
                            </p>
                        </td>
                    </tr>

                    <!-- Tombol -->
                    <tr>
                        <td class="px" style="padding:28px 40px 0 40px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center" bgcolor="#0081F2" style="background-color:#0081F2;border-radius:28px;">
                                        <a href="{{ $url }}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:-apple-system,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:20px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:28px;">
                                            Atur Ulang Kata Sandi
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Link cadangan -->
                    <tr>
                        <td class="px" style="padding:20px 40px 0 40px;font-family:-apple-system,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#adadad;">
                            <p style="margin:0 0 4px 0;">
                                Jika tombol tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:
                            </p>
                            <p style="margin:0;word-break:break-all;">
                                <a href="{{ $url }}" target="_blank" style="color:#0081F2;word-break:break-all;">{{ $url }}</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Info kedaluwarsa -->
                    <tr>
                        <td class="px" style="padding:24px 40px 0 40px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="background-color:#e6f2fe;border-left:3px solid #0081F2;border-radius:8px;padding:12px 16px;font-family:-apple-system,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#0061b6;">
                                        Tautan ini hanya berlaku selama <strong>{{ $expire }} menit</strong> sejak email dikirim.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Catatan keamanan -->
                    <tr>
                        <td class="px" style="padding:16px 40px 0 40px;font-family:-apple-system,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#737373;">
                            <p style="margin:0;">
                                Jika Anda tidak meminta reset kata sandi, abaikan email ini.
                                Kata sandi Anda tidak akan berubah.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td class="px" style="padding:28px 40px 0 40px;">
                            <div style="border-top:1px solid #ededed;font-size:0;line-height:0;">&nbsp;</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="px" style="padding:20px 40px 32px 40px;text-align:center;font-family:-apple-system,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#adadad;">
                            <p style="margin:0 0 2px 0;font-weight:600;color:#737373;">
                                {{ $appName }}
                            </p>
                            <p style="margin:0 0 6px 0;">
                                Mendampingi tumbuh kembang anak
                            </p>
                            <p style="margin:0;">
                                Email ini dikirim otomatis, mohon tidak dibalas.
                            </p>
                            <p style="margin:6px 0 0 0;">
                                &copy; {{ date('Y') }} {{ $appName }}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
