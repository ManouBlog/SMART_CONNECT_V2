<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Permission;
use Illuminate\Http\Request;
use App\Models\UserPermission;

class PermissionController extends Controller
{
    public function listerPermission(){
        $allPermissions = Permission::all();
        return response()->json([
            "status" => true,
            "data" => $allPermissions
        ], 200);
    }

     public function GivePermission(Request $request,$id){
     UserPermission::where('user_id',$id)->delete();
       if($request->permissions){
        foreach ($request->permissions as $perm) {
            $newPermission = new UserPermission();
            $permissionObjet = json_decode($perm);
            $newPermission->user_id  = $id;
            $newPermission->permission_id = $permissionObjet->permission_id;
            $newPermission->save();
        }
    }
     $user = User::find($id);
    if ($user) {
        $user->tokens()->delete();
    }
        return response()->json([
            "status" => true,
            "message" =>  'Droits d’accès mis à jour' 
        ], 200);
    }
}
