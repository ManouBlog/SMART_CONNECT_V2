<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetenceStudent extends Model
{
    use HasFactory;
    protected $table ='competence_students'; 
    protected $fillable = ['competence_id','student_id'];
}
