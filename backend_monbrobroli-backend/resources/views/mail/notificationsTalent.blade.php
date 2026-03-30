<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>{{ $subject }}</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center" style="padding:20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                    
                    <!-- HEADER -->
                    <tr>
                        <td style="background:#2c3e50; padding:20px; text-align:center;">
                            <img src="https://backend.monbrobroli.com/public/storage/images/logo_brobroli.png" alt="Smart Connect" style="max-height:50px;">
                        </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                        <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
                            <!-- <h2 style="color:#2c3e50; margin-top:0;">Bonjour {{ $talent->nom }},</h2> -->

                            <p>{{ $subject }}</p>

                            <!-- @if($recruit === 1)
                                <p style="color:green; font-weight:bold;">Félicitations 🎉</p>
                                <p>Nous sommes ravis de vous annoncer que votre candidature a été retenue pour le poste de <strong>{{ $infoContrat->nom_offre }}</strong>.</p>
                            @else
                                <p style="color:red; font-weight:bold;">Candidature non retenue</p>
                                <p>Nous vous remercions pour l’intérêt porté au poste de <strong>{{ $infoContrat->nom_offre }}</strong>, mais votre candidature n’a pas été retenue cette fois-ci.
                                mais nous vous encourageons à postuler à d’autres opportunités.</p>
                            @endif -->

                            <p style="margin:25px 0;">
                                <a href="https://monbrobroli.com/"
                                   style="background:#3498db; color:white; padding:12px 20px; text-decoration:none; font-weight:bold; border-radius:5px; display:inline-block;">
                                    Voir les détails
                                </a>
                            </p>

                            <p>Merci pour votre confiance et à très bientôt,<br>
                            <strong>L’équipe MonBrobroli</strong></p>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="background:#ecf0f1; padding:15px; text-align:center; font-size:12px; color:#7f8c8d;">
                            © {{ date('Y') }} MonBrobroli. Tous droits réservés.<br>
                            <a href="https://monbrobroli.com/" style="color:#3498db; text-decoration:none;">Visitez notre site</a>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
