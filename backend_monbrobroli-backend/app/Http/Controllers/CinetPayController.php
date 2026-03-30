<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Status;
use App\Models\Referral;
// use CinetPay\CinetPay;
use App\Models\Abonement;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\AbonementUsers;
use App\Models\abonnementCategorie;
use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Http;
// use GuzzleHttp\Client;


class CinetPayController extends Controller
{

    public function initializePayemnt($payload){
        $secretKey = env('PAYSTACK_SECRET_KEY');
          $client = new \GuzzleHttp\Client([
    'verify' => false,
]);
  
 $response = $client->post('https://api.paystack.co/transaction/initialize', [
        'headers' => [
            'Authorization' => 'Bearer ' . $secretKey,
            'Content-Type' => 'application/json',
        ],
        'json' => $payload,
    ]);

    // Vérifier le statut de la réponse
    if ($response->getStatusCode() == 200) {
        $responseData = json_decode($response->getBody(), true);
        // Traiter les données de réponse ici
        return $responseData;
    } else {
        Log::error('Unexpected response status: ' . $response->getStatusCode());
    }
    }
    /**
     * @OA\Post(
     *      path="/api/payStack/paiement",
     *      tags={"PAYSTACK"},
     *      summary="faire un paiement",
     *      description="Faire une paiement.",
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *            @OA\Property(property="transaction_id", type="integer", example="7845584 (generer automatiquement)"),
     *             @OA\Property(property="mobile", type="integer", example="1 (ajout 30% si mobile === 1)"),
     *            @OA\Property(property="abonement_id", type="integer", example="2"),
     *            @OA\Property(property="channels", type="string", example="Moov,Orange,etc..."),   
     *         ),
     *      ),
     *     @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *             @OA\Property(property="status", type="integer", example="true"),
     *             @OA\Property(property="data",type="object")
     *          )
     *       )
     *  )
     */

