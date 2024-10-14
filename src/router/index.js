import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Frame from '../views/frame.vue'
import Accueil from "../views/AccueilView.vue";
import offresView from "../views/offresView.vue";
import createTimetableView from "../views/createTimetableView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/',
        name:'Bienvenue',
        component: () => import(/* webpackChunkName: "about" */ '../views/Accueil/Bienvenue.vue')
      },
      {
        path: '/registre',
        name: 'registre',
        component: () => import(/* webpackChunkName: "about" */ '../views/registre.vue')
      }, 
      {
        path: '/conditions-generales',
        name: 'condition',
        component: () => import(/* webpackChunkName: "about" */ '../views/condition.vue')
      },  
      {
        path: '/abonnements',
        name: 'abonnements',
        component: () => import(/* webpackChunkName: "about" */ '../views/Abonnements/Abonnements.vue')
      }, 
      
      {
        path: '/contact',
        name: 'contact',
        component: () => import(/* webpackChunkName: "about" */ '../views/Contacts/contact.vue')
      }, {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/jobs',
        name: 'jobs',
        component: () => import(/* webpackChunkName: "about" */ '../views/offre_timetable.vue')
      },
      {
        path: '/timetable',
        name: 'timetable',
        component: () => import(/* webpackChunkName: "about" */ '../views/timetable/timetable.vue')
      },
     
      {
        path: '/DetailsOffre/:id',
        name: 'OffreDetail',
        meta:{
          requiresAuth:true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/offreDetailsView.vue')
      },
      {
        path: '/reset_password',
        name: 'resetPassword',
        component: () => import(/* webpackChunkName: "about" */ '../views/resetPasswordView.vue')
      },
      {
        path: '/change_password/:email/:token',
        name: 'ChangePassword',
        component: () => import(/* webpackChunkName: "about" */ '../views/ChangePasswordView.vue')
      },
      {
        path:"/dashboard/offre",
        name:'Offre',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/offre/offresView.vue')
        
      },
      {
        path:"/detail/:id",
        name:'detailsOffreEntreprise',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/offre/DetailsOffresEntrepriseView.vue')
      },
      {
        path:"/modification/:id",
        name:'detail_offre',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/offre/DetailOffre.vue')
      },
      {
        path:"/dashboard/creation_offre",
        name:'createOffre',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/offre/CreateOffre.vue')
      },{
        path:"/dashboard/personnel",
        name:'personnel',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/personnel/entreprise_contacts_studentView.vue')
       
      },
      {
        path:"/dashboard/personnel/:name/rendez-vous/:date",
        name:'details_students_contactes',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/personnel/detailStudentsContacteView.vue')
        
      },
      {
        path:"/dashboard/offre/:offre",
        name:'detailsStudentsRecruit',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/personnel/detailStudentsRecruit.vue')
        
      }
      
      ,
      
      {
        path:"/dashboard/postulants",
        name:'postulants',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/personnel/offresInterresseBystudentsView.vue')
        
      },
      {
        path:"/dashboard/postulants/:offre",
        name:'detailsPostulants',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/personnel/DetailPostulantsView.vue')
        
      },
      {
        path:"/dashboard/:id",
        name:'detailStudent',
        meta:{
          requiresAuth:true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/DetailStudents/DetailStudent.vue')
        
      },
      
      {
        path:"/dashboard/profil",
        name:'profil',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/profil/ProfileView.vue')
      },
      {
        path:"/dashboard/abonnements",
        name:'dashboard-abonnements',
        component: () => import(/* webpackChunkName: "about" */ '../views/Myabonnements.vue')
      },
      
      {
        
        path:"/dashboard/accueil",
        name:'dash-accueil',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/etudiant-route/AccueilView.vue')
      },
      {
       
        path:"/dashboard/disponibilite",
        name:'disponibilite',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/etudiant-route/createTimetableView.vue')
      },
      {
        
        path:"/dashboard/emploi_du_temps",
        name:'Emploi',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/etudiant-route/listeDisponibilite.vue')
      },
      {
        
        path:"/dashboard/offre_postule",
        name:'offrePostule',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/etudiant-route/offres_postulerView.vue')
      },
      {
        
        path:"/dashboard/detail_offre_postule/:id",
        name:'details_offres_postuler',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/etudiant-route/details_offres_postuleView.vue')
      },
      {
        
        path:"dashboard/contrat",
        name:'contrat',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/etudiant-route/see_who_interresse_by_profil_studentView.vue')
      },
      {
        
        path:"dashboard/print-contrat/:id",
        name:'imprimeLeContrat',
        component: () => import(/* webpackChunkName: "about" */ '../components/dashboard/etudiant-route/imprimeContratView.vue')
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
      },
      {
        path: "/creer_emploi_du_temps",
        name: "create_timetable",
        component: createTimetableView,
      },
      {
        path: "/offres",
        name: "offres",
        component: offresView,
      },
      {
        path: "/modifier_compte",
        name: "modify_profil",
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
        component: () => import("../views/detailsContactView.vue"),
      },
      {
        path: "/details_entreprise/:id",
        name: "detail_entreprise",
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
  scrollBehavior (_to, _from, savedPosition) {
   if(savedPosition){
     return savedPosition
   }else{
     return {top:0}
   }
  }
})

router.beforeEach( (to, _from, next) => {
  if(to.meta.requiresAuth){
    const session = localStorage.getItem('token')
    if(session === null){
      next({
        path:'/registre',
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


export default router;
