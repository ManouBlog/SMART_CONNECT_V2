<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifierEmailsCC extends Notification
{
    use Queueable;
    protected $talent;
    protected $infoContrat;
    protected $recruit;
    protected $emails_cc;
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
               $nom = $this->talent->nom;
        $nomOffre = $this->infoContrat->nom_offre;
        $statut = $this->recruit === 1 ? 'retenue' : 'refusée';
        $subject = "La candidature de l’étudiant {$nom} pour le poste '{$nomOffre}' a été {$statut}.";
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
