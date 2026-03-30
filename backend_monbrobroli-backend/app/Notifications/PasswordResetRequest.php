<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordResetRequest extends Notification implements ShouldQueue
{
    use Queueable;

    protected $token, $code, $email;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token, $code, $email)
    {
        $this->token = $token;
        $this->code = $code;
        $this->email = $email;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via()
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail()
    {
        $url = 'https://monbrobroli.com/change_password/' . $this->email . '/' . $this->token;
        if ($this->code === null) {
            return (new MailMessage)
                ->greeting('Bonjour !')
                ->subject('Réinitialisation du mot de passe')
                ->line('Vous recevez cet e-mail car une demande de réinitialisation du mot de passe a été effectuée pour votre compte.')
                ->action('Redéfinir le mot de passe',$url);
        }
        return (new MailMessage)
            ->greeting('Bonjour !')
            ->subject('Réinitialisation du mot de passe')
            ->line('Vous recevez cet e-mail car une demande de réinitialisation du mot de passe a été effectuée pour votre compte.')
            ->line("Utilisez le mot de passe temporaire suivant pour vous connecter : ".$this->code)
            ->line("Pour des raisons de sécurité, veuillez le modifier dès votre première connexion.
            Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer ce message");

    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray()
    {
        return [
            //
        ];
    }
}
