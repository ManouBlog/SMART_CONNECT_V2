<?php

namespace App\Http\Controllers;
use Barryvdh\DomPDF\Facade\Pdf as PDF; 
use Carbon\Carbon;
use App\Models\Jour;
use App\Models\User;
use App\Models\Offre;

use App\Models\Student;
// use App\Mail\Notifyuser;
// use Carbon\CarbonPeriod;
// use Illuminate\Support\Arr;

use App\Models\Categorie;
use App\Models\Entreprise;
// use App\Models\Newsletter;

use App\Models\OffreStudent;
use Illuminate\Http\Request;
use App\Models\AbonementUsers;
use App\Notifications\SendMsg;
use App\Models\Entreprise_Student;
// use Illuminate\Support\Facades\DB;
use App\Models\Entreprise_categorie;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Mail;
// use Illuminate\Support\Facades\Notification;
use App\Mail\CertificatMail;
use Illuminate\Support\Facades\Mail;

class EntrepriseController extends Controller
{
  public function getAbonnementUser()
  {
    $userId = auth()->user()->id;
    $entrepriseId = User::where("id", "=", $userId)->with("abonements")->first();
    return response()->json([
      "data" => $entrepriseId,
      "status" => true,
    ], 200);
  }

  public function offresInteresseByStudent()
  {
    $userId = auth()->user();
    if($userId->statut_id === 1 || $userId->statut_id === 4){
 $entrepriseId = Entreprise::where("user_id", "=", $userId->id)->first()->id;

   $offres = OffreStudent::with(['offre', 'student.user.photos'])
    ->whereHas('offre', function ($query) use ($entrepriseId) {
        $query->where('entreprise_id', $entrepriseId);
    })
    ->get()
    ->groupBy(function ($item) {
        return $item->offre->nom_offre;
    });

return $offres;
    }else{
      return;
    }
  }

  /**
 * @OA\Put(
 *     path="/api/confirmAlarm/{id}",
 *     tags={"Etudiants."},
 *     operationId="changeAlarm",
 *     summary="Met à jour l'alarme d'un étudiant",
 *     description="Met l'alarme à 0 pour l'étudiant donné et retourne le status.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID du contact ou contrat",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Alarme modifiée avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="boolean", example=true)
 *         )
 *     ),
 *     @OA\Response(
 *         response=402,
 *         description="Alarme déjà à 0",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="boolean", example=false)
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Étudiant non trouvé",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="boolean", example=false),
 *             @OA\Property(property="message", type="string", example="Étudiant non trouvé")
 *         )
 *     )
 * )
 */
  public function confirmAlarm($id)
  {

    $changeStatutJob =  Entreprise_Student::find($id);
    if($changeStatutJob){
if ($changeStatutJob->alarm === 0) {
      return response()->json([
        "status" => false,
      ]);
    }
    $changeStatutJob->alarm = 0;
    $changeStatutJob->save();
    return response()->json([
      "status" => true,
    ]);
    }else{
      return;
    }
    
  }

  public function list_students_contact_by_entreprise()
  {
    $userId = auth()->user()->id;
    $entrepriseId = Entreprise::where("user_id", "=", $userId)->first()->id;

    $etudiantContactByEntreprise = $this->getStudentsByEntrepriseId($entrepriseId);
    $allOffre = Offre::with("categorie")->get();

    $entrepriseWithStudentsContact = $this->associateOffresWithStudents($etudiantContactByEntreprise, $allOffre);

    return response()->json([
      "status" => true,
      "data" => $entrepriseWithStudentsContact,
    ]);
  }

  private function getStudentsByEntrepriseId($entrepriseId)
  {
    return Entreprise::with(
      "students.competences",
      "students.experiences",
      "students.etoiles"
    )
      ->get()
      ->firstWhere('id', $entrepriseId);
  }

  private function associateOffresWithStudents($entreprise, $allOffre)
  {
    foreach ($allOffre as $offre) {
      foreach ($entreprise->students as $item) {
        if ($offre->id === $item->pivot->offre_id) {
          $item->pivot->offre = $offre;
        }
      }
    }

    return $entreprise;
  }

