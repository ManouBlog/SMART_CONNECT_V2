<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\User;
// use App\Models\Offre;
use App\Models\Offre;
use App\Models\Etoile;
// use App\Models\Competence;
use App\Models\Student;
use App\Models\Entreprise;
use App\Models\Experience;
use App\Models\OffreStudent;
use Illuminate\Http\Request;
use App\Models\AbonementUsers;
use App\Models\CompetenceStudent;
use App\Models\Entreprise_Student;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Notifications\NewCandidateAlert;
use App\Notifications\NotificationTalent;
use App\Notifications\NotifierEmailsCC;
use App\Models\EntrepriseStudentNotification;
use Illuminate\Support\Facades\Notification;



class StudentController extends Controller
{
    /**
     * @OA\Get(
     *      path="api/getCompetenceByStudents",
     *      operationId="Obtenir les compétences des étudiants.",
     *      tags={"Etudiants."},
     *      summary="Obtenir les compétences des étudiants",
     *      description="Retourne la liste des compétences des étudiants.",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",@OA\Items(type="object"),),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */
    public function getCompetenceByStudents()
    {
        $id = auth()->user()->id;
        $competence = Student::with("competences")->where("user_id", "=", $id)->first();
        return response()->json([
            "status" => true,
            "data" => $competence
        ]);
    }



    /**
     * @OA\Get(
     *      path="api/FiltreTimetable",
     *      operationId="Voir l'emploi du temps de tous les étudiants..",
     *      tags={"Etudiants."},
     *      summary="Voir l'emploi du temps de tous les étudiants.",
     *      description="Retourne la liste des disponibilités de tous les étudiants.",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     * @OA\Property(property="date", type="array",@OA\Items(type="object"),),
     *              @OA\Property(property="data", type="array",@OA\Items(type="object"),),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */


    public function disponibilite_etudiant()
    {
        $emplois = Student::with(
            "user.abonement",
            "jours",
            "competences",
            "experiences",
            "etoiles",
            "etoiles.offre",
            "entreprises",
            "qualifications"
        )->get();

        foreach ($emplois as $emploi) {
            foreach ($emploi->etoiles as $star) {
                if ($emploi->id === $star->student_id) {
                    $sumNotes = Etoile::where('student_id', $emploi->id)->sum('notes');
                    $totalNotes = Etoile::where('student_id', $emploi->id)->get()->count();
                    $average = $sumNotes / $totalNotes;
                    $emploi['average'] = $average;
                    $entreprise = Entreprise::all();
                    foreach ($entreprise as $item) {
                        if ($item->id === $star->entreprise_id) {
                            $star->entreprise = $item;
                        }
                    }
                }
            }
        }
        $dateRendezVousStudentEntreprise = Entreprise_Student::all();
        return response()->json([
            "status" => true,
            "data" => $emplois,
            "date" => $dateRendezVousStudentEntreprise
        ], 200);
    }
   /**
 * @OA\Get(
 *     path="/api/Notifications_student",
 *     summary="Récupère les notifications du jour et d’hier pour l’étudiant connecté",
 *     description="Cette route retourne deux listes : les notifications créées aujourd’hui et celles d’hier. Accessible uniquement aux étudiants connectés via Sanctum.",
 *     tags={"Notifications"},
 *     security={{"sanctum": {}}},
 *
 *     @OA\Response(
 *         response=200,
 *         description="Notifications récupérées avec succès.",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="boolean", example=true),
 *             @OA\Property(property="message", type="string", example="Notifications récupérées avec succès."),
 *             @OA\Property(
 *                 property="data",
 *                 type="object",
 *                 @OA\Property(
 *                     property="today",
 *                     description="Notifications du jour"
 *                 ),
 *                 @OA\Property(
 *                     property="yesterday",
 *                     description="Notifications d’hier"
 *                 )
 *             )
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=403,
 *         description="Accès non autorisé (étudiant non connecté)",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="boolean", example=false),
 *             @OA\Property(property="message", type="string", example="Accès non autorisé.")
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=401,
 *         description="Non authentifié (token manquant ou invalide)",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="boolean", example=false),
 *             @OA\Property(property="message", type="string", example="Unauthenticated.")
 *         )
 *     )
 * )
 */
// public function Notifications_student()
// {
//     $user = auth()->user();

//     if (!$user) {
//         return response()->json([
//             'status' => false,
//             'message' => 'Accès non autorisé.'
//         ], 403);
//     }

//     // Détermination du profil (étudiant ou entreprise)
//     $isStudent = $user->statut_id === 2;
//     $isEntreprise = $user->statut_id === 1 || $user->statut_id === 4;

//     if (!$isStudent && !$isEntreprise) {
//         return response()->json([
//             'status' => false,
//             'message' => 'Statut utilisateur invalide.'
//         ], 403);
//     }

//     // Récupération de l'ID selon le statut
//     $recipient = $isStudent
//         ? Student::where('user_id', $user->id)->first()
//         : Entreprise::where('user_id', $user->id)->first();

//     if (!$recipient) {
//         return response()->json([
//             'status' => false,
//             'message' => 'Profil associé introuvable.'
//         ], 404);
//     }

//     // Sélection de la relation à charger
//     $with = $isStudent ? 'user.entreprise' : 'user';

//     // Récupération des notifications du jour
//     $notificationsToday = EntrepriseStudentNotification::with($with)
//         ->where('recipient_id', $recipient->id)
//         ->whereDate('created_at', Carbon::today())
//         ->orderByDesc('created_at')
//         ->get();

//     // Récupération des notifications précédentes
//     $notificationsBefore = EntrepriseStudentNotification::with($with)
//         ->where('recipient_id', $recipient->id)
//         ->where('created_at', '<', Carbon::today())
//         ->orderByDesc('created_at')
//         ->get();

//     return response()->json([
//         'status' => true,
//         'data' => [
//             'today' => $notificationsToday,
//             'previous' => $notificationsBefore,
//         ]
//     ], 200);
// }

