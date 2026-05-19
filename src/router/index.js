import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Frame from '../views/frame.vue'
import Accueil from "../views/AccueilView.vue";
import offresView from "../views/offresView.vue";
import createTimetableView from "../views/createTimetableView.vue";

const routes = [
   {
        path: '/PayementSuccessful',
        name: 'PayementSuccessful',
        component: () => import( '../views/PayementSuccessful.vue')
      },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/',
        name:'Bienvenue',
         meta: {
      title: 'MonBrobroli — Trouvez un emploi ou un talent en Côte d\'Ivoire',
      description: 'Découvrez MonBrobroli, la plateforme leader en Côte d\'Ivoire pour trouver un emploi ou recruter des talents facilement.'
    },
        component: () => import( '../views/Accueil/Bienvenue.vue')
      },
      {
        path:'/:email/:token',
        name:'Bienvenue-verification',
        component: () => import( '../views/Accueil/Bienvenue.vue')
      }, 
      {
        path: '/conditions-generales',
        name: 'condition',
        component: () => import( '../views/condition.vue')
      },  
      {
        path: '/abonnements',
        name: 'abonnements',
        component: () => import( '../views/Abonnements/Abonnements.vue')
      },
      {
        path: '/verification/:reference',
        name: 'abonnements-verification',
        component: () => import( '../views/Abonnements/Abonnements.vue')
      }, 
      
      {
        path: '/contact',
        name: 'contact',
         meta: {
      title: 'Contactez-nous — MonBrobroli',
      description: 'Besoin d’aide ou d’informations ? Contactez l’équipe MonBrobroli dès maintenant.'
    },
        component: () => import( '../views/Contacts/contact.vue')
      }, 
      {
        path: '/avis',
        name: 'avis',
        component: () => import( '../views/AvisComponent.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import( '../views/About.vue')
      },
      {
        path: '/CGU',
        name: 'politiques',
          meta: {
      title: 'Conditions d\'Utilisation Génerale — MonBrobroli',
      description: 'Besoin d’aide ou d’informations ? Contactez l’équipe MonBrobroli dès maintenant.'
    },
        component: () => import( '../views/politiquesView.vue')
      },
      {
        path: '/jobs',
        name: 'jobs',
         meta: {
          requiresAuth:true,
      title: 'Offres d\'emploi et stages — MonBrobroli',
      description: 'Trouvez les meilleures offres d’emploi et de stage en Côte d’Ivoire sur MonBrobroli.'
    },
        component: () => import( '../views/offre_timetable.vue')
      },
      {
        path: '/timetable',
        name: 'timetable',
         meta: {
      title: 'MonBrobroli',
      requiresAuth:true,
      description: 'Trouvez les meilleures offres d’emploi et de stage en Côte d’Ivoire sur MonBrobroli.'
    },
        component: () => import( '../views/timetable/timetable.vue')
      },
       {
        path: '/favoris',
        name: 'favoris',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../views/timetable/ListFavoris.vue')
      },
      {
        path: '/DetailsOffre/:id',
        name: 'OffreDetail',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../views/offreDetailsView.vue')
      },
      {
        path: '/reset_password',
        name: 'resetPassword',
        component: () => import( '../views/resetPasswordView.vue')
      },
      {
        path: '/change_password/:email/:token',
        name: 'ChangePassword',
        component: () => import( '../views/ChangePasswordView.vue')
      },
      {
        path:"/dashboard/offre",
        name:'Offre',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/offre/offresView.vue')
        
      },
      {
        path:"/Notifications",
        name:'notifications',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../views/NotificationsView.vue')
        
      },
      {
        path: "/contrat_etudiants-entreprises",
        name: "Contrat",
        meta:{
          requiresAuth:true
        },
        component: () => import("../views/contratView.vue"),
      },
      {
        path:"/detail/:id",
        name:'detailsOffreEntreprise',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/offre/DetailsOffresEntrepriseView.vue')
      },
      {
        path:"/modification/:id",
        name:'detail_offre',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/offre/DetailOffre.vue')
      },
      {
        path:"/dashboard/creation_offre",
        name:'createOffre',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/offre/CreateOffre.vue')
      },{
        path:"/dashboard/personnel",
        name:'personnel',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/personnel/entreprise_contacts_studentView.vue')
       
      },
      {
        path:"/dashboard/personnel/:offre/:name/:id",
        name:'details_students_contactes',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/personnel/detailStudentsContacteView.vue')
        
      },
      {
        path:"/dashboard/offre/:offre",
        name:'detailsStudentsRecruit',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/personnel/detailStudentsRecruit.vue')
        
      }
      
      ,
      
      {
        path:"/dashboard/postulants",
        name:'postulants',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/personnel/offresInterresseBystudentsView.vue')
        
      },
      {
        path:"/dashboard/postulants/:offre",
        name:'detailsPostulants',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/personnel/DetailPostulantsView.vue')
        
      },
      {
        path:"/dashboard/:id/:user_id",
        name:'detailStudent',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../views/DetailStudents/DetailStudent.vue')
        
      },
      {
        path: "/dashboard/contrat_etudiants-entreprises",
        name: "Contrat",
        meta:{
          requiresAuth:true
        },
        component: () => import("../views/contratView.vue"),
      },
      {
        path: "/dashboard/entreprises_interessees",
        name: "entreprise_interesse",
        meta:{
          requiresAuth:true
        },
        component: () => import("../views/EntrepriseInterresse.vue"),
      },
      {
        path: "/dashboard/entreprises_interessees/:id",
        name: "entreprise_interesse_detail",
        meta:{
          requiresAuth:true
        },
        component: () => import("../views/DetailsEntrepriseInteresse.vue"),
      },
      {
        path:"/dashboard/profil",
        name:'profil',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/profil/ProfileView.vue')
      },
      {
        path:"/dashboard/abonnements",
        name:'dashboard-abonnements',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../views/Myabonnements.vue')
      },
      
      {
        
        path:"/dashboard/accueil",
        name:'dash-accueil',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/etudiant-route/AccueilView.vue')
      },
      {
       
        path:"/dashboard/disponibilite",
        name:'disponibilite',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/etudiant-route/createTimetableView.vue')
      },
      {
        
        path:"/dashboard/emploi_du_temps",
        name:'Emploi',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/etudiant-route/listeDisponibilite.vue')
      },
      {
        
        path:"/dashboard/offre_postule",
        name:'offrePostule',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/etudiant-route/offres_postulerView.vue')
      },
      {
        
        path:"/dashboard/detail_offre_postule/:id",
        name:'details_offres_postuler',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/etudiant-route/details_offres_postuleView.vue')
      },
      // {
        
      //   path:"/dashboard/contrat",
      //   name:'contrat',
      //   meta:{
      //     requiresAuth:true
      //   },
      //   component: () => import( '../components/dashboard/etudiant-route/see_who_interresse_by_profil_studentView.vue')
      // },
       {
        
        path:"/dashboard/certifications/:id",
        name:'certifications',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../views/CertificationsView.vue')
      },
      {
        
        path:"dashboard/print-contrat/:id",
        name:'imprimeLeContrat',
        meta:{
          requiresAuth:true
        },
        component: () => import( '../components/dashboard/etudiant-route/imprimeContratView.vue')
      },
   
      
      
    ]
  },
  {
    path: "/:pathMatch(.*)",
    name: "Not Found",
    component: () => import("../views/notFoundView.vue"),
  },
  {
    path: '/tableau_de_bord',
    name: 'frame',
    component: Frame,
    children:[
      {
        path: "",
        name: "Accueil",
        component: Accueil,
          meta: {
      title: 'Tableau de bord — MonBrobroli',
      description: 'Gérez vos offres et candidatures sur votre tableau de bord MonBrobroli.'
    }
      },
      {
        path: "/creer_emploi_du_temps",
        name: "create_timetable",
        component: createTimetableView,
          meta: {
      title: 'Emploi du temps — MonBrobroli',
      description: 'Gérez votre emploi du temps .'
    }
      },
      {
        path: "/offres",
        name: "offres",
        component: offresView,
         meta: {
      title: 'Offres — MonBrobroli',
      description: 'Gérez vos Offres .'
    }
      },
      {
        path: "/modifier_compte",
        name: "modify_profil",
        meta: {
      title: 'Mon Profile — MonBrobroli',
      description: 'Gérez vos informations personnelles.'
    },
        component: () => import("../views/profileView.vue"),
      },
      {
        path: "/utilisateurs",
        name: "users",
        
        component: () => import("../views/userView.vue"),
      },
      {
        path: "/list_des_entreprises",
        name: "entreprises",
        component: () => import("../views/ListeEntrepriseView.vue"),
      },
      {
        path: "/list_des_etudiants",
        name: "students",
        component: () => import("../views/listStudentView.vue"),
      },
      {
        path: "/details/:id",
        name: "details",
        meta:{
          requiresAuth:true
        },
        component: () => import("../views/detailStudentView.vue"),
      },
      {
        path: "/contrat_etudiants-entreprises",
        name: "Contrat",
        component: () => import("../views/contratView.vue"),
      },
      {
        path: "/contrats/:id",
        name: "detail_contrat",
        meta:{
          requiresAuth:true
        },
        component: () => import("../views/detailsContactView.vue"),
      },
      {
        path: "/details_entreprise/:id",
        name: "detail_entreprise",
        meta:{
          requiresAuth:true
        },
        component: () => import("../views/detailsEntrepriseView.vue"),
      },
      {
        path: "/les_offres",
        name: "all_Offres",
        component: () => import("../views/all_offreView.vue"),
      },
      {
        path: "/les_emplois_du_temps",
        name: "all_Timetables",
        component: () => import("../views/all_timetableView.vue"),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left:0, bottom:0, right:0}
  },
});


router.beforeEach( (to, _from, next) => {
  if(to.meta.requiresAuth){
    const session = localStorage.getItem('token')
    if(session === null){
      next({
        path:'/',
        query:{redirect:to.fullPath}
    }
      )
    }
   
    if(session !== null){
      next()
    }
  }else{
     next()
  }
})


router.afterEach((to) => {
  // 1️⃣ Canonical dynamique
  const canonicalUrl = 'https://monbrobroli.com' + to.fullPath
  let link = document.querySelector("link[rel='canonical']")
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', canonicalUrl)

  // 2️⃣ Title dynamique
  if (to.meta?.title) {
    document.title = to.meta.title
  }

  // 3️⃣ Meta description dynamique
  let descTag = document.querySelector('meta[name="description"]')
  if (!descTag) {
    descTag = document.createElement('meta')
    descTag.setAttribute('name', 'description')
    document.head.appendChild(descTag)
  }
  if (to.meta?.description) {
    descTag.setAttribute('content', to.meta.description)
  }
})


export default router;
