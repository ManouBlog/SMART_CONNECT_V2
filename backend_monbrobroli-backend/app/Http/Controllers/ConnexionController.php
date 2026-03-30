<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Models\CompetenceStudent;
use Illuminate\Support\Facades\Hash;

class ConnexionController extends Controller
{
    public function inscription(Request $request)
    {
        // $request->validate([
        //     "nom" => 'required',
        //     "email" => "required|unique:users",
        //     "ville" => "required",
        //     "quartier" => "required",
        //     "commune" => "required",
        //     "diplome" => "required",
        //     "phone" => "required",
        //     "password" => "required",
        //     "photo" => "required|mimes:jpg,jpeg,png,pdf"
        // ]);
        if (!$request->email || !$request->nom || !$request->statut_id) {
            return response()->json([
                "status" => true,
                "message" => "Veuillez-renseigner tous les champs",
            ]);
        }
        $messageSuccess = "Enregistrer avec succès";
        $user = new User();
        $user->nom = $request->nom;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->statut_id = $request->statut_id;

        $user->save();


        $student = new Student();
        $image = $request->file('photo');
        $ext = $image->extension();
        $file = time() . '.' . $ext;
        $image->storeAs('public/images', $file);

        $student->nom = $request->nom;
        $student->prenoms = $request->prenoms;
        $student->email = $request->email;
        $student->ville = $request->ville;
        $student->quartier = $request->quartier;
        $student->phone = $request->phone;
        $student->commune = $request->commune;
        $student->diplome = $request->diplome;
        $student->password = Hash::make($request->password);
        $student->user_id = $user->id;
        $student->photo = $file;
        $student->save();

        $myCompetences = $request->competence;

        if ($myCompetences) {
            foreach ($myCompetences as $item) {
                $studentCompetence = new CompetenceStudent();
                $studentCompetence->competence_id = $item;
                $studentCompetence->student_id = $student->id;
                $studentCompetence->save();
            }
        }

        return response()->json([
            "status" => true,
            "message" => $messageSuccess,
            "data" => $student
        ]);
    }
}
