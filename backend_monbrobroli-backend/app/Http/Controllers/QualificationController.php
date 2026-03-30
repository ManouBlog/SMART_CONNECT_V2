<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Models\Qualification;

class QualificationController extends Controller
{
    /**
     * Supprimer une qualification
     *
     * @OA\Delete(
     *     path="/api/qualifications/{id}",
     *     operationId="deleteQualification",
     *     tags={"Qualifications"},
     *     summary="Supprimer une qualification par ID",
     *     description="Supprime la qualification identifiée par {id}. Retourne 404 si non trouvée.",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la qualification à supprimer",
     *         required=true,
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Qualification supprimée avec succès",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Qualification supprimée avec succès")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Qualification non trouvée",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Qualification non trouvée.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Non authentifié / token manquant",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Unauthenticated.")
     *         )
     *     )
     * )
     */
    public function deleteQualifications($id)
    {
        $qualification = Qualification::find($id);

        if (!$qualification) {
            return response()->json([
                'status' => false,
                'message' => 'Qualification non trouvée.'
            ], 404);
        }

        $qualification->delete();

        return response()->json([
            'status' => true,
            'message' => 'Qualification supprimée avec succès'
        ], 200);
    }


   /**
 * @OA\Post(
 *     path="/api/addQualifications",
 *     operationId="addQualifications",
 *     tags={"Qualifications"},
 *     summary="Ajouter des qualifications pour l'étudiant connecté",
 *     description="Cette API permet à l'étudiant authentifié d'ajouter une ou plusieurs qualifications.",
 *     security={{"sanctum": {}}},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="qualifications",
 *                 type="array",
 *                 description="Liste des qualifications à ajouter",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="detail", type="string", example="Licence en Informatique"),
 *                     @OA\Property(property="date_debut", type="string", format="date", example="2020-09-01"),
 *                     @OA\Property(property="date_fin", type="string", format="date", example="2023-06-30")
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Qualification ajoutée avec succès",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="boolean", example=true),
 *             @OA\Property(property="message", type="string", example="Qualification ajoutée.")
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Non autorisé"
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validation échouée"
 *     )
 * )
 */
public function addQualifications(Request $request)
{
    $userId = auth()->user()->id;
    $studentInfo = Student::where("user_id", $userId)->first();
    $studentId = $studentInfo->id;
    $msg = "Qualification ajoutée.";

    if($request->qualifications){
        foreach ($request->qualifications as $qualificationStudent) {
            $qualifications = new Qualification();
            $qualifications->student_id  = $studentId;
            $objet = json_decode($qualificationStudent);
            // $qualifications->detail = $objet->detail;
            $qualifications->objet = $objet->objet;
            $qualifications->date_debut = $objet->date_debut;
            $qualifications->date_fin = $objet->date_fin;
            $qualifications->save();
        }
    }

    return response()->json([
        "status" => true,
        "message" => $msg,
    ], 200);
}

/**
 * @OA\Post(
 *     path="/api/updateQualification",
 *     summary="Mettre à jour les qualifications d’un étudiant",
 *     tags={"Qualifications"},
 *     security={{"bearerAuth":{}}},
 *
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"qualifications"},
 *             @OA\Property(
 *                 property="qualifications",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     required={"id","objet","detail","date_debut","date_fin"},
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="objet", type="string", example="Développement Web"),
 *                     @OA\Property(property="detail", type="string", example="Laravel & Vue.js"),
 *                     @OA\Property(property="date_debut", type="string", format="date", example="2023-01-01"),
 *                     @OA\Property(property="date_fin", type="string", format="date", example="2024-01-01")
 *                 )
 *             )
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=200,
 *         description="Qualification mise à jour avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="boolean", example=true),
 *             @OA\Property(property="message", type="string", example="La qualification a été modifiée.")
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=401,
 *         description="Non authentifié"
 *     )
 * )
 */


public function updateQualification(Request $request)
{
    $userId = auth()->user()->id;
    $studentInfo = Student::where("user_id", $userId)->first();
    $studentId = $studentInfo->id;
    if($request->qualifications){
        foreach ($request->qualifications as $qualificationStudent) {
            $objet = json_decode($qualificationStudent);
           $qualificationForUpdate = Qualification::where('id',$objet->id)
             ->where("student_id",$studentId)
             ->first();
            $qualificationForUpdate->detail = $objet->detail;
            $qualificationForUpdate->objet = $objet->objet;
            $qualificationForUpdate->date_debut = $objet->date_debut;
            $qualificationForUpdate->date_fin = $objet->date_fin;
            $qualificationForUpdate->save();
        }
    }

    return response()->json([
        "status" => true,
        "message" => "La qualification a été modifiée.",
    ], 200);

    
}
}