  /**
   * @OA\Get(
   *      path="api/AllEntrepriseWithTimetables",
   *      operationId="Voir toutes les entreprises",
   *      tags={"Entreprise or Particulier"},
   *      summary="Voir toutes les entreprises",
   *      description="Retourne la liste des entreprises",
   *      @OA\Response(
   *          response=200,
   *          description="successful operation",
   *          @OA\JsonContent(
   *              @OA\Property(property="status", type="boolean", example=true),
   *  @OA\Property(property="timetable", type="string",type="array",@OA\Items(type="object"),),
   *              @OA\Property(property="data", type="array",@OA\Items(type="object"),),
   *          ),
   *       ),
   *       @OA\Response(response=400, description="Bad request"),
   *     )
   *
   * Returns list of projects
   */

  public function get_entreprises()
  {

   $entreprises = Entreprise::with([
    'offre.students',
    'offre.offre_student',
    'user.statut',
    'user.photos',
    'emails',

    // Charger UNIQUEMENT les abonnements en statut success
    'user.abonement' => function ($query) {
        $query->where('statut', 'success');
    },

    // Charger les détails de l’abonnement si existant
    'user.abonement.abonement',
])
->orderByDesc('created_at')
->get();

    $emplois = Student::all();
    return response()->json([
      "status" => true,
      "data" => $entreprises,
      "timetable" => $emplois
    ]);
  }

  public function update_badge_entreprises($id)
  {
   $entreprise = Entreprise::find($id);
   $entreprise->view = 0;
   $entreprise->save();
    return response()->json([
      "status" => true,
    ]);
  }

  /**
   * @OA\Post(
   *     path="api/rate_entreprise",
   *      tags={"Etudiants."},
   *     summary="Evaluer le service",
   *     description="Evaluer le service",
   *      @OA\Response(
   *          response=200,
   *          description="successful operation",
   *          @OA\JsonContent(
   *              @OA\Property(property="status", type="boolean", example=true),
   *  @OA\Property(property="message", type="string", example="...."),
   *          ),
   *       ),
   *     @OA\RequestBody(
   *         description="Evaluation",
   *         required=true,
   *         @OA\JsonContent(
   *               @OA\Property(property="offre_id", type="int", example="5"),
   * @OA\Property(property="student_id", type="int", example="2"),
   * @OA\Property(property="notes", type="int", example="3"),
   * @OA\Property(property="avis", type="string", example="Super le service"),
   *          ),
   * )
   *     )
   * )
   */


  public function noter_entreprise(Request $request)
  {
    $userId = auth()->id();

    $userVerifIfAccount = User::where('id',$userId)->first()->verif_email;
    if($userVerifIfAccount){
$request->validate([
      "notes" => "required",
      "avis" => "required"
    ]);
    if (!$request->notes) {
      return response()->json([
        "status" => false,
        "message" => "veuillez remplir le champ notes.",
      ]);
    }

    $notation = OffreStudent::where("offre_id", $request->offre_id)
      ->where("student_id", $request->student_id)
      ->first();

    if ($notation->notes && $notation->avis) {
      return response()->json([
        "status" => false,
        "message" => "Vous avez déjà donner votre avis, sur cette offre.",
      ]);
    }

    $notation->notes = $request->notes;
    $notation->avis = $request->avis;
    $notation->save();

    return response()->json([
      "status" => true,
      "message" => "Évaluation du service réussie.",
    ]);
    }else{
        return response()->json([
    'status'     => false,
    'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
], 403);
    }
    
  }


  public function create_categorie(Request $request)
  {

    $userId = auth()->user()->id;

    $entrepriseId = Entreprise::where("user_id", "=", $userId)->first()->id;

    // return Entreprise::with('categorie');


    $request->validate([
      "categorie" => "required"
    ]);

    $categorie = new Categorie();

    $categorie->categorie = $request->categorie;
    $categorie->save();

    $offreId = new Entreprise_categorie();
    $offreId->categorie_id = $categorie->id;
    $offreId->entreprises_id = $entrepriseId;
    $offreId->save();

    return response()->json([
      "status" => true,
      "message" => "Creée avec succès",
      "data" => $offreId
    ]);
  }


