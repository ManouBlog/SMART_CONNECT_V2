<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntrepriseStudentNotification extends Model
{
    use HasFactory;
     protected $table = 'entreprise_student_notifications';
     protected $fillable = [
        'sender_id',
        'recipient_id',
        'view',
        'msg'
    ];

     public function user()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
   

}
