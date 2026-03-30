<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Certificat de travail</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 14px;
            color: #333;
            line-height: 1.6;
            margin: 40px;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 22px;
            text-transform: uppercase;
        }

        .content {
            margin-top: 20px;
            position: relative;
        }

        .signature {
            margin-top: 60px;
            text-align: right;
        }

        .signature p {
            margin-bottom: 60px;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            font-size: 12px;
        }

        .highlight {
            font-weight: bold;
            color: #000;
        }

        .center {
            text-align: center;
        }
        .img{
            width:200px;
            height:60px;
        }
        .img_background{
            position: absolute;
            width:100%;
            height:100%;
            top:0;
            bottom:0;
            left:0;
            right:0;
            display: flex;
            place-content: center;
            justify-content: center;
            opacity: 0.5;
            z-index: 1;
        }
        
        .ecriteau{
            position: relative;
            z-index: 2;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Certificat de Travail</h1>
    </div>

    <div class="content">
        <div class="img_background">
       <img style="width:500px;height:200px;" src="{{ storage_path('app/public/images/broboli_footer_1.png') }}" alt="Lce">
        </div>
        <div class="ecriteau">
        <p>
          Nous soussignés, <span class="highlight">{{ $offre->entreprise->nom }}</span> 
          <span class="highlight">{{ $offre->entreprise->ville }},{{ $offre->entreprise->quartier}}</span>, certifions que Monsieur/Madame
          <span class="highlight">{{ $student->nom}} {{ $student->prenoms}}</span>, a été employé dans notre société en qualité de
          <span class="highlight">{{ $offre->nom_offre}}</span> du 
          <span class="highlight">{{ \Carbon\Carbon::parse($offre->job_debut ?? now())->format('d/m/Y') }}</span>
            au
            <span class="highlight">{{ \Carbon\Carbon::parse($offre->job_fin ?? now())->format('d/m/Y') }}</span>..
        </p>

       <p>
          Il nous quitte ce jour, libre de tout engagement.
        </p>
        <p>
          En foi de quoi, nous lui délivrons ce présent certificat de travail, pour servir et valoir ce que de droit.
        </p>

        <div class="signature">
            <p>Fait à ABIDJAN, le {{ \Carbon\Carbon::parse(now())->format('d/m/Y') }}</p>
            <p style="text-align:right;">Le Représentant Légal</p>
        </div>
        </div>
    </div>
    <div class="footer">
       <p>Powered by LA LOCOMOTIVE (LCE)</p>
       <img class="img"  src="{{ storage_path('app/public/images/logo_lce.png') }}" alt="Lce">
    </div>
</body>
</html>
