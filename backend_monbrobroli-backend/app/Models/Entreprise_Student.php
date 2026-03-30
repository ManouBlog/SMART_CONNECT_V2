<?php

namespace App\Models;

use App\Models\Offre;
use App\Models\Student;
// use App\Models\Entreprise;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Entreprise_Student extends Model
{
    use HasFactory;

    protected $table = "entreprise_student";

    protected $fillable =["entreprises_id","student_id","date","contrat","date_debut","date_fin","offre_id","alarm"];
    
     public function offre()
    {
        return $this->belongsTo(Offre::class);
    }
     public function student()
    {
        return $this->belongsTo(Student::class);
    }
    //  public function entreprise()
    // {
    //     return $this->belongsTo(Entreprise::class,'id');
    // }
}
