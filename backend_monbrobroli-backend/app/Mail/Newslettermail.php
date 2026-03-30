<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Newslettermail extends Mailable
{
    use Queueable, SerializesModels;
    public $data=[];


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($student)
    {
        $this->data  = $student;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $url = 'https://monbrobroli.com/jobs';
        return $this->view('mail.offre',['url'=> $url])
                    ->from('contact@monbrobroli.com', 'contact@monbrobroli.com')
                     ->subject('Bienvenue');
    }
}
