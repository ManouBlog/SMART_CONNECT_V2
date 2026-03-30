<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise_categorie extends Model
{
    use HasFactory;
    protected $fillable =["entreprises_id","categorie_id"];
}
