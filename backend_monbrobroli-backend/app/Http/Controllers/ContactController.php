<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewContactNotification;

class ContactController extends Controller
{
      public function store(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:50',
            'prenoms' => 'required|string|max:50',
            'email' => 'required|email|max:100',
            'objet' => 'required|string|max:200',
            'message' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
            ], 403);
        }

        // Traitement des données
        $contactData = [
            'nom' => $request->nom,
            'prenoms' => $request->prenoms,
            'email' => 'adjobikadjopierre27@gmail.com',
            'user_mail'=>$request->email,
            'objet' => $request->objet,
            'message' => $request->message,
            'submitted_at' => now()
        ];

        try {
            // Envoyer l'email
           Notification::route('mail', 'contact@monbrobroli.com')
                ->notify(new NewContactNotification($contactData));

                return response()->json([
                'status' => true,
            ], 200);

        } catch (\Exception $e) {
              return response()->json([
        'status' => false,
        'message' => 'Erreur lors de l\'envoi du message',
        'error' => config('app.debug') ? $e->getMessage() : 'Erreur interne'
    ], 500);
        }
    }
}
