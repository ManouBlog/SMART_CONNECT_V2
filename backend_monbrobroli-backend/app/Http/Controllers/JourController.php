<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Jour;
use App\Models\User;
use App\Models\Student;
use Nette\Utils\DateTime;
use Illuminate\Http\Request;
use App\Models\Entreprise_Student;
use Illuminate\Support\Facades\DB;
use App\Mail\EmailsendAtentreprise;
use Illuminate\Support\Facades\Mail;


class JourController extends Controller
{
/**
     * @OA\Post(
     *     path="api/create_schedule",
     *      tags={"Etudiants."},
     *     summary="Création d'emploi du temps",
     *     description="Création d'emploi du temps",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="...."),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         description="Create calendar",
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="jour", type="date", example="[2022-10-22,2023-10-22]"),
     * @OA\Property(property="First_horaire", type="heure", example="13:31-16:31 si periode=1 ou 0 "),
     * @OA\Property(property="Second_horaire", type="heure", example="20:13-21:14 si periode = 0"),
     * @OA\Property(property="totalHour", type="integer", example="4 (facultatif)"),
     * @OA\Property(property="periode", type="integer", example="1 / 0"),
     *  @OA\Property(property="periode_fin", type="date", example="2025-07-17 si periode=1"),
     * @OA\Property(property="periode_debut", type="integer", example="2025-07-18 si periode=1"),
     * @OA\Property(property="hour_periode_debut", type="heure", example="08:40 si periode=1"),
     * @OA\Property(property="hour_periode_fin", type="integer", example="18:40 si periode=1"),
     *          ),
     * )
     *     )
     * )
     */
    public function create_schedule(Request $request)
    {
       $userId = auth()->id();

       $userVerifIfAccount = User::where('id',$userId)->first()->verif_email;
       if($userVerifIfAccount){
        $student_id = $request->user()->id;
 
        $id = Student::where("user_id", "=", $student_id)->first()->id;
        $jours = Jour::where("student_id", $id)->get();
        $day = $request->jour;
   
        if ($jours->count() > 0) {
            foreach ($jours as $jour) {
                
                 if($jour->periode && $request->periode === null){
                    foreach ($day as $item) {
                          if(Carbon::parse($item)->between(Carbon::parse($jour->periode_debut), Carbon::parse($jour->periode_fin))){
                            return response()->json([
                            "status" => false,
                            "message" => "Le jour existe déjà : ".$item,
                            "data" => $day
                        ]);
                          }
                        }
                 }
                 if($jour->periode === null){
                    foreach ($day as $item) {
                         if ($jour->jour === $item) {
                        return response()->json([
                            "status" => false,
                            "message" => "Le jour existe déjà : ".$item,
                            "data" => $day
                        ]);
                    }
                        }
                 
                 }

                 if($jour->periode && $request->periode){
                    if ($jour->periode_debut === $request->periode_debut || $jour->periode_fin === $request->periode_fin){
                             return response()->json([
                            "status" => false,
                            "message" => "Le jour existe déjà : ".$request->periode_debut,
                            
                        ]);
                    }
                    if($jour->periode_fin === $request->periode_debut){
                           return response()->json([
                            "status" => false,
                            "message" => "Le jour existe déjà : ".$request->periode_debut,
                            
                        ]);
                    }
                    
                 }
                if ($jour->periode === null && Carbon::parse($jour->jour)->between(Carbon::parse($request->periode_debut), Carbon::parse($request->periode_fin))){
                 return response()->json([
                            "status" => false,
                            "message" => "Le jour existe déjà : ".$jour->jour,  
                        ]);
                }
                if ($jour->periode && Carbon::parse($request->periode_debut)->between(Carbon::parse($jour->periode_debut), Carbon::parse($jour->periode_fin))){
                 return response()->json([
                            "status" => false,
                            "message" => "Le jour existe déjà : ".$jour->jour,  
                        ]);
                }
            }
        }

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
       }else{
        return response()->json([
    'status'     => false,
    'message'    => 'Votre compte n’est pas encore activé. Veuillez vérifier vos emails pour l’activer.',
], 403);
    }
       
    }

    /**
     * @OA\Get(
     *      path="api/get_schedule",
     *      operationId="Voir touts mes emplois du temps  créés.",
     *      tags={"Etudiants."},
     *      summary="Voir touts mes emplois du temps  créés.",
     *      description="Retourne tous les emploi du temps créés",
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


    public function get_schedule()
    {
        $user_id = auth()->user()->id;
        $id = Student::where("user_id", "=", $user_id)->first()->id;

        $student_schedules = Jour::where("student_id", $id)->get();
        return response()->json([
            "status" => true,
            "data" => $student_schedules
        ], 200);
    }

    /**
     *
     * @OA\Put(
     *     path="api/modify_schedule/{id}",
     *     tags={"Etudiants."},
     *     operationId="Modifier l'emploi du temps",
     *     summary="Modifier l'emploi du temps.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Id de l'emploi du temps.",
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
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *              @OA\Property(property="data", type="object"),
     *          ),
     *       ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found"
     *     ),
     *     @OA\Response(
     *         response=405,
     *         description="Mauvaise méthode"
     *     ),
     *  *     @OA\RequestBody(
     *         description="Modifier l'emploi du temps",
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="day", type="date", example="2022-10-22"),
     * @OA\Property(property="First_horaire", type="heure", example="13:31-16:31"),
     * @OA\Property(property="Second_horaire", type="heure", example="20:13-21:14"),
     * @OA\Property(property="totalHour", type="integer", example="4"),
     *          ),
     * )
     * )
     */

