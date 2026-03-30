<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Abonement;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\AbonementUsers;
use App\Models\abonnementCategorie;


class AbonnementsController extends Controller
{
    /**
   * @OA\Post(
   *     path="api/create_categorie-abonnement",
   *      tags={"Abonnement."},
   *     summary="Creation d'abonnement",
   *     description="Creation d'abonnement",
   *      @OA\Response(
   *          response=200,
   *          description="successful operation",
   *          @OA\JsonContent(
   *              @OA\Property(property="status", type="boolean", example=true),
   *  @OA\Property(property="message", type="string", example="...."),
   *          ),
   *       ),
   *     @OA\RequestBody(
   *         description="création de catégorie abonnement",
   *         required=true,
   *         @OA\JsonContent(
   *               @OA\Property(property="libelle", type="string", example="Etudiant"),
   *          ),
   * )
   *     )
   * )
   */
    public function createCategorie(Request $request)
    {
        if (!$request->libelle) {
            return response()->json([
                "status" => false,
                "message" => "Veuillez remplir tous les champs.",
            ], 422);
        }
        $categorie = abonnementCategorie::create([
            "categorie" => $request->libelle
        ]);
        return response()->json([
            "status" => true,
            "data" => $categorie
        ]);
    }

    /**
   * @OA\Get(
   *      path="api/getCategorie",
   *      operationId="Voir toutes les catégories",
   *      tags={"Abonnement."},
   *      summary="Voir toutes les catégories",
   *      description="Voir toutes les catégories",
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
   * Returns list of abonnement
   */

    public function listCategorie()
    {
        $categorie = abonnementCategorie::all();
        return response()->json([
            "status" => true,
            "data" => $categorie
        ]);
    }


     /**
   * @OA\Get(
   *      path="api/admin/transactionsAbonnement",
   *      operationId="Voir toutes les transactions abonnement",
   *      tags={"Abonnement."},
   *      summary="Voir toutes les transactions",
   *      description="Voir toutes les transactions",
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
   * Returns list of abonnement
   */

    public function HistoriqueTransaction()
    {
        $transactions = AbonementUsers::with(['abonement','user'])
        ->get();
        return response()->json([
            "status" => true,
            "data" => $transactions
        ]);
    }
 /**
     * @OA\Delete(
     *     path="api/deleteCategorie/{id}",
     *     tags={"Abonnement."},
     *     summary="Supprimer une catégorie",
     *     description="Supprimer une catégorie",
     *     operationId="deleteCategorie",
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
     *              @OA\Property(property="message", type="string",example="Catégorie supprimée avec succes"),
     *          ),
     *       ),
     *     @OA\Response(
     *         response=404,
     *         description="route not found",
     *     )
     * )
     */
    public function deleteCategorie($id)
    {
        $categorie = abonnementCategorie::find($id);
        $categorie->delete();
        return response()->json([
            "status" => true,
            "message" => "Catégorie supprimée avec succes"
        ], 200);
    }

     /**
     *
     * @OA\Put(
     *     path="api/editCategorie/{id}",
     *     tags={"Abonnement."},
     *     operationId="Modifier la catégorie",
     *     summary="Modifier la catégorie.",
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
     *         description="Modifier la catégorie",
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="libelle", type="string", example="Etudiant"),
     *          ),
     * )
     * )
     */
    public function editCategorie(Request $request, $id)
    {
        $categorie = abonnementCategorie::find($id);
        $categorie->categorie = !empty($request->libelle) ? $request->libelle : $categorie->categorie;
        $categorie->save();
        return response()->json([
            "status" => true,
            "message" => "Catégorie modifiée avec succes"
        ], 200);
    }
  /**
   * @OA\Post(
   *     path="api/create-abonnement",
   *      tags={"Abonnement."},
   *     summary="Creation d'abonnement",
   *     description="Creation d'abonnement",
   *      @OA\Response(
   *          response=200,
   *          description="successful operation",
   *          @OA\JsonContent(
   *              @OA\Property(property="status", type="boolean", example=true),
   *  @OA\Property(property="data", type="string", example="[{}]"),
   *          ),
   *       ),
   *     @OA\RequestBody(
   *         description="création de catégorie abonnement",
   *         required=true,
   *         @OA\JsonContent(
   *               @OA\Property(property="libelle", type="string", example="Etudiant"),
   *  *               @OA\Property(property="prix", type="number", example="2000"),
   *  *               @OA\Property(property="periode", type="number", example="1 ou 2 ans ( nb:ne pas écrire le ans)"),
   *  *               @OA\Property(property="categorie_id", type="number", example="4"),
   *          ),
   * )
   *     )
   * )
   */
    public function createAbonnement(Request $request)
    {
        if (!$request->libelle || !$request->prix || !$request->periode) {
            return response()->json([
                "status" => false,
                "message" => "Veuillez remplir tous les champs.",
            ], 422);
        }
        $abonnement = Abonement::create([
            "libelle" => $request->libelle,
            "prix" => $request->prix,
            "periode" => $request->periode,
            "categorie_id" =>  $request->categorie_id,
            "description" =>  $request->description
        ]);
        return response()->json([
            "status" => true,
            "data" => $abonnement
        ]);
    }


