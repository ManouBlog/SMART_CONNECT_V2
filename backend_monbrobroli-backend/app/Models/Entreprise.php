<?php

namespace App\Models;

use App\Models\User;
use App\Models\Offre;
use App\Models\EmailCc;
use App\Models\Entreprise_Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Entreprise extends Model
{
    use HasFactory,Notifiable;
    protected $table = "entreprises";
    protected $hidden = ['password'];
    protected $fillable = ['nom_entreprise', 'registre_commerce','forme_juridique','registre','logo','NCC','particulier_prenoms'];
    public function offre()
    {
        return $this->hasMany(Offre::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, "entreprise_student", "entreprises_id", "student_id")
        ->withPivot('created_at','date_debut','date_fin','contrat','date','offre_id','alarm');
    }
    public function wishlists()
    {
        return $this->belongsToMany(Student::class, "wishlists","entreprises_id", "student_id")
        ->withPivot('created_at');
    }
    public function entreprise_student()
    {
        return $this->hasOne(Entreprise_Student::class,'entreprises_id');
    }

     public function emails()
    {
        return $this->hasMany(EmailCC::class,'entreprises_id');
    }

    
}
