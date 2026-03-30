<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etoile extends Model
{
    use HasFactory;
    protected $table = "etoiles";
    protected $fillable = ['notes', 'avis',];
    public function students()
    {
        return $this->belongsTo(Student::class);
    }
    public function offre()
    {
        return $this->belongsTo(Offre::class);
    }
}
