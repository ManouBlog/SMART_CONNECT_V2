<?php

namespace App\Http\Controllers;

use App\Models\Offre;
use App\Models\Visit;
use App\Models\Student;
use Carbon\CarbonPeriod;
use App\Models\Entreprise;
use App\Models\OffreStudent;
use App\Models\Referral;
use Illuminate\Http\Request;
use App\Models\AbonementUsers;
use Illuminate\Support\Carbon;
use App\Models\Entreprise_Student;

class StatistiqueController extends Controller
{
    public function studentStatistiqueDashboard(Request $request){
        $id = auth()->user()->id;
        $idStudent = Student::where("user_id", "=", $id)->first()->id;
  $annee = $request->annee; // Récupère l'année depuis la requête

  $offrePostule = OffreStudent::where("student_id", $idStudent)
    ->when($annee, function ($query) use ($annee) {
        return $query->whereYear('created_at', $annee);
    })
    ->count();

     $personReferral = Referral::where("ambassador_id", $id)
     ->with(['ambassador','referred.student'])
    ->when($annee, function ($query) use ($annee) {
        return $query->whereYear('created_at', $annee);
    })
    ->get();

  $offrePending = OffreStudent::where("student_id", $idStudent)
    ->where('recruit', 0)
    ->when($annee, function ($query) use ($annee) {
        return $query->whereYear('created_at', $annee);
    })
    ->count();

  $offreAccepted = OffreStudent::where("student_id", $idStudent)
    ->where('recruit', 1)
    ->when($annee, function ($query) use ($annee) {
        return $query->whereYear('created_at', $annee);
    })
    ->count();

   $offreCancel = OffreStudent::where("student_id", $idStudent)
    ->where('recruit', 2)
    ->when($annee, function ($query) use ($annee) {
        return $query->whereYear('created_at', $annee);
    })
    ->count();
        return response()->json([
                            "status" => true,
                            "offrePostule"=> $offrePostule,
                            "offrePending"=> $offrePending,
                            "offreAccepted"=> $offreAccepted,
                            "offreCancel"=> $offreCancel,
                            "personreferral"=>$personReferral
                        ],200);
    }
   

    public function entrepriseStatistiqueDashboard(Request $request){
         $id = auth()->user()->id;
        $idEntreprise = Entreprise::where("user_id", "=", $id)->first()->id;
        $offresEntreprise = Offre::where("entreprise_id",$idEntreprise)->get();

        $annee = $request->annee; // Récupère l'année depuis la requête
        
     $offrePostule = OffreStudent::when($offresEntreprise->isNotEmpty(), function($query) use ($offresEntreprise) {
        $query->whereIn('offre_id', $offresEntreprise->pluck('id')->filter()->values()->toArray());
    })
    ->when($annee, function($query) use ($annee) {
        $query->whereYear('created_at', $annee);
    })
    ->count();

    $offrePending = OffreStudent::when($offresEntreprise->isNotEmpty(), function($query) use ($offresEntreprise) {
        $query->whereIn('offre_id', $offresEntreprise->pluck('id')->filter()->values()->toArray());
    })
    ->where('recruit', 0)
    ->when($annee, function($query) use ($annee) {
        $query->whereYear('created_at', $annee);
    })
    ->count();

     $offreAccepted = OffreStudent::when($offresEntreprise->isNotEmpty(), function($query) use ($offresEntreprise) {
        $query->whereIn('offre_id', $offresEntreprise->pluck('id')->filter()->values()->toArray());
    })
    ->where('recruit', 1)
    ->when($annee, function($query) use ($annee) {
        $query->whereYear('created_at', $annee);
    })
    ->count();
   $offreCancel = OffreStudent::when($offresEntreprise->isNotEmpty(), function($query) use ($offresEntreprise) {
        $query->whereIn('offre_id', $offresEntreprise->pluck('id')->filter()->values()->toArray());
    })
    ->where('recruit', 2)
    ->when($annee, function($query) use ($annee) {
        $query->whereYear('created_at', $annee);
    })
    ->count();

        return response()->json([
                            "status" => true,
                            "offrePostule"=> $offrePostule,
                            "offrePending"=> $offrePending,
                            "offreAccepted"=> $offreAccepted,
                            "offreCancel"=> $offreCancel
                        ],200);
    } 
    public function performance(){
        $partenairePerf = Entreprise::count();
        $offrePerf = Offre::count();
       $talentsPerf = AbonementUsers::where('status_user', 'etudiant')
    ->distinct()
    ->count('user_id');
        $studentInscrit = Student::count();
        $VisiteurPerf = Visit::count();
        return response()->json([
                            "status" => true,
                            "partenairePerf"=> $partenairePerf,
                            "offrePerf"=> $offrePerf,
                            "talentPerf"=> $talentsPerf,
                            "visiteurPerf"=> $VisiteurPerf,
                            "students"=>$studentInscrit
                        ],200);
    }