  public function checkUserAbonnement($userId)
{
    return AbonementUsers::where('user_id', $userId)
        ->where('statut', 'success')
        ->first();
}

public function userStudentsPremiun()
{
  
    return AbonementUsers::where('status_user', 'etudiant')
    ->where('statut', 'success')
    ->whereHas('abonement', function($query) {
        $query->where('libelle', 4);
    })
    ->with('user')
    ->get();
}

public function sendMailStudentsPremiun($allStudents,$myOffre)
{
  if ($allStudents->isEmpty()) {
    return; // Sortie si aucun étudiant
}
foreach ($allStudents as $student) {
    if ($student->user) {
        $student->user->notify(new SendMsg($myOffre));
    }
}
// Notification::send($allStudents, new SendMsg($myOffre));
    
}
  /**
   * @OA\Post(
   *     path="api/create_offre",
   *      tags={"Offres."},
   *     summary="Creation d'offres",
   *     description="Creation d'offres",
   *      @OA\Response(
   *          response=200,
   *          description="successful operation",
   *          @OA\JsonContent(
   *              @OA\Property(property="status", type="boolean", example=true),
   *  @OA\Property(property="message", type="string", example="...."),
   *          ),
   *       ),
   *     @OA\RequestBody(
   *         description="création d'offres",
   *         required=true,
   *         @OA\JsonContent(
   *               @OA\Property(property="nom_offre", type="string", example="restauration"),
   * @OA\Property(property="description", type="string", example="serveur"),
   * @OA\Property(property="debut", type="date", example="2022-10-14 00:00:00"),
   * @OA\Property(property="fin", type="date", example="2022-10-15 00:00:00"),
   * @OA\Property(property="lieu", type="string", example="Abidjan"),
   * @OA\Property(property="nbre_person", type="int", example="2"),
   *  @OA\Property(property="categorie_offre_id", type="int", example="2"),
   *  @OA\Property(property="pointage", type="int", example="jour/mois"),
   * @OA\Property(property="salaire", type="int", example="25000"),
   *          ),
   * )
   *     )
   * )
   */
  public function post_offre(Request $request)
  {
    $userId = auth()->user()->id;

    $entrepriseId = Entreprise::where("user_id", "=", $userId)->first()->id;
    $userVerifIfAccount = User::where('id',$userId)->first()->verif_email;
    $offreEntreprise = Offre::where("entreprise_id", $entrepriseId)->get();
    
  if($userVerifIfAccount === 1){ 
    if($offreEntreprise->isEmpty()){

    $allStudentPremiun = $this->userStudentsPremiun();

     return $this->createOffre($request,$entrepriseId,$offreEntreprise,$allStudentPremiun);

   }else{
     $abonnementActive = $this->checkUserAbonnement($userId);

        if($abonnementActive){

          $allStudentPremiun = $this->userStudentsPremiun();

          return $this->createOffre($request,$entrepriseId,$allStudentPremiun);

        }else{
          return response()->json([
            "status" => false,
            "message" => "Vous n'avez pas d'abonnement actif. Veuillez souscrire un abonnement pour pouvoir publier une offre."
        ], 302);
        }
   
   }

}else{
        return response()->json([
    'status'     => false,
    'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
], 403);
    }
  
    

    
    
  }

  private function createOffre(Request $request,$entrepriseId,$allStudentPremiun){
     $request->validate([
      "nom_offre" => "required",
      "description" => "required",
      "debut" => "required",
      // "fin" => "required",
      "lieu" => "required",
      "categorie_offre_id" => "required",
      "nbre_person" => "required"
    ]);
    $exists = Offre::where('entreprise_id', $entrepriseId)
    ->where('nom_offre', $request->nom_offre)
    ->whereDate('debut', $request->debut)
    ->exists();

if ($exists) {
    return response()->json([
        "status"  => false,
        "message" => "Une offre avec cette date de début existe déjà.",
    ]);
}

  $fin = Carbon::parse($request->fin);
  $today = Carbon::now();

  $abonnement = AbonementUsers::where('user_id', $entrepriseId)
    ->whereDate('echeance', '>=', $today)
    ->where('statut', 'success')
    ->first();

    if ($abonnement) {
    // 🅱️ ENTREPRISE ABONNÉE
    $dateLimite = Carbon::parse($abonnement->echeance);

    if ($fin->gt($dateLimite)) {
        return response()->json([
            "status" => false,
            "message" => "La date de fin dépasse l'échéance de votre abonnement."
        ], 422);
    }

} else {
    // 🅰️ ENTREPRISE NON ABONNÉE
    $dateLimite = $today->copy()->addMonths(3);

    if ($fin->gt($dateLimite)) {
        return response()->json([
            "status" => false,
            "message" => "Pour les entreprises non abonnées, la durée maximale est de 3 mois."
        ], 422);
    }
}
    $createOffre = new Offre();
    $createOffre->nom_offre =$request->nom_offre;
    $createOffre->description = $request->description;
    $createOffre->competence_id = $request->competence_id;
    $createOffre->debut = $request->debut;
    $createOffre->fin = $request->fin;
    $createOffre->job_fin = $request->job_fin;
    $createOffre->job_debut = $request->job_debut;
    $createOffre->nbre_person = $request->nbre_person;
    $createOffre->salaire = $request->salaire;
    $createOffre->pointage = $request->pointage;
    $createOffre->lieu = $request->lieu;
    $createOffre->entreprise_id = $entrepriseId;
    $createOffre->categorie_offre_id = $request->categorie_offre_id;

    $createOffre->save();
if (!empty($allStudentPremiun)) {
    $this->sendMailStudentsPremiun($allStudentPremiun, $createOffre);
} 
    return response()->json([
      "status" => true,
      "message" => "l'Offre est enregistrée avec succès",
      "data" => $createOffre
    ], 200);
  }


