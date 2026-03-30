<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Notifyoffre extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $data=[];
    public $data1=[];

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($student,$create_offre)
    {
        $this->data  = $student;
        $this->data1  = $create_offre;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.offre')
                     ->from(env('MAIL_FROM_ADDRESS'))
                     ->subject('Alertes nouvel offre.');
    }
}
