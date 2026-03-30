<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Newsletter;
use App\Models\DateLancement;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;
use App\Notifications\DateLancementDepasseeNotification;

class CheckDateLancement extends Command
{
    protected $signature = 'check:date-lancement';

    protected $description = 'Vérifie si une date de lancement est dépassée et envoie une notification';

    public function handle()
    {
        $today = Carbon::today();

        // On récupère un seul enregistrement dont la date est dépassée
        $record = DateLancement::where('date_lancement', '<', $today)->first();

        if (!$record) {
            $this->info('Aucune date de lancement dépassée trouvée.');
            return;
        }

        // Destinataires (Newsletter)
        $destinataires = Newsletter::all();

        // Envoi d'une notification pour CET enregistrement
        Notification::send($destinataires, new DateLancementDepasseeNotification());

        // Si un jour tu veux notifier un utilisateur spécifique lié au record :
        // $record->user?->notify(new DateLancementDepasseeNotification());

        $this->info('Notification envoyée pour la date de lancement dépassée.');
    }
}
