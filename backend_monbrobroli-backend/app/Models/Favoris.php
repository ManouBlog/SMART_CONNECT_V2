<?php

namespace App\Models;
use App\Models\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Favoris extends Model
{
    use HasFactory,HasUuids;
    protected $table = "favoris";
    protected $fillable = ['student_id','offre_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    public function offre(){
        return $this->belongsTo(Offre::class,'offre_id');
    }
}
