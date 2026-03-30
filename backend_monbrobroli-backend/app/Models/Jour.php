<?php

namespace App\Models;

use App\Models\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Jour extends Model
{
    use HasFactory;
    protected $table = "jours";
    
    protected $fillable = ['First_horaire', 'Second_horaire', 'jour','students_id','totalHour'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
