<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewsLetterOrNotification extends Notification
{
    use Queueable;
    protected $objet,$msg,$links;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($objet,$msg,$links)
    {
         $this->objet = $objet;
        $this->msg = $msg;
        $this->links = $links;
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
                    ->subject($this->objet)
                   ->view('mail.notificationNewsletterUser',[
                    'objet'=>$this->objet,
                      'msg'=>$this->msg,
                       'user' => $notifiable,
                       'links' => $this->links,
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
