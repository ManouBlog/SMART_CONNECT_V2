<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wishlist extends Model
{
    use HasFactory;
    protected $table = "wishlists";
    protected $fillable = ['student_id','entreprise_id'];
   
    
}
