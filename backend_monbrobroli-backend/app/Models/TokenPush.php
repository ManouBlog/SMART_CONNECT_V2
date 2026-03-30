<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenPush extends Model
{
    use HasFactory;

    protected $table = 'token_pushes';

   
    protected $fillable = [
        'user_id',
        'token_push',
        'appareil',
    ];
    
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
