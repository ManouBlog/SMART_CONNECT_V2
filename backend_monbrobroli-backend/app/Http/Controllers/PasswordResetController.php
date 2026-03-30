<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;


class PasswordResetController extends Controller
{

    /**
     * Create token password reset
     *
     * @param  [string] email
     * @return [string] message
     */

    /**
     * @OA\Post(
     *     path="api/password/createNewPassword",
     *      tags={"Email."},
     *     summary="Route pour la réinitialisation du mot de passe.",
     *     description="Route pour la réinitialisation du mot de passe.",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Nous vous avons envoyé un email de bienvenue.."),
     *          ),
     *       ),
     *         @OA\Response(
     *          response=409,
     *          description="Info",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *  @OA\Property(property="message", type="string", example="Votre email a déjà été pris en compte"),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         description="Create user object",
     *         required=true,
     *         @OA\JsonContent(
     *         @OA\Property(property="email", type="string", example="adjobi@gmail.com"),
     *      @OA\Property(property="mobile", type="int", example="1"),
     *          ),)
     *     )
     * )
     */

    public function create(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);
        $user = User::where('email', $request->email)->first();
        
       
        if (!$user) {
            return response()->json([
                'message' => "L'email n'existe pas.",
                'status' => false
            ], 404);
        }
        
        $token = Str::random(60);
        $passwordReset = new PasswordReset();
        $passwordReset->email = $user->email;
        $passwordReset->token = $token;

        $passwordReset->save();

        if ($user && $passwordReset) {
            $code = !empty($request->mobile) ? Str::random(10):null;
            $user->password = !empty($code) ? $code:$user->password;
            $user->save();
            $user->notify(
                new PasswordResetRequest($passwordReset->token,$code,$request->email)
            );
            return response()->json([
                'message' => 'Nous vous avons envoyé un lien de modification!,Vérifier souvent dans vos spans.',
                'status' => true
            ]);
        }
    }

    public function find($token)
    {
        $passwordReset = PasswordReset::where('token', $token)->first();
        if (!$passwordReset) {
            return response()->json([
                'message' => "This password token is invalid."
            ], 404);
        }
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'message' => 'This password reset token is invalid.'
            ], 404);
        }
        return response()->json($passwordReset);
    }

    /**
     * @OA\Post(
     *     path="api/password/reset",
     *      tags={"Email."},
     *     summary="Route pour changer le mot de passe",
     *     description="Route pour changer le mot de passe",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example=true),
     *          ),
     *       ),
     *     @OA\RequestBody(
     *         description="Create user object",
     *         required=true,
     *         @OA\JsonContent(
     *         @OA\Property(property="email", type="string", example="adjobi@gmail.com"),
     *      @OA\Property(property="password", type="string", example="*****"),
     * @OA\Property(property="token", type="string", example="*****"),
     *          ),)
     *     )
     * )
     */
    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required',
            'token' => 'required|string',
            // "oldPassword" => 'required'
        ]);
        $passwordReset = PasswordReset::where([
            ['token', $request->token],
            ['email', $request->email]
        ])->first();
        if (!$passwordReset) {
            return response()->json([
                'message' => 'le jeton est invalide.'
            ], 404);
        }
        $user = User::where('email', $passwordReset->email)->firstOrfail();
        // return $user;
        // $verificationOldPassword = Hash::check($user->password, $request->password);
        // if (!$verificationOldPassword) {
        //     return response()->json([
        //         'message' => "Mot de passe incorrect."
        //     ], 404);
        // }
        $user->password = $request->password;
        $user->save();
        $user->notify(new PasswordResetSuccess($passwordReset));
        $passwordReset->delete();
        return response()->json([
            "status" => true,
            "data" => $user

        ]);
    }
}