     public function handleDoAbonnement(Request $request)
{
    $userId = auth()->id();

    $userVerifIfAccount = User::where('id',$userId)->first()->verif_email;

    if($userVerifIfAccount){
// Récupération des abonnements avec une requête plus précise
    $userAbonnements = AbonementUsers::where('user_id', $userId)
        ->whereIn('statut', ['EN ATTENTE', 'success'])
        ->get();

    // Suppression des abonnements en attente en une seule opération
    $userAbonnements->where('statut', 'EN ATTENTE')->each->delete();

    // Vérification des abonnements existants
    $hasDifferentActiveSubscription = $userAbonnements
        ->where('statut', 'success')
        ->where('abonement_id', '!=', $request->abonement_id)
        ->isNotEmpty();

        // $abonnementUserSucess = $userAbonnements
        // ->where('statut', 'success')
        // ->first();

        // if($abonnementUserSucess && $abonnementUserSucess->mode_payment === 'month'){
         
        // }

    // Si l'utilisateur a déjà un abonnement actif différent
    if ($hasDifferentActiveSubscription) {
        return $this->startPayment($request, $userId);
    }

    // Si l'utilisateur n'a pas d'abonnement en cours ou veut le même abonnement
    return $this->startPayment($request, $userId);
    }else{
        return response()->json([
    'status'     => false,
    'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
], 403);
    }
    
    
}


private function startPayment($request, $userId)
{
    
    $hour = Carbon::now()->format('H:i:s');

    $statusUtilisateur = User::with('statut')->findOrFail($userId);

    $abonement = Abonement::findOrFail($request->abonement_id);

    $finalEcheance = null;
    $montant = null;

    /*
    |--------------------------------------------------------------------------
    | MODE YEAR
    |--------------------------------------------------------------------------
    */
    if ($statusUtilisateur->statut && $statusUtilisateur->statut->statut === 'etudiant'){

        $userAbonnementSuccess = AbonementUsers::where('user_id', $userId)
        ->where('statut', 'success')
        ->first();

        if($userAbonnementSuccess && $userAbonnementSuccess->mode_payment === 'year' && $request->mode_payment === 'month'){
             return response()->json([
                'status' => false,
                'message' => "Vous avez déjà un abonnement annuel actif. Veuillez attendre son expiration pour souscrire à un abonnement mensuel."
            ], 409);
        }

    if ($request->mode_payment === 'year') {

        $baseEcheance = now()->addYear();
        $finalEcheance = $baseEcheance;

        if (
            $statusUtilisateur->statut &&
            $statusUtilisateur->statut->statut === 'etudiant'
        ) {
            $bonusMonths = $this->calculateBonusMonths($request->abonement_id);
            $finalEcheance = $this->applyBonusToEcheance($baseEcheance, $bonusMonths);
        }

        $montant = $abonement->prix;
    }

    /*
    |--------------------------------------------------------------------------
    | MODE MONTH
    |--------------------------------------------------------------------------
    */
    if ($request->mode_payment === 'month') {

        $finalEcheance = now()->addMonth();

        if ($abonement->libelle === 'ECO') {
            $montant = 1000;
        } elseif ($abonement->libelle === 'PLATINUM') {
            $montant = 2000;
        } else {
            $montant = $abonement->prix;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | CREATION + PAYMENT
    |--------------------------------------------------------------------------
    */
    if ($request->mode_payment && $finalEcheance && $montant !== null) {

    
     $isReferred = Referral::where('referred_id', $userId)->first();

if ($isReferred && $isReferred->subscription_paid == 0 && $request->mode_payment === 'year') {
    $remise = ($montant * 5) / 100;
    $montant -= $remise;
}

        AbonementUsers::create([
            "echeance" => $finalEcheance,
            "abonement_id" => $request->abonement_id,
            'mode_payment'=>$request->mode_payment,
            "user_id" => $userId,
            "status_user" => optional($statusUtilisateur->statut)->statut,
            "moyen_paiement" => $request->channels,
            "heure_echeance" => $hour,
            "statut" => "EN ATTENTE",
            "transaction_id" => $request->transaction_id,
            "montant" => $montant,
        ]);

        $payload = [
            'amount' => $montant * 100,
            'email' => $statusUtilisateur->email,
            'reference' => $request->transaction_id,
            'callback_url' => 'https://monbrobroli.com/verification/' . $request->transaction_id,
        ];

        return $this->initializePayemnt($payload);
        }
  
    }else{
         $baseEcheance = now()->addYear();
        $finalEcheance = $baseEcheance;

          $montant = $abonement->prix;

           AbonementUsers::create([
            "echeance" => $finalEcheance,
            "abonement_id" => $request->abonement_id,
            // 'mode_payment'=>$request->mode_payment,
            "user_id" => $userId,
            "status_user" => optional($statusUtilisateur->statut)->statut,
            "moyen_paiement" => $request->channels,
            "heure_echeance" => $hour,
            "statut" => "EN ATTENTE",
            "transaction_id" => $request->transaction_id,
            "montant" => $montant,
        ]);

        $payload = [
            'amount' => $montant * 100,
            'email' => $statusUtilisateur->email,
            'reference' => $request->transaction_id,
            'callback_url' => 'https://monbrobroli.com/verification/' . $request->transaction_id,
        ];

        return $this->initializePayemnt($payload);
    }
   
    
}

private function calculateBonusMonths($abonnementId)
{
    // On compte uniquement les abonnements réellement validés en PLATINUM
    // $validatedCount = AbonementUsers::where('statut', 'success')
    // ->where("status_user","etudiant")
    // ->where("abonement_id",4)
    // ->count();
    $validatedCount = AbonementUsers::where([
        ['statut', '=', 'success'],
        ['status_user', '=', 'etudiant'],
        ['abonement_id', '=', 4],
    ])
    ->count();

    // Bonus spécifique pour les 1000 premiers abonnés validés
    if ($validatedCount < 1000 && $abonnementId === 4) {
        return 3;
    }

    return 1;
}

private function applyBonusToEcheance(Carbon $date, $bonusMonths)
{
    return $date->copy()->addMonths($bonusMonths);
}

       public function handleSuccess($reference)
    {
       $abonnement = AbonementUsers::where(['transaction_id' => $reference])->first();
      $userAbonnements = AbonementUsers::where('user_id', $abonnement->user_id)->get();
       foreach ($userAbonnements as $abonnement) {
            if($abonnement->statut === 'success'){
               $abonnement->statut = 'expired';
               $abonnement->save();
            } 
         }
       if($abonnement){
           $abonnement->statut = 'success';
           $abonnement->save();
           $isReferred = Referral::where('referred_id', $abonnement->user_id)->first();
           if($isReferred){
           $isReferred->subscription_paid = 1; 
           $isReferred->save();
           }
         /**
          * Nombre d’abonnements PLATINUM (id = 4) validés
             */
          $validatedCount = AbonementUsers::where('statut', 'success')
            ->where('status_user', 'etudiant')
            ->where('abonement_id', 4)
            ->count();

           $message = "Félicitations, votre paiement a été effectué avec succès.";

          /**
            * Abonnement PLATINUM
               */
            if ($abonnement->abonnement_id == 4 && $abonnement->mode_payment === 'year') {

             if ($validatedCount < 1000) {
               $message .= " Vous bénéficiez de 3 mois supplémentaires offerts.";
               } else {
                 $message .= " Vous bénéficiez de 1 mois supplémentaire offert.";
                       }
                                               }

                            /**
                            * Abonnement ECO
                            */
                         if ($abonnement->abonnement_id == 3 && $abonnement->mode_payment === 'year') {
                        $message .= " Vous bénéficiez de 1 mois supplémentaire offert.";
                          }

                    return response()->json([
                      'status'  => true,
                        'message' => $message
                       ], 201);
         }else{
            return response()->json([
                    'status' => false,   
                    'message' => "Reférence pas trouvée."
                    ],402);
         }
    }
     private function verifyIfAbonnementIsStudentOrCompany($request, $userId){
        $statutIdUser = User::find($userId)->statut_id;
        $StatutIdentifiantUser = Status::find($statutIdUser)->statut;
        $categorieIdAbonnement = Abonement::find($request->abonement_id)->categorie_id;
        $categorieNameAbonnement = abonnementCategorie::find($categorieIdAbonnement)->categorie;
        if($StatutIdentifiantUser === strtolower($categorieNameAbonnement)){
           return true;
        }else{
            return false;
        }
     }


      /**
     * @OA\Get(
     *      path="/api/payStack/payment/callback/{reference}",
     *      tags={"PAYSTACK"},
     *      summary="Verification de la reference",
     *      description="Voir si la réference est passée. (Ajouter la reference en paramètre.)",
     *      @OA\Parameter(
     *         name="reference",
     *         in="path",
     *         description="Reference de la transaction.",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(   
     *         ),
     *      ),
     *     @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *             @OA\Property(property="status", type="integer", example="true"),
     *             @OA\Property(property="msg",type="success")
     *          )
     *       )
     *  )
     */

      public function handleCallback($reference)
    {
       $secretKey = env('PAYSTACK_SECRET_KEY');
        // Vérifie le statut avec PayStack
         $client = new \GuzzleHttp\Client([
                    'verify' => false,
                    ]);
        $response = $client->get("https://api.paystack.co/transaction/verify/$reference", [
            'headers' => [
                'Authorization' => 'Bearer ' . $secretKey,
            ],
        ]);

        $responseData = json_decode($response->getBody(), true);

       $abonnement = AbonementUsers::where(['transaction_id' => $reference])->first();
       
        // Met à jour la transaction
        if ($responseData['data']['status'] === "success") {
           return $this->handleSuccess($reference);
        }else{
            $abonnement->delete();
            return response()->json([
                    'status' => false,   
                    ],200);
        }
    }  

    public function handleWebHookPaystack(Request $request)
    {
        
        if ($request->method() !== 'POST' || !$request->hasHeader('x-paystack-signature')) {
            return response('Ignored', 400);
        }

         $rawBody = $request->getContent();
        $secretKey = env('PAYSTACK_SECRET_KEY');

         $signature = $request->header('x-paystack-signature');
        $expected  = hash_hmac('sha512', $rawBody, $secretKey);

        if (!hash_equals($expected, $signature)) { 
            Log::warning('Paystack webhook signature invalide');
            return response('Invalid signature', 400);
        }

         $event = json_decode($rawBody, true);
         Log::info('Paystack webhook reçu', ['event' => $event]);
     
        if (($event['event'] ?? null) === 'charge.success') {
            $data      = $event['data'] ?? [];
            $status    = $data['status'] ?? null;        // "success"
            $reference = $data['reference'] ?? null;
            // $moyen_paiement = $data['authorization']['bank'] ?? null;

            if ($status === 'success' && $reference) {
                // Ta logique métier ici
            return $this->handleSuccess($reference);
            }
        }
    }
/**
 * @OA\Post(
 *     path="/api/handleWebHookRevenueCat",
 *     operationId="revenueCatWebhook",
 *     tags={"RevenueCat"},
 *     summary="Webhook RevenueCat",
 *     description="Endpoint recevant les événements RevenueCat (INITIAL_PURCHASE, RENEWAL, CANCELLATION, EXPIRATION, TRANSFER). 
 *     Il valide la signature, analyse l'événement et synchronise les abonnements utilisateurs.",
 *
 *     @OA\Parameter(
 *         name="X-RevenueCat-Signature",
 *         in="header",
 *         required=true,
 *         description="Signature HMAC SHA256 générée par RevenueCat",
 *         @OA\Schema(type="string")
 *     ),
 *
 *     @OA\RequestBody(
 *         required=true,
 *         description="Payload JSON envoyé par RevenueCat",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="event",
 *                 type="object",
 *                 @OA\Property(property="type", type="string", example="INITIAL_PURCHASE"),
 *                 @OA\Property(property="app_user_id", type="string", example="123"),
 *                 @OA\Property(property="product_id", type="string", example="premium_monthly"),
 *                 @OA\Property(property="expiration_at_ms", type="integer", example=1700000000000)
 *             )
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=200,
 *         description="Webhook traité avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="ok")
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=401,
 *         description="Signature RevenueCat invalide",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Invalid signature")
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=400,
 *         description="JSON invalide",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Invalid JSON")
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=409,
 *         description="Abonnement incompatible avec le profil utilisateur",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="boolean", example=false),
 *             @OA\Property(property="message", type="string", example="Cet abonnement ne convient pas à votre profil.")
 *         )
 *     )
 * )
 */
    public function handleWebHookRevenueCat(Request $request)
{
    Log::info('[RevenueCat] Webhook reçu');

    $signature = $request->header('X-RevenueCat-Signature');
    $payload   = $request->getContent();
    $secret    = env('REVENUECAT_WEBHOOK_SECRET');

    $expectedSignature = hash_hmac('sha256', $payload, $secret);

    if (!hash_equals($expectedSignature, $signature)) {
        Log::warning('[RevenueCat] Signature invalide', [
            'received_signature' => $signature,
        ]);

        return response()->json(['error' => 'Invalid signature'], 401);
    }

    Log::info('[RevenueCat] Signature valide');

    // 2️⃣ Décodage JSON
    $data = json_decode($payload, true);

    if (!$data) {
        Log::error('[RevenueCat] JSON invalide', [
            'payload' => $payload,
        ]);

        return response()->json(['error' => 'Invalid JSON'], 400);
    }

    // 3️⃣ Extraction des infos clés
    $eventType  = $data['event']['type'] ?? null;
    $userId     = $data['event']['app_user_id'] ?? null;
    $productId  = $data['event']['product_id'] ?? null;

    Log::info('[RevenueCat] Événement reçu', [
        'event_type' => $eventType,
        'user_id'    => $userId,
        'product_id' => $productId,
    ]);

    // 4️⃣ Traitement selon l’événement
    if ($eventType === 'INITIAL_PURCHASE' || $eventType === 'RENEWAL') {

        Log::info('[RevenueCat] Traitement abonnement', [
            'type' => $eventType,
            'user_id' => $userId,
        ]);

        $hour = Carbon::now()->format('H:i:s');

        $statusUtilisateur = User::where("id", $userId)
            ->with('statut')
            ->first();

        if (!$statusUtilisateur) {
            Log::error('[RevenueCat] Utilisateur introuvable', [
                'user_id' => $userId,
            ]);

            return response()->json(['error' => 'User not found'], 404);
        }

        Log::info('[RevenueCat] Statut utilisateur', [
            'statut' => $statusUtilisateur->statut->statut ?? null,
        ]);

        // 1 an + BONUS
        $baseEcheance = now()->addYear(1);
        $finalEcheance = $baseEcheance;

        if ($statusUtilisateur->statut->statut === 'etudiant') {
            $bonusMonths = $this->calculateBonusMonths($request->abonement_id);
            $finalEcheance = $this->applyBonusToEcheance($baseEcheance, $bonusMonths);

            Log::info('[RevenueCat] Bonus étudiant appliqué', [
                'bonus_months' => $bonusMonths,
                'final_echeance' => $finalEcheance,
            ]);
        }

        $montant = Abonement::find($productId)->prix ?? null;

        Log::info('[RevenueCat] Montant abonnement', [
            'montant' => $montant,
        ]);

        // $isVerifAbonnement = $this->verifyIfAbonnementIsStudentOrCompany($request, $userId);

       

            AbonementUsers::create([
                "echeance"        => $finalEcheance,
                "abonement_id"    => $productId,
                "user_id"         => $userId,
                "status_user"     => $statusUtilisateur->statut->statut,
                "moyen_paiement"  => "revenue_cat",
                "heure_echeance"  => $hour,
                "statut"          => "success",
                "transaction_id"  => Str::upper(Str::random(12)),
                "montant"         => $montant,
            ]);

            Log::info('[RevenueCat] Abonnement créé avec succès', [
                'user_id' => $userId,
                'product_id' => $productId,
                'echeance' => $finalEcheance,
            ]);
    } else {
        Log::info('[RevenueCat] Événement ignoré', [
            'event_type' => $eventType,
        ]);
    }

    return response()->json(['status' => 'ok']);
}


    // public function handleWebHookRevenueCat(Request $request)
    // {

    //     $signature = $request->header('X-RevenueCat-Signature');
    //     $payload   = $request->getContent();
    //     $secret    = env('REVENUECAT_WEBHOOK_SECRET');

    //     $expectedSignature = hash_hmac('sha256', $payload, $secret);

    //     if (!hash_equals($expectedSignature, $signature)) {
    //         Log::warning('RevenueCat webhook signature invalide');
    //         return response()->json(['error' => 'Invalid signature'], 401);
    //     }

    //     // 2️⃣ Décodage JSON
    //     $data = json_decode($payload, true);

    //     if (!$data) {
    //         return response()->json(['error' => 'Invalid JSON'], 400);
    //     }

    //     // 3️⃣ Extraction des infos clés
    //     $eventType   = $data['event']['type'];
    //     $userId      = $data['event']['app_user_id'];
    //     $productId  = $data['event']['product_id'];
    
    //     // 4️⃣ Traitement selon l’événement
        
    //     if ($eventType === 'INITIAL_PURCHASE' || $eventType === 'RENEWAL' ) {
    //         $hour = Carbon::now()->format('H:i:s');  
    //       $statusUtilisateur = User::where("id",$userId)
    //     ->with('statut')
    //     ->first();
    //     // 1 an + BONUS
    //   $baseEcheance = now()->addYear(1);
    //   $finalEcheance = $baseEcheance; // valeur par défaut
    //  if($statusUtilisateur->statut->statut === 'etudiant'){
    //   $bonusMonths = $this->calculateBonusMonths($request->abonement_id);
    //    $finalEcheance = $this->applyBonusToEcheance($baseEcheance, $bonusMonths);
    //    }
    //   $montant = Abonement::find($productId)->prix;
    //    $isVerifAbonnement = $this->verifyIfAbonnementIsStudentOrCompany($request,$userId);
    //    if($isVerifAbonnement){
    //     AbonementUsers::create([
    //         "echeance" => $finalEcheance,
    //         "abonement_id" => $productId,
    //         "user_id" => $userId,
    //         "status_user"=>$statusUtilisateur->statut->statut,
    //         "moyen_paiement" => "revenue_cat",
    //         "heure_echeance" => $hour,
    //         "statut" => "success",
    //         "transaction_id"=>Str::upper(Str::random(12)),
    //         "montant"=> $montant,
    //     ]);
    // }else{
    //     return response()->json([
    //         'status' => false,
    //         'message' => 'Cet abonnement ne convient pas à votre profil.']
    //     ,409); 
    //    }
    //         }
    //     return response()->json(['status' => 'ok']);
    // }
    

    public function allTransaction(){
        
         $client = new \GuzzleHttp\Client([
                    'verify' => false,
                    ]);
        $response = $client->get("https://api.paystack.co/transaction", [
            'headers' => [
                'Authorization' => 'Bearer ',
            ],
        ]);

        $responseData = json_decode($response->getBody(), true);
         return $responseData;
    }
}
