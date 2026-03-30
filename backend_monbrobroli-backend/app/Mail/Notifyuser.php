<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Notifyuser extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $data=[];
    public $data1=[];

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($entrepriseMail,$studentMail)
    {
        $this->data  = $entrepriseMail;
        $this->data1  = $studentMail;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.user')
                     ->from(env('MAIL_FROM_ADDRESS'))
                     ->subject('Vous avez été choisi pour un travail.');
    }
}