     public function Notifications_student()
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Accès non autorisé.'
            ], 403);
        }
    
// 2 = statut étudiant
if ($user->statut_id === 2) {
    $abonnementUser = AbonementUsers::where('user_id', $user->id)
    ->with('abonement')
    ->where('statut', 'success')
    ->first();


$formuleAbonnement = $abonnementUser ?  optional($abonnementUser->abonement)->libelle  : null;

    $student = Student::where('user_id', $user->id)->first();

    if (!$student) {
        return response()->json([
            'status' => false,
            'message' => 'Étudiant introuvable'
        ], 404);
    }

    // Relations selon la formule
    $relations = $formuleAbonnement === 'PLATINUM'
        ? ['user.entreprise', 'user.photos']
        : ['user' => function ($query) {
            $query->where('statut_id', 3);
        }];

    // Base query commune
    $baseQuery = EntrepriseStudentNotification::with($relations)
        ->where('recipient_id', $student->id)
        ->orderBy('created_at', 'desc');

    $notificationsToday = (clone $baseQuery)
        ->whereDate('created_at', Carbon::today())
        ->get();

    $notificationsYesterday = (clone $baseQuery)
        ->where('created_at', '<', Carbon::today())
        ->get();

    return response()->json([
        'status' => true,
        'data' => [
            'today' => $notificationsToday,
            'yesterday' => $notificationsYesterday
        ]
    ], 200);
}
        if($user->statut_id === 1 || $user->statut_id === 4){
      // si lutilisateur qui recoit la notification est une entreprise ou un particulier
       $id_entreprise = Entreprise::where('user_id',$user->id)->first();
         
        $notificationsToday = EntrepriseStudentNotification::with('user')
            ->where('recipient_id', $id_entreprise->user_id)
             ->whereDate('created_at', Carbon::today())
            ->orderBy('created_at', 'desc')
            ->get();

            $notificationsYesterday = EntrepriseStudentNotification::with('user')
            ->where('recipient_id', $id_entreprise->id)
            ->where('created_at', '<', Carbon::today())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => true,
            'data' => [
                'today'=>$notificationsToday,
                'yesterday'=> $notificationsYesterday
            ]
        ], 200);
        }

        
    }


    /**
 * @OA\Get(
 *     path="/api/markAllAsRead",
 *     summary="Marquer toutes les notifications de l'étudiant connecté comme lues",
 *     description="Cette route met à jour toutes les notifications non lues (`view = 0`) de l'étudiant connecté en `view = 1`.",
 *     tags={"Notifications"},
 *     security={{"sanctum": {}}},
 *
 *     @OA\Response(
 *         response=200,
 *         description="Toutes les notifications ont été marquées comme lues.",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="boolean", example=true),
 *             @OA\Property(property="message", type="string", example="Toutes les notifications ont été marquées comme lues.")
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=404,
 *         description="Étudiant non trouvé",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="boolean", example=false),
 *             @OA\Property(property="message", type="string", example="Étudiant non trouvé.")
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=401,
 *         description="Non authentifié (token manquant ou invalide)",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="boolean", example=false),
 *             @OA\Property(property="message", type="string", example="Unauthenticated.")
 *         )
 *     )
 * )
 */


 public function markAllAsRead()
    {
        // Récupère l'étudiant connecté
        $user= auth()->user();
         if($user->statut_id === 2){
       $student = Student::where('user_id', $user->id)->first();

        if (!$student) {
            return response()->json([
                'status' => false,
                'message' => 'Étudiant non trouvé.'
            ], 404);
        }

        // Mettre à jour toutes les notifications non lues
        EntrepriseStudentNotification::where('recipient_id', $student->id)
            ->where('view', 0)
            ->update(['view' => 1]);
         }

         if($user->statut_id === 1 || $user->statut_id === 4){
       $entreprise = Entreprise::where('user_id', $user->id)->first();

        if (!$entreprise) {
            return response()->json([
                'status' => false,
                'message' => 'Entreprise non trouvée.'
            ], 404);
        }

        // Mettre à jour toutes les notifications non lues
        EntrepriseStudentNotification::where('recipient_id', $entreprise->id)
            ->where('view', 0)
            ->update(['view' => 1]);
         }
        

        return response()->json([
            'status' => true,
            'message' => 'Toutes les notifications ont été marquées comme lues.'
        ]);
    }

    /**
     * Modifier l'offre.
     *
     * @OA\Put(
     *     path="api/changeStatutJob/{id}",
     *     tags={"Etudiants."},
     *     operationId="Modifier l'offre",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Id pour de l'offre.",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid ID supplied"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found"
     *     ),
     *     @OA\Response(
     *         response=405,
     *         description="Mauvaise méthode"
     *     ),
     * )
     */
    public function changeStatutJob(Request $request, $id)
    {
        $changeStatutJob =  Entreprise_Student::where('offre_id',$id)
        ->where('id',$request->id_contrat)
        ->first();
        $changeStatutJob->contrat = $request->contrat;

        if ($request->contrat === 1) {
            $offre_students = new OffreStudent();
            $offre_students->student_id = $changeStatutJob->student_id;
            $offre_students->offre_id = $changeStatutJob->offre_id;
            $offre_students->recruit = 1;
            $offre_students->save();
        }
        if ($request->contrat === 2) {
            $offre_students = new OffreStudent();
            $offre_students->student_id = $changeStatutJob->student_id;
            $offre_students->offre_id = $changeStatutJob->offre_id;
            $offre_students->recruit = 2;
            $offre_students->save();
        }
       
        $changeStatutJob->save();

        return response()->json([
            "status" => true,
            "message" => "Succès"
        ]);
    }
    /**
     * @OA\Delete(
     *     path="api/deleteCompetencesOfStudents/{id}",
     *    tags={"Etudiants."},
     *     summary="Supprimer une compétence",
     *     description="Supprimer une compétence",
     *     operationId="deleteUser",
     *     @OA\Parameter(
     *         name="Id",
     *         in="path",
     *         description="Id de la compétence.",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid username supplied",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Compétences not found",
     *     )
     * )
     */

    public function deleteCompetenceOfStudents($id)
    {
        $userId = Auth::id(); 
        $studentId = Student::where('user_id',$userId)->first();
    $competenceAtDeleted = CompetenceStudent::where([
        'student_id' => $studentId->id,
        'competence_id' => $id,
    ])->first();

    if (!$competenceAtDeleted) {
        return response()->json([
            "status" => false,
            "message" => "Cette compétence n'existe pas pour cet étudiant."
        ], 404);
    }

    $competenceAtDeleted->delete();

    return response()->json([
        "status" => true,
        "message" => "Compétence supprimée avec succès."
    ], 200);
        
    }

    /**
     * @OA\Get(
     *      path="api/get_who_contact_student",
     *      operationId="Obtenir les entreprises qui ont contactés les étudiants.",
     *      tags={"Etudiants."},
     *      summary="Obtenir les entreprises qui ont contactés les étudiants.",
     *      description="Retourne la liste des entreprises qui ont contactés les étudiants",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",@OA\Items(type="object"),),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */


    public function who_contact_student()
    {
        $id = auth()->user()->id;
        $idStudent = Student::where("user_id", "=", $id)->first()->id;

        // $entreprise_contact_student = Student::with("entreprises")->get();

        // $allOffre = Offre::with("categorie")->orderBy('created_at', 'desc')->get();
       $offresContact = OffreStudent::where("student_id", "=", $idStudent)
                    ->where("recruit",1)
                    ->with(['offre.entreprise','student'])
                    ->get();
       return $offresContact;
        // foreach ($entreprise_contact_student as $item) {
        //     if ($item->id == $idStudent) {
        //         $student_entreprise_contacts = $item;
        //     }
        // }

        // foreach ($allOffre as $offre) {
        //     foreach ($student_entreprise_contacts->entreprises as $item) {
        //         if ($offre->id ===  $item->pivot->offre_id) {
        //             $item->pivot->offre = $offre;
        //         }
        //     }
        // }

        return $student_entreprise_contacts;
    }
    /**
     * @OA\Get(
     *      path="api/get_offres_postule",
     *      operationId="Voir les offres d'un étudiant auxquelles il a postulé(celui qui est connecté).",
     *      tags={"Etudiants."},
     *      summary="Voir les offres d'un étudiant auxquelles il a postulé (celui connecté).",
     *      description="Retourne la liste des offres d'un étudiant",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Les offres d'un etudiant."),
     *              @OA\Property(property="data", type="array",@OA\Items(type="object"),),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */

    public function get_offre_postule()
    {
        $id = auth()->user()->id;
        $dateToday = Carbon::now();
        $idStudent = Student::where("user_id", "=", $id)->first()->id;

        $allRecruit = OffreStudent::all();

        $offres = Student::with(
            "offres.categorie",
            "offres.entreprise",
            "experiences",
            "offres"
        )->get();

        foreach ($offres as $offre) {
            if ($offre->id === $idStudent) {
                $student_offre = $offre;
            }
        }
        $offre_students = $student_offre['offres'];
        foreach($offre_students as $item){
            foreach($allRecruit as $recruit){
                if($item->pivot->offre_id === $recruit->offre_id){
 if(Carbon::parse($item->fin) < $dateToday && $item->pivot->recruit === 0 ){
                    $recruit->recruit = 2;
                    $recruit->save();
                }
                }
                
            }
            
        }
 
        return response()->json([
            "status" => true,
            "message" => "Les offres d'un etudiant.",
            "data" => $student_offre
        ]);
    }

    /**
     * @OA\Post(
     *     path="api/postule_offre",
     *      tags={"Etudiants."},
     *     summary="Permet à l'etudiant de postuler à une offre",
     *     description="Permet à l'etudiant de postuler à une offre",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Les offres d'un etudiant."),
     *              @OA\Property(property="data", type="array",@OA\Items(type="object"),),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         description="Create user object",
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="offre_id", type="integer", example=3),
     *          ),)
     *     )
     * )
     */
    public function postuler_offre(Request $request)
{
     $user = auth()->user();

    if (!$user->verif_email) {
        return response()->json([
            'status'  => false,
            'message' => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
        ], 403);
    }

    $student = Student::where('user_id', $user->id)->first();

    if (!$student) {
        return response()->json([
            'status' => false,
            'message' => 'Profil étudiant introuvable.'
        ], 404);
    }

    $currentYear = now()->year;

    $abonnementActive = AbonementUsers::where('user_id', $user->id)
        ->where('statut', 'success')
        ->exists();

    if (!$abonnementActive && $student->free_trial_year === $currentYear) {
        return response()->json([
            "status"  => false,
            "message" => "Vous n'avez pas d'abonnement actif, vous ne pouvez pas postuler à une offre."
        ], 403);
    }

    $request->validate([
        "offre_id" => "required|integer|exists:offres,id",
    ]);

    $offre = Offre::where('id', $request->offre_id)
        ->where('fin', '>=', now())
        ->first();

    if (!$offre) {
        return response()->json([
            "status" => false,
            "message" => "Offre non trouvée ou expirée."
        ], 404);
    }

    $hasApplied = OffreStudent::where('student_id', $student->id)
        ->where('offre_id', $request->offre_id)
        ->exists();

    if ($hasApplied) {
        return response()->json([
            "status" => false,
            "message" => "Vous avez déjà postulé à l'offre."
        ], 409);
    }

   if($abonnementActive){
    OffreStudent::create([
        'offre_id'   => $request->offre_id,
        'student_id' => $student->id,
    ]);
    //  return response()->json([
    //             "status"  => true,
    //             "message" => "Vous avez postulé à l'offre avec succès."
    //         ], 200);
       return $this->SendNotificationAtEntreprise($request->offre_id);
   }else{
// Marque la gratuité utilisée uniquement s’il n’a pas d’abonnement actif
    

        // Si aucune année enregistrée OU année expirée
        if (
            is_null($student->free_trial_year) ||
            $student->free_trial_year < $currentYear
        ) {
             OffreStudent::create([
        'offre_id'   => $request->offre_id,
        'student_id' => $student->id,
    ]);
            $student->free_trial_year = $currentYear;
            $student->save();
               return $this->SendNotificationAtEntreprise($request->offre_id);
        }
        // Si déjà utilisée cette année
        elseif ($student->free_trial_year == $currentYear) {
            return response()->json([
                "status"  => false,
                "message" => "Vous avez déjà utilisé votre gratuité pour cette année."
            ], 403);
        }
   }

    

 
}


