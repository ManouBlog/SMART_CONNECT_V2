<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TestMarkdownMail extends Mailable
{
    use Queueable, SerializesModels;
    public $data=[];
    public $data1=[];


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($student, $createOffre)
    {
        $this->data  = $student;
        $this->data1  = $createOffre;
    
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $url = 'http://192.168.1.4:8080/jobs';
        return $this->from('support@lce-ci.com', 'support@lce-ci.com')
                    ->subject('Alertes nouvel offre.')
                    ->markdown('mail.markdown-test',['url'=> $url]);
    }
}
