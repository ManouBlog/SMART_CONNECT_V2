<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>{{ $objet ?? 'Notification' }}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:30px;">
                    
                    {{-- Titre --}}
                    <tr>
                        <td style="font-size:20px;font-weight:bold;color:#333333;padding-bottom:20px;">
                            {{ $objet ?? '' }}
                        </td>
                    </tr>

                    {{-- Message --}}
                    <tr>
                        <td style="font-size:15px;line-height:1.6;color:#555555;white-space:pre-line;">
                            {{ $msg ?? '' }}
                        </td>
                    </tr>

                    {{-- Boutons / Liens --}}
                    @if(!empty($links))
                        <tr>
                            <td style="padding-top:25px;">
                                @foreach($links as $link)
                                    <a href="{{ $link['value'] }}"
                                       style="display:inline-block;margin-right:10px;
                                              background-color:#f97316;
                                              color:#ffffff;
                                              padding:10px 18px;
                                              text-decoration:none;
                                              border-radius:6px;
                                              font-weight:bold;">
                                        {{ $link['key'] }}
                                    </a>
                                @endforeach
                            </td>
                        </tr>
                    @endif

                    {{-- Footer --}}
                    <tr>
                        <td style="padding-top:30px;font-size:12px;color:#999999;">
                            © {{ date('Y') }} MonBrobroli. Tous droits réservés.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
