<?php


use App\Models\Visit;
use App\Models\Etoile;
use App\Models\Student;
// use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\AbonementUsers;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JourController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OffreController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FavorisController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CinetPayController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ConnexionController;
use App\Http\Controllers\EntrepriseController;
// use App\Http\Controllers\SocialLoginController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PartenaireController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\TemoignageController;
use App\Http\Controllers\AbonnementsController;
use App\Http\Controllers\CompetencesController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\QualificationController;
use App\Http\Controllers\StatistiqueRevenuController;
use App\Http\Controllers\StatistiqueVisiteController;
use App\Http\Controllers\StatistiqueAccountController;
use Illuminate\Support\Facades\Notification;
use App\Notifications\MonBrobroliDayConfirmation;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('showAllAfficheMobile',[OffreController::class, 'showAllAfficheMobile']);
Route::post('/paystack/webhook', [CinetPayController::class, 'handleWebHookPaystack']);

Route::post(
    'verificationEmail',
    [UserController::class, 'verificationEmailByMail']
);

//ROUTE POUR LISTER,DELETE LES UTILISATEURS,POUR SE CONNECTER
Route::apiResource('list_users', UserController::class);

// Route::post("sendMonBrobroliDayConfirmation",function(Request $request){
//      $emails = [
//         'orlyy16@gmail.com',
//         'issa72403@gmail.com',
//         'marieyolandesahue04@gmail.com',
//         'anneelientchobo@gmail.com',
//         'sinareisraelle@gmail.com',
//         'mariamkonare74@gmail.com',
//         'meitemaboudou19@icloud.com',
//         'temeoumar29@gmail.com',
//         'tresorheyot802@gmail.com',
//         'djenebaqueen783@gmail.com',
//         'bitibalejeaneudes@gmail.com',
//         'diomandemawa022@gmail.com',
//         'messcrea.conception@gmail.com',
//         'niangoranstephanedelfond@gmail.com',
//         'landrymambo4@gmail.com',
//         'charlendri85@gmail.com',
//         'jeanlouiskouame48@gmail.com',
//         'djechristopher7@gmail.com',
//         'agblosucces@gmail.com',
//         'syzeinab6@gmail.com',
//         'axelachyangef@gmail.com',
//         'sarahymannebamba@gmail.com',
//         'nellyseri2020@gmail.com',
//         'sarahmelvineamani@gmail.com',
//         'emmanuelouattara2024@gmail.com',
//         'ouedraogohousseny97@gmail.com',
//     ];

//     foreach ($emails as $email) {
//         Notification::route('mail', $email)
//             ->notify(new MonBrobroliDayConfirmation());
//     }

//     return response()->json([
//         'message' => 'Emails envoyés avec succès'
//     ]);
// });


Route::get(
    'seeCategorie',
    [OffreController::class, 'seeCategorie']
);
//Route pour update badge alert entreprise
Route::put('updateBadgeEntreprise/{id}', [EntrepriseController::class, 'update_badge_entreprises']);

Route::put('updateBadgeStudent/{id}', [StudentController::class, 'updateBadgeStudent']);

Route::get('see_role', [UserController::class, 'see_role']);
Route::post('SendMailAtEmailToNewsletter', [NewsletterController::class, 'saveUserForEmail']);

Route::post('auth_login', [UserController::class, 'login']);
Route::get('GetAllCompetences', [CompetencesController::class, 'findAllCompetences']);
Route::post('inscription', [ConnexionController::class, 'inscription']);

Route::post('create-abonnement', [AbonnementsController::class, 'createAbonnement']);

Route::get('getAbonnement', [AbonnementsController::class, 'listAbonnements']);
Route::get('payStack/payment/callback/{reference}', [CinetPayController::class, 'handleCallback']);

Route::post('handleWebHookRevenueCat',[CinetPayController::class,'handleWebHookRevenueCat']);

Route::post('sendUsEmail', [ContactController::class, 'store']);
Route::get('/date-lancement', [NewsletterController::class, 'getDateLancement']);
Route::get('handleMyAbonnement', [AbonnementsController::class, 'seeAbonnementsUser']);
Route::post('visites' ,function(Request $request){
Visit::create([
            'ip_address' => $request->ip,
        ]);
       return response()->json([
                            "status" => true,
                        ],200);
});

Route::get('getUserDoAbonnement', function () {
    $count = AbonementUsers::where('statut', 'success')->count();
    return response()->json([
        'status'=>true,
        'total'  => $count,
    ],200);
});

Route::get('seePerformance',[StatistiqueController::class,'performance']);

