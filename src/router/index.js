/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Accueil from "../views/AccueilView.vue";
import FormView from "../views/formView.vue";
import InscriptonView from "../views/inscriptionView.vue";
import createTimetableView from "../views/timetable/createTimetableView.vue";
import offresView from "../views/offres/offresView.vue";
import UpdateLibelle from "../shared/UpdateLibelle.vue";

const routes = [
  {
    path: "/",
    name: "form",
    component: FormView,
  },
  {
    path: "/inscription",
    name: "inscription",
    component: InscriptonView,
  },
  {
    path: "/:pathMatch(.*)",
    name: "Not Found",
    component: () => import("../views/notFoundView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: HomeView,
    children: [
      {
        path: "",
        name: "Accueil",
        component: Accueil,
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/creer_emploi_du_temps",
        name: "create_timetable",
        component: createTimetableView,
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/offres",
        name: "offres",
        component: offresView,
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/modifier_compte",
        name: "modify_profil",
        component: () => import("../views/profile/profileView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/modification/:name/:id",
        name: "modifications",
        component: UpdateLibelle,
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/utilisateurs",
        name: "users",
        component: () => import("../views/admin/userView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/newsletter-email",
        name: "newsletter",
        component: () => import("../views/admin/NewsLetter.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/date-lancement",
        name: "date_lancement",
        component: () => import("../views/admin/DateLancement.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/list_des_entreprises",
        name: "entreprises",
        component: () => import("../views/admin/ListeEntrepriseView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/list_talents",
        name: "students",
        component: () => import("../views/admin/listStudentView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
        {
        path: "/classement",
        name: "ranking",
        component: () => import("../views/admin/RankingView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
       {
        path: "/list_particulier",
        name: "particulier",
        component: () => import("../views/admin/ListeParticulier.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/publicite",
        name: "publicite",
        component: () => import("../views/admin/Publicite/PubliciteView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/temoignages",
        name: "temoignages",
        component: () => import("../views/admin/avis/AllTemoignages.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/partenaires",
        name: "partenaires",
        component: () => import("../views/admin/partenaire/PartenaireView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/Visiteurs",
        name: "students_visiteurs",
        component: () => import("../views/admin/VisiteursView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/utilisateur-beta",
        name: "users_beta",
        component: () => import("../views/admin/userBetaView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/details/:id/:name",
        name: "details",
        component: () => import("../views/admin/detailStudentView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/details_notification/:id",
        name: "details_notification",
        component: () => import("../views/admin/detailNotifications.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/details_personnel/:id",
        name: "details_personnel",
        component: () => import("../views/admin/Derails_user_admins.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/contrat_etudiants-entreprises",
        name: "Contrat",
        component: () => import("../views/admin/contratView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/contrats/:id",
        name: "detail_contrat",
        component: () => import("../views/admin/detailsContactView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/abonnement",
        name: "abonnement",
        component: () =>
          import("../views/admin/abonnements/HistoriqueAbonnement.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/abonnement/:id",
        name: "detail_abonnement",
        component: () =>
          import("../views/admin/abonnements/DetailsAbonnements.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/transactions",
        name: "transactions",
        component: () =>
          import("../views/admin/transactions/HistoriqueTransactions.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/detail_Categorie_Abonnement/:id",
        name: "detail_Categorie_Abonnement",
        component: () =>
          import("../views/admin/abonnements/DetailCategorie.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/details_entreprise/:id",
        name: "detail_entreprise",
        component: () => import("../views/admin/detailsEntrepriseView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/les_offres",
        name: "all_Offres",
        component: () => import("../views/admin/all_offreView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/les_emplois_du_temps",
        name: "all_Timetables",
        component: () => import("../views/admin/all_timetableView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/categorie",
        name: "Categorie",
        component: () => import("../views/admin/CategorieView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/competence",
        name: "Competences",
        component: () => import("../views/admin/CompetencesView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/detail_offre_entreprise/:name",
        name: "offre_details_entreprise",
        component: () => import("../views/admin/Details_entreprise_View.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/offres_postules",
        name: "see_offres_postuler",
        component: () => import("../views/admin/offres_postulerView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/details_offres/:id",
        name: "details_offres_postuler",
        component: () =>
          import("../views/admin/details_offres_postuleView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/les_entreprises_interresses",
        name: "see_who_interesse_by_profil_student",
        component: () =>
          import("../views/admin/see_who_interresse_by_profil_studentView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/entreprisesContactsStudents",
        name: "student_contacts_by_entreprise",
        component: () =>
          import("../views/admin/entreprise_contacts_studentView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/DetailEtudiantsContactes/:name/rendez-vous/:date",
        name: "details_students_contactes",
        component: () =>
          import("../views/admin/detailStudentsContacteView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/OffresInterresseParLesEtudiants",
        name: "OffreInteressByStudents",
        component: () =>
          import("../views/admin/offresInterresseBystudentsView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/Postulants/:name/:offre",
        name: "detailsPostulants",
        component: () => import("../views/admin/DetailPostulantsView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/detailOffreEntreprise/:id",
        name: "detailsOffreEntreprise",
        component: () =>
          import("../views/admin/DetailsOffresEntrepriseView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/imprimeLeContrat/:id",
        name: "imprimeLeContrat",
        component: () => import("../views/admin/imprimeContratView.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
/* eslint-disable */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
/* eslint-disable */
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    let session = localStorage.getItem("token");
    // const permissionUser = JSON.parse(localStorage.getItem("user"))
    if (session === null) {
      next({ path: "/" });
    }
    if (session !== null) {
      next();
    }
  } else {
    next();
  }
});

export default router;