  public function show_offres_entreprise()
  {
    $userId = auth()->user()->id;
    $entrepriseId = Entreprise::where("user_id", "=", $userId)->first()->id;
    $offreEntreprise = Offre::where("entreprise_id", $entrepriseId)->get();
    return response()->json([
      "status" => true,
      "data" => $offreEntreprise
    ], 200);
  }


  public function contact_student(Request $request)
  {
    $id = auth()->user()->id;
    $entrepriseId = Entreprise::where("user_id", "=", $id)->first()->id;
    $userVerifIfAccount = User::where('id',$id)->first()->verif_email;
    if($userVerifIfAccount){
      $idStudent = $request->student_id;

      $offreStudent = OffreStudent::where('student_id',$idStudent)->get();

      $entrepriseStudent = Entreprise_Student::where('student_id',$idStudent)->get();
    
      $request->validate([
      "student_id" => "required|integer",
      "offre_id" => "required"
    ]);
    if($entrepriseStudent->isNotEmpty()){
   foreach ($request->date as $date) {
    foreach ($entrepriseStudent as $item) {
        if (Carbon::parse($date)->equalTo(Carbon::parse($item->date)) && $item->contrat === 1) {
            return response()->json([
                'status' => false,
                "message" => "L'etudiant est occupé pour cette date:".Carbon::parse($date)->format('d-m-Y')
            ]);  
        }
    }
}
    }
   
    if ($offreStudent->contains('offre_id', $request->offre_id)) {
      return response()->json([
        'status' => false,
        "message" => "Vous avez déjà choisir cet étudiant pour cette offre."
      ]);
} else {
  $isCompanyChooseForFirstStudent = Entreprise_Student::where('student_id',$idStudent)
  ->where('entreprises_id',$entrepriseId)
  ->get();
  if($isCompanyChooseForFirstStudent->isEmpty()){

           $studentInfoJoursFree = Jour::where("student_id", $idStudent)->get();

           if ($studentInfoJoursFree->isEmpty()) {
                    return response()->json([
                      'status' => false,
                      "message" => "Aucun jour trouvé pour cet talent."
                    ],200);
                         }

                $option = $request->option;

      $rendezVousOfEntreprise = Entreprise_Student::where('entreprises_id', $entrepriseId)
                                ->where("student_id",$idStudent)  
                                 ->get();
      if ($option == "date") {
              $dateRendezVous = $request->date;
               $tableauUpdateWithGetDatesBetween = $this->getDatesBetween($studentInfoJoursFree);

            return $this->verifIfStudentIsAvailable(
                          $dateRendezVous,
                          $tableauUpdateWithGetDatesBetween,
                          $rendezVousOfEntreprise,
                          $entrepriseId,
                          $request->student_id,
                          $request->offre_id
                          );
     
                              }   
                                  }else{
              $abonnementActive = $this->checkUserAbonnement($id);
      if($abonnementActive){

                $studentInfoJoursFree = Jour::where("student_id", $idStudent)->get();

           if ($studentInfoJoursFree->isEmpty()) {
                    return response()->json([
                      'status' => false,
                      "message" => "Aucun jour trouvé pour cet talent."
                    ],200);
                         }
                $option = $request->option;
      $rendezVousOfEntreprise = Entreprise_Student::where('entreprises_id', $entrepriseId)
                                ->where("student_id",$idStudent)  
                                 ->get();
                                 if ($option == "date") {
              $dateRendezVous = $request->date;
               $tableauUpdateWithGetDatesBetween = $this->getDatesBetween($studentInfoJoursFree);

            return $this->verifIfStudentIsAvailable(
                          $dateRendezVous,
                          $tableauUpdateWithGetDatesBetween,
                          $rendezVousOfEntreprise,
                          $entrepriseId,
                          $request->student_id,
                          $request->offre_id
                          );
     
                              }
              }else{
                return response()->json([
                      'status' => false,
                      "message" => "Vous devez faire un abonnement."
                    ],200);
              }
                                     }  
}
    }else{
return response()->json([
    'status'     => false,
    'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
], 403);
    }
   

    // if ($option == "periode") {

    //   $dateRendezVousStart = $request->date_debut;

    //   $dateRendezVousEnd = $request->date_fin;



    //   foreach ($studentInfoJoursFree as $jour) {

    //     if ($dateRendezVousStart == $jour->jour || $dateRendezVousEnd == $jour->jour ||  ($dateRendezVousStart <= $jour->jour && $dateRendezVousEnd >= $jour->jour)) {

    //       foreach ($rendezVousOfEntreprise as $value) {
    //         if (
    //           $dateRendezVousStart == $value->date_debut || $dateRendezVousEnd == $value->date_fin || ($dateRendezVousStart < $value->date && ($dateRendezVousStart < $value->date && $dateRendezVousEnd > $value->date))
    //           || ($dateRendezVousStart < $value->date_debut &&  $dateRendezVousEnd == $value->date_fin) || $dateRendezVousEnd == $value->date || $dateRendezVousStart == $value->date
    //         ) {
    //           return response()->json([
    //             'status' => false,
    //             "message" => "le Personnel à déjà été choisi par vous."
    //           ]);
    //         }
    //       }
    //       $entrepriseStudent = new Entreprise_Student();
    //       $entrepriseStudent->entreprises_id =  $entrepriseId;
    //       $entrepriseStudent->student_id = $request->student_id;
    //       $entrepriseStudent->date_debut = $dateRendezVousStart;
    //       $entrepriseStudent->date_fin = $dateRendezVousEnd;
    //       $entrepriseStudent->service =  $request->service;
    //       $entrepriseStudent->save();

    //       Mail::to($studentMail->email)->send(new Notifyuser($entrepriseMail, $studentMail));

    //       return response()->json([
    //         'status' => true,
    //         "message" => "Enregistré avec succès."
    //       ]);
    //     } else {
    //       return response()->json([
    //         'status' => false,
    //         "message" => $msg
    //       ]);
    //     }
    //   }

    //   return response()->json([
    //     'status' => false,
    //     "message" => $msg
    //   ]);
    // }
  }
 
public function getDatesBetween($data)
{
    $dates = [];
    foreach ($data as $item) {
        // Détermine si $item est un tableau ou un modèle Eloquent
        $isArray = is_array($item);
        $jour = $isArray ? $item['jour'] : $item->jour;
        $periode = $isArray ? ($item['periode'] ?? null) : ($item->periode ?? null);

        if ($periode) {
            [$startDate, $endDate] = explode(' A ', $jour);
            $current = Carbon::parse($startDate);
            $end = Carbon::parse($endDate);

            while ($current <= $end) {
                // Crée une copie de $item (tableau ou modèle)
                $newItem = $isArray ? array_merge([], $item) : $item->replicate();

                // Met à jour les champs
                if ($isArray) {
                    $newItem['jour'] = $current->format('Y-m-d');
                    $newItem['periode'] = 1;
                    $newItem['periode_debut'] = $startDate;
                    $newItem['periode_fin'] = $endDate;
                } else {
                    $newItem->jour = $current->format('Y-m-d');
                    $newItem->periode = 1;
                    $newItem->periode_debut = $startDate;
                    $newItem->periode_fin = $endDate;
                }

                $dates[] = $newItem;
                $current->addDay();
            }
        } else {
            $dates[] = $item;
        }
    }
    return $dates;
}

