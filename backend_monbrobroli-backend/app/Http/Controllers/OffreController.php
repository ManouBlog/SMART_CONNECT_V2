<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Offre;
use App\Models\Affiche;
// use App\Models\OffreStudent;
use App\Models\Categorie;
use App\Models\Competence;
use App\Models\Entreprise;
use App\Models\OffreStudent;
use Illuminate\Http\Request;
use App\Models\AbonementUsers;
use Illuminate\Support\Facades\DB;

class OffreController extends Controller
{

    public function deleteAffiche($id){
        $categorie = Affiche::find($id);
        $categorie->delete();
        return response()->json([
            "status" => true,
            "message" => "Affiche supprimé avec succès"
        ], 200);
    }
/**
 * @OA\Get(
 *     path="/api/showAffiche/'mobile'ou'pc'",
 *     tags={"Affiches"},
 *     summary="Récupère la liste des affiches filtrées par appareil",
 *     description="Retourne les affiches disponibles pour le type d'appareil envoyé (pc ou mobile)",
 *     operationId="getAffichesByAppareil",
 *     @OA\Parameter(
 *         name="appareil",
 *         in="query",
 *         description="Type d'appareil ('pc' ou 'mobile') pour filtrer les affiches",
 *         required=false,
 *         @OA\Schema(
 *             type="string",
 *             example="pc"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Liste des affiches récupérée avec succès",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="boolean", example=true),
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="titre", type="string", example="Affiche de bienvenue"),
 *                     @OA\Property(property="description", type="string", example="Ceci est une affiche test"),
 *                     @OA\Property(property="appareil", type="string", example="pc"),
 *                     @OA\Property(property="created_at", type="string", format="date-time", example="2025-10-03T12:00:00Z"),
 *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-10-03T12:30:00Z")
 *                 )
 *             )
 *         )
 *     )
 * )
 */
     public function showAffiche($appareal){

        $affiches = Affiche::where('appareil',$appareal)->get();
        return response()->json([
        "status" => true,
        "data" => $affiches,
        ], 200);
         
    }

    public function showAllAffiche()
{
    $now = Carbon::now();

     $affichesAll = Affiche::where(function ($query) use ($now) {

        // Cas 1 : pas de date_debut
        $query->whereNull('date_debut')

        // Cas 2 : affiches actives par dates
        ->orWhere(function ($q) use ($now) {
            $q->where('date_debut', '<=', $now)
              ->where(function ($qq) use ($now) {
                  $qq->whereNull('date_fin')
                     ->orWhere('date_fin', '>=', $now);
              });
        });

    })
    ->where('localization',"=","pc")
    ->get();

    // Groupement par company
    $affichesParCompany = $affichesAll->groupBy('company');

    return response()->json([
        "status" => true,
        "data" => $affichesParCompany,
    ], 200);
}


      public function showAllAfficheMobile(){
        $now = Carbon::now();

         $affichesAll = Affiche::where(function ($query) use ($now) {

        // Cas 1 : pas de date_debut
        $query->whereNull('date_debut')

        // Cas 2 : affiches actives par dates
        ->orWhere(function ($q) use ($now) {
            $q->where('date_debut', '<=', $now)
              ->where(function ($qq) use ($now) {
                  $qq->whereNull('date_fin')
                     ->orWhere('date_fin', '>=', $now);
              });
        });

    })
    ->where('localization',"=","mobile")
    ->get();

    //    $affichesAll = Affiche::where('localization',"=","mobile")
    //    ->where('date_debut', '<=', $now)
    //    ->where('date_fin', '>=', $now)
    //    ->get();
         // Groupement par company
         $affichesParCompany = $affichesAll->groupBy('company');

return response()->json([
    "status" => true,
    "data" => $affichesParCompany,
], 200);
    }

      public function showAllAfficheAdmin(){
    
       $affichesAll = Affiche::all();
         // Groupement par company
         $affichesParCompany = $affichesAll->groupBy('company');

       return response()->json([
           "status" => true,
             "data" => $affichesParCompany,
            ], 200);
    }

    // public function addAffiche(Request $request){
       
