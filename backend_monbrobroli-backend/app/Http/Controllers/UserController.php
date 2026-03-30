<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Jour;
use App\Models\User;
use App\Models\Photos;
use App\Models\Status;
use App\Models\EmailCc;
use App\Models\Student;
use App\Models\TokenPush;
use App\Models\Entreprise;
use Illuminate\Support\Str;
use App\Models\OffreStudent;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use App\Models\Qualification;
use App\Models\CompetenceStudent;
use App\Models\Entreprise_Student;
use App\Models\DeleteUser;
use App\Models\Referral;
use App\Notifications\VerifyEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use App\Notifications\MessageBienvenue;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Notifications\MessageAccueilCompany;
use Codesmiths\LaravelOcrSpace\OcrSpaceOptions;
use Codesmiths\LaravelOcrSpace\Facades\OcrSpace;
use Codesmiths\LaravelOcrSpace\Enums\InputType;
// use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listerUser()
    {
        $users = User::with(["statut",'permissions'])->get();
         
        return response()->json([
            "status" => true,
            "data" => $users
        ], 200);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Post(
     *     path="api/list_users",
     *      tags={"Users"},
     *     summary="S'incrire",
     *     description="S'incrire",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Enregistrer avec succès"),
     *              @OA\Property(property="data", type="object"),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         description="Create user",
     *         required=true,
     *         @OA\JsonContent(
     *                @OA\Property(property="nom", type="string", example="adjobi (student,entreprise,particulier)"),
     *                 @OA\Property(property="email", type="string", example="adjobi@gmail.com "),
     *  @OA\Property(property="prenoms", type="string", example="adjobi@gmail.com "),
     *  @OA\Property(property="phone", type="string", example="0874857485"),
     *                 @OA\Property(property="password", type="string", example="******"),
     *                 @OA\Property(property="photo_profil", type="string", example="sgdd554.jpg (student)"),
     *                 @OA\Property(property="ville", type="string", example="Bonoua (student)"),
     *                @OA\Property(property="token_push", type="string", example="dhfhf55854f (student)"),
     *               @OA\Property(property="appareil", type="string", example="iphone xr (student)"),
     *                   @OA\Property(property="quartier", type="string", example="Résidenciel (student)"),
     *                  @OA\Property(property="commune", type="string", example="lafoue (student)"),
     *                  @OA\Property(property="diplome", type="string", example="BTS (student)"),
     *                    @OA\Property(property="photo", type="string", example="1663438547.jpg (student)"),
     *                      @OA\Property(property="titreCv", type="string", example="Développeur flutter (student)"),
     *                  @OA\Property(property="statut_id", type="string", example="2 (student,entreprise,particulier)"),
     *                  @OA\Property(property="competence", type="array",@OA\Items(type="object"),),
     *                 @OA\Property(property="registre", type="string", example="****** (entreprise)"),
     *          ),
     *     ),
     * )
     */
    public function store(Request $request)
    {

        $messageSuccess = "Enregistrer avec succès";

        switch ($request->statut_id) {
            case 1:
                return $this->handleEntreprise($request, $messageSuccess);

            case 2:
                return $this->handleStudent($request, $messageSuccess);

            case 4:
                return $this->handleParticulier($request, $messageSuccess);

            default:
                return response()->json([
                    "status" => false,
                    "message" => "not found statut_id",
                ], 400);
        }
    }

    private function handleEntreprise(Request $request, $messageSuccess)
    {
         $request->validate([
        "nom"              => 'required|unique:users|min:3',
        "email"            => "required|email|unique:users",
        "password"         => "required",
        "matricule_cc"     => "required|unique:entreprises",
        "forme_juridique"  => "required",
        "registre"         => "required|mimes:pdf",
        "logo"             => "nullable|image|mimes:jpg,png,jpeg",
        "NCC"              => "required",
    ],[
            'email.required' => 'L\'adresse email est requise.',
            'email.email' => 'L\'adresse email n\'est pas valide.',
            'email.unique' => 'L\'adresse email est déjà utilisée.',
            'nom.unique'=>'Le nom de l\' entreprise existe déja.',
            'matricule_cc.unique'=>'le RCC existe déjà.',
            'NCC.required' => 'le NCC est requis.',
            'nom.required' => 'Le nom est requis.',
        ]);

    DB::beginTransaction(); // Début de transaction

    try {
        // Création de l'utilisateur
        $user = new User();
        $user->nom = $request->nom;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->statut_id = $request->statut_id;
        $user->save();

        // Création de l'entreprise
        $entreprise = new Entreprise();
        $entreprise->nom = $request->nom;
        $entreprise->contact = $request->phone;
        $entreprise->ville = $request->ville;
        $entreprise->quartier = $request->quartier;
        $entreprise->forme_juridique = $request->forme_juridique;
        $entreprise->commune = $request->commune;
        $entreprise->particulier_prenoms = $request->particulier_prenoms;
        $entreprise->gerant = $request->gerant;
        $entreprise->numero_gerant = $request->numero_gerant;
        $entreprise->matricule_cc = $request->matricule_cc;
        $entreprise->NCC = $request->NCC;
        $entreprise->email = $request->email;
        $entreprise->password = Hash::make($request->password);
        $entreprise->user_id = $user->id;

        // Gestion des fichiers
        if ($request->hasFile('registre')) {
            $pdf = $request->file('registre');
            $fileNamePdf = 'registre_' . time() . '.' . $pdf->getClientOriginalExtension();
            $pdf->storeAs('public/pdf', $fileNamePdf);
            $entreprise->registre = $fileNamePdf;
        }

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $fileName_logo = time() . '.' . $logo->extension();
            $logo->storeAs('public/images', $fileName_logo);
            $entreprise->logo = $fileName_logo;
        }

       
        if ($request->hasFile('piece_gerant')) {
           
            foreach ($request->piece_gerant as $piece) {
                $PhotosPiece = new Photos();
                $newPiece = $piece;
                $fileNewPiece = $piece->hashName();
                $newPiece->storeAs('public/images', $fileNewPiece);
                $PhotosPiece->user_id = $user->id;
                $PhotosPiece->path = $fileNewPiece;
                $PhotosPiece->save();
                }
        }
        // $token = Str::random(60);
        // $entreprise->notify(new VerifyEmail($passwordReset->token,$request->email));
        
        $entreprise->save();

         if (is_array($request->email_cc) && !empty($request->email_cc)) {
        
    foreach ($request->email_cc as $email) {
        $EmailCC = new EmailCc();
         $EmailCC->entreprises_id = $entreprise->id;
        $EmailCC->email_cc = $email;
        $EmailCC->save();
    }
    
}


        $token = Str::random(60);
        $passwordReset = new PasswordReset();
        $passwordReset->email = $user->email;
        $passwordReset->token = $token;

        $passwordReset->save();
        
        $entreprise->notify(new VerifyEmail($passwordReset->token,$request->email));
        $entreprise->notify(new MessageAccueilCompany($user));
        DB::commit(); // Validation des opérations

        return response()->json([
            "status"  => true,
            "message" => $messageSuccess,
            "data"    => $entreprise
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack(); // Annule toutes les opérations en cas d'erreur

        return response()->json([
            "status"  => false,
            "message" => "Erreur : " . $e->getMessage()
        ], 500);
    }
    }

    private function handleStudent(Request $request, $messageSuccess)
{
    Log::info("Début du handleStudent", ['request' => $request->all()]);

    $validator = Validator::make($request->all(), [
        'email' => 'required|email|unique:users,email',
        'bio' => 'max:300', 
        'nom' => 'required',
        'prenoms' => 'required',
        'phone' => 'required|regex:/^\+\d{10,13}$/',
    ], [
        'email.required' => 'L\'adresse email est requise.',
        'email.email' => 'L\'adresse email n\'est pas valide.',
        'email.unique' => 'L\'adresse email est déjà utilisée.',
        'bio.max' => 'max 300 caractères.',
        'nom.required' => 'Le nom est requis.',
        'prenoms.required' => 'Les prénoms sont requis.',
        'phone.required' => 'Le numéro de téléphone est requis.',
        'phone.regex' => 'Le numéro de téléphone doit être au format +XXX avec 10 chiffres (ex: +2258585858585).',
    ]);

    if ($validator->fails()) {
        Log::warning("Validation échouée", ['errors' => $validator->errors()->all()]);
        return response()->json([
            'status' => false,
            'message' => $validator->errors()->first(),
        ], 200);
    }

    if (!$request->hasFile('photo')) {
        Log::warning("Aucune image trouvée dans la requête");
        return response()->json([
            "status" => false,
            "message" => "Image not found",
        ], 404);
    }

    DB::beginTransaction();
    Log::info("Transaction DB commencée");

    try {
        if (!$request->nom || !$request->email || !$request->prenoms) {
            Log::warning("Champs obligatoires manquants", ['request' => $request->all()]);
            return response()->json([
                "status" => false,
                "message" => "Veuillez remplir tous les champs.",
            ], 422);
        }

        $user = User::create($request->all());
        Log::info("Utilisateur créé", ['user_id' => $user->id]);

        $fileNewPiece = null; 
        if ($request->hasfile('photo_profil')) {
            $newPiece = $request->file('photo_profil');
            $fileNewPiece = $newPiece->hashName();
            $newPiece->storeAs('public/images', $fileNewPiece);
            Log::info("Photo profil enregistrée", ['file' => $fileNewPiece]);
        } 

        $student = new Student();
        $student->nom          = $request->nom;
        $student->email        = $request->email;
        $student->titreCv      = $request->titreCv;
        $student->ville        = $request->ville;
        $student->quartier     = $request->quartier;
        $student->commune      = $request->commune;
        $student->diplome      = $request->diplome;
        $student->phone        = $request->phone;
        $student->password     = $user->password;
        $student->bio          = $user->bio;
        $student->photo_profil = $fileNewPiece;
        $student->user_id      = $user->id;
        $student->prenoms      = $request->prenoms;
        $student->save();
        Log::info("Student créé", ['student_id' => $student->id]);

        if ($request->token_push) {
            $token_push = new TokenPush();
            $token_push->token_push = $request->token_push; 
            $token_push->user_id = $user->id; 
            $token_push->appareil = $request->appareil; 
            $token_push->save();
            Log::info("Token push enregistré", ['token_push_id' => $token_push->id]);
        }

        $myCompetences = $request->competence;
        if ($myCompetences) {
            foreach ($myCompetences as $item) {
                $studentCompetence = new CompetenceStudent();
                $studentCompetence->competence_id = $item;
                $studentCompetence->student_id = $student->id;
                $studentCompetence->save();
                Log::info("Compétence enregistrée pour student", [
                    'student_id' => $student->id, 
                    'competence_id' => $item
                ]);
            }
        }
        $request->validate([
            "jour" => "required",
            "First_horaire" => "required",
            "totalHour" => "required"
        ]);
        $day = $request->jour;
        foreach ($day as $jou) {
            $schedule = new Jour();
            $schedule->student_id = $student->id;
            $schedule->jour = $jou;

            $schedule->First_horaire = $request->First_horaire;
            $schedule->Second_horaire = $request->Second_horaire;

            $schedule->hour_periode_debut = $request->hour_periode_debut;
            $schedule->hour_periode_fin = $request->hour_periode_fin;

            $schedule->periode_debut = $request->periode_debut;
            $schedule->periode_fin = $request->periode_fin;

            $schedule->periode = $request->periode;

            $schedule->totalHour = $request->totalHour;

            $schedule->save();
        }
foreach ($request->photo as $piece) {

    // 1️⃣ Stockage de l'image
    $fileNewPiece = $piece->hashName();
    $piece->storeAs('public/images', $fileNewPiece);
    $fullPath = storage_path('app/public/images/' . $fileNewPiece);

    /*
    |--------------------------------------------------------------------------
    | 2️⃣ Appel OCR.space via Codesmiths avec InputType
    |--------------------------------------------------------------------------
    */
    try {
        // OverlayRequired = false
        $options = new OcrSpaceOptions(false);

        // ParseImage avec InputType::File
        $response = OcrSpace::parseImage(
            InputType::File,       // indique un fichier local
            $fullPath,             // chemin vers l'image
            $options,              // overlay
            [
                'apikey' => env('OCR_SPACE_API_KEY'),
                'language' => 'fre', // français,
                'verify' => config('ocrspace.verify'),
            ]
        );

        $text = strtolower($response['ParsedResults'][0]['ParsedText'] ?? '');

        if (empty($text)) {
            Log::warning("Aucun texte détecté", ['filename' => $fileNewPiece]);
            Storage::disk('public')->delete('images/' . $fileNewPiece);
            continue;
        }

    } catch (\Exception $e) {
        Log::error("Erreur OCR.space", [
            'filename' => $fileNewPiece,
            'message' => $e->getMessage()
        ]);
        Storage::disk('public')->delete('images/' . $fileNewPiece);
        continue;
    }

    /*
    |--------------------------------------------------------------------------
    | 3️⃣ Validation Carte Étudiante
    |--------------------------------------------------------------------------
    */
    $hasCarte = preg_match('/carte/i', $text);
    $hasEtudiant = preg_match('/etudiant/i', $text);
    $hasFiliere = preg_match('/filiere|departement|specialite|option/i', $text);
    $hasMatricule = preg_match('/[a-z0-9]{5,}/i', $text);

    $score = $hasCarte + $hasEtudiant + $hasFiliere + $hasMatricule;
    $isValid = $score >= 3;

    /*
    |--------------------------------------------------------------------------
    | 4️⃣ Décision : sauvegarde ou suppression
    |--------------------------------------------------------------------------
    */
    if ($isValid) {
        $PhotosPiece = new Photos();
        $PhotosPiece->user_id = $user->id;
        $PhotosPiece->path = $fileNewPiece;
        $PhotosPiece->save();

        Log::info("Carte valide via OCR.space", [
            'photo_id' => $PhotosPiece->id,
            'score' => $score
        ]);
    } else {
        Storage::disk('public')->delete('images/' . $fileNewPiece);

        Log::warning("Document rejeté via OCR.space", [
            'filename' => $fileNewPiece,
            'score' => $score
        ]);
    }
}
        // foreach ($request->photo as $piece) {
        //     $PhotosPiece = new Photos();
        //     $newPiece = $piece;
        //     $fileNewPiece = $piece->hashName();
        //     $newPiece->storeAs('public/images', $fileNewPiece);
        //     $PhotosPiece->user_id = $user->id;
        //     $PhotosPiece->path = $fileNewPiece;
        //     $PhotosPiece->save();
        //     Log::info("Photo pièce enregistrée", ['photo_id' => $PhotosPiece->id]);
        // }
      if($request->qualifications){
        foreach ($request->qualifications as $qualificationStudent) {
            $qualifications = new Qualification();
            $qualifications->student_id  = $student->id;
            $objet = json_decode($qualificationStudent); // ceci veut dire que j'envoie ca en string le tableau 
            $qualifications->objet = $objet->objet;
            $qualifications->date_debut = $objet->date_debut;
            $qualifications->date_fin = $objet->date_fin;
            $qualifications->save();
        }
    }

    if($request->code_ambassadeur){
         $ambassador = User::where('code_ambassadeur', $request->code_ambassadeur)
                      ->first();

    if ($ambassador) {
        // Vérifier si l'utilisateur a déjà été enregistré dans delete_users
        $alreadyUsed = DeleteUser::where('user_id', $user->id)->exists();
        if (!$alreadyUsed) {
       // Créer le lien dans la table referrals
        Referral::create([
            'ambassador_id' => $ambassador->id,   // l'utilisateur qui a le code
            'referred_id'   => $user->id,     // le nouvel utilisateur
            'subscription_paid' => false,        // par défaut
            'commission_paid'   => false         // par défaut
        ]);
        }
        
    }
    }

        // $token = Str::random(60);
        // $passwordReset = new PasswordReset();
        // $passwordReset->email = $user->email;
        // $passwordReset->token = $token;
        // $passwordReset->save();
        // Log::info("Password reset token créé", ['token' => $token]);

        // $user->notify(new VerifyEmail($passwordReset->token,$request->email));
        // $user->notify(new MessageBienvenue($user));
        // Log::info("Notification email envoyée", ['user_id' => $user->id]);

        DB::commit();
        // Log::info("Transaction DB validée avec succès");

        return response()->json([
            "status" => true,
            "message" => $messageSuccess,
            "data" => $student->load([
                    'jours',
                    'experiences',
                    'user.statut',
                    'entreprises',
                    'offres',
                    'competences',
                    'etoiles',
                    'favoris',
                    'offre_student',
                    // 'entreprise_student',
                    'qualifications',
                    // 'notifications'
                ])
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
        Log::error("Erreur lors de l'enregistrement", ['message' => $e->getMessage()]);
        return response()->json([
            "status" => false,
            "message" => "Erreur lors de l'enregistrement : " . $e->getMessage(),
        ], 500);
    }
}
 public function createScheduleStudent(Request $request,$student_id)
    {

       $student_id = $request->user()->id;
 
        $id = Student::where("user_id", "=", $student_id)->first()->id;
        $day = $request->jour;
   
        $request->validate([
            "jour" => "required",
            "First_horaire" => "required",
            "totalHour" => "required"
        ]);
        foreach ($day as $jou) {
            $schedule = new Jour();

            $schedule->student_id = $id;
            $schedule->jour = $jou;

            $schedule->First_horaire = $request->First_horaire;
            $schedule->Second_horaire = $request->Second_horaire;

            $schedule->hour_periode_debut = $request->hour_periode_debut;
            $schedule->hour_periode_fin = $request->hour_periode_fin;

            $schedule->periode_debut = $request->periode_debut;
            $schedule->periode_fin = $request->periode_fin;

            $schedule->periode = $request->periode;

            $schedule->totalHour = $request->totalHour;

            $schedule->save();
        }
        return response()->json([
            "status" => true,
            "message" => "Emploi du temps crée avec succès",
            "data" => $schedule
        ],200);

       
    }
    private function handleParticulier(Request $request, $messageSuccess)
    {
        $user = new User();

        $request->validate([
            "nom" => 'required',
            "email" => "required|email|unique:users",
            "password" => "required",
        ]);

        $user->nom = $request->nom;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->statut_id = $request->statut_id;

        $user->save();

        $request->validate([
            "nom" => 'required',
            "email" => "required",
            "password" => "required"
        ]);

        $particulier = new Entreprise();



        $particulier->user_id = $user->id;

        $particulier->nom = $request->nom_particulier;// ceci est pour recupere le nom entreprise pour le particulier.
        $particulier->contact = $request->phone;
        $particulier->nom_particulier = $request->nom; // Ceci est pour recupere le nom du particulier.
        $particulier->particulier_prenoms = $request->particulier_prenoms;
        $particulier->ville = $request->ville;
        $particulier->quartier = $request->quartier;
        $particulier->commune = $request->commune;
        $particulier->email = $request->email;
        $particulier->password = Hash::make($request->password);
        $particulier->user_id = $user->id;
        if ($request->hasFile('piece_gerant')) {
            foreach ($request->piece_gerant as $piece) {
                $PhotosPiece = new Photos();
                $newPiece = $piece;
                $fileNewPiece = $piece->hashName();
                $newPiece->storeAs('public/images', $fileNewPiece);
                $PhotosPiece->user_id = $user->id;
                $PhotosPiece->path = $fileNewPiece;
                $PhotosPiece->save();
                }
        }
        $particulier->save();
          $token = Str::random(60);
        $passwordReset = new PasswordReset();
        $passwordReset->email = $user->email;
        $passwordReset->token = $token;

        $passwordReset->save();
        $user->notify(new VerifyEmail($passwordReset->token,$request->email));
        $user->notify(new MessageAccueilCompany($user));
        return response()->json([
            "status" => true,
            "message" => $messageSuccess,
            "data" => $particulier
        ]);
    }

   public function verificationEmailByMail(Request $request)
{
    $passwordReset = PasswordReset::where('email', $request->email)
        ->where('token', $request->token)
        ->first();

    if (!$passwordReset) {
        return response()->json([
            "status" => false,
            "message" => "Token ou email invalide"
        ], 400);
    }

    try {
        DB::transaction(function () use ($request, $passwordReset) {
            $user = User::where('email', $request->email)->firstOrFail();

            $user->verif_email = 1;
            $user->email_verified_at = now();
            
            $user->save();

            // Supprimer le token utilisé
            $passwordReset->delete();
        });

        return response()->json([
            "status" => true,
            "message" => "Email vérifié avec succès"
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            "status" => false,
            "message" => "Erreur lors de la vérification",
            "error" => $e->getMessage()
        ], 500);
    }
}

    

    /**
     * @OA\Get(
     *      path="api/auth_logout",
     *      operationId="Se déconnecter",
     *      tags={"Users"},
     *      summary="Se déconnecter",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Déconnecté avec succès"),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */

    public function logout(Request $request)
{
    try {
        // Récupère l'utilisateur actuellement authentifié via le token
        $user = auth()->user();

        if ($user) {
            // Supprime le token d'accès courant
            $request->user()->currentAccessToken()->delete();

            // Supprime le token_push correspondant à cet utilisateur
            TokenPush::where('user_id', $user->id)->delete();

            return response()->json([
                'status' => true,
                'message' => 'Déconnecté avec succès.',
            ], 200);
        }

        return response()->json([
            'status' => false,
            'message' => 'Utilisateur non authentifié',
        ], 401);

    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => 'Erreur lors de la déconnexion',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    /**
     * @OA\Get(
     *      path="api/see_role",
     *      operationId="Voir les profils",
     *      tags={"Users"},
     *      summary="Voir les profils",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *                  @OA\Property(property="data", type="array",@OA\Items(type="object"),),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */
    public function see_role()
    {
        $status = Status::all();

        return response()->json([
            "status" => true,
            "data" => $status
        ], 200);
    }


    



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    public function show($id)
    {

        if (User::where("id", $id)->exists()) {
            $user_detail = User::where("id", $id)->first();
            return response()->json([
                "status" => true,
                "data" => $user_detail
            ], 200);
        } else {
            return response()->json([
                "status" => false,
                "message" => "l'utilisateur n'existe pas"
            ], 404);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * 
     * @param  int  $id
     *
     * @return \Illuminate\Http\Response
     */
    /**
 * @OA\Post(
 *     path="/api/modifier_profil",
 *     summary="Mise à jour du profil étudiant connecté",
 *     description="Met à jour les informations de l'étudiant connecté, y compris ses compétences et sa photo de profil.",
 *     tags={"Etudiants."},
 *     security={{"bearerAuth":{}}},
 *
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 type="object",
 *                 required={"nom","email"},
 *                 @OA\Property(property="nom", type="string", example="Doe"),
 *                 @OA\Property(property="prenoms", type="string", example="John"),
 *                 @OA\Property(property="email", type="string", format="email", example="john.doe@example.com"),
 *                 @OA\Property(property="phone", type="string", example="+2250700000000"),
 *                 @OA\Property(property="bio", type="string", example="Je suis étudiant en informatique..."),
 *                 @OA\Property(property="commune", type="string", example="Cocody"),
 *                 @OA\Property(property="ville", type="string", example="Abidjan"),
 *                 @OA\Property(property="quartier", type="string", example="Angré"),
 *                 @OA\Property(property="diplome", type="string", example="Licence Informatique"),
 *                 @OA\Property(property="update_via_mobile", type="string", example="1 (ceci est pour le mobile)"),
 *
 *                 @OA\Property(
 *                     property="competences",
 *                     type="array",
 *                     @OA\Items(type="integer", example=8),
 *                     description="Liste des ID de compétences"
 *                 ),
 *  *                 @OA\Property(
 *                     property="qualifications",
 *                     type="array",
 *                     @OA\Items(type="any"),
 *                     description="Liste des qualifications"
 *                 ),
 *
 *                 @OA\Property(
 *                     property="photo_profil",
 *                     type="string",
 *                     format="binary",
 *                     description="Image du profil (upload fichier)"
 *                 )
 *             )
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=200,
 *         description="Mise à jour effectuée avec succès",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="boolean", example=true),
 *             @OA\Property(property="message", type="string", example="Mis à jour effectuée avec succès"),
 *             @OA\Property(
 *                 property="user",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="nom", type="string", example="Doe"),
 *                 @OA\Property(property="email", type="string", example="john.doe@example.com"),
 *               @OA\Property(property="Qualifications", type="string", example="[{detail:lorem,date_debut:2025-06-12,date_fin:2025-08-01}]")
 *             ),
 *             @OA\Property(
 *                 property="compte",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=10),
 *                 @OA\Property(property="bio", type="string", example="Je suis étudiant..."),
 *                 @OA\Property(property="phone", type="string", example="+2250700000000"),
 *                 @OA\Property(property="ville", type="string", example="Abidjan"),
 *                 @OA\Property(property="photo_profil", type="integer", example=5)
 *             )
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=401,
 *         description="Non authentifié"
 *     ),
 *
 *     @OA\Response(
 *         response=422,
 *         description="Erreur de validation"
 *     )
 * )
 */
public function update(Request $request)
    {
        $userId = auth()->user()->id;
        $user = User::find($userId);
        $role = Status::where("id", $user->statut_id)->firstOrFail();
        $msg = "Mis à jour effectuée avec succès";

        // === ÉTUDIANT ===
        if ($role->statut === 'etudiant') {
            $studentInfo = Student::where("user_id", $userId)->firstOrFail();
            $studentId = $studentInfo->id;

            // Sauvegarde de l'ancien email pour comparaison
            $oldEmail = $user->email;

            // Mise à jour du nom et email
            $user->nom = $request->filled('nom') ? $request->nom : $user->nom;
            $user->email = $request->filled('email') ? $request->email : $user->email;

            // Détecter si l'email a changé
            if ($request->filled('email') && $request->email !== $oldEmail) {
                $user->verif_email = 0;
                $token = Str::random(60);

                PasswordReset::updateOrCreate(
                    ['email' => $request->email],
                    ['token' => $token]
                );

                $user->notify(new VerifyEmail($token, $request->email));
            }

            $user->save();

            // === COMPÉTENCES (seulement si pas mobile) ===
            if ($request->update_via_mobile === 0) {
                $oldCompetences = CompetenceStudent::where("student_id", $studentId)
                    ->pluck('competence_id')
                    ->toArray();

                $myCompetences = $request->filled('competences') ? $request->competences : $oldCompetences;

                if (!empty($myCompetences)) {
                    $toDelete = array_diff($oldCompetences, $myCompetences);
                    $toAdd = array_diff($myCompetences, $oldCompetences);

                    foreach ($toDelete as $competenceId) {
                        CompetenceStudent::where('student_id', $studentId)
                            ->where('competence_id', $competenceId)
                            ->delete();
                    }

                    foreach ($toAdd as $competenceId) {
                        CompetenceStudent::create([
                            'competence_id' => $competenceId,
                            'student_id' => $studentId,
                        ]);
                    }
                } else {
                    CompetenceStudent::where('student_id', $studentId)->delete();
                }
            }

            // === PHOTO PROFIL ===
            $fileNewPiece = $studentInfo->photo_profil;
            if ($request->hasFile('photo_profil')) {
                $newPiece = $request->file('photo_profil');
                $fileNewPiece = $newPiece->hashName();
                $newPiece->storeAs('public/images', $fileNewPiece);
            }

            // === QUALIFICATIONS ===
            // if ($request->filled('qualifications')) {
            //     Qualification::where('student_id', $studentId)->delete();
            //     foreach ($request->qualifications as $qualificationStudent) {
            //         $qualifications = new Qualification();
            // $qualifications->student_id  = $studentId;
            // $objet = json_decode($qualificationStudent);
            // $qualifications->detail = $objet->detail;
            // $qualifications->objet = $objet->objet;
            // $qualifications->date_debut = $objet->date_debut;
            // $qualifications->date_fin = $objet->date_fin;
            // $qualifications->save();
            //     }
            // }

            // === CARTES / PIÈCES ===
           if ($request->hasFile('carte')) {

    // 1. Récupération des anciennes photos
    $oldPhotos = Photos::where('user_id', $userId)->get();

    // 2. Suppression des fichiers physiques + enregistrements BD
    foreach ($oldPhotos as $old) {
        Storage::delete('public/images/' . $old->path);
        $old->delete();
    }

    // 3. Enregistrement des nouvelles photos
    foreach ($request->file('carte') as $carte) {
        $fileName = $carte->hashName();
        $carte->storeAs('public/images', $fileName);

        Photos::create([
            'user_id' => $userId,
            'path' => $fileName,
        ]);
    }
}

            // === MISE À JOUR STUDENT ===
            $student = Student::findOrFail($studentId);
            $student->titreCv = $request->filled('titreCv') ? $request->titreCv : $student->titreCv;
            $student->bio = $request->filled('bio') ? $request->bio : $student->bio;
            $student->nom = $request->filled('nom') ? $request->nom : $student->nom;
            $student->commune = $request->filled('commune') ? $request->commune : $student->commune;
            $student->email = $request->filled('email') ? $request->email : $student->email;
            $student->phone = $request->filled('phone') ? $request->phone : $student->phone;
            $student->prenoms = $request->filled('prenoms') ? $request->prenoms : $student->prenoms;
            $student->ville = $request->filled('ville') ? $request->ville : $student->ville;
            $student->quartier = $request->filled('quartier') ? $request->quartier : $student->quartier;
            $student->diplome = $request->filled('diplome') ? $request->diplome : $student->diplome;
            $student->photo_profil = $request->hasFile('photo_profil') ? $fileNewPiece : $student->photo_profil;

            $student->save();

            return response()->json([
                "status" => true,
                "message" => $msg,
                "user" => $user,
                "compte" => $student->load([
                    'jours',
                    'experiences',
                    'user.statut',
                    'entreprises',
                    'offres',
                    'competences',
                    'etoiles',
                    'favoris',
                    'offre_student',
                    // 'entreprise_student',
                    'qualifications',
                    // 'notifications'
                ])
            ], 200);
        }

        // === ENTREPRISE ===
        if ($role->statut === "entreprise") {
            $entrepriseInfo = Entreprise::where("user_id", $userId)->firstOrFail();
            $entrepriseId = $entrepriseInfo->id;

            $oldEmail = $user->email;

            $user->email = $request->filled('email') ? $request->email : $user->email;
            $user->nom = $request->filled('nom') ? $request->nom : $user->nom;

            if ($request->filled('email') && $request->email !== $oldEmail) {
                $user->verif_email = 0;
                $token = Str::random(60);

                PasswordReset::updateOrCreate(
                    ['email' => $request->email],
                    ['token' => $token]
                );

                $user->notify(new VerifyEmail($token, $request->email));
            }

            $user->save();

            $entreprise = Entreprise::findOrFail($entrepriseId);
            $entreprise->nom = $request->filled('nom') ? $request->nom : $entreprise->nom;
            $entreprise->matricule_cc = $request->filled('matricule_cc') ? $request->matricule_cc : $entreprise->matricule_cc;
            $entreprise->email = $request->filled('email') ? $request->email : $entreprise->email;
            $entreprise->contact = $request->filled('contact') ? $request->contact : $entreprise->contact;
            $entreprise->ville = $request->filled('ville') ? $request->ville : $entreprise->ville;
            $entreprise->quartier = $request->filled('quartier') ? $request->quartier : $entreprise->quartier;
            $entreprise->gerant = $request->filled('gerant') ? $request->gerant : $entreprise->gerant;
            $entreprise->numero_gerant = $request->filled('numero_gerant') ? $request->numero_gerant : $entreprise->numero_gerant;
            $entreprise->commune = $request->filled('commune') ? $request->commune : $entreprise->commune;
            $entreprise->forme_juridique = $request->filled('forme_juridique') ? $request->forme_juridique : $entreprise->forme_juridique;
            $entreprise->NCC = $request->filled('NCC') ? $request->NCC : $entreprise->NCC;

            $registrePath = $entreprise->registre;
            if ($request->hasFile('registre')) {
                $image = $request->file('registre');
                $registrePath = time() . '.' . $image->extension();
                $image->storeAs('public/images', $registrePath);
            }

            if ($request->hasFile('piece_gerant')) {
                foreach ($request->file('piece_gerant') as $carte) {
                    $fileName = $carte->hashName();
                    $carte->storeAs('public/images', $fileName);

                    Photos::create([
                        'user_id' => $userId,
                        'path' => $fileName,
                    ]);
                }
            }

            $logoPath = $entreprise->logo;
            if ($request->hasFile('logo')) {
                $image_logo = $request->file('logo');
                $logoPath = time() . '.' . $image_logo->extension();
                $image_logo->storeAs('public/images', $logoPath);
            }

    // 1. Supprimer tous les emails CC existants de l'entreprise
    EmailCc::where('entreprises_id', $entreprise->id)->delete();

    if (is_array($request->email_cc) && count($request->email_cc) > 0) {
    // 2. Recréer avec les nouveaux emails envoyés
    foreach ($request->email_cc as $email) {

        $EmailCC = new EmailCc();
         $EmailCC->entreprises_id = $entreprise->id;
        $EmailCC->email_cc = $email;
        $EmailCC->save();
    }
}


            $entreprise->registre = $registrePath;
            $entreprise->logo = $logoPath;
            $entreprise->save();

            return response()->json([
                "status" => true,
                "message" => $msg,
                "data"=>$entreprise->load(['emails',
                'entreprise_student',
                'wishlists',
                'students',
                'user',
                'user.photos',
                'user.statut',
                'offre'
                ])
            ], 200);
        }

        // === PARTICULIER ===
        if ($role->statut === "particulier") {
            $entrepriseInfo = Entreprise::where("user_id", $userId)->firstOrFail();
            $entrepriseId = $entrepriseInfo->id;

            $oldEmail = $user->email;

            $user->email = $request->filled('email') ? $request->email : $user->email;
            $user->nom = $request->filled('nom') ? $request->nom : $user->nom;

            if ($request->filled('email') && $request->email !== $oldEmail) {
                $user->verif_email = 0;
                $token = Str::random(60);

                PasswordReset::updateOrCreate(
                    ['email' => $request->email],
                    ['token' => $token]
                );

                $user->notify(new VerifyEmail($token, $request->email));
            }

            $user->save();

            $entreprise = Entreprise::findOrFail($entrepriseId);
            $entreprise->nom = $request->filled('nom') ? $request->nom : $entreprise->nom;
            $entreprise->particulier_prenoms = $request->filled('particulier_prenoms') ? $request->particulier_prenoms : $entreprise->particulier_prenoms;
            $entreprise->email = $request->filled('email') ? $request->email : $entreprise->email;
            $entreprise->contact = $request->filled('contact') ? $request->contact : $entreprise->contact;
            $entreprise->ville = $request->filled('ville') ? $request->ville : $entreprise->ville;
            $entreprise->quartier = $request->filled('quartier') ? $request->quartier : $entreprise->quartier;
            $entreprise->commune = $request->filled('commune') ? $request->commune : $entreprise->commune;

            if ($request->hasFile('piece_gerant')) {
                foreach ($request->file('piece_gerant') as $carte) {
                    $fileName = $carte->hashName();
                    $carte->storeAs('public/images', $fileName);

                    Photos::create([
                        'user_id' => $userId,
                        'path' => $fileName,
                    ]);
                }
            }

            $entreprise->save();

            return response()->json([
                "status" => true,
                "message" => $msg,
            ], 200);
        }

        // === ADMIN ===
        if ($role->statut === 'admin') {
            $user->nom = $request->filled('nom') ? $request->nom : $user->nom;
            $user->save();

            return response()->json([
                "status" => true,
                "message" => $msg,
                "user" => $user
            ], 200);
        }

        // Cas par défaut (ne devrait pas arriver)
        return response()->json([
            "status" => false,
            "message" => "Rôle non reconnu"
        ], 400);
    }
//     public function update(Request $request)
//     {
//         $userId = auth()->user()->id;
//         $user = User::where('id', $userId)->first();
//         $role = Status::where("id", "=", $user->statut_id)->first();
//         $msg = "Mis à jour effectuée avec succès";
     
//         if ($role->statut === 'etudiant') {
//             $studentInfo = Student::where("user_id", $userId)->first();
//             $studentId = $studentInfo->id;
            
//             $user->nom =  !empty($request->nom) ? $request->nom : $user->nom;
//             $user->email =  !empty($request->email) ? $request->email : $user->email;
//         if ($request->email !== $user->email) {
//             $user->verif_email = 0;
//            $token = Str::random(60);

//         $passwordReset = new PasswordReset();
//         $passwordReset->email = $request->email;
//         $passwordReset->token = $token;
//         $passwordReset->save();

//         // Envoi du mail de vérification à la nouvelle adresse
//         $user->notify(new VerifyEmail($token, $request->email));
//     }
//             $user->save();


//              if($request->update_via_mobile === 0){
//                    $oldCompetences = CompetenceStudent::where("student_id", $studentId)
//         ->pluck('competence_id')
//         ->toArray();
//         $myCompetences = !empty($request->competences) ? $request->competences:$oldCompetences;

// if (!empty($myCompetences)) {
//     // Celles à supprimer
//     $toDelete = array_diff($oldCompetences, $myCompetences);

//     // Celles à ajouter
//     $toAdd = array_diff($myCompetences, $oldCompetences);
    
//     // Supprimer les compétences en trop
//     foreach ($toDelete as $competenceId) {
//         CompetenceStudent::where('student_id', $studentId)
//             ->where('competence_id', $competenceId)
//             ->delete();
//     }

//     // Ajouter uniquement les nouvelles compétences
//     foreach ($toAdd as $competenceId) {
//         $studentCompetence = new CompetenceStudent();
//         $studentCompetence->competence_id = $competenceId;
//         $studentCompetence->student_id = $studentId;
//         $studentCompetence->save();
//     }
// }else{
//  foreach ($oldCompetences as $competenceId) {
//         CompetenceStudent::where('student_id', $studentId)
//             ->where('competence_id', $competenceId)
//             ->delete();
//     }
// }
//              }
          
//             $student = Student::findOrFail($studentId);
//             $fileNewPiece=null;
//             if ($request->hasfile('photo_profil')) {
//                 $newPiece = $request->file('photo_profil');
//                 $fileNewPiece = $newPiece->hashName();
//                 $newPiece->storeAs('public/images', $fileNewPiece);
//             } 

//             if($request->qualifications){
                
//                 foreach ($request->qualifications as $qualificationStudent) {
//              $qualifications = new Qualification();
//             $qualifications->student_id  = $studentId;
//             $objet = json_decode($qualificationStudent);
//             $qualifications->detail = $objet->detail;
//             $qualifications->date_debut = $objet->date_debut;
//             $qualifications->date_fin = $objet->date_fin;
//             $qualifications->save();
//               }
//             }

//             if ($request->hasFile('carte')) {
//             foreach ($request->carte as $carte) {
//                 $PhotosPiece = new Photos();
//                 $newPiece = $carte;
//                 $fileNewPiece = $carte->hashName();
//                 $newPiece->storeAs('public/images', $fileNewPiece);
//                 $PhotosPiece->user_id = $userId;
//                 $PhotosPiece->path = $fileNewPiece;
//                 $PhotosPiece->save();
//                 }
//         }
 
//             $student->titreCv  =  !empty($request->titreCv) ? $request->titreCv : $student->titreCv;
//             $student->bio =  !empty($request->bio) ? $request->bio : $student->bio;
//             $student->nom =  !empty($request->nom) ? $request->nom : $student->nom;
//             $student->commune =  !empty($request->commune) ? $request->commune : $student->commune;
//             $student->email =  !empty($request->email) ? $request->email : $student->email;
//             $student->phone =  !empty($request->phone) ? $request->phone : $student->phone;
//             $student->prenoms = !empty($request->prenoms) ? $request->prenoms : $student->prenoms;
//             $student->ville =  !empty($request->ville) ? $request->ville : $student->ville;
//             $student->quartier =  !empty($request->quartier) ? $request->quartier : $student->quartier;
//             $student->diplome =  !empty($request->diplome) ? $request->diplome : $student->diplome;
//             $student->photo_profil =  $request->file('photo_profil') ? $fileNewPiece  : $student->photo_profil;
         
//             $student->save();

            


//             return response()->json([
//                 "status" => true,
//                 "message" => $msg,
//                 "user" =>  $user,
//                 "compte" => $student
//             ], 200);
//         }
//         if ($role->statut === "entreprise") {

//             $entrepriseInfo = Entreprise::where("user_id", $userId)->first();
//             $entrepriseId = $entrepriseInfo->id;

//             $userInfo = User::where("id", $userId)->first()->id;


//             $user = User::find($userInfo);
//             $user->email =  !empty($request->email) ? $request->email : $user->email;
//             $user->nom =  !empty($request->nom) ? $request->nom : $user->nom;
//      if (!empty($request->email)) {
//         $user->verif_email = 0;
//         $token = Str::random(60);

//         $passwordReset = new PasswordReset();
//         $passwordReset->email = $request->email;
//         $passwordReset->token = $token;
//         $passwordReset->save();

//         // Envoi du mail de vérification à la nouvelle adresse
//         $user->notify(new VerifyEmail($token, $request->email));
//     }
//             $user->update();


//             $entreprise = Entreprise::findOrFail($entrepriseId);
//             $entreprise->nom =  !empty($request->nom) ? $request->nom : $entreprise->nom;
//             $entreprise->matricule_cc = !empty($request->matricule_cc) ? $request->matricule_cc : $entreprise->matricule_cc;
//             $entreprise->email =  !empty($request->email) ? $request->email : $entreprise->email;
//             $entreprise->contact =  !empty($request->contact) ? $request->contact : $entreprise->contact;
//             $entreprise->ville =  !empty($request->ville) ? $request->ville : $entreprise->ville;
//             $entreprise->quartier =  !empty($request->quartier) ? $request->quartier : $entreprise->quartier;
//             $entreprise->gerant =  !empty($request->gerant) ? $request->gerant : $entreprise->gerant;
//             $entreprise->numero_gerant =  !empty($request->numero_gerant) ? $request->numero_gerant : $entreprise->numero_gerant;
//             $entreprise->commune =  !empty($request->commune) ? $request->commune : $entreprise->commune;
//             $entreprise->forme_juridique =  !empty($request->forme_juridique) ? $request->forme_juridique : $entreprise->forme_juridique;
//             $entreprise->NCC =  !empty($request->NCC) ? $request->NCC : $entreprise->NCC;

//             $image = $request->file('registre');
//             if ($image) {
//                 $ext = $image->extension();
//                 $fileName = time() . '.' . $ext;
//                 $image->storeAs('public/images', $fileName);
//             }
//             if ($request->file('piece_gerant')) {
//                 foreach ($request->piece_gerant as $carte) {
//                 $PhotosPiece = new Photos();
//                 $newPiece = $carte;
//                 $fileNewPiece = $carte->hashName();
//                 $newPiece->storeAs('public/images', $fileNewPiece);
//                 $PhotosPiece->user_id = $userId;
//                 $PhotosPiece->path = $fileNewPiece;
//                 $PhotosPiece->save();
//                 }
//             }
            
//             if ($request->file('logo')) {
//                 $image_logo = $request->file('logo');
//                 $ext_logo = $image_logo->extension();
//                 $file_logo = time() . '.' . $ext_logo;
//                 $image_logo->storeAs('public/images', $file_logo);
//             }
//             $entreprise->registre = !empty($image) ? $fileName : $entreprise->registre;
//             // $entreprise->piece_gerant = !empty($file_piece_gerant) ? $file_piece_gerant : $entreprise->piece_gerant;
//             $entreprise->logo = !empty($file_logo) ? $file_logo : $entreprise->logo;
//             $entreprise->save();
//             return response()->json([
//                 "status" => true,
//                 "message" => $msg,
//             ], 200);
//         }
//          if ($role->statut === "particulier") {

//             $entrepriseInfo = Entreprise::where("user_id", $userId)->first();
//             $entrepriseId = $entrepriseInfo->id;

//             $userInfo = User::where("id", $userId)->first()->id;


//             $user = User::find($userInfo);
//             $user->email =  !empty($request->email) ? $request->email : $user->email;
//             $user->nom =  !empty($request->nom) ? $request->nom : $user->nom;
//      if (!empty($request->email)) {
//         $user->verif_email = 0;
//         $token = Str::random(60);

//         $passwordReset = new PasswordReset();
//         $passwordReset->email = $request->email;
//         $passwordReset->token = $token;
//         $passwordReset->save();

//         // Envoi du mail de vérification à la nouvelle adresse
//         $user->notify(new VerifyEmail($token, $request->email));
//     }
//             $user->update();


//             $entreprise = Entreprise::findOrFail($entrepriseId);
//             $entreprise->nom =  !empty($request->nom) ? $request->nom : $entreprise->nom;
//             $entreprise->particulier_prenoms = !empty($request->particulier_prenoms) ? $request->particulier_prenoms : $entreprise->particulier_prenoms;
//             $entreprise->email =  !empty($request->email) ? $request->email : $entreprise->email;
//             $entreprise->contact =  !empty($request->contact) ? $request->contact : $entreprise->contact;
//             $entreprise->ville =  !empty($request->ville) ? $request->ville : $entreprise->ville;
//             $entreprise->quartier =  !empty($request->quartier) ? $request->quartier : $entreprise->quartier;
//             $entreprise->commune =  !empty($request->commune) ? $request->commune : $entreprise->commune;
       
//             if ($request->file('piece_gerant')) {
//                 foreach ($request->piece_gerant as $carte) {
//                 $PhotosPiece = new Photos();
//                 $newPiece = $carte;
//                 $fileNewPiece = $carte->hashName();
//                 $newPiece->storeAs('public/images', $fileNewPiece);
//                 $PhotosPiece->user_id = $userId;
//                 $PhotosPiece->path = $fileNewPiece;
//                 $PhotosPiece->save();
//                 }
//             }
//             $entreprise->save();
//             return response()->json([
//                 "status" => true,
//                 "message" => $msg,
//             ], 200);
//         }
//         if ($role->statut === 'admin') {

//             $adminInfo = User::where("id", $userId)->first();


//             $adminInfo->nom =  !empty($request->nom) ? $request->nom : $user->nom;

//             $adminInfo->save();
//             return response()->json([
//                 "status" => true,
//                 "message" => $msg,
//                 "user" => $adminInfo
//             ], 200);
//         }
//     }
    public function modifyPassword(Request $request)
    {
        $userId = auth()->user()->id;
        $user = User::where('id', $userId)->first();
        $role = Status::where("id", "=", $user->statut_id)->first();
        $message = "Mis à jour effectuée avec succès";
         
        if ($role->statut === 'etudiant') {

            $studentInfo = Student::where("user_id", $userId)->first();
            $studentId = $studentInfo->id;
            $userInfo = User::where("id", $userId)->first()->id;


            $user = User::find($userInfo);

            $verificationOldPassword = Hash::check($request->oldPassword, $user->password);
            if (!$verificationOldPassword) {
                return response()->json([
                    "status" => false,
                    'message' => "Mot de passe incorrect."
                ], 203);
            }
            $user->password = !empty($request->password) ? Hash::make($request->password) : $user->password;

            $user->save();

            $student = Student::findOrFail($studentId);
            $student->password = !empty($request->password) ? Hash::make($request->password) : $user->password;

            $student->save();

            return response()->json([
                "status" => true,
                "message" => $message,
                "user" =>  $user,
                "compte" => $student
            ], 200);
        }


        if ($role->statut === 'entreprise') {

            $entrepriseInfo = Entreprise::where("user_id", $userId)->first();
            $entrepriseId = $entrepriseInfo->id;

            $userInfo = User::where("id", $userId)->first()->id;

            $verificationOldPassword = Hash::check($request->oldPassword, $user->password);
            if (!$verificationOldPassword) {
                return response()->json([
                    "status" => false,
                    'message' => "Mot de passe incorrect."
                ], 203);
            }

            $user = User::findOrFail($userInfo);

            $user->password = !empty($request->password) ? Hash::make($request->password) : $user->password;

            $user->save();

            $entreprise = Entreprise::findOrFail($entrepriseId);

            $entreprise->password = !empty($request->password) ? Hash::make($request->password) : $entreprise->password;

            $entreprise->save();

            return response()->json([
                "status" => true,
                "message" => $message,
                "user" =>  $entreprise
            ], 200);
        }

       if ($role->statut === 'admin') {

        $admin = User::findOrFail($userId);

    // Vérification de l'ancien mot de passe
    if (!Hash::check($request->oldPassword, $admin->password)) {
        return response()->json([
            'status' => false,
            'message' => 'Mot de passe incorrect.'
        ], 401);
    }

    // Mise à jour du mot de passe uniquement si fourni
    if (!empty($request->password)) {
        $admin->password = $request->password;
        $admin->save();
    }

    return response()->json([
        'status' => true,
        'message' => $message,
        'user' => $admin
    ], 200);
}
    }


    
public function generateAmbassadorCodeForUser($idUser){
  $user = User::find($idUser);
    if (!$user) {
        return response()->json([
            'status' => false,
            'message' => 'User not found'
        ], 404);
    }
     if ($user->code_ambassadeur) {
        return response()->json([
            'status' => true,
            'message' => 'Code already exists',
            'code' => $user->code_ambassadeur
        ]);
    }
      // 8 ou 12 caractères alphanumériques
    $length = random_int(0, 1) ? 8 : 12;

    // Génération robuste
    $code = strtoupper(Str::random($length));
    $user->code_ambassadeur = $code;
     $user->save();
         return response()->json([
            'status' => true,
            'message' => 'Le code ambassadeur a été crée.',
        ],200);
}

    public function entrepriseInteressee(){
        $userId = auth()->user()->id;
          $studentInfo = Student::where("user_id", $userId)->first();
        $studentId = $studentInfo->id;
        $offreEntreprise = Entreprise_Student::where('student_id',$studentId)
        ->with(['offre.entreprise', 'student'])
        ->get();
        return response()->json([
            "status" => true,
            "data" => $offreEntreprise
        ]);
    }

    public function see_entreprise_contact_students()
    {
    $offreEntreprise = Entreprise_Student::with(['offre.entreprise', 'student'])->get();
        return response()->json([
            "status" => true,
            "data" => $offreEntreprise
        ]);
    }

    public function seeContratBetweenEntrepriseAndTalent()
    {
    $offreEntreprise = OffreStudent::with(['offre.entreprise', 'student'])->get();
        return response()->json([
            "status" => true,
            "data" => $offreEntreprise
        ]);
    }

    public function updateBadgeContrat()
{
    OffreStudent::where('view', 1)->update([
        'view' => 0
    ]);

    return response()->json([
        'status' => true
    ]);
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $user = User::find($id);
        $user->delete();
        return response()->json([
            "status" => true,
            "message" => "Utilisateur supprimé avec succes"
        ], 204);
    }

    /**
     * @OA\Post(
     *     path="api/auth_login",
     *      tags={"Users"},
     *     summary="Se connecter",
     *     description="Se connecter",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Connecté"),
     *              @OA\Property(property="user", type="object"),
     *  @OA\Property(property="access_token", type="string"),
     *     @OA\Property(property="compte", type="object"),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="email", type="string", example="adjobi@gmail.com"),
     *     @OA\Property(property="password", type="string", example="********"),
     *     @OA\Property(property="token_push", type="string", example="dhdhd5dnhdfhd5wgxhd (pour le mobile)"),
     *     @OA\Property(property="appareil", type="string", example="iphone xr (pour le mobile)"),
     *          ),)
     *     )
     * )
     */


    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);
        $user = User::where("email", "=", $request->email)->with('statut')->first();

        if (!$user) {
            return response()->json([
                "status" => false,
                "message" => "L'email n'existe pas dans la base de donnée.",
            ], 404);
        }
        
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                "status" => false,
                "message" => "Mot de passe incorrect",
            ], 402);
        }

        // ✅ Récupérer le rôle une seule fois
        $role = Status::where("id", $user->statut_id)->firstOrFail();

        // ✅ Récupérer les données du compte selon le rôle
        $compte = $this->getAccountByRole($role, $user);

        // ✅ Créer le token JWT
        $token = $user->createToken("auth_token")->plainTextToken;

        // ✅ Gérer le token push dans une transaction
        $this->handleTokenPush($user, $request);

        return response()->json([
            "status" => true,
            "message" => "Connecté",
            "access_token" => $token,
            "user" => $compte,
        ], 200);
    }

    /**
     * Récupère les données du compte selon le rôle
     */
    private function getAccountByRole($role, $user)
    {
        return match($role->statut) {
            'etudiant' => Student::where("user_id", $user->id)
                ->select(['id', 'user_id', 'nom', 'prenoms'])
                ->with([
                    'user.statut:id,statut',
                    'competences',
                    'jours',
                    'qualifications'
                ])
                ->first(),

            'entreprise', 'particulier' => Entreprise::where("user_id", $user->id)
                ->select(['id', 'user_id', 'nom'])
                ->with(['user.statut:id,statut'])
                ->first(),

            'admin' => User::where("id", $user->id)
                ->with(['statut', 'permissions'])
                ->first(),

            default => null,
        };
    }

    /**
     * Gère l'enregistrement du token push multi-appareils
     */
    private function handleTokenPush($user, $request)
    {
        $tokenPush = $request->input('token_push');
        $appareil = $request->input('appareil');

        // ✅ Vérifier que les données sont présentes et valides
        if (empty($tokenPush) || empty($appareil)) {
            Log::info("Token push non fourni", ['user_id' => $user->id]);
            return;
        }

        try {
            DB::transaction(function () use ($user, $tokenPush, $appareil) {
                // ✅ Utiliser updateOrCreate pour éviter les doublons
                TokenPush::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'appareil' => $appareil,
                    ],
                    [
                        'token_push' => $tokenPush,
                        'updated_at' => now(),
                    ]
                );

                Log::info("Token push enregistré", [
                    'user_id' => $user->id,
                    'appareil' => $appareil,
                ]);
            });
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'enregistrement du token push", [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
/**
   * @OA\Get(
   *      path="api/voirInfoUserConnect",
   *      operationId="Voir les infos de l utilisateur connecté.",
   *      tags={"Users"},
   *      summary="Voir toutes les infos personnelles",
   *      description="Voir toutes les infos personnelles",
   *      @OA\Response(
   *          response=200,
   *          description="successful operation",
   *          @OA\JsonContent(
   *              @OA\Property(property="status", type="boolean", example=true),
   *  @OA\Property(property="data", type="string",type="array",@OA\Items(type="object"),),
   *          ),
   *       ),
   *       @OA\Response(response=400, description="Bad request"),
   *     )
   *
   * Returns Info user
   */
     public function handleInfoUser()
    {
        $compte = null;
        $user_info = auth()->user();

        $user = User::where("email", "=", $user_info->email)->with('statut')->first();

        $role = Status::where("id", "=", $user->statut_id)->first();

            if ($role->statut === 'etudiant') {
                $compte = Student::where("user_id", $user->id)
                    ->with('experiences', 'offres', 'competences', 
                    'etoiles', 'experiences','qualifications', 
                    'jours', 'user.statut','user.abonement','user.photos')
                    ->first();
            }
            if ($role->statut === 'entreprise' || $role->statut == 'particulier') {
                if($role->statut === 'entreprise'){
                  $compte = Entreprise::where("user_id", $user->id)
                    ->with('user.statut','user.abonement.abonement','user.photos','emails')
                    ->first();
                }else{
                    $compte = Entreprise::where("user_id", $user->id)
                    ->with('user.statut','user.abonement.abonement','user.photos')
                    ->first();
                }
                
            }
            if ($role->statut === 'admin') {
                $compte = User::where("id", $user->id)
                    ->with(['statut','permissions'])
                    ->first();
            }
    
       return response()->json([
                "status" => true,
                "user" => $compte,
            ], 200);
    }
  /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     tags={"Users"},
     *     summary="Supprimer un utilisateur",
     *     description="Supprime un utilisateur sans le retirer définitivement de la base (soft delete).",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'utilisateur à supprimer",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Utilisateur supprimé avec succès",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Utilisateur supprimé avec succès (soft delete).")
     *         )
     *     ),
     *     @OA\Response(response=404, description="Utilisateur non trouvé")
     * )
     */

