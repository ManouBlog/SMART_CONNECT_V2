<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class acquisStudent extends Model
{
    use HasFactory;
    protected $fillable = ['acquis_id','student_id'];
}
