<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotificationTalent extends Notification
{
    use Queueable;
    protected $talent;
    protected $infoContrat;
    protected $recruit;
   
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($talent,$infoContrat,$recruit)
    {
        $this->talent = $talent;
        $this->infoContrat = $infoContrat;
        $this->recruit = $recruit;
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
          $subject = '';
           if ($this->recruit === 1) {
        $subject = 'Bonjour ' . $this->talent->nom . ' Félicitations ! Votre candidature a été retenue pour le poste de : '.$this->infoContrat->nom_offre;
         }
        if ($this->recruit === 2) {
        $subject = 'Bonjour ' . $this->talent->nom . '! nous vous remercions pour l’intérêt porté au poste de '.$this->infoContrat->nom_offre.' . Après étude, votre candidature n’a pas été retenue, mais nous vous encourageons à postuler à d’autres opportunités.';
        }
        return (new MailMessage)
        ->subject($subject)
        ->priority(1)
        ->view('mail.notificationsTalent',[
            'talent'=>$this->talent,
            'infoContrat' => $this->infoContrat,
            'recruit'=> $this->recruit,
            'subject' => $subject
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
