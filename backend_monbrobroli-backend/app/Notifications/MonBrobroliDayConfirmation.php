<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class MonBrobroliDayConfirmation extends Notification
{
    use Queueable;

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Confirmation reçue – MonBrobroli Day')
            ->view('mail.notificationNewsletterUser', [
                'objet' => 'Confirmation reçue – MonBrobroli Day',
                'msg' => "Bonjour,
Merci pour votre réponse et pour la confirmation de votre présence à MonBrobroli Day.

Nous avons bien reçu votre inscription et nous sommes ravis de vous compter parmi les participants.

📅 Date : 14 février 2026
🕙 Heure : 10h00 – 13h00
📍 Lieu : AGEL CENTER

Nous vous attendons donc le jour J pour cette journée dédiée à votre employabilité, au networking et à la valorisation de vos expériences professionnelles.

N’hésitez pas à venir quelques minutes en avance pour un accueil confortable.

À très bientôt !

L’équipe MonBrobroli",
                'user' => $notifiable,
                'links' => [
                    [
                        'key' => 'Site web',
                        'value' => 'https://monbrobroli.com/'
                    ],
                ],
            ]);
    }
}
