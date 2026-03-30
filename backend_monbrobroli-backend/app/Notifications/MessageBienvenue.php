<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MessageBienvenue extends Notification
{
    use Queueable;
    protected  $user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($user)
    {
       
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
   public function toMail($notifiable)
{
    return (new MailMessage)
        ->subject('Bienvenue sur MonBrobroli 🎓')
        ->view('mail.notificationNewsletterUser', [
            'objet' => 'Bienvenue sur MonBrobroli – Étudiants',
            'msg' => "Bienvenue sur MonBrobroli !

Nous sommes ravis de vous compter parmi nous.

MonBrobroli est une plateforme dédiée aux étudiants à la recherche de stages, de jobs ponctuels et de missions de courte durée, compatibles avec votre emploi du temps académique.

Grâce à MonBrobroli, vous pouvez :
• postuler rapidement à des offres ciblées  
• gagner de l’expérience professionnelle  
• accéder à des opportunités adaptées à votre profil  

🎁 Offre spéciale de lancement

Faites partie des 1 000 premiers abonnés PLATINUM et bénéficiez automatiquement de 2 mois offerts.

C’est une occasion unique d’accéder à l’ensemble des offres disponibles et de maximiser vos chances de décrocher rapidement une mission.

📲 Où postuler ?

Vous pouvez postuler dès maintenant via :
- l’application Android (Play Store)
- le site web MonBrobroli

(L’application iOS sera bientôt disponible sur l’App Store.)

À très bientôt sur MonBrobroli,
L’équipe MonBrobroli",
            'user' => $this->user,
            'links' => [
                [
                    'key' => 'Android (Play Store)',
                    'value' => 'https://play.google.com/store/apps/details?id=com.monbrobroli.app&pcampaignid=web_share'
                ],
                [
                    'key' => 'Site web',
                    'value' => 'https://monbrobroli.com/'
                ],
            ],
        ]);
}

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