  public function verifIfStudentIsAvailable(
    $dateRendezVous,
  $studentInfoJoursFree,
  $rendezVousOfEntreprise,
  $entrepriseId,
  $student_id,
  $offre_id
  ){
  
    if($studentInfoJoursFree){
      foreach ($studentInfoJoursFree as $jourStudent){
        foreach($dateRendezVous as $dateChoose){
        
           if($dateChoose === $jourStudent['jour']){
                  return $this->verifIfEntrepriseChosen($dateRendezVous,$rendezVousOfEntreprise,$entrepriseId,$student_id,$offre_id);
             
          }
        }
      }
    return response()->json([
                      'status' => false,
                      "message" => "Pas de disponibilité pour ce talent."
                    ],200);
        
    }
  
  }

  public function verifIfEntrepriseChosen($dateRendezVous,
  $rendezVousOfEntreprise,$entrepriseId,$student_id,$offre_id){
  if($rendezVousOfEntreprise){
    foreach($rendezVousOfEntreprise as $item){
      foreach($dateRendezVous as $dateChoose){
        if($dateChoose === $item->date){
         return response()->json([
                      'status' => false,
                      "message" => "Vous avez déja choisi ce talent pour ce jour : $dateChoose"
                    ],400);
        }
      }
    }
     return $this->saveTalent($dateRendezVous,
         $entrepriseId,$student_id,$offre_id);
  }
 
  }