    public function handleGlobaleStatistique(){
        $walletRevenu = AbonementUsers::whereIn('statut', ['expired', 'success'])
         ->whereMonth('created_at', Carbon::now()->month)
         ->whereYear('created_at', Carbon::now()->year)
         ->sum('montant');
        $EntrepriseTotal = Entreprise::with('user.abonement')->get()->count();
        $entrepriseAbonne = Entreprise::with('user.abonement')
        ->whereHas('user.abonement', function($query) {
         $query->where('statut', 'success');
           })
        ->get()->count();
        $entrepriseNonAbonnee = $EntrepriseTotal-$entrepriseAbonne;

        $Talents = Student::get()->count();

        $talentsAbonne = Student::with('user.abonement')
        ->whereHas('user.abonement', function($query) {
         $query->where('statut', 'success');
           })
        ->get()->count();

        $talentsNonAbonne = $Talents-$talentsAbonne;

        $Offres = Offre::get()->count();
        $OffresPassees = Offre::where('fin', '<', Carbon::now())->get()->count();
        $OffresActive = Offre::where('fin', '>', Carbon::now())->get()->count();

        $CandidatureRetenues = OffreStudent::where('recruit', 1)->get();
        $CandidatureNonRetenues = OffreStudent::where('recruit', 2)->get();
        $CandidatureEnattente = OffreStudent::where('recruit', 0)->get();
        $candidaturesTotal = OffreStudent::get()->count();
         $totalVisits = Visit::count();
       
        
        return response()->json([
                            "status" => true,
                            "entreprise"=> ['total'=>$EntrepriseTotal,'abonne'=>$entrepriseAbonne , 'nonabonne'=>  $entrepriseNonAbonnee],
                            "talents"=> ['total'=>$Talents, 'abonne'=>$talentsAbonne , 'nonAbonne'=>$talentsNonAbonne],
                            "offre"=> ['total'=>$Offres,'Offrespassees'=>$OffresPassees, 'OffreActive'=>$OffresActive],
                            "candidatures"=>[
                            'retenues'=>$CandidatureRetenues->count(), 
                            'nonretenues'=>$CandidatureNonRetenues->count(),
                            'enattente'=>$CandidatureEnattente->count(),
                            'total'=>$candidaturesTotal],
                            "wallet"=> $walletRevenu,
                            "totalVisit"=>$totalVisits
                        ],200);
    }

       public function filterStatistiquesForWallet(Request $request)
{
    if($request->type !== 'Global'){

        $walletRevenu = AbonementUsers::whereIn('statut', ['expired', 'success'])
         ->where('status_user',$request->type)
         ->whereMonth('created_at', Carbon::parse($request->wallet)->month)
         ->whereYear('created_at', Carbon::parse($request->wallet)->year)
         ->sum('montant');
         return response()->json([
                            "status" => true,
                            "wallet"=> $walletRevenu,
                            "message"=> $request->type
                        ],200);
    }else{
        $walletRevenu = AbonementUsers::whereIn('statut', ['expired', 'success'])
         ->whereMonth('created_at', Carbon::parse($request->wallet)->month)
         ->whereYear('created_at', Carbon::parse($request->wallet)->year)
         ->sum('montant');
         return response()->json([
                            "status" => true,
                            "wallet"=> $walletRevenu
                        ],200); 
    }
   
}
    
    public function handleStatistiques(Request $request)
{
    return $this->statistiquesByOffre(
                $request->categorie_id,
               $request->periode,
               $request->value_periode);
}


public function statistiquesByOffre($categorie,$periode,$value_periode)
{
    switch ($periode) {
    case 'daily':
            return $this->daily($categorie,$value_periode);
    case 'weekly':
            return $this->weekly($categorie,$value_periode);
    case 'monthly':
            return $this->monthly($categorie,$value_periode);
    default:
            return $this->annually($categorie,$value_periode);
    }
}



public function daily($categorie,$value_periode){
   $Offres = Offre::where('categorie_offre_id', $categorie)
    ->whereDate('created_at', Carbon::parse($value_periode)->toDateString())
    ->get();
    $candidatures = Entreprise_Student::with('offre')
    ->whereHas('offre', function($query) use ($categorie,$value_periode) {
        $query->where('categorie_offre_id', $categorie);
         $query->whereDate('created_at', '=',Carbon::parse($value_periode));
    })
    ->get();

    $contrat = OffreStudent::with('offre')
    ->where('recruit',1)
    ->whereHas('offre', function($query) use ($categorie,$value_periode) {
        $query->where('categorie_offre_id', $categorie);
         $query->whereDate('created_at', '=',Carbon::parse($value_periode));
    })
    ->get();

    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartDaily($candidatures->count(),$value_periode), 'label'),
                            "candidature"=> array_column($this->getResultOfEachPartDaily($candidatures->count(),$value_periode), 'valeur'),
                            "offre"=> array_column($this->getResultOfEachPartDaily($Offres->count(),$value_periode), 'valeur'),
                            "contrat"=> array_column($this->getResultOfEachPartDaily($contrat->count(),$value_periode), 'valeur')
                        ]);
}

