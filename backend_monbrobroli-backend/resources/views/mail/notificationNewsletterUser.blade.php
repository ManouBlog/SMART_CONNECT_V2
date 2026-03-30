<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/png" sizes="32x32" href="https://backend.monbrobroli.com/public/storage/images/logo_brobroli.png">
<link rel="icon" type="image/png" sizes="16x16" href="https://backend.monbrobroli.com/public/storage/images/logo_brobroli.png">
    <title>{{ $objet }}</title>

</head>
<body style="font-family: Arial, sans-serif; line-height:1.6; color:#333; background-color:#f9f9f9; padding:20px; margin:0;">

    <!-- Conteneur principal -->
    <table align="center" width="600" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0; border-radius:10px; overflow:hidden; background-color:#fff;">
        <!-- Entête avec logo -->
        <tr>
            <td align="center" bgcolor="#1d4f5c" style="padding:20px;">
                <img src="https://backend.monbrobroli.com/public/storage/images/logo_brobroli.png" alt="Brobroli" width="90" style="display:block; border:0; outline:none; text-decoration:none;">
            </td>
        </tr>

        <!-- Contenu -->
        <tr>
            <td style="padding:30px; color:#333;">
                <h4 style="margin-top:0;">Bonjour,{{ $user->nom }}</h4>
                
                <p style="font-size:16px; line-height:1.5;">
                    {!! nl2br(e($msg)) !!}
                </p>
           @if(!empty($links) && is_array($links))
    <table align="center" cellpadding="0" cellspacing="0" style="margin:30px auto;">
        <tr>
            <td align="center">
                @foreach($links as $link)
                    @if(!empty($link['value']))
                        <a href="{{ $link['value'] }}"
                           target="_blank"
                           style="
                               background-color:#ff7f00;
                               color:#ffffff;
                               padding:12px 25px;
                               text-decoration:none;
                               border-radius:5px;
                               font-weight:bold;
                               display:inline-block;
                               margin:5px;
                               font-size:14px;
                           ">
                            {{ $link['key'] ?? 'Voir plus' }}
                        </a>
                    @endif
                @endforeach
            </td>
        </tr>
    </table>
@endif

                <p style="font-size:14px; color:#555;">Merci,<br>L’équipe MonBrobroli</p>
            </td>
        </tr>

        <!-- Pied de mail -->
        <tr>
            <td bgcolor="#f2f2f2" align="center" style="padding:15px; font-size:12px; color:#777;">
                &copy; {{ date('Y') }} MonBrobroli. Tous droits réservés.
            </td>
        </tr>
    </table>

</body>
</html>
