<?php

namespace App\Models;

use App\Models\Entreprise;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class EmailCc extends Model
{
    use HasFactory,Notifiable;
      protected $table = 'email_cc';

    protected $fillable = [
        'entreprises_id',
        'email',
    ];

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class,'entreprises_id');
    }
}
