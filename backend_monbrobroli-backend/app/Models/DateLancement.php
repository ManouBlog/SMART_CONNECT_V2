<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DateLancement extends Model
{
    use HasFactory;
    protected $table = 'date_lancement';

    protected $fillable = ['date'];
}