    //     if ($request->affiches) {
    //         foreach ($request->affiches as $post) {
    //             $affiche = new Affiche();
    //             $newAffiche = $post;
    //             $fileNewAffiche = time() . '.' . $newAffiche->extension();
    //             $newAffiche->storeAs('public/images', $fileNewAffiche);
    //             $affiche->affiche = $fileNewAffiche;
    //             $affiche->lien = $request->lien;
    //             $affiche->mobile_format = $request->mobile_format;
    //             $affiche->date_debut = $request->date_debut;
    //             $affiche->date_fin = $request->date_fin;
    //             $affiche->company = $request->company;
    //             $affiche->localization = $request->localization;
    //             $affiche->appareil = $request->appareil;
    //             $affiche->save();
    //             }
    //             return response()->json([
    //         "status" => true,
    //         "message" => 'Affiche ajoutée.' 
    //         ], 200);
    //     }else{
    //     return response()->json([
    //         "status" => false,
    //         "message" => 'Veuillez ajouter une image' 
    //         ], 400);
    //     }
         
    // }

    public function addAffiche(Request $request)
{
    if ($request->affiches) {

        foreach ($request->affiches as $index => $file) {

            $affiche = new Affiche();

            // Fichier
            $filename = time() . '_' . uniqid() . '.' . $file->extension();
            $file->storeAs('public/images', $filename);
            $affiche->affiche = $filename;

            // 🔑 Données liées PAR INDEX
            $affiche->lien = $request->lien[$index] ?? null;
            $affiche->mobile_format = $request->mobile_format[$index] ?? null;

            // Données globales (une seule valeur)
            $affiche->date_debut = $request->date_debut;
            $affiche->date_fin = $request->date_fin;
            $affiche->company = $request->company;
            $affiche->localization = $request->localization;
            $affiche->appareil = $request->appareil;

            $affiche->save();
        }

        return response()->json([
            "status" => true,
            "message" => "Affiche ajoutée."
        ], 200);

    }

    return response()->json([
        "status" => false,
        "message" => "Veuillez ajouter une image"
    ], 400);
}


    public function checkUserAbonnement($userId)
    {
        return AbonementUsers::where('user_id', $userId)
            ->where('statut', 'success')
            ->with('user.student.competences')
            ->first();
    }

    public function showListOffresForAdmin(){
        $offres = Offre::with("entreprise", "categorie", "students", "favoris")
        ->orderByDesc('created_at')
        ->get();
        return response()->json([
            "status" => true,
            "data" => $offres
            ], 200);
    }
   
