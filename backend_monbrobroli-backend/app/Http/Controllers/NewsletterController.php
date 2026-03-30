<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Student;
use App\Models\TokenPush;
// use App\Mail\Newslettermail;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use App\Models\DateLancement;
use Google\Client as GoogleClient;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Models\EntrepriseStudentNotification;
use App\Notifications\NewsLetterOrNotification;
// use Illuminate\Support\Facades\Mail;
// use Illuminate\Support\Facades\Notification;
// use App\Notifications\SendMsg;
class NewsletterController extends Controller
{
   /**
     * @OA\Post(
     *     path="api/SendMailAtEmailToNewsletter",
     *      tags={"Email."},
     *     summary="S'incrire à la newsLetter",
     *     description="S'incrire à la newsLetter",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Nous vous avons envoyé un email de bienvenue.."),
     *          ),
     *       ),
     *         @OA\Response(
     *          response=409,
     *          description="Info",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Votre email a déjà été pris en compte"),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         description="Create user object",
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="email", type="string", example="adjobi@gmail.com"),
     *          ),)
     *     )
     * )
     */
  public function saveUserForEmail(request $request)
  {
    $personnSaveForNewsletter = new Newsletter();
    $personnSaveForNewsletter->email =  $request->email;
    $personnSaveForNewsletter->objet =  $request->objet ? $request->objet:'Disponibilité du site';
     $personnSaveForNewsletter->type =  $request->type ? $request->type:'newsLetter';
     $personnSaveForNewsletter->msg =  $request->msg ? $request->msg:'Merci ! Votre demande est enregistrée.
Notre plateforme sera  très bientôt disponible …
Et une surprise spéciale attend les premiers utilisateurs.
Restez connecté, vous serez prévenu instantanément !
';
    $mailExistInDb = Newsletter::where("email", $request->email)->first();
    $mailExistInTableUser = User::where("email", $request->email)->first();
    if ($mailExistInDb && $mailExistInTableUser) {
      return response()->json([
        'status' => false,
        "message" => "Votre email a déjà été pris en compte."
      ],409);
    }
    $personnSaveForNewsletter->save();
   
    $personnSaveForNewsletter->notify(new NewsLetterOrNotification($personnSaveForNewsletter->objet, $personnSaveForNewsletter->msg,[]));
    // $personnSaveForNewsletter->notify(new SendMsg());
    return response()->json([
      'status' => true,
    ],200);
  }


//   public function sendNewsletterAtUser(Request $request)
// {
   

//     // Récupère tous les utilisateurs enregistrés
//     $users = User::where('verif_email',1)->get();

//     // Vérifie qu’il y a des utilisateurs
//     if ($users->isEmpty()) {
//         return response()->json([
//             'status' => false,
//             'message' => 'Aucun utilisateur à notifier.'
//         ], 404);
//     }

//     // Envoie la notification à chaque utilisateur
//     foreach ($users as $user) {
//        $personnSaveForNewsletter = new Newsletter();
//       $personnSaveForNewsletter->email =  $user->email;
//     $personnSaveForNewsletter->objet = $request->objet ?? 'Disponibilité du site';
//     $personnSaveForNewsletter->type = $request->type ?? 'newsLetter';
//     $personnSaveForNewsletter->msg = $request->msg ?? 'Merci pour votre intérêt. Nous avons bien enregistré votre demande — nous vous préviendrons automatiquement dès que le site sera de nouveau disponible.';

//     // Enregistre les infos de la newsletter (facultatif si tu veux garder un historique)
//     $personnSaveForNewsletter->save();
//         $user->notify(new NewsLetterOrNotification(
//             $personnSaveForNewsletter->objet,
//             $personnSaveForNewsletter->msg
//         ));
//     }

//     return response()->json([
//         'status' => true,
//         'message' => 'Notification envoyée à tous les utilisateurs.'
//     ], 200);
// }
public function sendNewsletterAtUser(Request $request)
{
    // Récupère tous les utilisateurs ayant vérifié leur email
     $query = User::where('verif_email', 1);

    if ($request->profil === 'student') {
        $query->where('statut_id', 2);
    }

    if ($request->profil === 'company') {
    $query->whereIn('statut_id', [1, 4]);
}

    $users = $query->get();

    if ($users->isEmpty()) {
        return response()->json([
            'status' => false,
            'message' => 'Aucun utilisateur à notifier.'
        ], 404);
    }

    // Prépare les données
    $objet = $request->objet ?? 'Disponibilité du site';
    $type = $request->type ?? 'newsLetter';
    $msg = $request->msg ?? 'Merci ! Votre demande est enregistrée.
Notre plateforme sera  très bientôt disponible …
Et une surprise spéciale attend les premiers utilisateurs.
Restez connecté, vous serez prévenu instantanément !
';
 $links = $request->link ?? [];

    // Liste des emails notifiés
    $emailsNotifies = [];

    foreach ($users as $user) {

        // Enregistre l'historique de l'envoi
        $newsletter = new Newsletter();
        $newsletter->email = $user->email;
        $newsletter->objet = $objet;
        $newsletter->type = $type;
        $newsletter->msg = $msg;
        // $newsletter->link = $links;
        $newsletter->save();

        // Envoi de la notification
        $user->notify(new NewsLetterOrNotification($objet, $msg, $links));

        // Ajout à la liste des emails envoyés
        $emailsNotifies[] = $user->email;
    }

    return response()->json([
        'status' => true,
        'message' => 'Notification envoyée à tous les utilisateurs.',
        'emails_envoyes' => $emailsNotifies
    ], 200);
}


// public function sendNotificationsAtUser(Request $request)
// {
//     $userConnected = Auth::user();

//     // Validation de la requête
//     $request->validate([
//         'msg' => 'required|string', // Vérifie que le message est présent, de type string et pas trop long
//         'objet' => 'nullable|string|max:255' // Si tu veux un objet pour la notification
//     ]);

//     $msgSend = $request->input('msg');
//     $objet = $request->input('objet'); 

//     // Récupération des utilisateurs à notifier
//     $users = User::where('verif_email', 1)
//         ->where('statut_id', '!=', 3)
//         ->get();
//      $accessToken = $this->getAccessToken();
//     foreach ($users as $user) {
//         $personnSaveForNotifications = new EntrepriseStudentNotification();
//         $personnSaveForNotifications->sender_id = $userConnected->id;
//         $personnSaveForNotifications->recipient_id = $user->id;
//         $personnSaveForNotifications->msg = $msgSend;
//         $personnSaveForNotifications->objet = $objet;

//         $personnSaveForNotifications->save();
//         $token = TokenPush::where('user_id', $user->id)
//         ->where("status",'actif')
//         ->first();
//         try {
//                     $response = Http::withHeaders([
//                         'Authorization' => 'Bearer ' . $accessToken,
//                         'Accept' => 'application/json',
//                         'Content-Type' => 'application/json',
//                     ])->post('https://fcm.googleapis.com/v1/projects/' . 'monbrobroli-bcbd6' . '/messages:send', [
//                         'message' => [
//                             'token' => $token,
//                             'notification' => [
//                                 'title' => "$objet",
//                                 'body'  => "{$msgSend}",
//                                 'image' => asset('storage/app/public/image/broboli_footer_1.png'),
//                             ],
//                         ],
//                     ]);
//                     Log::info('FCM v1 Push Response:', $response->json());
//                 } catch (\Exception $e) {
//                     Log::error('FCM v1 Push Error: ' . $e->getMessage());
//                 }
//     }

//     return response()->json([
//         'success' => true,
//         'message' => 'Notifications envoyées avec succès.'
//     ],200);
// }
public function sendNotificationsAtUser(Request $request)
{
    $userConnected = Auth::user();
    Log::info("🔔 Envoi de notifications initié par {$userConnected->id}");

    // ✅ Validation manuelle (pour personnaliser les messages)
    // $validator = Validator::make($request->all(), [
    //     'msg' => 'required|string|max:1000',
    //     'objet' => 'nullable|string|max:255',
    // ], [
    //     'msg.required' => 'Le message est obligatoire.',
    //     'msg.string' => 'Le message doit être une chaîne de caractères.',
    //     'msg.max' => 'Le message ne doit pas dépasser 1000 caractères.',
    //     'objet.max' => 'L’objet ne doit pas dépasser 255 caractères.'
    // ]);

    // if ($validator->fails()) {
    //     Log::warning("❌ Validation échouée lors de l’envoi de notification", ['errors' => $validator->errors()]);
    //     return response()->json([
    //         'success' => false,
    //         'message' => $validator->errors()->first(),
    //     ], 422);
    // }

    $msgSend = $request->input('msg');
    $objet = $request->input('objet', 'Notification');
    $accessToken = $this->getAccessToken();

    // ✅ Sélection des utilisateurs actifs et vérifiés
    $users = User::where('verif_email', 1)
        ->where('statut_id', '!=', 3)
        ->get();

    if ($users->isEmpty()) {
        Log::info("Aucun utilisateur trouvé pour recevoir la notification.");
        return response()->json([
            'success' => false,
            'message' => 'Aucun utilisateur éligible à notifier.',
        ], 404);
    }

    $notifCount = 0;
    foreach ($users as $user) {
        try {
            // ✅ Enregistrement en base
            $notif = new EntrepriseStudentNotification();
            $notif->sender_id = $userConnected->id;
            $notif->recipient_id = $user->id;
            $notif->msg = $msgSend;
            $notif->objet = $objet;
            $notif->save();

            // ✅ Récupération du token push actif
            $tokenPush = TokenPush::where('user_id', $user->id)
                ->where('status', 'actif')
                ->value('token_push'); // évite de récupérer l’objet entier

            if (!$tokenPush) {
                Log::warning("⚠️ Aucun token actif pour l’utilisateur ID {$user->id}");
                continue;
            }

            // ✅ Envoi du push notification FCM
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $accessToken,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->post('https://fcm.googleapis.com/v1/projects/monbrobroli-bcbd6/messages:send', [
                'message' => [
                    'token' => $tokenPush,
                    'notification' => [
                        'title' => $objet,
                        'body'  => $msgSend,
                        'image' => asset('storage/app/public/image/broboli_footer_1.png'),
                    ],
                ],
            ]);

            if ($response->successful()) {
                Log::info("✅ Notification envoyée à l’utilisateur {$user->id}");
                $notifCount++;
            } else {
                Log::error("❌ Échec de l’envoi FCM à l’utilisateur {$user->id}", [
                    'response' => $response->json()
                ]);
            }

        } catch (\Exception $e) {
            Log::error("❌ Erreur lors de l’envoi à l’utilisateur {$user->id}: " . $e->getMessage());
            continue;
        }
    }

    Log::info("📬 Notifications envoyées : {$notifCount}/" . $users->count());

    return response()->json([
        'success' => true,
        'message' => "Notifications envoyées avec succès à {$notifCount} utilisateur(s)."
    ], 200);
}

private function getAccessToken()
    {
        $client = new GoogleClient();
        $client->setHttpClient(new \GuzzleHttp\Client(['verify' => true]));
        $client->setAuthConfig(storage_path('app/monbrobroli-bcbd6-firebase-adminsdk-fbsvc-e77c030ba5.json'));
        $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
        $token = $client->fetchAccessTokenWithAssertion();
        return $token['access_token'];
        
    }


