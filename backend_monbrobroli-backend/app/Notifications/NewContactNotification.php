<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;


class NewContactNotification extends Notification
{
    use Queueable;

    public $contactData;

    /**
     * Create a new notification instance.
     */
    public function __construct($contactData)
    {
        $this->contactData = $contactData;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database']; // Ajoute 'slack' si tu veux
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $subject = 'Nouveau message de contact: ' . 
                  ($this->contactData['objet'] ?? $this->contactData['objet'] ?? 'Sans objet');

        return (new MailMessage)
            ->subject($subject)
            ->from(
                $this->contactData['email'] ?? config('mail.from.address'),
                ($this->contactData['prenom'] ?? '') . ' ' . ($this->contactData['nom'] ?? '')
            )
            ->replyTo(config('mail.from.address'))
            ->line('**Nouveau message de contact reçu !**')
            ->line('**Nom:** ' . ($this->contactData['prenom'] ?? '') . ' ' . ($this->contactData['nom'] ?? ''))
            ->line('**Email:** ' . ($this->contactData['user_mail'] ?? 'Non renseigné'))
            // ->line('**Téléphone:** ' . ($this->contactData['telephone'] ?? $this->contactData['phone'] ?? 'Non renseigné'))
            ->line('**Sujet:** ' . ($this->contactData['objet'] ?? $this->contactData['subject'] ?? 'Sans objet'))
            ->line('**Message:**')
            ->line($this->contactData['message'] ?? 'Aucun message');
            // ->action('Voir les messages', url('/admin/contacts'))
            // ->line('Merci de prendre contact rapidement avec cette personne !');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable)
    {
        //
    }
}