//     public function postuler_offre(Request $request)
//     {
//         $id = auth()->user()->id;
//         $idStudent = Student::where("user_id", "=", $id)->first()->id;
//         $userVerifIfAccount = auth()->user()->verif_email;
//         if($userVerifIfAccount){
//         $abonnementActive =  AbonementUsers::where('user_id', $id)
//         ->where("statut","success")
//         ->first();
//          if($abonnementActive){
//             $offreChoiceBystudent = OffreStudent::all();
//             $request->validate([
//                 "offre_id" => "required",
//             ]);
//             foreach ($offreChoiceBystudent as $offreChoice) {
//                 if (
//                     $offreChoice->student_id == $idStudent &&
//                     $offreChoice->offre_id == $request->offre_id
//                 ) {
//                     return response()->json([
//                         "status" => false,
//                         "message" => "Vous avez déjà postuler à l'offre."
//                     ], 409);
//                 }
//             }
//             $postule_offre = new OffreStudent();
//             $postule_offre->offre_id = $request->offre_id;
//             $postule_offre->student_id = $idStudent;
//             $postule_offre->save();
//             return $this->SendNotificationAtEntreprise($request->offre_id);
            
           
//          }else{
//             return response()->json([
//                 "status" => false,
//                 "message" => "Vous n'avez pas d'abonnement actif, vous ne pouvez pas postuler à une offre."
//             ], 403); // Code HTTP 403 : Interdit
//          }
//         }else{
//             return response()->json([
//     'status'     => false,
//     'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
// ], 403);
//         }
        

