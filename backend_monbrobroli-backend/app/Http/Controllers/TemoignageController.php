<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Entreprise;
use App\Models\Temoignage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TemoignageController extends Controller
{
    /**
 * @OA\Post(
 *     path="/api/temoignages",
 *     summary="Ajouter un nouveau témoignage",
 *     description="Cette route permet à un utilisateur authentifié d'ajouter un témoignage avec une note et un commentaire.",
 *     tags={"Témoignages"},
 *     security={{"sanctum": {}}}, 
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"rate","comment"},
 *             @OA\Property(property="rate", type="integer", minimum=1, maximum=5, example=5, description="Note de l'utilisateur (1 à 5)"),
 *             @OA\Property(property="comment", type="string", maxLength=1000, example="Super expérience !", description="Commentaire du témoignage")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Témoignage créé avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Témoignage ajouté avec succès !"),
 *             @OA\Property(property="temoignage", type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="rate", type="integer", example=5),
 *                 @OA\Property(property="comment", type="string", example="Super expérience !"),
 *                 @OA\Property(property="user_id", type="integer", example=3),
 *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-10-13T15:00:00Z"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-10-13T15:00:00Z")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Erreur de validation",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="The given data was invalid."),
 *             @OA\Property(property="errors", type="object",
 *                 @OA\Property(property="rate", type="array", @OA\Items(type="string"), example={"The rate field is required."}),
 *                 @OA\Property(property="comment", type="array", @OA\Items(type="string"), example={"The comment field is required."})
 *             )
 *         )
 *     )
 * )
 */
    public function store(Request $request)
    {
        // Valide les données
        $validated = $request->validate([
            'rate' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $validated['user_id'] = Auth::id();

        // Crée le témoignage
        $temoignage = Temoignage::create($validated);

        return response()->json([
            'message' => 'Témoignage ajouté avec succès !',
            'temoignage' => $temoignage,
        ], 201);
    }

      public function listerCommentaires()
    {

        // Récupère tous les témoignages
        // $temoignages = Temoignage::with('user.statut')->get();
        $temoignages = Temoignage::with('user.statut')
        ->where('rate',5)
        ->get();
        $students = Student::all();
        $entrprise = Entreprise::all();

    foreach ($temoignages as $temoignage) {
        if($temoignage->user->statut->statut === 'entreprise' || $temoignage->user->statut->statut === 'particulier' ){
             foreach($entrprise as $item){
        if($item->user_id === $temoignage->user->id){
        $temoignage['student'] = $item;
        }
    }
        }
        if($temoignage->user->statut->statut === 'etudiant'){
       foreach($students as $item){
        if($item->user_id === $temoignage->user->id){
        $temoignage['student'] = $item;
        }
        }
        }    
}
        return response()->json($temoignages);
    }

    public function allTemoignages(){
        $temoignages = Temoignage::with('user.statut')->get();
        return response()->json($temoignages);
    }
}
