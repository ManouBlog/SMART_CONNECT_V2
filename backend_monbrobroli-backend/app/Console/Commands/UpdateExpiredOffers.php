<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\OffreStudent;
use Carbon\Carbon;

class UpdateExpiredOffers extends Command
{
    /**
     * Nom et signature de la commande
     *
     * Ici : 'offers:update-expired' sera utilisé pour lancer la commande
     * Exemple : php artisan offers:update-expired
     */
    protected $signature = 'offers:update-expired';

    /**
     * Description de la commande
     */
    protected $description = 'Met à jour automatiquement toutes les offres expirées dans offre_students en passant recruit = 2';

    /**
     * Exécution de la commande
     */
    public function handle()
    {
        // Récupère et met à jour toutes les lignes OffreStudent dont l’offre est expirée
       
$count = OffreStudent::whereHas('offre', function ($query) {
    $query->where('job_debut', '<', Carbon::now()->addDay());
})
->where('recruit', 0)
->update(['recruit' => 2]);

        // Message dans la console
        $this->info("✅ $count ligne(s) OffreStudent mises à jour avec recruit = 2.");
    }
}
