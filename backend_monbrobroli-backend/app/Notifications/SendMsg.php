<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendMsg extends Notification implements ShouldQueue
{
    use Queueable;
    protected $myOffre;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($myOffre)
    {
        $this->myOffre = $myOffre;
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
    public function toMail($notifiable)
    {
        return (new MailMessage)
        ->subject("Nouvel Offre :" . $this->myOffre->nom_offre)
        ->priority(1)
        ->view('mail.notificationNewsletter',[
            'offre'=>$this->myOffre,
        'user' => $notifiable ,// Passez l'utilisateur à la vue,
        'lien'=> 'https://monbrobroli.com/jobs'
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
