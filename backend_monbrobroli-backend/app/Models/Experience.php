<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;
    protected $table = "experiences";
    protected $fillable = ['experience','poste','entreprise','lieu','dateDebut','dateFin'];
    public function students()
    {
        return $this->belongsTo(Student::class);
    }
}