// Route::get('google/redirect',[SocialLoginController::class,'googleLoginUrl'])->middleware('web');
// Route::get('auth/google/callback',[SocialLoginController::class,'googleLoginCallBack'])->middleware('web');
Route::group([
    'namespace' => 'Auth',
    'middleware' => 'api',
    'prefix' => 'password'
], function () {
    Route::post('/createNewPassword', [PasswordResetController::class, 'create']);
    Route::get('/find/{token}', [PasswordResetController::class, 'find']);
    Route::post('/reset', [PasswordResetController::class, 'reset']);
});

 //route pour lister les partenaires
    Route::get('allPartenaire', [PartenaireController::class, 'showAllPartenaires']);

 //route pour montrer les affiches
 Route::get('showAffiche/{appareal}', [OffreController::class, 'showAffiche']);
 Route::get('/showAllAffiche', [OffreController::class, 'showAllAffiche']);
Route::get('/temoignages', [TemoignageController::class, 'listerCommentaires']);
Route::get('/allTemoignages',[TemoignageController::class, 'allTemoignages']);
 
Route::group(["middleware" => ["auth:sanctum"]], function () {

    Route::get('listerPermission',[PermissionController::class,'listerPermission']);
    Route::post('GivePermission/{id}',[PermissionController::class,'GivePermission']);
    
    Route::get('listerUser',[UserController::class,'listerUser']);

    Route::post('/send-verification-email', [UserController::class, 'sendVerificationEmail']);

    Route::group([
        'prefix' => 'statistiqueDashboard'
    ], function () {
        Route::post('/student', [StatistiqueController::class, 'studentStatistiqueDashboard']);
        Route::post('/entreprise', [StatistiqueController::class, 'entrepriseStatistiqueDashboard']);
    });

    Route::group([
        'prefix' => 'payStack'
    ], function () {
        Route::post('/paiement', [CinetPayController::class, 'handleDoAbonnement']);
    });

    Route::group([
        'prefix' => 'statistiques'
    ], function () {
         Route::post('filterStatistiqueWallet', [StatistiqueController::class, 'filterStatistiquesForWallet']);
        Route::get('statistiqueGlobal', [StatistiqueController::class, 'handleGlobaleStatistique']);
        Route::post('statistiqueCategorie', [StatistiqueController::class, 'handleStatistiques']);
        Route::post('statistiqueAccount', [StatistiqueAccountController::class, 'handleStatistiques']);
        Route::post('statistiqueVisite', [StatistiqueVisiteController::class, 'handleStatistiques']);
        Route::post('statistiqueRevenu', [StatistiqueRevenuController::class, 'handleStatistiques']);
    });

    Route::get('voirInfoUserConnect',[UserController::class,'handleInfoUser']);
    Route::delete('users/{id}', [UserController::class, 'deleteUser']);

    Route::delete('qualifications/{id}',[QualificationController::class, 'deleteQualifications']);
    Route::post('addQualifications',[QualificationController::class, 'addQualifications']);
    Route::post('updateQualification',[QualificationController::class, 'updateQualification']);

    Route::get('list_offres',  [OffreController::class, 'list_offres']);
    Route::post('search_offres', [OffreController::class, 'searchInOffers']);
    
    // Route::get('handleAbonnementExpired', [CinetPayController::class, 'handleAbonnementExpired']);

    Route::post('toogleFavoris', [FavorisController::class, 'create']);
    Route::get('listFavoris', [FavorisController::class, 'favorisList']);

    // Route::get('handleMyAbonnement', [AbonnementsController::class, 'seeAbonnementsUser']);
    Route::get('abonnement_user', [AbonnementsController::class, 'userAbonnement']);
    Route::post('do_an_abonnement', [AbonnementsController::class, 'handleDoAbonnement']);
    Route::get('seeMyAbonnement', [AbonnementsController::class, 'seeAbonnementUser']);
    Route::post('create_categorie-abonnement', [AbonnementsController::class, 'createCategorie']);
    Route::get('getCategorie', [AbonnementsController::class, 'listCategorie']);
    Route::delete('deleteCategorie/{id}', [AbonnementsController::class, 'deleteCategorie']);
    Route::put('editCategorie/{id}', [AbonnementsController::class, 'editCategorie']);

    Route::get('getEmailNewsletter', [NewsletterController::class, 'getEmailNewsletter']);
    Route::post('sendNewsletterAtUser',[NewsletterController::class, 'sendNewsletterAtUser']);
    Route::post('sendNotificationsAtUser',[NewsletterController::class, 'sendNotificationsAtUser']);
    Route::post('addDateLancement',[NewsletterController::class, 'addDateLancement']);
    
    Route::get("handleAbonnement", [EntrepriseController::class, 'getAbonnementUser']);
    Route::middleware(['track.profile'])->get('FiltreTimetable', [StudentController::class, 'disponibilite_etudiant']);
    route::get('Notifications_student',[StudentController::class, 'Notifications_student']);
     route::get('markAllAsRead',[StudentController::class, 'markAllAsRead']);
   
    Route::get('list_emplois_temps', function () {
        $emplois = Student::with([
            "jours",
            "competences",
            "experiences",
            "etoiles",
            "entreprises",
            "user.abonement"
        ])
        ->whereHas('user.abonement', function($query) {
         $query->where('statut', 'success');
           })
        ->get();
      
        foreach ($emplois as $emploi) {
            $average = null;
            foreach ($emploi->etoiles as $star) {
                if ($emploi->id === $star->student_id) {
                    $sumNotes = Etoile::where('student_id', $emploi->id)->sum('notes');
                    $totalNotes = Etoile::where('student_id', $emploi->id)->get()->count();
                    $average = $sumNotes / $totalNotes;
                }
            }
            $emploi['average'] = $average;
            $emploi['is_premium'] = collect($emploi->user->abonement)
            ->contains(fn($abonement) => $abonement->abonement_id === 4 && $abonement->statut === "success");
        }   
        $emplois = $emplois->sortByDesc('is_premium')->values();
        return response()->json([
            "status" => true,
            "data" => $emplois,
        ], 200);
    });
     //route pour voir les etudiants recruter ou selectionner qui ont postuler a une offre de l entreprise connectée.
    Route::get('getStudentRecruit', [OffreController::class, 'getStudentRecruit']);
    //route pour voir le détail d'une offre
    Route::get('detail_offre/{id}', [OffreController::class, 'detail_offre']);
    //route pour créer une catégorie
    Route::post('categorie', [OffreController::class, 'create_categorie']);

     
    Route::post('/temoignages', [TemoignageController::class, 'store']);


    Route::group([
        'prefix' => 'admin'
    ], function () {

    //route pour montrer tous les contrats
    Route::get('allContrats', [UserController::class, 'seeContratBetweenEntrepriseAndTalent']);
     Route::get('updateBadgeContrat', [UserController::class, 'updateBadgeContrat']);

    //route pour montrer les affiches
    Route::delete('delete_pub/{id}', [OffreController::class, 'deleteAffiche']);

     Route::post('/users/{id}/generate-ambassador-code', [UserController::class, 'generateAmbassadorCodeForUser']);

    //route pour supprimer un partenaire
    Route::delete('deletePartenaire/{id}',[PartenaireController::class, 'deletePartenaire']);

    //route pour ajouter un partenaire
    Route::post('addPartenaire', [PartenaireController::class, 'addPartenaire']);

     //route pour ajouter une affiche
    Route::post('addAffiche', [OffreController::class, 'addAffiche']);

   Route::get('showAllAfficheAdmin', [OffreController::class, 'showAllAfficheAdmin']);

        //route pour modifier une catégorie
    Route::put('update_categorie/{id}',[OffreController::class, 'update_categorie']);

    //route pour modifier une compétence
    Route::put('update_competence/{id}',[CompetencesController::class, 'update_competence']);

    // route pour supprimer une catégorie
    Route::delete('delete_categorie/{id}',[OffreController::class, 'delete_my_categorie']);
    //route pour delete une compétence
    Route::delete('delete_competence/{id}',[CompetencesController::class, 'delete_competence']);

    //route pour update un abonnement
    Route::put('updateAbonnement/{id}',[AbonnementsController::class, 'updateAbonnement']);

    //route pour delete un abonnement
    Route::delete('deleteAbonnement/{id}',[AbonnementsController::class, 'deleteAbonnement']);

     //route pour voir une transaction
    Route::get('historiqueTransaction',[AbonnementsController::class, 'HistoriqueTransaction']);
    
    });

    //route pour se deconnecter
    Route::get('auth_logout', [UserController::class, 'logout']);


    //route pour creer une compétence 
    Route::post('createCompetence', [CompetencesController::class, 'create']);

    //route pour noter une entreprise 
    Route::post('rate_entreprise', [EntrepriseController::class, 'noter_entreprise']);

    // route pour modifier les informations de l etudiant et de l'entreprise
    Route::post('modifier_profil', [UserController::class, 'update']);

    // route pour modifier les informations de l etudiant et de l'entreprise
    Route::post('passwordModify', [UserController::class, 'modifyPassword']);

    // route pour creer un emplois du temps de l'etudiant
    Route::post('create_schedule', [JourController::class, 'create_schedule']);

    // route pour voir les emplois du temps d'un etudiant
    Route::get('get_schedule', [JourController::class, 'get_schedule']);

    // route pour modifier ses emplois du temps d'un etudiant
    Route::put('modify_schedule/{id}', [JourController::class, 'modify_schedule']);

    // route pour supprimer un emploi du temps d'un etudiant
    Route::delete('delete_schedule/{id}', [JourController::class, 'delete_schedule']);

    Route::get('mes-certifications', [StudentController::class, 'getCertifications']);
    Route::post('sendCertificat',[EntrepriseController::class, 'sendCertificat']);

    // route pour voir la liste des etudiant
    Route::get('list_students', [StudentController::class, 'listTalents']);
    Route::get('list_visiteurs', [StudentController::class, 'listVisiteur']);
    Route::get('get_detail_user/{id}', [StudentController::class, 'get_detail_user']);
   

    Route::post('postNewExperience', [StudentController::class, 'createNewExperience']);
    Route::get('GetMyExperiences', [StudentController::class, 'getExperiences']);
    Route::post('modifyExperience/{id}', [StudentController::class, 'modifyMyExperience']);
    Route::delete('deleteMyExperience/{id}', [StudentController::class, 'deleteExperience']);

    //Creer une categorie
    Route::post('create_categorie', [EntrepriseController::class, 'create_categorie']);

    Route::post('giveAvis', [StudentController::class, 'createAvisOnStudent']);

    //recruter un etudiant 
    Route::post('recruitStudent', [StudentController::class, 'recruitStudent']);
    //ajouter une offre
    Route::post('create_offre', [EntrepriseController::class, 'post_offre']);


    //route pour voir la liste des entreprises
    Route::get('list_entreprise', [EntrepriseController::class, 'get_entreprises']);

  Route::post('filterStudents',[EntrepriseController::class, 'filterStudents']);

    // voir les offres d'une entreprise
    Route::get('get_offres_entreprise', [EntrepriseController::class, 'show_offres_entreprise']);

    //modifier une offre d'une entreprise
    Route::put('modify_offre_entreprise/{id}', [EntrepriseController::class, 'update_offre']);

    //supprimer une offre d'une entreprise
    Route::delete('delete_offre_entreprise/{id}', [EntrepriseController::class, 'delete_offre']);

    // route pour que l'entreprise contacts un etudiant
    Route::post('entreprise_student', [EntrepriseController::class, 'contact_student']);

    // route pour voir la liste des entreprises qui ont contacter un etudiant et l'offre
    Route::get('see_entreprise_student', [UserController::class, 'see_entreprise_contact_students']);
 // route pour que l etudiant voir les entreprises qui l'ont contacter
    Route::get('entrepriseInteressee', [UserController::class, 'entrepriseInteressee']);

    // Route pour permet à l'etudiant de postuler
    Route::post('postule_offre', [StudentController::class, 'postuler_offre']);

    // Route pour voir les offres d'un étudiant
    Route::get('get_offres_postule', [StudentController::class, 'get_offre_postule']);

    // Route pour voir qui à contacter un étudiant

    Route::get('get_who_contact_student', [StudentController::class, 'who_contact_student']);

    // Route pour voir les etudiants qui ont été contactés par une entreprise

    Route::get('list_students_contact_by_entreprise', [EntrepriseController::class, 'list_students_contact_by_entreprise']);


    // Route pour voir les offres qui sont interrèssées par les etudiants

    Route::get('list_offres_interess_by_students', [EntrepriseController::class, 'offresInteresseByStudent']);

    // Route pour enregistrer une wishlist
    Route::post('saveWishlist', [WishlistController::class, 'create']);

    // Route pour afficher une entreprise avec ses wishlists.
    Route::get('getAllWishlist', [WishlistController::class, 'showPersonInMyWishlist']);

    // Route pour afficher une entreprise avec ses wishlists.
    Route::delete('deletePersonInMyWishlist/{id}', [WishlistController::class, 'deletePersonInMyWishlist']);

    Route::get('getCompetenceByStudents', [StudentController::class, 'getCompetenceByStudents']);

    Route::delete('deleteCompetencesOfStudents/{id}', [StudentController::class, 'deleteCompetenceOfStudents']);

    Route::post('addCompetences', [StudentController::class, 'addNewCompetent']);

   // Route pour changer le contrat de la table entreprise_student
    Route::put('changeStatutJob/{id}', [StudentController::class, 'changeStatutJob']);

    Route::put('confirmAlarm/{id}', [EntrepriseController::class, 'confirmAlarm']);
});
