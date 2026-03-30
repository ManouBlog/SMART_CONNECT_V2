<?php

namespace App\Http\Controllers;

use App\Models\AbonementUsers;
use App\Models\Entreprise;
use App\Models\Student;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class StatistiqueAccountController extends Controller
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
  
    $Entreprise = Entreprise::whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get();
    $Talents = Student::whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get();
    $Abonnements = AbonementUsers::where('statut','success')
    ->whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get(); 
    
    $abonnementTalents =  AbonementUsers::where('statut','success')
    ->where('status_user','etudiant')
    ->whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get();
    $abonnementEntreprise = AbonementUsers::where('statut','success')
    ->where('status_user','entreprise')
    ->whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get();
    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartDaily($Entreprise->count(),$value_periode), 'label'),
                            "entreprises"=>array_column($this->getResultOfEachPartDaily($Entreprise->count(),$value_periode), 'valeur'),
                            "talents"=>array_column($this->getResultOfEachPartDaily($Talents->count(),$value_periode), 'valeur'),
                            "Abonnements"=>array_column($this->getResultOfEachPartDaily($Abonnements->count(),$value_periode), 'valeur'),
                            "entreprise_count_abonnement"=> array_column($this->getResultOfEachPartDaily($abonnementEntreprise->count(),$value_periode), 'valeur'),
                            "talents_count_abonnement"=> array_column($this->getResultOfEachPartDaily($abonnementTalents->count(),$value_periode), 'valeur'),
                        ]);
}

public function weekly($value_periode){
    $from = Carbon::parse($value_periode['start'])->startOfDay();
       $to = Carbon::parse($value_periode['end'])->endOfDay();
       $combineFromAndTo = [$from, $to];

   
       $Entreprises = Entreprise::whereBetween('created_at', $combineFromAndTo)->get();

       $Talents = Student::whereBetween('created_at', $combineFromAndTo)->get();

       $Abonnements = AbonementUsers::where('statut','success')
       ->whereBetween('created_at', $combineFromAndTo)
       ->get();  
      

      $abonnementTalents =  AbonementUsers::where('statut','success')
       ->where('status_user','etudiant')
       ->whereBetween('created_at', $combineFromAndTo)
       ->get();

      $abonnementEntreprise = AbonementUsers::where('statut','success')
      ->where('status_user','entreprise')
      ->whereBetween('created_at', $combineFromAndTo)
      ->get();  

       return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartWeekly($Entreprises,$value_periode), 'label'),
                            "entreprises"=>array_column($this->getResultOfEachPartWeekly($Entreprises,$value_periode), 'valeur'),
                            "talents"=>array_column($this->getResultOfEachPartWeekly($Talents,$value_periode), 'valeur'),
                            "Abonnements"=>array_column($this->getResultOfEachPartWeekly($Abonnements,$value_periode), 'valeur'),
                            "entreprise_count_abonnement"=> array_column($this->getResultOfEachPartWeekly($abonnementEntreprise,$value_periode), 'valeur'),
                            "talents_count_abonnement"=> array_column($this->getResultOfEachPartWeekly($abonnementTalents,$value_periode), 'valeur'),
                        ]);
}

public function monthly($value_periode){
   
   $Entreprises = Entreprise::whereMonth('created_at', Carbon::parse($value_periode)->month)
    ->whereYear('created_at',Carbon::parse($value_periode)->year)
    ->get();

    $Talents = Student::whereMonth('created_at', Carbon::parse($value_periode)->month)
    ->whereYear('created_at',Carbon::parse($value_periode)->year)
    ->get();

    $Abonnements = AbonementUsers::where('statut','success')
       ->whereMonth('created_at', Carbon::parse($value_periode)->month)
      ->whereYear('created_at',Carbon::parse($value_periode)->year)
      ->get();
      
      $abonnementTalents = AbonementUsers::where('statut','success')
       ->where('status_user','etudiant')
       ->whereMonth('created_at', Carbon::parse($value_periode)->month)
       ->whereYear('created_at',Carbon::parse($value_periode)->year)
       ->get();

      $abonnementEntreprise = AbonementUsers::where('statut','success')
      ->where('status_user','entreprise')
      ->whereMonth('created_at', Carbon::parse($value_periode)->month)
      ->whereYear('created_at',Carbon::parse($value_periode)->year)
      ->get();

    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartMonthly($Entreprises,Carbon::parse($value_periode)), 'label'),
                            "entreprises"=>array_column($this->getResultOfEachPartMonthly($Entreprises,Carbon::parse($value_periode)), 'valeur'),
                            "talents"=>array_column($this->getResultOfEachPartMonthly($Talents,Carbon::parse($value_periode)), 'valeur'),
                            "Abonnements"=>array_column($this->getResultOfEachPartMonthly($Abonnements,Carbon::parse($value_periode)), 'valeur'),
                            "entreprise_count_abonnement"=> array_column($this->getResultOfEachPartMonthly($abonnementEntreprise,Carbon::parse($value_periode)), 'valeur'),
                            "talents_count_abonnement"=> array_column($this->getResultOfEachPartMonthly($abonnementTalents,Carbon::parse($value_periode)), 'valeur'),
                        ]);

      
}


public function annually($value_periode){
 
   $Entreprises = Entreprise::whereYear('created_at', $value_periode)
    ->get();
    $Talents = Student::whereYear('created_at', $value_periode)
    ->get();

    $Abonnements = AbonementUsers::where('statut','success')
       ->whereYear('created_at', $value_periode)
       ->get();
   
    
$abonnementTalents =  AbonementUsers::where('statut','success')
       ->where('status_user','etudiant')
       ->whereYear('created_at', $value_periode)
      ->get();

      $abonnementEntreprise = AbonementUsers::where('statut','success')
      ->where('status_user','entreprise')
      ->whereYear('created_at', $value_periode)
      ->get();
         return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartAnnually($Entreprises,$value_periode), 'label'),
                            "entreprises"=>array_column($this->getResultOfEachPartAnnually($Entreprises,$value_periode), 'valeur'),
                            "talents"=>array_column($this->getResultOfEachPartAnnually($Talents,$value_periode), 'valeur'),
                            "Abonnements"=>array_column($this->getResultOfEachPartAnnually($Abonnements,$value_periode), 'valeur'),
                            "entreprise_count_abonnement"=> array_column($this->getResultOfEachPartAnnually($abonnementEntreprise,$value_periode), 'valeur'),
                            "talents_count_abonnement"=> array_column($this->getResultOfEachPartAnnually($abonnementTalents,$value_periode), 'valeur'),
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
         $total = 0;
         $result= [];

        for ($i = 1; $i <= 12; $i++) {
            $label = Carbon::create($value_periode, $i)->locale('fr_FR')->isoFormat('MMMM-Y');
            $months[$label] = 0;
        }

        foreach ($data as $item) {
            $label = Carbon::parse($item->created_at)->locale('fr_FR')->isoFormat('MMMM-Y');
            if (isset($months[$label])) $months[$label]++;
            $total++;
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
            if (isset($days[$key])) $days[$key]++;
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
            if (isset($dates[$key])) $dates[$key]++;
            $total++;
        }
        foreach ($dates as $label => $val) {
            $result[] = ['label' => $label, 'valeur' => $val];
        }

        return $result;

}



























}
