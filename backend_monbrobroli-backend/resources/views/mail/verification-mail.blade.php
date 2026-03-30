<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Vérification email</title>
</head>
<body style="margin:0; padding:0; background:#f5f5f5; font-family: Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center">

            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin-top:30px; border-radius:6px;">
                <tr>
                    <td align="center" style="padding:20px;">
                      <img src="https://backend.monbrobroli.com/public/storage/images/logo_brobroli.png" alt="Brobroli" width="90" style="display:block; border:0; outline:none; text-decoration:none;">
                    </td>
                </tr>

                <tr>
                    <td style="padding:20px; color:#333;">
                        <h2 style="margin-top:0;">Vérification de votre adresse email</h2>

                        <p>Merci pour votre inscription !</p>
                        <p>Veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous.</p>

                        <p style="text-align:center; margin:30px 0;">
                            <a href="{{ $verificationUrl }}"
                               style="background:#2563eb; color:#ffffff; padding:12px 24px;
                                      text-decoration:none; border-radius:4px; display:inline-block;">
                                Vérifier mon e-mail
                            </a>
                        </p>

                        <p style="font-size:13px; color:#777;">
                            Si vous n’avez pas créé de compte, aucune action n’est requise.
                        </p>
                    </td>
                </tr>

                <tr>
                    <td align="center" style="padding:15px; font-size:12px; color:#999;">
                        © {{ date('Y') }} MonBroBroli
                    </td>
                </tr>
            </table>

        </td>
    </tr>
</table>

</body>
</html>
