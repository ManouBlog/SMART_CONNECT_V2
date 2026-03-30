<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\AbonementUsers;
use Illuminate\Console\Command;


class CheckAbonnements extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'abonnements:check';

    

    /**
     * The console command description.
     *
     * @var string
     */
   protected $description = 'Vérifie les abonnements expirés et les désactive';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $today = Carbon::now();

        // On récupère tous les abonnements expirés
        $abonnements = AbonementUsers::where('echeance', '<', $today)
                                  ->where('statut', 'success')
                                  ->get();

                                  
        foreach ($abonnements as $abonnement) {
            $abonnement->statut = 'expired';
            $abonnement->save();
        }

          $this->info("CHECK ABONENEMNT LANCER.");

        return Command::SUCCESS;
    }
}
