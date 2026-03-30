<?php

namespace App\Models;

use App\Models\User;
use App\Models\AbonementUsers;
use App\Models\abonnementCategorie;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Abonement extends Model
{
    use HasFactory;
    protected $table = 'abonement';
    protected $fillable = ['libelle', 'prix', 'periode','categorie_id','description'];
    

    public function setLibelleAttribute($value)
    {
        $this->attributes['libelle'] = strtoupper($value);
    }

    public function setPrixAttribute($value)
    {
        if (preg_match('/^\d+$/', $value)) {
            $this->attributes['prix'] = $value;
        } else {
            throw new \InvalidArgumentException('Le prix doit contenir uniquement des chiffres.');
        }
    }

    public function categorie()
    {
        return $this->belongsTo(abonnementCategorie::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function abonementUsers()
    {
        return $this->belongsTo(AbonementUsers::class);
    }
}
