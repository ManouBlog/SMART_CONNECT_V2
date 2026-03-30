<?php

namespace App\Models;

use App\Models\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OffreStudent extends Model
{
    use HasFactory;
    protected $table = "offre_students";
    protected $fillable = ['recruit','student_id','offre_id'];

    public function offre()
    {
        return $this->belongsTo(Offre::class);
    }
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
