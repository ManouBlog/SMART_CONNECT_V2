<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Entreprise;
use Illuminate\Http\Request;


class WishlistController extends Controller
{
    function create(Request $request)
    {
        $user_id = auth()->user()->id;
        $entreprise_id = Entreprise::where("user_id", "=", $user_id)->first()->id;
        $listWishlist = Entreprise::with("wishlists")->where("id", $entreprise_id)->first();

        $request->validate([
            "student_id" => "required",
        ]);

        $listEntrepriseWishlist = $listWishlist->wishlists;
        foreach ($listEntrepriseWishlist as $list) {
            if ($list->id === $request->student_id) {
                Wishlist::where("student_id", $request->student_id)->delete();
                return response()->json([
                    "status" => false
                ]);
            }
        }
        $personInMyWishlist = new Wishlist();
        $personInMyWishlist->entreprises_id = $entreprise_id;
        $personInMyWishlist->student_id = $request->student_id;
        $personInMyWishlist->save();
        return response()->json([
            "status" => true,
            "message" => "Enregistré",
        ]);
    }
    function showPersonInMyWishlist()
    {
        $user_id = auth()->user();
          if($user_id->statut_id === 1 || $user_id->statut_id === 4){
 $entreprise_id = Entreprise::where("user_id", "=", $user_id->id)->first()->id;
        $listWishlist = Entreprise::with("wishlists")->where("id", $entreprise_id)->first();
        
        return response()->json([
            "status" => true,
            "data" => $listWishlist
        ]);
          }else{
            return;
          }
       
    }
    function deletePersonInMyWishlist($id)
    {
        $person = Wishlist::where("student_id", $id)->first();
        $person->delete();
        return response()->json([
            "status" => true,
            "message" => "Donnée Supprimée de votre wishlist."
        ]);
    }
}
