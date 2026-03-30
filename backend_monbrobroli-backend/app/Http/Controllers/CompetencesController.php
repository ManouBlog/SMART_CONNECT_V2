<?php

namespace App\Http\Controllers;

use App\Models\Competence;
use Illuminate\Http\Request;
use App\Models\CompetenceStudent;

class CompetencesController extends Controller
{
    public function create(Request $request)
    {

        $request->validate([
            "competence" => "required|string",
            "categorie_id"=>"required"
        ]);
        $qualification = new Competence();
        $qualification->competence = $request->competence;
        $qualification->categorie_id = $request->categorie_id;
        $qualification->save();

        return response()->json([
            "status" => true,
            "message" => "Poste créé",
            "data"=>$qualification
        ], 200);
    }


    /**
     *
     * @OA\Put(
     *     path="api/admin/update_competence/{id}",
     *     tags={"Competences."},
     *     operationId="Update la compétence",
     *     summary="Update la compétence.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Id de la compétence.",
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
     *         description="Modifier la compétence",
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="competence", type="string", example="Etudiant"),
     *          ),
     * )
     * )
     */

    public function update_competence(Request $request,$id)
  {
    $competenceItem = Competence::where('id',$id)->first();

    $competenceItem->competence = !empty($request->competence) ? $request->competence:$competenceItem->competence;
    $competenceItem->save();

    return response()->json([
      "status" => true,
      "message" => "Compétence modifiée.",
      "data" => $competenceItem
    ]);
  }

  /**
     * @OA\Delete(
     *     path="api/admin/delete_categorie/{id}",
     *     tags={"Categories."},
     *     summary="Supprimer une catégorie",
     *     description="Supprimer une catégorie",
     *     operationId="delete_categorie",
     *     @OA\Parameter(
     *         name="Id",
     *         in="path",
     *         description="Id de la catégorie.",
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
     *              @OA\Property(property="message", type="string",example="Catégorie supprimée avec succes"),
     *          ),
     *       ),
     *     @OA\Response(
     *         response=404,
     *         description="route not found",
     *     )
     * )
     */
    public function delete_competence($id)
    {

      $competence = Competence::find($id);

if (!$competence) {
    return response()->json([
        "status" => false,
        "message" => "Compétence introuvable."
    ], 404);
}

// Vérifier si la compétence est utilisée
$isUsed = CompetenceStudent::where('competence_id', $competence->id)->exists();

if ($isUsed) {
    return response()->json([
        "status" => false,
        "message" => "La compétence est déjà utilisée."
    ], 409);
}

// Supprimer la compétence
$competence->delete();

return response()->json([
    "status" => true,
    "message" => "Compétence supprimée."
], 200);

    // $competence = Competence::where("id", $id)->first();
    // $competence = CompetenceStudent::all();
    // if($competence->contains('competence_id', $competence->id)){
    //   return response()->json([
    //   "status" => false,
    //   "message" => "La compétence est déjà utilisée."
    // ], 409);
    // }else{
    //  $competence->delete();
    // return response()->json([
    //   "status" => true,
    //   "message" => "Compétence supprimée."
    // ], 200);
    // }
        
    }

    /**
     * @OA\Get(
     *      path="api/GetAllCompetences",
     *      operationId="Voir toutes les compétences créées.",
     *      tags={"Etudiants."},
     *      summary="Voir toutes les compétences créées.",
     *      description="Retourne toutes les compétences créées",
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

    public function findAllCompetences()
    {
        $qualification = Competence::with('categorie')
    ->orderBy('competence', 'asc')
    ->get();

return response()->json([
    'status' => true,
    'data' => $qualification
], 200);
    }
}
