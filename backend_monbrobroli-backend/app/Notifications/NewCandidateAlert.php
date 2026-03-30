<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewCandidateAlert extends Notification
{
    use Queueable;
    protected $offre;
    protected $emails_cc;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($offre,$emails_cc)
    {
        $this->offre = $offre;
        $this->emails_cc = $emails_cc;
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
                  ->subject("Quelqu'un vient de postuler pour cette offre:.")
                  ->priority(1)
                  ->subject('Nouvelle Candidature : ')
                  ->line('Une nouvelle personne a postulé à votre offre :'.$this->offre->nom_offre)
                  ->action('Consultez la candidature en suivant ce lien :', url('https://monbrobroli.com/'))
                  ->line('Merci d’utiliser notre plateforme !')
                  ->withSymfonyMessage(function ($message) {
                $message->getHeaders()->addMailboxListHeader(
                    'Cc',
                    $this->emails_cc
                    // [
                    //     'rh@monbrobroli.com',
                    //     'admin@monbrobroli.com',
                    // ]
                );
            });     
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