    public function showListOffresStandard()
    {
        $offres = Offre::where('fin', '>=', now()->format('Y-m-d H:i:s'))
        ->with("entreprise", "categorie", "students", "favoris")
        ->orderByDesc('created_at')
        ->get();
        return response()->json([
            "status" => true,
            "data" => $offres
            ], 200);
    }
    public function showListOffresPremiun()
    {
        $userInfo = $this->checkUserAbonnement(auth()->user()->id);
$competenceUser = $userInfo->user->student->competences[0]->competence;
 
// Récupérer toutes les offres avec leurs relations
$offres = Offre::where('fin', '>=', now()->format('Y-m-d H:i:s'))
            ->with("entreprise", "categorie", "students", "favoris")
            ->orderByDesc('created_at')
            ->get();
           

// Trier les offres en fonction de la compétence de l'utilisateur
$offresTriees = $offres->sortByDesc(function($offre) use ($competenceUser) {
    
    return strtolower($offre->nom_offre) === strtolower($competenceUser) ? 1 : 0;

});

return response()->json([
    "status" => true,
    "data" => $offresTriees->values() // values() pour réinitialiser les clés
], 200);
    }
     /**
     * @OA\Get(
     *      path="api/list_offres",
     *      operationId="Voir les offres.",
     *      tags={"Offres."},
     *      summary="Voir les offres",
     *      description="Retourne la liste des offres.",
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
    public function list_offres()
    {
    

        $userWithStatut = User::where("statut_id",auth()->user()->statut_id)
        ->with('statut')
        ->first();
       
        if($userWithStatut->statut->statut !== 'admin'){
       if(auth()->check()){
        $userInfo = $this->checkUserAbonnement(auth()->user()->id);
        if($userInfo && $userInfo->abonement_id === 4){
            return $this->showListOffresPremiun();
           }else{
               return $this->showListOffresStandard();
           }
      }else{
        return $this->showListOffresStandard();
      }
        }else{
            return $this->showListOffresForAdmin();
        }
          
    }

    public function filterListOffresStandard($searchParams)
    {
    // Requête de base
    $query = Offre::where('fin', '>=', now()->format('Y-m-d H:i:s'))
                ->with("entreprise", "categorie", "students", "favoris");
    
    // Appliquer les filtres de recherche
    if (!empty($searchParams['nom_offre'])) {
        $query->where('nom_offre', 'like', '%'.$searchParams['nom_offre'].'%');
    }
    
    if (!empty($searchParams['lieu'])) {
        $query->where('lieu', 'like', '%'.$searchParams['lieu'].'%');
    }
    
    if (!empty($searchParams['categorie']) && is_array($searchParams['categorie'])) {
        $query->whereHas('categorie', function($q) use ($searchParams) {
            $q->whereIn('categorie_offre_id', $searchParams['categorie']);
        });
    }
    
    // Exécuter la requête
    $offres = $query->orderByDesc('created_at')->get();
    
    return response()->json([
        "status" => true,
        "data" => $offres
    ], 200);
    }

    public function filterListOffresPremiun($searchParams)
    {

        // Requête de base
        $query = Offre::where('fin', '>=', now()->format('Y-m-d H:i:s'))
            ->with([
                'entreprise.user.abonement',
                'categorie',
                'students',
                'favoris'
            ]);
        
        // Appliquer les filtres de recherche
        if (!empty($searchParams['nom_offre'])) {
            $query->where('nom_offre', 'like', '%'.$searchParams['nom_offre'].'%');
        }
        
        if (!empty($searchParams['lieu'])) {
            $query->where('lieu', 'like', '%'.$searchParams['lieu'].'%');
        }
        
        if (!empty($searchParams['categorie']) && is_array($searchParams['categorie'])) {
            $query->whereHas('categorie', function($q) use ($searchParams) {
                $q->whereIn('categorie_offre_id', $searchParams['categorie']);
            });
        }
        
        // Exécuter la requête
        $offres = $query->orderByDesc('created_at')->get();
        
        // Ajouter is_premium sur chaque offre
        $offres->each(function ($item) {
            $item->is_premium = optional($item->entreprise->user->abonement)
                ->contains(fn($abonement) => $abonement->statut === "ACCEPTED");
        });
        
        // Trier par is_premium
        $offresTriees = $offres->sortByDesc('is_premium')->values();
        
        // Retourner la réponse
        return response()->json([
            "status" => true,
            "data" => $offresTriees
        ], 200);
    }

    /**
 * @OA\Post(
 *     path="/api/search_offres",
 *     tags={"Offres."},
 *     summary="Recherche sur les offres",
 *     description="Recherche avancée sur les offres par nom, lieu et catégories",
 *     @OA\RequestBody(
 *         description="Paramètres de recherche",
 *         required=true,
 *         @OA\JsonContent(
 *             required={"nom_offre", "lieu", "categorie"},
 *             @OA\Property(property="nom_offre", type="string", example="Serveur en restaurant"),
 *             @OA\Property(property="lieu", type="string", example="Paris"),
 *             @OA\Property(
 *                 property="categorie",
 *                 type="array",
 *                 @OA\Items(type="string", example="restauration")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Opération réussie",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="boolean", example=true),
 *             @OA\Property(property="data", type="object")
 *         )
 *     )
 * )
 */


    public function searchInOffers(Request $request){
            // Récupérer les paramètres de recherche
    $searchParams = $request->only(['categorie', 'nom_offre', 'lieu']);
        if(auth()->check()){
            $userInfo = $this->checkUserAbonnement(auth()->user()->id);
            if($userInfo && $userInfo->abonement_id === 4){
                return $this->filterListOffresPremiun($searchParams);
               }else{
                   return $this->filterListOffresStandard($searchParams);
               }
          }else{
            return $this->filterListOffresStandard($searchParams);
          }  
    }


