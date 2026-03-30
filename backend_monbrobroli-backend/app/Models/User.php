<?php

namespace App\Models;

use App\Models\Photos;
use App\Models\Status;
use App\Models\Student;
use App\Models\Entreprise;
use App\Models\Permission;
use App\Models\AbonementUsers;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Model
{
    use HasFactory, HasApiTokens, Notifiable, Authenticatable,SoftDeletes;

    protected $table = "users";
    protected $hidden = ['password'];
     protected $dates = ['deleted_at'];
    protected $fillable = ['email', 'password', 'nom', 'statut_id'];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function photos()
    {
        return $this->hasMany(Photos::class);
    }

    public function student()
    {
        return $this->hasOne(Student::class);
    }

    public function abonement()
    {
        return $this->hasMany(AbonementUsers::class);
    }

    public function abonements()
    {
        return $this->hasMany(Abonement::class);
    }

    public function temoinages()
    {
        return $this->hasMany(Temoignage::class);
    }

    public function entreprise()
    {
        return $this->hasOne(Entreprise::class);
    }
    public function statut()
    {

        return $this->belongsTo(Status::class);
    }

     public function notifications()
    {
        return $this->hasMany(EntrepriseStudentNotification::class, 'entreprise_id');
    }
  public function tokenPushes()
    {
        return $this->hasMany(TokenPush::class);
    }

    public function permissions()
{
    return $this->belongsToMany(Permission::class,'user_permission','user_id','permission_id');
}
   
}