  public function getEmailNewsletter()
{
    // Récupère toutes les notifications avec leur user (expéditeur)
    $allNotifications = EntrepriseStudentNotification::with('user')->get();

    // Récupère tous les étudiants indexés par leur user_id
    $students = Student::all()->keyBy('user_id');

    // Ajoute le destinataire (recipient) à chaque notification
    foreach ($allNotifications as $item) {
        if (isset($students[$item->recipient_id])) {
            $item['recipient'] = $students[$item->recipient_id];
        }
    }

    // Récupère toutes les newsletters
    $allNewsLetter = Newsletter::all();

    // Réponse JSON finale
    return response()->json([
        'success' => true,
        'data' => [
            'newsletter'   => $allNewsLetter,
            'notifications' => $allNotifications,
        ],
    ], 200);
}

    public function addDateLancement(Request $request){
        $dateLancement = DateLancement::updateOrCreate(
        ['id' => 1], // condition (toujours la première ligne)
        ['date' => $request->date]
    );

    return response()->json([
        'message' => 'Date de lancement enregistrée avec succès',
        'data' => $dateLancement
    ], 200);
    }

    public function getDateLancement()
{
    $dateLancement = DateLancement::first();

    if (!$dateLancement) {
        return response()->json([
            'message' => 'Aucune date de lancement trouvée',
            'data' => null
        ], 404);
    }

    return response()->json([
        'message' => 'Date de lancement récupérée avec succès',
        'data' => $dateLancement
    ], 200);
}
}
