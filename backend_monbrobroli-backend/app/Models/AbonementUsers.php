<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Abonement;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class AbonementUsers extends Model
{
    use HasFactory,Notifiable;
    
    protected $table = 'abonement_users';
    protected $fillable = ['echeance', 'moyen_paiement','mode_payment','statut','user_id','abonement_id','heure_echeance','transaction_id','montant','status_user'];
    // public function getCreated_atAttribute($value)
    // {
    //     // Utilise Carbon pour convertir la date et ne garder que la partie 'Y-m-d'
    //     $this->attributes['created_at'] = Carbon::parse($value)->format('Y-m-d');
    // }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function abonement()
    {
        return $this->belongsTo(Abonement::class);
    }
    public function routeNotificationForMail()
    {
        return $this->user->email; // Suppose que vous avez une relation 'user'
    }
}
