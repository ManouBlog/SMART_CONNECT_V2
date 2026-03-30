<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Qualification extends Model
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        // 'detail',
        'objet',
        'date_debut',
        'date_fin',
    ];

    protected static function booted()
    {
        static::addGlobalScope('recentFirst', function (Builder $builder) {
            $builder->orderBy('date_fin', 'desc'); // du plus récent au plus ancien
        });
    }

     public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
