<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referral extends Model
{
     use HasFactory;

    // Table associée
    protected $table = 'referrals';

    // Les champs remplissables
    protected $fillable = [
        'ambassador_id',
        'referred_id',
        'subscription_paid',
        'commission_paid',
    ];

    /**
     * L'ambassadeur (celui qui a partagé le code)
     */
    public function ambassador()
    {
        return $this->belongsTo(User::class, 'ambassador_id');
    }

    /**
     * Le filleul (nouvel utilisateur)
     */
    public function referred()
    {
        return $this->belongsTo(User::class, 'referred_id');
    }
}
