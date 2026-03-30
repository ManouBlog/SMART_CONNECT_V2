<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CertificatMail extends Mailable
{
    use Queueable, SerializesModels;
     public $student;
    public $pdfData;
    public $offre;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($pdfData, $student,$offre)
    {
          $this->pdfData = $pdfData;
        $this->student = $student;
        $this->offre = $offre;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Votre certificat de travail',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.certificat',
            with: [
                'student' => $this->student,
                'offre'=>$this->offre
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [
            \Illuminate\Mail\Mailables\Attachment::fromData(
                fn () => $this->pdfData,
                "certificat-{$this->student->id}.pdf"
            )->withMime('application/pdf'),
        ];
    }
}
