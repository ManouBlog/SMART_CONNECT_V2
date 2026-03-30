<?php

namespace App\Http\Controllers;

use App\Models\AbonementUsers;
use App\Models\Entreprise;
use App\Models\Student;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class StatistiqueRevenuController extends Controller
{
    public function handleStatistiques(Request $request)
{
   return $this->statistiquesByOffre(
               $request->periode,
               $request->value_periode);
}


public function statistiquesByOffre($periode,$value_periode)
{
    switch ($periode) {
    case 'daily':
            return $this->daily($value_periode);
    case 'weekly':
            return $this->weekly($value_periode);
    case 'monthly':
            return $this->monthly($value_periode);
    default:
            return $this->annually($value_periode);
    }
}

public function daily($value_periode){
    // le 6 represente une entreprise, le 4 represente un etudiant 
  
    $Entreprises_premium = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 6);
        $query->where('libelle', 'PLATINUM');
    })
    ->whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get(); 

     $Entreprises_stantard = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 6);
        $query->where('libelle', 'ECO');
    })
    ->whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get(); 

    $Talents_stantard = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 4);
        $query->where('libelle', 'ECO');
    })
    ->whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get(); 

    $Talents_premium = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 4);
        $query->where('libelle', 'PLATINUM');
    })
    ->whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get(); 

    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartDaily($Entreprises_premium,$value_periode), 'label'),
                            "entreprises_premium"=>array_column($this->getResultOfEachPartDaily($Entreprises_premium,$value_periode), 'valeur'),
                            "entreprise_standard"=>array_column($this->getResultOfEachPartDaily($Entreprises_stantard,$value_periode), 'valeur'),
                            "talents_premium"=>array_column($this->getResultOfEachPartDaily($Talents_premium,$value_periode), 'valeur'),
                            "talents_stantard"=> array_column($this->getResultOfEachPartDaily($Talents_stantard,$value_periode), 'valeur')
                        ]);
}

public function weekly($value_periode){
    $from = Carbon::parse($value_periode['start'])->startOfDay();
       $to = Carbon::parse($value_periode['end'])->endOfDay();
       $combineFromAndTo = [$from, $to];

    $Entreprises_premium = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 6);
        $query->where('libelle', 'PLATINUM');
    })
    ->whereBetween('created_at', $combineFromAndTo)
    ->get(); 

     $Entreprises_stantard = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 6);
        $query->where('libelle', 'ECO');
    })
    ->whereBetween('created_at', $combineFromAndTo)
    ->get(); 

    $Talents_stantard = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 4);
        $query->where('libelle', 'ECO');
    })
    ->whereBetween('created_at', $combineFromAndTo)
    ->get(); 

    $Talents_premium = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 4);
        $query->where('libelle', 'PLATINUM');
    })
    ->whereBetween('created_at', $combineFromAndTo)
    ->get(); 

    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartWeekly($Entreprises_premium,$value_periode), 'label'),
                            "entreprises_premium"=>array_column($this->getResultOfEachPartWeekly($Entreprises_premium,$value_periode), 'valeur'),
                            "entreprise_standard"=>array_column($this->getResultOfEachPartWeekly($Entreprises_stantard,$value_periode), 'valeur'),
                            "talents_premium"=>array_column($this->getResultOfEachPartWeekly($Talents_premium,$value_periode), 'valeur'),
                            "talents_stantard"=> array_column($this->getResultOfEachPartWeekly($Talents_stantard,$value_periode), 'valeur')
                        ]);
}

public function monthly($value_periode){
   
$Entreprises_premium = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 6);
        $query->where('libelle', 'PLATINUM');
    })
    ->whereMonth('created_at', Carbon::parse($value_periode)->month)
    ->whereYear('created_at',Carbon::parse($value_periode)->year)
    ->get(); 

     $Entreprises_stantard = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 6);
        $query->where('libelle', 'ECO');
    })
   ->whereMonth('created_at', Carbon::parse($value_periode)->month)
    ->whereYear('created_at',Carbon::parse($value_periode)->year)
    ->get(); 

    $Talents_stantard = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 4);
        $query->where('libelle', 'ECO');
    })
   ->whereMonth('created_at', Carbon::parse($value_periode)->month)
    ->whereYear('created_at',Carbon::parse($value_periode)->year)
    ->get(); 

    $Talents_premium = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 4);
        $query->where('libelle', 'PLATINUM');
    })
   ->whereMonth('created_at', Carbon::parse($value_periode)->month)
    ->whereYear('created_at',Carbon::parse($value_periode)->year)
    ->get(); 

    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartMonthly($Entreprises_premium,Carbon::parse($value_periode)), 'label'),
                            "entreprises_premium"=>array_column($this->getResultOfEachPartMonthly($Entreprises_premium,Carbon::parse($value_periode)), 'valeur'),
                            "entreprise_standard"=>array_column($this->getResultOfEachPartMonthly($Entreprises_stantard,Carbon::parse($value_periode)), 'valeur'),
                            "talents_premium"=>array_column($this->getResultOfEachPartMonthly($Talents_premium,Carbon::parse($value_periode)), 'valeur'),
                            "talents_stantard"=> array_column($this->getResultOfEachPartMonthly($Talents_stantard,Carbon::parse($value_periode)), 'valeur')
                        ]);

      
}


