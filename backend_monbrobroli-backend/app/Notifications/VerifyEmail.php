<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyEmail extends Notification
{
    use Queueable;
    protected $token, $email;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
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
         $verificationUrl = 'https://monbrobroli.com/' . $this->email . '/' . $this->token;
        return (new MailMessage)
        ->subject('Vérification de votre adresse email')
        ->view('mail.verification-mail', [
            'verificationUrl' => $verificationUrl,
        ]);
        // return (new MailMessage)
        //     ->subject('Vérification de votre adresse email')
        //     ->line('Merci de vous être inscrit!')
        //     ->line('Cliquez sur le bouton ci-dessous pour vérifier votre adresse email.')
        //     ->action('Vérifier mon email', $verificationUrl)
        //     ->line("Si vous n'avez pas créé de compte, aucune action n'est requise.");
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
