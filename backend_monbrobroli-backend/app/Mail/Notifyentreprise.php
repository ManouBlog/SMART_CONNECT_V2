<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Notifyentreprise extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $data=[];
    public $data1=[];

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mail,$studentConnecte)
    {
        $this->data  = $mail;
        $this->data1  = $studentConnecte;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.entreprise')
                     ->from(env('MAIL_FROM_ADDRESS'))
                     ->subject('l\'etudiant a modifié son emploi du temps.');
    }
}
