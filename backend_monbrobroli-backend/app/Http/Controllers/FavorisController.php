<?php

namespace App\Http\Controllers;

use App\Models\Favoris;
use App\Models\Student;
// use App\Models\User;
use Illuminate\Http\Request;

class FavorisController extends Controller
{

     /**
   * @OA\Post(
   *     path="api/toogleFavoris",
   *      tags={"Favoris-Student."},
   *     summary="ajouter et rétirer les offres dans les favoris",
   *     description="ajouter et rétirer les offres dans les favoris",
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
   *          ),
   * )
   *     )
   * )
   */
    function create(Request $request)
    {
        $user_id = auth()->user()->id;
        $student_id = Student::where("user_id", "=", $user_id)->first()->id;
        $listWishlist = Favoris::all();
       
        $request->validate([
            "offre_id" => "required",
        ]);

        foreach ($listWishlist as $list) {
            if ($list->offre_id == $request->offre_id &&
             $list->student_id == $student_id) {
                Favoris::where("student_id", $student_id)
                ->where('offre_id', $request->offre_id)
                ->delete();
                return response()->json([
                    "status" => false
                ],201);
            }
        }
        Favoris::create(['offre_id' => $request->offre_id,
                'student_id' => $student_id
              ]);
        return response()->json([
            "status" => true,
            "message" => "Enregistré",
        ],200);
    }
  /**
     * @OA\Get(
     *      path="api/listFavoris",
     *      operationId="Voir la liste de mes favoris.",
     *      tags={"Favoris-Student."},
     *      summary="Voir la liste de mes favoris",
     *      description="Retourne la liste des favoris.",
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
    function favorisList()
    {
        $user_id = auth()->user()->id;
        $student_id = Student::where("user_id", "=", $user_id)->first()->id;
        $listWishlist = Student::with("favoris","favoris.offre","favoris.offre.entreprise")->where("id", $student_id)->first();


        return response()->json([
            "status" => true,
            "data" => $listWishlist
        ]);
    }
}
