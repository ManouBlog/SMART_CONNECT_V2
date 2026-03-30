<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Nouvelle Opportunité Exclusive</title>
    <style type="text/css">
        /* Styles modernes et responsives */
        body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f7f7f7; }
        .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: #4a6ee0; padding: 30px; text-align: center; }
        .content { padding: 30px; color: #444444; }
        .offer-card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; }
        .button { background: #4a6ee0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; }
        .date-badge { background: #e8f0fe; color: #4a6ee0; padding: 8px 12px; border-radius: 16px; display: inline-block; }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- En-tête moderne -->
        <div class="header">
            <h1 style="color: white; margin: 0;">NOUVELLE OFFRE</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0;">MonBrobroli - Votre partenaire carrière</p>
        </div>

        <!-- Contenu principal -->
        <div class="content">
            <p>Bonjour {{ $user['nom'] }},</p>
            
            <h2 style="color: #2c3e50;">
            Offre :    
            {{ $offre['nom_offre'] }}</h2>
            
            <!-- Carte d'offre moderne -->
            <div class="offer-card">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span class="date-badge">
                        📅 {{ \Carbon\Carbon::parse($offre['job_debut'])->locale('fr')->isoFormat('dddd D MMMM YYYY') }}
                    </span>
                    <!-- <span class="date-badge">
                        🕒 {{ $offre['heure'] }}
                    </span> -->
                </div>
                
                <h3 style="margin-top: 0; color: #4a6ee0;">📍 Lieu : {{ $offre['lieu'] }}</h3>
                <h3 style="margin-top: 0; color: #4a6ee0;">
                    Salaire :  
                    {{ $offre['salaire'] ?? 'À négocier' }} Fcfa / {{ $offre['pointage'] }} </h3>
                    <h3 style="margin-top: 0; color: #4a6ee0;">
                    Nombre de poste :  
                    {{ $offre['nbre_person']}}</h3>
                <!-- <p>{{ $offre['description'] }}</p> -->
                
                <!-- <div style="margin-top: 20px;">
                     <p><strong>Type :</strong> {{ $offre['type'] }}</p> 
                   
                
                     <p><strong>Contact :</strong> {{ $offre['contact_email'] }}</p>
                </div> -->
            </div>

            <!-- Bouton d'action principal -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ $lien }}" class="button">Postuler maintenant</a>
            </div>

            <!-- Section urgence -->
            <!-- <div style="background: #fff8e6; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                <h4 style="margin-top: 0;">⏳ Dernière chance !</h4>
                <p>Cette offre expire dans <strong>72 heures</strong>. Ne manquez pas cette opportunité !</p>
            </div> -->
        </div>

        <!-- Pied de page -->
        <div class="footer">
            <p>© {{ date('Y') }} MonBrobroli - Tous droits réservés</p>
            <p>
                <a href="#" style="color: #4a6ee0; text-decoration: none;">Se désabonner</a> | 
                <a href="#" style="color: #4a6ee0; text-decoration: none;">Confidentialité</a>
            </p>
            <p style="font-size: 11px; color: #999;">Vous recevez cet email car vous êtes inscrit sur notre plateforme.</p>
        </div>
    </div>
</body>
</html>