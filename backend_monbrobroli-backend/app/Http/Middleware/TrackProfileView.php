<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Student;
use App\Models\TokenPush;
use Illuminate\Http\Request;
use App\Models\AbonementUsers;
use Google\Client as GoogleClient;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Models\EntrepriseStudentNotification;

class TrackProfileView
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    // public function handle(Request $request, Closure $next)
    // {
    //     $user = Auth::user(); // celui qui visite
    //     $visitedId = $request->input('recipient_id'); // celui qu'on visite
    //     $msgSend = $request->input('msg') ?: 'a visité votre profil';
    //     $tokens = TokenPush::where('user_id', $visitedId)->pluck('token_push');
    //     if ($user && $visitedId) {
    //         if (isset($user->id)) {
    //             // l'entreprise visite un étudiant
    //             EntrepriseStudentNotification::create([
    //                 'sender_id' => $user->id,
    //                 'recipient_id' => $visitedId,
    //                 'msg'=>$msgSend
    //             ]);

    //               if ($tokens->isNotEmpty()) {
    //             foreach ($tokens as $token) {
    //                 try {
    //                     $response = Http::withHeaders([
    //                         'accept' => 'application/json',
    //                         'accept-encoding' => 'gzip, deflate',
    //                         'content-type' => 'application/json',
    //                     ])->post('https://exp.host/--/api/v2/push/send', [
    //                         'to'    => $token,
    //                         'title' => 'Nouvelle activité 👀',
    //                         'body'  => "{$user->nom} {$msgSend}",
    //                     ]);
                       
    //                     Log::info('Expo Push Response:', $response->json());
    //                 } catch (\Exception $e) {
    //                     Log::error('Expo Push Error: '.$e->getMessage());
    //                 }
    //             }
    //         }
    //         } 

    //     }

    //     return $next($request);
    // }
    //   public function handle(Request $request, Closure $next)
    // {
    //     $user = Auth::user(); // celui qui visite
    //     $visitedId = $request->input('recipient_id'); // celui qu'on visite
    //     $msgSend = $request->input('msg') ?: 'a visité votre profil';
    //     $tokens = TokenPush::where('user_id', $visitedId)->pluck('token_push')->toArray();

    //     if ($user && $visitedId && isset($user->id)) {
    //         // Enregistrer la notification
    //         EntrepriseStudentNotification::create([
    //             'sender_id' => $user->id,
    //             'recipient_id' => $visitedId,
    //             'msg' => $msgSend
    //         ]);
        
    //          Log::info('$tokens', $tokens);
    //         // Envoi notification FCM v1
    //         if (!empty($tokens)) {
            
    //             $accessToken = $this->getAccessToken();
            
    //             foreach ($tokens as $token) {
    //                 try {
    //                     $response = Http::withHeaders([
    //                         'Authorization' => 'Bearer ' . $accessToken,
    //                         'Accept' => 'application/json',
    //                         'Content-Type' => 'application/json',
    //                     ])->post('https://fcm.googleapis.com/v1/projects/' . env('FIREBASE_PROJECT_ID') . '/messages:send', [
    //                         'message' => [
    //                             'token' => $token,
    //                             'notification' => [
    //                                 'title' => 'Nouvelle activité 👀',
    //                                 'body'  => "{$user->nom} {$msgSend}",
    //                                 'image' => 'https://cat.10515.net/1.jpg',
    //                             ],
    //                         ],
    //                     ]);
    //                     Log::info('FCM v1 Push Response:', $response->json());
    //                 } catch (\Exception $e) {
    //                     Log::error('FCM v1 Push Error: ' . $e->getMessage());
    //                 }
    //             }
    //         }
    //     }

    //     return $next($request);
    // }
    public function handle(Request $request, Closure $next)
{
    $user = Auth::user(); // celui qui visite
    $body=null;
    $visitedId = $request->input('recipient_id'); // celui qu'on visite
    $msgSend = $request->input('msg') ?: 'a visité votre profil';
    Log::info('visitedId', ['visitedId' => $visitedId]);
    $userIdVisited = Student::where('id',$visitedId)->first();
    Log::info('userIdVisited', ['userIdVisited' => $userIdVisited]);
    $tokens = TokenPush::where('user_id', $userIdVisited->user_id)->pluck('token_push')->toArray();

    if ($user && $visitedId && isset($user->id)) {
        // Enregistrer la notification
        EntrepriseStudentNotification::create([
            'sender_id' => $user->id,
            'recipient_id' => $visitedId,
            'msg' => $msgSend
        ]);

        // Log::info('$tokens', $tokens);

        // Test de génération d'accessToken
        try {
            $accessToken = $this->getAccessToken();
            Log::info('AccessToken généré avec succès', ['access_token' => substr($accessToken, 0, 20) . '...']);
        } catch (\Exception $e) {
            Log::error('Erreur génération accessToken FCM : ' . $e->getMessage());
            return $next($request); // On stoppe pas le middleware mais log l’erreur
        }


        $AbonnementUser = AbonementUsers::where('user_id',$visitedId)
                                 ->with("abonement")
                                 ->first();
       $formuleAbonnementsUser = $AbonnementUser ? $AbonnementUser->abonement->libelle : null;
      
   if($AbonnementUser && $formuleAbonnementsUser === 'PREMIUM'){
   $body = "{$user->nom} {$msgSend}";
   }else{
    $body = "Une entreprise {$msgSend}";
   }
//    Log::info('$tokens:', json_encode($tokens, JSON_PRETTY_PRINT));
Log::info('Tokens details', ['tokens' => $tokens,'body'=>$body]);
//    Log::info('$body receive:', $body);
        // Envoi notification FCM v1
        if (!empty($tokens)) {
            foreach ($tokens as $token) {
                try {
                    $response = Http::withHeaders([
                        'Authorization' => 'Bearer ' . $accessToken,
                        'Accept' => 'application/json',
                        'Content-Type' => 'application/json',
                    ])->post('https://fcm.googleapis.com/v1/projects/' . 'monbrobroli-bcbd6' . '/messages:send', [
                        'message' => [
                            'token' => $token,
                            'notification' => [
                                'title' => 'Nouvelle visite de profil',
                                'body'  => $body,
                                'image' => asset('storage/app/public/image/broboli_footer_1.png'),
                            ],
                        ],
                    ]);
                    Log::info('FCM v1 Push Response:', $response->json());
                    Log::info('Tokens details', ['token' => $token,'body'=>$body]);

                } catch (\Exception $e) {
                    Log::error('FCM v1 Push Error: ' . $e->getMessage());
                }
            }
        }
    }

    return $next($request);
}

    /**
     * Récupère un jeton d’accès OAuth2 depuis le compte de service Firebase
     */
    private function getAccessToken()
    {
        $client = new GoogleClient();
        $client->setHttpClient(new \GuzzleHttp\Client(['verify' => true]));
        $client->setAuthConfig(storage_path('app/monbrobroli-bcbd6-firebase-adminsdk-fbsvc-e77c030ba5.json'));
        $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
        $token = $client->fetchAccessTokenWithAssertion();
        return $token['access_token'];
        
    }
}


