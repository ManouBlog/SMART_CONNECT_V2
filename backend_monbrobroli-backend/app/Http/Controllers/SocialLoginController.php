<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    // methode à lancer dans votre page front-end avec mounted or load
    // ceci va récupérer la route que tu vas mettre dans un lien "eg:vuejs"
    // <a :href="">Google</a> lorsque il clique dessus cela le redirige.
    public function googleLoginUrl(){
        return response()->json([
            "url" => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ], 200);
    }

    //methode pour recuperer les infos de l utilisateur
    // lorqu'il est redirigé vers l url de return
   
    public function googleLoginCallBack(){
     $googleUser = Socialite::driver('google')->stateless()->user();

     $user = User::where('email',$googleUser->getEmail())->first();
     if(!$user){
        $user=User::create([
            'name'=> $googleUser->getName(),
            'email'=> $googleUser->getEmail(),
            'google_id'=> $googleUser->getId(),
            'password'=> bcrypt(Str::random(16))
        ]);
     }
     $token = $user->createToken('authToken')->plainTextToken;
     return response()->json(
        [
        'user'=>$user,
        'token'=>$token
        ]
     );
    }
}