    /**
     *
     * @OA\Put(
     *     path="api/admin/updateAbonnement/{id}",
     *     tags={"Abonnement."},
     *     operationId="Modifier l'abonnement",
     *     summary="Modifier l'abonnement",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Id de l'abonnement.",
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
     *         description="Modifier l'abonnement",
     *         required=true,
     *         @OA\JsonContent(
     *               @OA\Property(property="libelle", type="string", example="Standard"),
     *                @OA\Property(property="prix", type="string", example="100"),
     *                @OA\Property(property="periode", type="string", example="1"),
     *                 @OA\Property(property="description", type="string", example="<ul><li>blabla</li></ul>"),
     *               @OA\Property(property="categorie_id", type="string", example="1"),
     *          ),
     * )
     * )
     */
    public function updateAbonnement(Request $request,$id)
    {
        $abonnement = Abonement::find($id); // Trouver l'abonnement à mettre à jour

     $abonnement->update([
    "libelle" => $request->libelle,
    "prix" => $request->prix,
    "periode" => $request->periode,
    "categorie_id" => $request->categorie_id,
    "description" => $request->description
]);
        return response()->json([
            "status" => true,
            "data" => $abonnement
        ]);
    }


    /**
     * @OA\Delete(
     *     path="api/admin/deleteAbonnement/{id}",
     *     tags={"Abonnement."},
     *     summary="Supprimer un abonnement",
     *     description="Supprimer un abonnement",
     *     operationId="deleteAbonnement",
     *     @OA\Parameter(
     *         name="Id",
     *         in="path",
     *         description="Id de l'abonnement.",
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
    public function deleteAbonnement($id)
    {
        $categorie = Abonement::find($id);
        $categorie->delete();
        return response()->json([
            "status" => true,
            "message" => "Abonnement supprimé avec succes"
        ], 200);
    }

     /**
   * @OA\Get(
   *      path="api/getAbonnement",
   *      operationId="Voir touts les abonnements",
   *      tags={"Abonnement."},
   *      summary="Voir touts les abonnements",
   *      description="Voir touts les abonnements",
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
   * Returns list of abonnement
   */

    public function listAbonnements()
    {
        $abonnement = Abonement::with('categorie')->get();
         // Exemple de texte à traduire
        //  $textToTranslate = "Bonjour";
        
         // Définir la langue cible (par exemple, 'en' pour anglais, 'fr' pour français)
        //  $translatedText = $this->deepLService->translateText($textToTranslate, 'en');
        return response()->json([
            "status" => true,
            "data" => $abonnement,
            // "result"=>$translatedText
           
        ]);
    }

    
     /**
   * @OA\Get(
   *      path="api/seeMyAbonnement",
   *      operationId="Voir touts les abonnements d'utilisateur précis",
   *      tags={"Abonnement."},
   *      summary="Voir touts les abonnements d'utilisateur précis",
   *      description="Voir touts les abonnements d'utilisateur précis (récupération de l'id par le token)",
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
   * Returns list of abonnement
   */
    public function seeAbonnementUser()
    {
        $userId = auth()->user()->id;

    $abonnementUser = AbonementUsers::where('user_id', $userId)
    ->with('user.abonement', 'abonement')
    ->orderBy('created_at', 'desc') 
    ->get();

return response()->json([
    "status" => true,
    "data" => $abonnementUser
], 200);
    }