public function weekly($categorie,$value_periode){

       $from = Carbon::parse($value_periode['start'])->startOfDay();
        $to = Carbon::parse($value_periode['end'])->endOfDay();
        $combineFromAndTo = [$from, $to];
   $Offres = Offre::where('categorie_offre_id', $categorie)
    ->whereBetween('created_at', $combineFromAndTo)
    ->get();

    $candidatures = Entreprise_Student::with('offre')
    ->whereHas('offre', function($query) use ($categorie,$combineFromAndTo) {
        $query->where('categorie_offre_id', $categorie);
        $query->whereBetween('created_at', $combineFromAndTo);
    })
    ->get();

    $contrat = OffreStudent::with('offre')
    ->where('recruit',1)
    ->whereHas('offre', function($query) use ($categorie,$combineFromAndTo) {
        $query->where('categorie_offre_id', $categorie);
        $query->whereBetween('created_at', $combineFromAndTo);
    })
    ->get();
        
    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartWeekly($candidatures,$value_periode), 'label'),
                            "candidature"=> array_column($this->getResultOfEachPartWeekly($candidatures,$value_periode), 'valeur'),
                            "offre"=> array_column($this->getResultOfEachPartWeekly($Offres,$value_periode), 'valeur'),
                            "contrat"=> array_column($this->getResultOfEachPartWeekly($contrat,$value_periode), 'valeur')
                        ]);
}

public function monthly($categorie,$value_periode){

   $Offres = Offre::where('categorie_offre_id', $categorie)
    ->whereMonth('created_at', Carbon::parse($value_periode)->month)
    ->whereYear('created_at',Carbon::parse($value_periode)->year)
    ->get();

    $candidatures = Entreprise_Student::with('offre')
    ->whereHas('offre', function($query) use ($categorie,$value_periode) {
        $query->where('categorie_offre_id', $categorie);
        $query->whereMonth('created_at', Carbon::parse($value_periode)->month);
        $query->whereYear('created_at', Carbon::parse($value_periode)->year); 
    })
    ->get();

    $contrat = OffreStudent::with('offre')
    ->where('recruit',1)
    ->whereHas('offre', function($query) use ($categorie,$value_periode) {
        $query->where('categorie_offre_id', $categorie);
        $query->whereMonth('created_at', Carbon::parse($value_periode)->month);
        $query->whereYear('created_at', Carbon::parse($value_periode)->year); 
    })
    ->get();
        
    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartMonthly($candidatures,Carbon::parse($value_periode)), 'label'),
                            "candidature"=> array_column($this->getResultOfEachPartMonthly($candidatures,Carbon::parse($value_periode)), 'valeur'),
                            "offre"=> array_column($this->getResultOfEachPartMonthly($Offres,Carbon::parse($value_periode)), 'valeur'),
                            "contrat"=> array_column($this->getResultOfEachPartMonthly($contrat,Carbon::parse($value_periode)),'valeur')
                        ]);
}


public function annually($categorie,$value_periode){

    $isAll = $categorie === 0;

//    $Offres = Offre::where('categorie_offre_id', $categorie)
//     ->whereYear('created_at', $value_periode)
//     ->get();
 $Offres = Offre::query()
        ->when(!$isAll, function ($query) use ($categorie) {
            $query->where('categorie_offre_id', $categorie);
        })
        ->whereYear('created_at', $value_periode)
        ->get();

    // $candidatures = Entreprise_Student::with('offre')
    // ->whereHas('offre', function($query) use ($categorie,$value_periode) {
    //     $query->where('categorie_offre_id', $categorie);
    //      $query->whereYear('created_at', '=',$value_periode);
    // })
    // ->get();
     $candidatures = Entreprise_Student::with('offre')
        ->whereHas('offre', function ($query) use ($categorie, $value_periode, $isAll) {
            $query
                ->when(!$isAll, function ($q) use ($categorie) {
                    $q->where('categorie_offre_id', $categorie);
                })
                ->whereYear('created_at', $value_periode);
        })
        ->get();

        $contrat = OffreStudent::with('offre')
        ->where('recruit', 1)
        ->whereHas('offre', function ($query) use ($categorie, $value_periode, $isAll) {
            $query
                ->when(!$isAll, function ($q) use ($categorie) {
                    $q->where('categorie_offre_id', $categorie);
                })
                ->whereYear('created_at', $value_periode);
        })
        ->get();

    // $contrat = OffreStudent::with('offre')
    // ->where('recruit',1)
    // ->whereHas('offre', function($query) use ($categorie,$value_periode) {
    //     $query->where('categorie_offre_id', $categorie);
    //      $query->whereYear('created_at', '=',$value_periode);
    // })
    // ->get();
        
    return response()->json([
                            "absicsse"=> array_column($this->getResultOfEachPartAnnually($candidatures,$value_periode), 'label'),
                            "candidature"=> array_column($this->getResultOfEachPartAnnually($candidatures,$value_periode), 'valeur'),
                            "offre"=>array_column($this->getResultOfEachPartAnnually($Offres,$value_periode), 'valeur'),
                            "contrat"=> array_column($this->getResultOfEachPartAnnually($contrat,$value_periode),'valeur')
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