public function deleteUser($id)
{
    try {
        $user = User::findOrFail($id);
        
        // Supprimer les données associées avant de supprimer l'utilisateur
        // Photos
        Photos::where('user_id', $id)->delete();
        
        // Token Push
        TokenPush::where('user_id', $id)->delete();
        
        // Password Reset
        PasswordReset::where('email', $user->email)->delete();
        
        // Supprimer les fichiers du stockage
        $photos = Photos::where('user_id', $id)->get();
        foreach ($photos as $photo) {
            Storage::delete('public/images/' . $photo->path);
        }
        
        // Selon le rôle, supprimer les données spécifiques
        $role = Status::where("id", $user->statut_id)->first();
        
        if ($role->statut === 'etudiant') {
            $student = Student::where('user_id', $id)->first();
            if ($student) {
                Jour::where('student_id', $student->id)->delete();
                CompetenceStudent::where('student_id', $student->id)->delete();
                Qualification::where('student_id', $student->id)->delete();
                Entreprise_Student::where('student_id', $student->id)->delete();
                OffreStudent::where('student_id', $student->id)->delete();
                $student->delete();
            }
        } elseif ($role->statut === 'entreprise' || $role->statut === 'particulier') {
            $entreprise = Entreprise::where('user_id', $id)->first();
            if ($entreprise) {
                EmailCc::where('entreprises_id', $entreprise->id)->delete();
                Entreprise_Student::where('entreprise_id', $entreprise->id)->delete();
                $entreprise->delete();
            }
        }
        
        // Supprimer définitivement l'utilisateur (forceDelete si soft delete est activé)
        if (method_exists($user, 'forceDelete')) {
             DeleteUser::create([
            'user_id' => $user->id,   
            'name'   => $user->nom,     
            'email' => $user->email      
        ]);
           $user->forceDelete();
        } else {
            DeleteUser::create([
            'user_id' => $ambassador->id,   
            'name'   => $newUser->id,     
            'email' => $user->email      
        ]);
            $user->delete();
        }
        
        return response()->json([
            'status' => true,
            'message' => 'Utilisateur supprimé définitivement avec succès'
        ], 200);
        
    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => 'Erreur lors de la suppression : ' . $e->getMessage()
        ], 500);
    }
}


 public function sendVerificationEmail()
{
    // Récupération de l'utilisateur connecté
    $userId = auth()->id();
    $user = User::find($userId);

    if (!$user) {
        return response()->json([
            'status' => false,
            'message' => 'Utilisateur non authentifié.'
        ], 401);
    }

    // Génération du token unique
    $token = Str::random(60);

    // Création de l'enregistrement dans la table password_resets
    $passwordReset = new PasswordReset();
    $passwordReset->email = $user->email;
    $passwordReset->token = $token;
    $passwordReset->save();

    // Envoi de la notification (email de vérification)
    $user->notify(new VerifyEmail($token, $user->email));

    return response()->json([
        'status' => true,
        'message' => 'Email de vérification envoyé avec succès. Veuillez vérifier votre boîte de réception et vos courriers indésirables (spams).'
    ]);
}
    
}
