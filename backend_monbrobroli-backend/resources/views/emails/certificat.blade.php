<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Certificat de travail</title>
</head>
<body>
    <p>Bonjour {{ $student->nom }}</p>

    <p>Veuillez trouver ci-joint votre certificat de travail relatif à l’offre
        {{ $offre->nom_offre }}
       que vous avez effectuée.</p>

    <p>Merci pour votre collaboration,<br>
       L’équipe MonBrobroli</p>
</body>
</html>
