<?php

namespace App\Models;

use App\Models\Etoile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Offre extends Model
{
    use HasFactory,Notifiable;
    protected $table = "offres";
    protected $fillable = ['nom_offre','salaire','description','lieu','debut','fin'];

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, "categorie_offre_id");
    }
    public function students()
    {
        return $this->belongsToMany(Offre::class,"offre_students", "offre_id", "student_id")
        ->withPivot('created_at','recruit','certificat');
    }
    public function etoile()
    {
        return $this->hasOne(Etoile::class);
    }
    public function offre_student()
    {
        return $this->hasMany(OffreStudent::class);
    }

    public function favoris(){
        return $this->hasMany(Favoris::class,'offre_id');
    }

     public function entreprise_student()
    {
        return $this->hasOne(Entreprise_Student::class,'offre_id');
    }

}