public function annually($value_periode){
    
   
 
  $Entreprises_premium = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 6);
        $query->where('libelle', 'PLATINUM');
    })
    ->whereYear('created_at', $value_periode)
    ->get(); 

     $Entreprises_stantard = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 6);
        $query->where('libelle', 'ECO');
    })
   ->whereYear('created_at', $value_periode)
    ->get(); 

    $Talents_stantard = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 4);
        $query->where('libelle', 'ECO');
    })
   ->whereYear('created_at', $value_periode)
    ->get(); 

    $Talents_premium = AbonementUsers::whereIn('statut', ['expired', 'success'])
     ->with('abonement')
     ->whereHas('abonement', function($query){
        $query->where('categorie_id', 4);
        $query->where('libelle', 'PLATINUM');
    })
   ->whereYear('created_at', $value_periode)
   ->get(); 

    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartAnnually($Entreprises_premium,$value_periode), 'label'),
                            "entreprises_premium"=>array_column($this->getResultOfEachPartAnnually($Entreprises_premium,$value_periode), 'valeur'),
                            "entreprise_standard"=>array_column($this->getResultOfEachPartAnnually($Entreprises_stantard,$value_periode), 'valeur'),
                            "talents_premium"=>array_column($this->getResultOfEachPartAnnually($Talents_premium,$value_periode), 'valeur'),
                            "talents_stantard"=> array_column($this->getResultOfEachPartAnnually($Talents_stantard,$value_periode), 'valeur')
                        ]);
  

}

public function getResultOfEachPartDaily($data,$value_periode){
    $result = [];
    $result[] = [
            'label' => Carbon::parse($value_periode)->format('d-m-Y'),
            'valeur' => $data,
        ];
    return $result;
}

public function getResultOfEachPartAnnually($data,$value_periode){
        $months = [];
        //  $total = 0;
         $result= [];

        for ($i = 1; $i <= 12; $i++) {
            $label = Carbon::create($value_periode, $i)->locale('fr_FR')->isoFormat('MMMM-Y');
            $months[$label] = 0;
        }
        
        foreach ($data as $item) {
            $label = Carbon::parse($item->created_at)->locale('fr_FR')->isoFormat('MMMM-Y'); 
            if (isset($months[$label])) $months[$label]+= $item->montant;
        }
       
        foreach ($months as $label => $val) {
            $result[] = ['label' => $label, 'valeur' => $val];
        }
      return $result;
}

public function getResultOfEachPartMonthly($data,$value_periode){
        $days = [];
        $result= [];
        $total = 0;
        for ($i = 1; $i <= $value_periode->daysInMonth; $i++) {
            $day = Carbon::create($value_periode->year, $value_periode->month, $i)->format('d-M-Y');
            $days[$day] = 0;
        }
        foreach ($data as $item) {
            $key = Carbon::parse($item->created_at)->format('d-M-Y');
            if (isset($days[$key])) $days[$key]+= $item->montant;
            $total++;
        }
        foreach ($days as $label => $val) {
            $result[] = ['label' => $label, 'valeur' => $val];
        }

      return $result;
}

public function getResultOfEachPartWeekly($data,$value_periode){
             $dates = [];
             $total= 0;
        foreach (CarbonPeriod::create($value_periode['start'], $value_periode['end']) as $day) {
            $dates[$day->format('d-M-Y')] = 0;
        }

        foreach ($data as $item) {
            $key = Carbon::parse($item->created_at)->format('d-M-Y');
            if (isset($dates[$key])) $dates[$key]+= $item->montant;
            $total++;
        }
        foreach ($dates as $label => $val) {
            $result[] = ['label' => $label, 'valeur' => $val];
        }

        return $result;

}


























}