  public function saveTalent($dateRendezVous,$entrepriseId,$student_id,$offre_id){
     foreach ($dateRendezVous as $date) {
                $entrepriseStudent = new Entreprise_Student();
                $entrepriseStudent->entreprises_id =  $entrepriseId;
                $entrepriseStudent->student_id = $student_id;
                $entrepriseStudent->date = $date;
                $entrepriseStudent->offre_id = $offre_id;
                $entrepriseStudent->alarm = 1;
                $entrepriseStudent->save();
              }
              // Mail::to($studentMail->email)->send(new Notifyuser($entrepriseMail, $studentMail));
              return response()->json([
                'status' => true,
                "message" => "Enregistré avec succès."
              ]);
  }


  public function modify_profil(Request $request)
  {
    $userId = auth()->user()->id;


    if (Entreprise::where("user_id", $userId)->exists()) {
      $entrepriseInfo = Entreprise::where("user_id", $userId)->first();
      $entrepriseId = $entrepriseInfo->id;

      $userInfo = User::where("id", $userId)->first()->id;


      $user = User::find($userInfo);

      $user->nom =  !empty($request->nom) ? $request->nom : $user->nom;

      $user->password = !empty($request->password) ? Hash::make($request->password) : $user->password;

      $user->save();

      $entreprise = Entreprise::findOrFail($entrepriseId);
      $entreprise->nom =  !empty($request->nom) ? $request->nom : $entreprise->nom;
      $entreprise->registre_commerce = !empty($request->registre_commerce) ? $request->registre_commerce : $entreprise->registre_commerce;
      $entreprise->password = !empty($request->password) ? Hash::make($request->password) : $entreprise->password;

      $entreprise->save();
      return response()->json([
        "status" => true,
        "message" => "Mis a jour avec succès.",
        "data" => $entreprise,
      ], 200);
    } else {
      return response()->json([
        "status" => false,
        "message" => "l'entreprise n'existe pas."
      ], 404);
    }
  }



