<?php

namespace App\Models;

use App\Models\Abonement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class abonnementCategorie extends Model
{
    use HasFactory;
    protected $table = 'abonnement_categories';
    protected $fillable = ['categorie'];

    public function setCategorieAttribute($value)
    {
        $this->attributes['categorie'] = ucwords(strtolower($value));
    }
    public function abonement()
    {
        return $this->hasOne(Abonement::class);
    }
}