    public function modify_schedule(Request $request, $id)
    {
        // $user_id = auth()->user()->id;
        // $studentConnecte = Student::where("user_id", "=", $user_id)->first();
        
        // $jours = Jour::where("student_id", $studentConnecte->id)->get();

        // $listForContactStudentByEntreprise = Entreprise_Student::where("student_id", $studentConnecte->id)->get();

        // $newDay = $request->day;
        // if ($jours->count() > 0) {
        //     foreach ($jours as $jour) {
        //         foreach ($newDay as $day) {
        //             if ($jour->jour === $day) {
        //                 return response()->json([
        //                     "status" => false,
        //                     "message" => "Le jour existe déjà",
        //                     "data" => $listForContactStudentByEntreprise
        //                 ]);
        //             }
        //         }
        //     }
        // }

        // if ($listForContactStudentByEntreprise->count() > 0) {

        //     foreach ($jours as $jou) {


        //         foreach ($listForContactStudentByEntreprise as $item) {


        //             if (($item->date === $jou->jour && $item->contrat == 1) && !empty($request->day)) {
        //                 if ($jou->id == $id){
        //                     return response()->json([
        //                         "status" => false,
        //                         "message" => "Le jour à été selectionné pour un job.",
        //                         "data" => null
        //                     ], 203);
        //                 }
        //             }
        //         }
        //     }
        // }

        $jour = Jour::where('id',$id)->first();
         if(!$jour->periode){
       $jour->totalHour = !empty($request->totalHour) ? $request->totalHour : $jour->totalHour;
        $jour->First_horaire = !empty($request->First_horaire) ? $request->First_horaire : $jour->First_horaire;
        $jour->Second_horaire = !empty($request->Second_horaire) ? $request->Second_horaire : $jour->Second_horaire;
         }
         if($jour->periode){
             [$startHour, $endHour] = explode('-', $request->First_horaire);
             $jour->totalHour = !empty($request->totalHour) ? $request->totalHour : $jour->totalHour;
             $jour->First_horaire = !empty($request->First_horaire) ? $request->First_horaire : $jour->First_horaire;
             $jour->hour_periode_debut = !empty($request->First_horaire) ? $startHour : $jour->hour_periode_debut;
             $jour->hour_periode_fin = !empty($request->First_horaire) ? $endHour : $jour->hour_periode_fin;
         }
 

        $jour->save();

        // $listEntrepriseContactStudent = DB::table('entreprise_student')
        //     ->join('entreprises', 'entreprises.id', '=', 'entreprise_student.entreprises_id')
        //     ->select('entreprises.*')
        //     ->distinct()
        //     ->get();

        // foreach ($listEntrepriseContactStudent as $mail) {
        //     Mail::to($mail->email)->send(new EmailsendAtentreprise($mail, $studentConnecte));
        // }


        return response()->json([
            "status" => true,
            "message" => "Emploi du temps modifié",
            "data" => $jour
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="api/delete_schedule/{id}",
     *    tags={"Etudiants."},
     *     summary="Supprimer un emploi du temps",
     *     description="Supprimer un emploi du temps",
     *     operationId="deleteSchedule",
     *     @OA\Parameter(
     *         name="Id",
     *         in="path",
     *         description="Id de l'emploi du temps.",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid schedule supplied",
     *     ),
    *    @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *              @OA\Property(property="message", type="string",example="...."),
     *          ),
     *       ),
     *     @OA\Response(
     *         response=404,
     *         description="route not found",
     *     )
     * )
     */
    public function delete_schedule($id)
    {
        $user_id = auth()->user()->id;
        $studentId =  Student::where('user_id',$user_id)->first();
        $entreprise_student = Entreprise_student::where('student_id',$studentId->id)
        ->where('contrat', 1)
        ->get();
       
        if (Jour::where("id", $id)->exists()) {
            
            $jour = Jour::where('id',$id)->first();
            if($jour->periode === null && $entreprise_student->contains('date', $jour->jour)){
             return response()->json([
                "status" => true,
                "message" => "Cette disponibilité ne peut pas être supprimée car elle est actuellement liée à un contrat en cours."
            ], 409);
            }
            if($jour->periode){
               $exists = $entreprise_student->contains(function ($item) use ($jour) {
                $itemDate = new DateTime($item->date);
                $startDate = new DateTime($jour->periode_debut);
                $endDate = new DateTime($jour->periode_fin);

                return $itemDate >= $startDate && $itemDate <= $endDate;
               }); 
              if($exists){
            return response()->json([
                "status" => true,
                "message" => "Cette disponibilité ne peut pas être supprimée car elle est actuellement liée à un contrat en cours."
            ], 409);
              }           
            }
            $jour->delete();
            return response()->json([
                "status" => true,
                "message" => "l'Emploi du temps à éte supprimé avec succès"
            ], 200);
        } else {
            return response()->json([
                "status" => false,
                "message" => "l'Emploi du temps n'existe pas"
            ], 404);
        }
    }
}
