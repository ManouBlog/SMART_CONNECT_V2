<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MessageAccueilCompany extends Notification
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
            'objet' => 'Message de bienvenue – Entreprises/Particuliers',
            'msg' => "Bienvenue sur MonBrobroli !
 
Merci d’avoir rejoint MonBrobroli, la plateforme spécialisée dans le recrutement de talents étudiants pour des emplois temporaires : stages, missions ponctuelles et besoins de courte durée.
 
MonBrobroli vous permet de répondre efficacement à vos besoins en main-d’œuvre temporaire avec des profils disponibles et ciblés.
 
Avantage de bienvenue
 
Votre première offre d’emploi temporaire est gratuite
Les publications suivantes sont accessibles via nos formules d’abonnement
 
La publication et la gestion des offres se font exclusivement via le site web.",
            'user' => $this->user,
            'links' => [
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
