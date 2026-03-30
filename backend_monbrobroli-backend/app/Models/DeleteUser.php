<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeleteUser extends Model
{
    use HasFactory;

    // Table associée
    protected $table = 'delete_users';

    // Les champs remplissables
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'reason'
    ];
}
