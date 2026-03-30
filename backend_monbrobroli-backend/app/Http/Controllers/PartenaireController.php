<?php

namespace App\Http\Controllers;

use App\Models\Partenaire;
use Illuminate\Http\Request;

class PartenaireController extends Controller
{

    public function deletePartenaire($id){
        $partenaire = Partenaire::find($id);
        $partenaire->delete();
        return response()->json([
            "status" => true,
            "message" => "Partenaire supprimé avec succès"
        ], 200);
    }

     public function showAllPartenaires(){
       
        return response()->json([
            "status" => false,
            "data" =>  Partenaire::all(),
            ], 200);
         
    }
    public function addPartenaire(Request $request){
       
        if ($request->hasFile('partenaire')) {
            foreach ($request->partenaire as $post) {
                $partenaire = new Partenaire();
                $newPartenaire = $post;
                $fileNewPartenaire = $post->hashName();
                $newPartenaire->storeAs('public/images', $fileNewPartenaire);
                $partenaire->partenaire = $fileNewPartenaire;
                $partenaire->save();
                }
                return response()->json([
            "status" => true,
            "message" => 'Partenaire ajouté.' 
            ], 200);
        }else{
        return response()->json([
            "status" => false,
            "message" => 'Veuillez ajouter une image' 
            ], 400);
        }
         
    }
}
