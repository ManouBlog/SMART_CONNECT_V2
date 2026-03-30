<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailsendAtentreprise extends Mailable
{
    use Queueable, SerializesModels;
    public $data=[];
    public $data1=[];

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mail,$StudentConnecte)
    {
        $this->data  = $mail;
        $this->data1  = $StudentConnecte;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('support@lce-ci.com')
                    ->markdown('mail.offre');
    }
}
