<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acquis extends Model
{
    use HasFactory;
    protected $table = "acquis";
    protected $fillable = ['competence'];

    public function acquis()
    {
        return $this->belongsToMany(Competence::class,"acquis_students","acquis_id","student_id")->withPivot('created_at');
    }
}