    /**
   * @OA\Post(
   *     path="api/do_an_abonnement",
   *      tags={"Abonnement."},
   *     summary="Permettre à l utilisateur de faire un abonnement",
   *     description="Permettre à l utilisateur de faire un abonnement (Récupération de l utilisateur par le token)",
   *      @OA\Response(
   *          response=200,
   *          description="successful operation",
   *          @OA\JsonContent(
   *              @OA\Property(property="status", type="boolean", example=true),
   *  @OA\Property(property="data", type="string", example="[{}]"),
   *          ),
   *       ),
   *     @OA\RequestBody(
   *         description="création de catégorie abonnement",
   *         required=true,
   *         @OA\JsonContent(
   *               @OA\Property(property="abonement_id", type="numner", example="2"),
   *            @OA\Property(property="moyen_paiement", type="string", example="orange"),
   *          ),
   * )
   *     )
   * )
   */
    
    public function handleDoAbonnement(Request $request)
    {
        $userId = auth()->id();
        $userAbonnements = AbonementUsers::where('user_id', $userId)->get();
        $currentHour = Carbon::now()->format('H:i:s');

        foreach ($userAbonnements as $abonnement) {
            if (now()->greaterThan($abonnement->echeance)) {
                if ($abonnement->heure_echeance !== $currentHour) {
                    return response()->json([
                        "status" => true,
                        "message" => "Veuillez patienter quelques heures pour un nouvel abonnement."
                    ], 409);
                }
                return $this->doOneAbonnement($request, $userId);
            } else {
                return response()->json([
                    "status" => true,
                    "message" => "Vous avez déjà un abonnement."
                ], 409);
            }
        }

        return $this->doOneAbonnement($request, $userId);
    }

    private function doOneAbonnement($request, $userId)
    {
        $periode = Abonement::findOrFail($request->abonement_id)->periode;
        $addEcheance = now()->addYears($periode);
        $hour = Carbon::now()->format('H:i:s');
        $date = Carbon::now();
        
        $abonnement = AbonementUsers::create([
            "echeance" => $addEcheance,
            "abonement_id" => $request->abonement_id,
            "user_id" => $userId,
            "moyen_paiement" => $request->moyen_paiement,
            "heure_echeance" => $hour,
            "statut" => "PAYER",
            "reference"=>$date->year . strtoupper(Str::random(10)),
        ]);

        return response()->json([
            "status" => true,
            "data" => $abonnement
        ], 200);
    }

     /**
   * @OA\Get(
   *      path="api/handleMyAbonnement",
   *      operationId="Permettre au entreprise de voir les abonnements avec des utilisateurs",
   *      tags={"Abonnement."},
   *      summary="Permettre au entreprise de voir les abonnements avec des utilisateurs",
   *      description="Permettre au entreprise de voir les abonnements avec des utilisateurs ",
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
   * Returns list of abonnement
   */
    
    public function seeAbonnementsUser()
    {
        $allAbonnement = AbonementUsers::with('user', 'abonement')->get();
        return response()->json([
            "status" => true,
            "data" => $allAbonnement
        ], 200);
    }

      /**
   * @OA\Get(
   *      path="api/abonnement_user",
   *      operationId="Permettre au etudiant de voir les abonnements",
   *      tags={"Abonnement."},
   *      summary="Permettre au etudiant de voir les abonnements",
   *      description="Permettre au etudiant de voir les abonnements ",
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
   * Returns list of abonnement
   */
    
    public function userAbonnement()
    {
        $userId = auth()->user()->id;
        $allAbonnement = AbonementUsers::where("user_id", $userId)
         ->where('statut', '!=', 'EN ATTENTE')
        ->with('abonement')
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json([
            "status" => true,
            "data" => $allAbonnement
        ], 200);
    }

}
