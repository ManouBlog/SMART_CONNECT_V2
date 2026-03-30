<?php

namespace App\Models;

use App\Models\Jour;
use App\Models\Favoris;
use App\Models\Entreprise;
use App\Models\OffreStudent;
use App\Models\Entreprise_Student;
// use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory, Notifiable;
    protected $table = "students";
    protected $hidden = ['password'];

    protected $fillable = [
        'nom',
        'prenoms', 'email', 'ville',
        'quartier', 'diplome', 'commune',
        'phone', 'competence',
        'detail','photo', 'user_id','password',
        'matricule','photo_profil','titreCv','view'
    ];

    public static function boot()
    {
        parent::boot();

        // Création du matricule avant la sauvegarde
        static::creating(function ($etudiant) {
            $etudiant->matricule = Student::genererMatricule();
        });
    }

    public static function genererMatricule()
    {
        $year = date('Y');
        $lastId = self::max('id') + 1;  // Obtenir l'ID suivant
        return 'ETD' . $year . str_pad($lastId, 4, '0', STR_PAD_LEFT);
    }
    public function jours()
    {
        return $this->hasMany(Jour::class);
    }
    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function entreprises()
    {
        return $this->belongsToMany(Entreprise::class, "entreprise_student", "student_id", "entreprises_id")
            ->withPivot(
                'created_at',
                'date_debut',
                'date_fin',
                'contrat',
                'id',
                'date',
                'offre_id',
                'alarm'
            );
    }
    public function offres()
    {
        return $this->belongsToMany(Offre::class, "offre_students", "student_id", "offre_id")
            ->withPivot('created_at','recruit','certificat');
    }
    public function competences()
    {
        return $this->belongsToMany(Competence::class, "competence_students", "student_id", "competence_id")
            ->withPivot('created_at');
    }
    public function etoiles()
    {
        return $this->hasMany(Etoile::class);
    }
    public function favoris()
    {
        return $this->hasMany(Favoris::class);
    }
    public function offre_student()
    {
        return $this->hasOne(OffreStudent::class);
    }
     public function entreprise_student()
    {
        return $this->hasOne(Entreprise_Student::class,'student_id');
    }

      public function qualifications()
    {
        return $this->hasMany(Qualification::class);
    }
      public function notifications()
    {
        return $this->hasMany(EntrepriseStudentNotification::class, 'etudiant_id');
    }
}
