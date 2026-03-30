<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreStatus extends Model
{
    use HasFactory;
    protected $table = 'offre_status';

    protected $fillable = [
        'offre_id',
        'status_id',
    ];
}