  public function update_offre(Request $request, $id)
  {

     $user = auth()->user();

    if (!$user) {
        return response()->json([
            'status' => false,
            'message' => 'Utilisateur non authentifié.'
        ], 401);
    }

    $abonnementActive = AbonementUsers::where('user_id', $user->id)
        ->where('statut', 'success')
        ->first();

    if (!$abonnementActive) {
        return response()->json([
            'status' => false,
            'message' => 'Vous devez avoir un abonnement actif pour modifier une offre.'
        ], 403);
    }

    if (Offre::where("id", $id)->exists()) {

      $offre = Offre::find($id);

      $offre->nom_offre = !empty($request->nom_offre) ? $request->nom_offre : $offre->nom_offre;
      $offre->description = !empty($request->description) ? $request->description : $offre->description;
      $offre->debut = !empty($request->debut) ? $request->debut : $offre->debut;
      $offre->fin = !empty($request->fin) ? $request->fin : $offre->fin;
      $offre->salaire = !empty($request->salaire) ? $request->salaire : $offre->salaire;
      $offre->lieu = !empty($request->lieu) ? $request->lieu : $offre->lieu;
      $offre->pointage = !empty($request->pointage) ? $request->pointage : $offre->pointage;
      $offre->job_debut = !empty($request->job_debut) ? $request->job_debut : $offre->job_debut;
      $offre->job_fin = !empty($request->job_fin) ? $request->job_fin : $offre->job_fin;
      $offre->nbre_person = !empty($request->nbre_person) ? $request->nbre_person : $offre->nbre_person;
      $offre->competence_id = !empty($request->competence_id) ? $request->competence_id : $offre->competence_id;
      $offre->categorie_offre_id = !empty($request->categorie_offre_id) ? $request->categorie_offre_id : $offre->categorie_offre_id;
      $offre->save();

      return response()->json([
        "status" => true,
        "message" => "Offre modifié avec succès",
        "data" => $offre
      ], 200);
    } else {
      return response()->json([
        "status" => false,
        "message" => "l'Offre n'existe pas"
      ], 404);
    }
  }

  public function delete_offre($id)
  {
    $idOffre = Offre::where("id", $id)->first();
    $contrats = OffreStudent::all();
    if($contrats->contains('offre_id', $idOffre->id)){
      return response()->json([
      "status" => true,
      "message" => "Il y'a déjà une personne qui vient de postuler sur cette offre."
    ], 409);
    }else{
    $idOffre->delete();
    return response()->json([
      "status" => true,
      "message" => "l'Offre est supprimée avec succès"
    ], 200);
    }
    
  }


  public function filterStudents(Request $request)
{
    $data = $request->validate([
        'dates' => 'nullable|array',
        'competences' => 'nullable|array',
        'location' => 'nullable|string',
    ]);

    // 🔹 Base query avec relations
    $query = Student::with(['user.abonement', 'competences', 'jours'])
                    ->whereHas('user.abonement');
   
    // 🔸 Filtrage par dates disponibles
    if (!empty($data['dates'])) {
    $query->whereHas('jours', function ($q) use ($data) {
    $q->whereNull('periode')
      ->whereIn('jour', $data['dates']);
});

$query->orWhereHas('jours', function ($q) use ($data) {
    $q->where('periode', 1)
      ->where(function ($q2) use ($data) {
          foreach ($data['dates'] as $date) {
              $q2->orWhere(function ($q3) use ($date) {
                  $q3->where('periode_debut', '<=', $date)
                     ->where('periode_fin', '>=', $date);
              });
          }
      });
});
}

    // 🔸 Filtrage par compétences
    if (!empty($data['competences'])) {
        $query->whereHas('competences', function ($q) use ($data) {
            $q->whereIn('competence_id', $data['competences']);
        });
    }

    // 🔸 Filtrage par localisation
    if (!empty($data['location'])) {
        $query->whereHas('user', function ($q) use ($data) {
            $q->where('ville', 'LIKE', '%' . $data['location'] . '%');
        });
    }

    // 🔸 Trier les étudiants : Premium d’abord
    // Supposons que l’abonnement a 4 = 'premium' ou 3='standard'
    $students = $query->get()->sortByDesc(function ($student) {
    // Vérifie si l'étudiant a un user et un abonement_id
    return optional($student->user)->abonement_id === 4 ? 1 : 0;
})->values();

    // 🔸 Retour propre en JSON
    return response()->json([
        'count' => $students->count(),
        'students' => $students,
    ]);
}

public function generatePdf($student, $offre)
{
    $data = [
        'student' => $student,
        'offre' => $offre,
        'date' => now()->format('d/m/Y'),
    ];

    // Génération du PDF depuis une vue
    $pdf = PDF::loadView('pdf.certificat', $data);

    // Retourne le binaire du PDF (string)
    return $pdf->output();
}

public function sendCertificat(Request $request)
{
    $student =Student::where('id',$request->student_id)->first();
    $offre =Offre::where('id',$request->offre_id)
    ->with('entreprise')
    ->first();

    // Générer le PDF
    $pdfData = $this->generatePdf($student, $offre);
     // Envoie le mail avec le PDF en pièce jointe
    Mail::to($student->email)
        ->send(new CertificatMail($pdfData, $student,$offre));

    return response()->json(['message' => 'Certificat envoyé avec succès.']);
}
}