    public function getStudentRecruit()
    {
        $userId = auth()->user();

         if($userId->statut_id === 1 || $userId->statut_id === 4){
 $entrepriseId = Entreprise::where("user_id", "=", $userId->id)->first()->id;

   $offres = OffreStudent::with(['offre','student.user.photos','student.etoiles'])
    ->whereHas('offre', function ($query) use ($entrepriseId) {
        $query->where('entreprise_id', $entrepriseId);
    })
    ->where('recruit',1)
    ->get()
    ->groupBy(function ($item) {
        return $item->offre->nom_offre;
    });

return $offres;
    }else{
      return;
    }
        // $entrepriseId = Entreprise::where("user_id", "=", $userId)->first()->id;
        // $offres =  
        // return DB::table('offre_students')
        // ->join('students', 'students.id','=','offre_students.student_id')
        // ->join('offres', 'offres.id', '=', 'offre_students.offre_id')
        // ->select(
        //   'students.*',
        //   'offre_students.*',
        //   'offres.*'
        // )
        // ->where('offres.entreprise_id',$entrepriseId)
        // ->where('offre_students.recruit',1)
        // ->get();
    }
/**
     * @OA\Get(
     *      path="api/detail_offre/{id}",
     *      operationId="Voir les détails de l' offre..",
     *      tags={"Offres."},
     *      summary="Voir les détails de l' offre.",
     *      description="Retourne les infos de l' offre.",
       *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Id de l'offre.",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *              @OA\Property(property="data", type="object"),
     *          ),
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *     )
     *
     * Returns list of projects
     */
    public function detail_offre($id){
        $offres = Offre::where("id",$id)->with("offre_student","entreprise","categorie","students")->first();
        return response()->json([
            "status" => true,
            "data" => $offres
        ], 200);
    }

     /**
     * @OA\Get(
     *      path="api/seeCategorie",
     *      operationId="Voir les catégories d'offre.",
     *      tags={"Offres."},
     *      summary="Voir les catégories d'offre",
     *      description="Retourne la liste des catégories d'offre.",
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
   public function seeCategorie(){
    $categorie = Categorie::all();
    return response()->json([
        "status" => true,
        "data" => $categorie
    ], 200);
   }

     /**
     * @OA\Post(
     *     path="api/categorie",
     *      tags={"Offres."},
     *     summary="Route pour la création d'une categorie",
     *     description="Route pour la création d'une categorie",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Catégorie crée avec succès"),
     *          ),
     *       ),
     *         @OA\Response(
     *          response=409,
     *          description="Info",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=false),
     *  @OA\Property(property="message", type="string", example="La catégorie existe déjà."),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         description="Create user object",
     *         required=true,
     *         @OA\JsonContent(
     *         @OA\Property(property="categorie", type="string", example="informatique"),
     *          ),)
     *     )
     * )
     */

   public function create_categorie(Request $request){
    {

        $listCategorie = Categorie::all();

        foreach ($listCategorie as $cat) {

            if ($cat->categorie == $request->categorie) {
                return response()->json([
                    "status" => false,
                    "message" => "Le domaine existe déjà.",
                ],409);
            }
        }
        $categorie = new Categorie();
        $categorie->categorie = $request->categorie;

        $categorie->save();
        return response()->json([
            "status" => true,
            "message" => "Domaine crée avec succès",
             "data"=>$categorie
        ],200);
    }
   }

   /**
     *
     * @OA\Put(
     *     path="api/admin/update_categorie/{id}",
     *     tags={"Categories."},
     *     operationId="Update la catégorie",
     *     summary="Update la catégorie.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Id de la categorie.",
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
     *               @OA\Property(property="categorie", type="string", example="Etudiant"),
     *          ),
     * )
     * )
     */

    public function update_categorie(Request $request,$id)
  {
    $categorie = Categorie::where('id',$id)->first();

    $categorie->categorie = !empty($request->categorie) ? $request->categorie:$categorie->categorie;
    $categorie->save();

    return response()->json([
      "status" => true,
      "message" => "Domaine modifié.",
      "data" => $categorie
    ]);
  }

    
    public function delete_my_categorie($id)
    {
        $categorie = Categorie::where("id", $id)->first();
    $competence = Competence::all();
    if($competence->contains('categorie_id', $categorie->id)){
      return response()->json([
      "status" => true,
      "message" => "Il existe un poste associé à ce domaine."
    ], 200);
    }else{
     $categorie->delete();
    return response()->json([
      "status" => true,
      "message" => "Domaine supprimée."
    ], 200);
    }
    }
}