//     }
    public function SendNotificationAtEntreprise($idOffre){
     $entreprise_offre = Offre::where("id",$idOffre)->first();

     $entreprise_email = Entreprise::where('id',$entreprise_offre->entreprise_id)
     ->with(['emails'])
     ->first();

     $emails_cc = $entreprise_email->emails->pluck('email_cc')->toArray();
     
     $entreprise_email->notify(new NewCandidateAlert($entreprise_offre,$emails_cc));

      return response()->json([
                "status" => true,
                "message" => "Vous avez postulé à l'offre avec succès.",
            ], 200);
    }

    public function SendNotificationAtTalent($infoContrat,$offreInfo,$recruit,$userId){
  
     $talent_email = Student::where('id',$infoContrat->student_id)->first();
     $emails_cc = [];
     $entreprise = Entreprise::where('id',$offreInfo->entreprise_id)->first();
     if ($entreprise) {
        $emails_cc = $entreprise->emails->pluck('email_cc')->toArray();
        Notification::route('mail', $emails_cc) // destinataire principal
        ->notify(new NotifierEmailsCC(
            $talent_email,$offreInfo,$recruit
        ));
        // $emails_cc->notify(new NotifierEmailsCC($talent_email,$offreInfo,$recruit,$emails_cc));
     }
     $talent_email->notify(new NotificationTalent($talent_email,$offreInfo,$recruit));

      return response()->json([
                "status" => true,
            ], 200);
    }
    
    public function recruitStudent(Request $request)
    {
        $userId = auth()->id();

       $userVerifIfAccount = User::where('id',$userId)->first()->verif_email;
       if($userVerifIfAccount){
$idRecruitStudent = OffreStudent::find($request->id);

        $offreInfo = Offre::where('id',$idRecruitStudent->offre_id)->first();
      
        if ($idRecruitStudent) {
            $idRecruitStudent->recruit = $request->recruit;
            $idRecruitStudent->save();
            return $this->SendNotificationAtTalent($idRecruitStudent,$offreInfo,$request->recruit,$userId);
            
        } else {
            return response()->json([
                "status" => false,
                "message" => " Pas de requête trouvée."
            ], 404);
        }
       }else{
        return response()->json([
    'status'     => false,
    'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
], 403);
    }
        
    }
    // public function registre(Request $request)
    // {

    //     $request->validate([
    //         "nom" => "required",
    //         "prenoms" => "required",
    //         "email" => "required|email|unique:students",
    //         "ville" => "required",
    //         "quartier" => "required",
    //         "diplome" => "required",
    //         "password" => "required",
    //     ]);
    //     $user = new User();
    //     $user->nom = $request->nom;
    //     $user->email = $request->email;
    //     $user->password = Hash::make($request->password);

    //     $user->save();


    //     $student = new Student();

    //     $student->nom = $request->nom;
    //     $student->prenoms = $request->prenoms;
    //     $student->email = $request->email;
    //     $student->ville = $request->ville;
    //     $student->quartier = $request->quartier;
    //     $student->diplome = $request->diplome;
    //     $student->password = Hash::make($request->password);
    //     $student->user_id = $user->id;

    //     $student->save();

    //     return response()->json([
    //         "status" => true,
    //         "message" => "Enregistrer avec succès",
    //         "data" => $student
    //     ]);
    // }

    /**
     * @OA\Get(
     *      path="api/list_students",
     *      operationId="Voir la liste des talents.",
     *      tags={"Etudiants."},
     *      summary="Voir la liste des talents.",
     *      description="Voir la liste des talents.",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",@OA\Items(type="object"),),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */

    public function listTalents()
    {
       $students = Student::with([
    'entreprises',
    'jours',
    'offres',
    'user.abonement.abonement',
    'user.photos'
])->orderBy('created_at', 'desc')  // ordre croissant
  ->get();
        // $students = Student::with(["entreprises","jours",
        // "user.abonement.abonement","user.photos"])
        //     ->get();
          $studentsWithAbonnementValide = $students->filter(function($student) {
    return $this->checkAbonnementValide($student->user->abonement ?? null);
    });
        return response()->json([
            "status" => true,
            "data" => $studentsWithAbonnementValide
        ]);
    }
    
   private function checkAbonnementValide($abonement) {
    // Vérifie que c'est un tableau ou un objet itérable et non vide
    if (empty($abonement) || (!is_array($abonement) && !$abonement instanceof \Traversable)) {
        return false;
    }

    foreach ($abonement as $item) {
        if (isset($item->statut, $item->echeance) 
            && $item->statut === 'success' 
            && now()->lessThan($item->echeance)) {
            return true;
        }
    }

    return false; // Aucun abonnement valide
}
   
  
   /**
     * @OA\Get(
     *      path="api/list_visiteurs",
     *      operationId="Voir la liste des visiteurs.",
     *      tags={"Etudiants."},
     *      summary="Voir la liste des visiteurs.",
     *      description="Voir la liste des visiteurs.",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",@OA\Items(type="object"),),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */

     public function listVisiteur()
    {
        // $students = Student::with("entreprises","jours","user.abonement.abonement")->get();
        $students = Student::with([
    'entreprises',    
    'jours', 
    'offres',               
    'user.abonement.abonement',  
    'user.photos'    
    ])->orderBy('created_at', 'desc') 
    ->get();
         $studentsSansAbonnement = $students->filter(function($student) {
        return !$this->checkAbonnementValide($student->user->abonement ?? []);
       });
        return response()->json([
            "status" => true,
            "data" => $studentsSansAbonnement
        ]);
    }


     public function get_detail_user($id)
    {
    //     $StudentIdUser = Student::where('id',$id)->first();
    //     $user = User::where('id', $StudentIdUser->user_id)
    // ->with([
    //     'student.entreprises',
    //     'student.jours',
    //     'abonement.abonement',
    //     'photos'
    //     ]
    // )
    // ->first();
     $student = Student::where("id",$id)->with([
    'entreprises',    
    'jours', 
    'offres.entreprise',               
    'user.abonement.abonement',  
    'user.photos',
    'qualifications',
    'competences',
    'experiences'   
    ])->first();
         
        return response()->json([
            "status" => true,
            "data" => $student
        ]);
    }



    public function update(Request $request)
    {

        $user_id = auth()->user()->id;



        if (Student::where("user_id", $user_id)->exists()) {
            $student_info = Student::where("user_id", $user_id)->first();
            $student_id = $student_info->id;
            $user_info = User::where("id", $user_id)->first()->id;


            $user = User::find($user_info);

            $user->nom =  !empty($request->nom) ? $request->nom : $user->nom;
            $user->password = !empty($request->password) ? Hash::make($request->password) : $user->password;

            $user->save();

            $student = Student::findOrFail($student_id);
            $student->nom =  !empty($request->nom) ? $request->nom : $student->nom;
            $student->prenoms = !empty($request->prenoms) ? $request->prenoms : $student->prenoms;
            $student->ville =  !empty($request->ville) ? $request->ville : $student->ville;
            $student->quartier =  !empty($request->quartier) ? $request->quartier : $student->quartier;
            $student->diplome =  !empty($request->diplome) ? $request->diplome : $student->diplome;
            $student->password = !empty($request->password) ? Hash::make($request->password) : $student->password;

            $student->save();
            return response()->json([
                "status" => true,
                "message" => "mis à jour effectuée avec succès",
                "data" => $student,
            ], 200);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Utilisateur pas trouvée"
            ], 404);
        }
    }


    /**
     * @OA\Post(
     *     path="api/addCompetences",
     *      tags={"Etudiants."},
     *     summary="Permet à l'etudiant d'ajouter des compétences.",
     *     description="Permet à l'etudiant d'ajouter des compétences.",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Compétence à éte ajoutée avec succès"),
     *          ),
     *       ),
     * *      @OA\Response(
     *          response=409,
     *          description="Data exist",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=false),
     *  @OA\Property(property="message", type="string", example="les ou la compétence(s) existe déjà."), 
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         description="Create user object",
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="competence", type="id", example="[3,2]"),
     *          ),)
     *     )
     * )
     */

    public function addNewCompetent(Request $request)
    {
        $id = auth()->user()->id;
        $studentId = Student::where("user_id", $id)->first()->id;
        $userVerifIfAccount = auth()->user()->verif_email;
        if($userVerifIfAccount){
     $request->validate([
            "competence" => 'required',
        ]);
        $myCompetence = $request->competence;

        $competenceChoice = CompetenceStudent::where('student_id', $studentId)->get();

        foreach ($competenceChoice as $item) {
            foreach ($myCompetence as $cmpt) {
                if ($item->competence_id === $cmpt) {
                    return response()->json([
                        "status" => false,
                        "message" => "les ou la compétence(s) existe déjà.",
                    ], 409);
                }
            }
        }
        foreach ($myCompetence as $item) {
            $studentCompetence = new CompetenceStudent();
            $studentCompetence->competence_id = $item;
            $studentCompetence->student_id = $studentId;
            $studentCompetence->save();
        }
        return response()->json([
            "status" => true,
            "message" => "Compétence à éte ajoutée avec succès",
        ], 200);
        }else{
        return response()->json([
    'status'     => false,
    'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
], 403);
    }
        
    }


    /**
     * @OA\Post(
     *     path="api/postNewExperience",
     *      tags={"Etudiants."},
     *     summary="Création d'une nouvelle expérience.",
     *     description="Création d'une nouvelle expérience.",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Compétence à éte ajoutée avec succès"),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="poste", type="string", example="développeur freelance"),
     *                   @OA\Property(property="lieu", type="string", example="cocody angré"),
     *                    @OA\Property(property="dateDebut", type="date", example="2021-02-12"),
     *                    @OA\Property(property="dateFin", type="date", example="2021-02-18"),
     *  @OA\Property(property="experience", type="string", example="lorem"),
     *        @OA\Property(property="entreprise", type="string", example="nom de l'entreprise"),
     *      @OA\Property(property="proof", type="image", example="{}"),
     *          ),)
     *     )
     * )
     */


    public function createNewExperience(Request $request)
    {
        $id = auth()->user()->id;
        $studentId = Student::where("user_id", $id)->first()->id;
       
       $userVerifIfAccount = User::where('id',$id)->first()->verif_email;
       if($userVerifIfAccount){
$request->validate([
            "poste" => 'required',
            "lieu" => 'required',
            "dateDebut" => 'required',
            "dateFin" => 'required',
        ]);
        $createNewExperience = new Experience();
        $createNewExperience->student_id = $studentId;
        $createNewExperience->experience = $request->experience;
        $createNewExperience->poste = $request->poste;
        $createNewExperience->lieu = $request->lieu;
        $createNewExperience->dateDebut = $request->dateDebut;
        $createNewExperience->dateFin = $request->dateFin;
        $createNewExperience->entreprise = $request->entreprise;
        if ($request->hasFile('proof') && $request->file('proof')->isValid()) {
            $image = $request->file('proof');
            $ext = $image->extension();
            $file = time() . '.' . $ext;
            $image->storeAs('public/images', $file);
            $createNewExperience->proof = $file;
        }

        $createNewExperience->save();

        return response()->json([
            "status" => true,
            "message" => "Experience sauvegardée avec succès.",
            "data" => $createNewExperience
        ], 200);
       }else{
        return response()->json([
    'status'     => false,
    'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
], 403);
    }
        
    }

    /**
     * @OA\Post(
     *     path="api/modifyExperience/{id}",
     *      tags={"Etudiants."},
     *     summary="Modifier mon expérience.",
     *     description="Modifier mon expérience.",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Modification reussie"),
     *          ),
     *       ),
     *     @OA\Parameter(
     *         name="Id",
     *         in="path",
     *         description="Id de l'expérience.",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="poste", type="string", example="développeur freelance"),
     *                   @OA\Property(property="lieu", type="string", example="cocody angré"),
     *                    @OA\Property(property="dateDebut", type="date", example="2021-02-12"),
     *                    @OA\Property(property="dateFin", type="date", example="2021-02-18"),
     *  @OA\Property(property="experience", type="string", example="lorem"),
     *        @OA\Property(property="entreprise", type="string", example="nom de l'entreprise"),
     * @OA\Property(property="proof", example="{}"),
     *          ),)
     *     )
     * )
     */


   public function modifyMyExperience(Request $request, $id)
{
    // Récupérer l'expérience
    $experience = Experience::find($id);
    if (!$experience) {
        return response()->json([
            "status" => false,
            "message" => "Expérience introuvable",
        ], 404);
    }

    // Gestion du fichier proof
    if ($request->hasFile('proof') && $request->file('proof')->isValid()) {
        $image = $request->file('proof');
        $fileName = time() . '_' . $image->getClientOriginalName(); // nom unique
        $path = $image->storeAs('public/images', $fileName);

        // Optionnel : récupérer l'URL publique
        $experience->proof = Storage::url($path);
    }

    // Mise à jour des champs uniquement si fournis
    $experience->lieu = $request->lieu ?? $experience->lieu;
    $experience->poste = $request->poste ?? $experience->poste;
    $experience->experience = $request->experience ?? $experience->experience;
    $experience->dateDebut = $request->dateDebut ?? $experience->dateDebut;
    $experience->dateFin = $request->dateFin ?? $experience->dateFin;
    $experience->entreprise = $request->entreprise ?? $experience->entreprise;

    $experience->save();

    return response()->json([
        "status" => true,
        "message" => "Modification réussie",
        "data" => $experience
    ], 200);
}

    /**
     * @OA\Get(
     *      path="api/GetMyExperiences",
     *      operationId="Voir la liste des expériences des étudiants.",
     *      tags={"Etudiants."},
     *      summary="Voir la liste des expériences des étudiants",
     *      description="Voir la liste des expériences des étudiants",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",@OA\Items(type="object"),),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */
    public function getExperiences()
    {
        $id = auth()->user()->id;
        $studentId = Student::where("user_id", $id)->first()->id;
        $allMyExperience = Experience::where("student_id", $studentId)->orderBy('created_at', 'desc')->get();
        return response()->json([
            "status" => true,
            "data" => $allMyExperience
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="api/deleteMyExperience/{id}",
     *    tags={"Etudiants."},
     *     summary="Supprimer une expérience",
     *     description="Supprimer une expérience",
     *     @OA\Parameter(
     *         name="Id",
     *         in="path",
     *         description="Id de l'expérience.",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Suppression reussie",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Compétences not found",
     *     )
     * )
     */




    public function deleteExperience($id)
    {
        $experienceId = Experience::where("id", $id)->first();

        $experienceId->delete();
        return response()->json([
            "status" => true,
            "message" => "Suppression reussie"
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="api/giveAvis",
     *      tags={"Entreprise or Particulier"},
     *     summary="Noter l'etudiant.",
     *     description="Noter l'etudiant.",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Merci à vous."),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="notes", type="integer", example="2"),
     *               @OA\Property(property="student_id", type="integer", example="2"),
     *               @OA\Property(property="avis", type="string", example="Mettre un commentaire"),
     *          ),)
     *     )
     * )
     */
    public function createAvisOnStudent(Request $request)
    {
        $userId = auth()->user()->id;
        $entrepriseInfo = Entreprise::where("user_id", $userId)->first()->id;
        $userVerifIfAccount = User::where('id',$userId)->first()->verif_email;
        if($userVerifIfAccount){
$request->validate([
            "notes" => 'required',
            "student_id" => 'required',
            "offre_id" => 'required'
        ]);

        $avis = new Etoile();
        $avis->notes = $request->notes;
        $avis->avis = $request->avis;
        $avis->student_id = $request->student_id;
        $avis->offre_id = $request->offre_id;
        $avis->entreprise_id = $entrepriseInfo;

        $avis->save();
        return response()->json([
            "status" => true,
            "message" => "Merci à vous."
        ], 200);
        }else{
        return response()->json([
    'status'     => false,
    'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
], 403);
    }
        
    }

    /**
 * @OA\Get(
 *     path="/api/mes-certifications",
 *     summary="Récupère les offres validées avec certificat pour l'utilisateur connecté",
 *     description="Retourne toutes les offres du modèle OffreStudent où le champ certificat est à 1 pour l'utilisateur actuellement connecté.",
 *     operationId="getCertifications",
 *     tags={"Certificats"},
 *     security={{"sanctum": {}}},
 *
 *     @OA\Response(
 *         response=200,
 *         description="Liste des certifications validées",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=12),
 *                 @OA\Property(property="user_id", type="integer", example=5),
 *                 @OA\Property(property="certificat", type="integer", example=1),
 *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-10-30T12:45:00Z"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-10-30T12:45:00Z"),
 *
 *                 @OA\Property(
 *                     property="offre",
 *                     type="object",
 *                     @OA\Property(property="id", type="integer", example=3),
 *                     @OA\Property(property="titre", type="string", example="Chauffeur livraison"),
 *                     @OA\Property(property="description", type="string", example="Livraison de colis dans la ville d’Abidjan"),
 *                     @OA\Property(property="entreprise_id", type="integer", example=2),
 *
 *                     @OA\Property(
 *                         property="entreprise",
 *                         type="object",
 *                         @OA\Property(property="id", type="integer", example=2),
 *                         @OA\Property(property="nom", type="string", example="MonBroboli SARL"),
 *                         @OA\Property(property="adresse", type="string", example="Abidjan, Côte d’Ivoire"),
 *                         @OA\Property(property="email", type="string", example="contact@monbroboli.com")
 *                     )
 *                 )
 *             )
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=401,
 *         description="Non authentifié - jeton invalide ou manquant"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Erreur serveur"
 *     )
 * )
 */

//     public function getCertifications()
// {
//     $user = auth()->user();
//     $studentid = Student::where("user_id",$user->id)->first();
//     // On récupère uniquement les offres où le certificat est validé (=1)
//     // et appartenant à l’utilisateur connecté
//     $certifications = OffreStudent::where('student_id', $studentid->id)
//         ->where('certificat', 1)
//         ->where('recruit', 1)
//         ->with(['offre', 'offre.entreprise','student']) // si tu veux charger les relations associées
//         ->get();

//          // On mappe les certifications pour inclure le contenu de l'image
//     $certifications->transform(function ($item) {
//         if ($item->image && Storage::disk('public')->exists('images/' . $item->image)) {
//             // Récupère le contenu du fichier et l'encode en base64
//             $path = Storage::disk('public')->path('images/' . $item->image);
//             $mime = mime_content_type($path);
//             $base64 = base64_encode(file_get_contents($path));
//             $item->image_data = "data:{$mime};base64,{$base64}";
//         } else {
//             $item->image_data = null;
//         }
//         return $item;
//     });

//     return response()->json($certifications);
// }
public function getCertifications()
{
    $user = auth()->user();

    // Récupère le profil étudiant associé à l'utilisateur
    $student = Student::where('user_id', $user->id)->first();
    if (!$student) {
        return response()->json([
            'message' => 'Aucun profil étudiant trouvé.'
        ], 404);
    }

    // Récupère les certifications validées et recrutées
    $certifications = OffreStudent::where('student_id', $student->id)
        ->where('certificat', 1)
        ->where('recruit', 1)
        ->with(['offre', 'offre.entreprise', 'student'])
        ->get();

    // Transforme chaque certification pour inclure l'image en base64
    $certifications->transform(function ($item) {
        if ($item->image) {
            // Chemin réel du fichier sur le disque local
            $imagePath = storage_path('app/public/images/' . $item->image);

            if (file_exists($imagePath)) {
                // Récupère le type MIME
                $mime = mime_content_type($imagePath) ?: 'image/png';
                // Encode le contenu du fichier en base64
                $base64 = base64_encode(file_get_contents($imagePath));
                // Ajoute un champ image_data utilisable directement dans le front
                $item->image_data = "data:{$mime};base64,{$base64}";
            } else {
                $item->image_data = null;
            }
        } else {
            $item->image_data = null;
        }

        return $item;
    });

    return response()->json($certifications);
}

public function updateBadgeStudent($id){
     $student = Student::find($id);
   $student->view = 0;
   $student->save();
    return response()->json([
      "status" => true,
    ]);
}
}
