<script setup>
import Dialog from "primevue/dialog";
import { useRegisterStore } from "../../store-pinia/register/useRegisterStore";

// Store Pinia
const registerStore = useRegisterStore();

// Méthodes
const registerTalent = () => {
  console.log("props.payload", registerStore.payload);
  registerStore.registerStudent(registerStore.payload);
};

const registerEntreprise = () => {
  // console.log("props.payload", registerStore.payload);
  registerStore.registerCompany(registerStore.payload);
};

const registerParticulier = () => {
  // console.log("props.payload", registerStore.payload);
  registerStore.registerParticulier(registerStore.payload);
};

const handleRegister = () => {
  switch (registerStore.infoUser) {
    case "entreprise":
      registerEntreprise();
      break;
    case "particulier":
      registerParticulier();
      break;
    default:
      registerTalent();
      break;
  }
};
</script>

<template>
  <div class="conteneur myconteneur">
    <Dialog
      v-model:visible="registerStore.isPolitics"
      modal
      closable
      header="Conditions générales d’utilisation"
      :style="{ width: '60rem', zIndex: 999 }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        <div class="myconteneur">
          <h1
            style="
              text-align: center;
              padding: 1em;
              color: orange;
              font-weight: bold;
              font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
            "
          >
            <code>CGU(CONDITIONS GENERALES D’UTILISATION)</code>
          </h1>
          <p style="text-align: right; padding: 0 3.2em">Mise en ligne le 24/12/2025</p>
          <h2 style="padding: 0 2em; color: orange">PREAMBULE</h2>
          <p
            style="padding: 0 3.5em; font-family: 'Roboto', 'Segoe UI', Arial, sans-serif"
          >
            La
            <span style="font-weight: bold"
              >Société LA LOCOMOTIVE SARL en abrégée (LCE)</span
            >, Société à Responsabilité Limitée unipersonnelle (SARLU), au capital d’UN
            MILLION (1.000.000) de FCFA, immatriculée au registre du commerce et du crédit
            mobilier d’Abidjan -Plateau sous le numéro CI-ABJ-2018-B-24483, sise à
            Abidjan-Cocody les deux-plateaux, BP 995 Abidjan 27, Tél. : 05 46 66 77 66,
            est une société de droit ivoirien spécialisée dans le domaine des services et
            plus précisement en expertise informatique et télécoms, concepteur de la
            plateforme en ligne MonBroBroli. MonBrobroli est une plateforme gratuite en
            ligne qui a pour vocation principale de mettre en relation de manière
            transparente et équilibrée. La plateforme MonBrobroli est disponible en
            continu, 24 heures sur 24, et accessible depuis tout type d’appareil connecté,
            qu’il s’agisse de smartphones, de tablettes ou d’ordinateurs. L’accès à
            certaines fonctionnalités de la plateforme est soumis à un abonnement annuel
            obligatoire, selon les conditions ci-après.
            <span style="font-weight: bold">LA LOCOMOTIVE SARL</span> intervient en tant
            qu’intermédiaire dans les rapports entre les abonné(e)s demandeurs de stage et
            les entreprises d’accueil.
          </p>

          <section
            class="p-4 row"
            style="padding: 3.5em; font-family: 'Roboto', 'Segoe UI', Arial, sans-serif"
          >
            <h2 class="text-left">
              <code>ARTICLE 1 – APPLICATION DES CONDITIONS GENERALES D’UTILISATION </code>
            </h2>
            <p>
              Les présentes Conditions Générales d’utilisation accessibles sur le site
              www.MonBrobroli.com sont systématiquement transmises à chaque abonné(e) pour
              lui permettre d’acceder à la plateforme. Chaque utilisateur qu’il soit
              étudiant, entreprise ou particulier doit créer un compte personnel sur la
              plateforme. Ce profil est soumis à une vérification préalable pour garantir
              l’authenticité des informations fournies et sécuriser les échanges entre les
              différentes parties. En conséquence, toute création de compte par un (e)
              utilisateur (trice) emporte son adhésion, sans restriction ni réserve, aux
              présentes Conditions Générales d’Utilisation lesquelles prévalent sur tous
              autres documents (prospectus, catalogues... émis par LCE). Toute autre
              condition opposée par l’utilisateur (trice), à défaut d’acceptation
              préalable et expresse par LCE, inopposable à la société, quelque soit le
              moment où elle aura pu être portée à sa connaissance. Si LCE ne se prévaut
              pas ponctuellement de l’une quelconque des dispositions des présentes
              Conditions Générales d’Utilisation, cette tolérance ne peut être interprétée
              comme valant renonciation à se prévaloir ultérieurement de l’une quelconque
              desdites conditions. L’utilisateur (trice) déclare avoir pris connaissance
              et accepter les présentes Conditions Générales d’Utilisation.
            </p>
            <h2 class="text-left">
              <code>ARTICLE 2-FONCTIONNEMENT DE LA PLATEFORME</code>
            </h2>
            <p>
              Le fonctionnement de la plateforme repose sur un processus clair et
              sécurisé, visant à assurer des échanges équitables et transparents entre les
              étudiants en recherche d’un emploi à temps partiel et les entreprises ou
              particuliers en quête de profils qualifiés. Afin de garantir la qualité des
              services proposés et d'assurer le bon déroulement des missions, l’accès à
              certaines fonctionnalités de la plateforme est soumis à un abonnement annuel
              obligatoire, selon deux formules disponibles :
              <span style="font-weight: bold">ECO</span> et
              <span style="font-weight: bold">PLATINUM</span>
            </p>
            <h2 class="text-left">
              <code>ARTICLE 3-ABONNEMENT</code>
            </h2>
            <p>
              L’Abonnement a lieu après avoir renseigné le formulaire d’inscription
              comportant l’identité de l’utilisateur (trice). L’Abonnement mensuel ou
              annuel est payable en ligne par une interface intégrant les paiements par
              mobilemoney, wave, visa ou tout autre moyen présent ou futur accepté par
              l’interface mise à disposition.
            </p>
            <p style="text-align: center">
              (1) Deux (02) abonnements au choix en fonction du type d’utilisateur
            </p>

            <p style="text-align: center; font-weight: bold">ABONNEMENT ETUDIANT</p>
            <p>
              -<span style="font-weight: bold">Formule ECO 10.000 Fcfa / an</span> Offre
              un accès complet aux offres d'emploi disponibles sur la plateforme.
            </p>
            <p>
              -<span style="font-weight: bold">Formule PLATINUM 20.000 Fcfa / an</span>
              Inclut tous les avantages de la formule ECO, avec en plus : La réception
              d'offres d’emploi ciblées par email et dans votre espace personalisé, selon
              les compétences renseignées dans le profil. Une mise en avant prioritaire du
              profil lors des recherches effectuées par les entreprises, augmentant ainsi
              les chances de sélection.
            </p>
            <p style="text-align: center; font-weight: bold">
              ABONNEMENT ENTREPRISES ET PARTICULIERS
            </p>
            <p>
              -<span style="font-weight: bold">Formule ECO 25.000 Fcfa / an</span> Donne
              accès à la base de données des profils étudiants qualifiés. Possibilité de
              publier des offres de mission. Le premier recrutement est gratuit.
            </p>
            <p>
              -<span style="font-weight: bold">Formule PLATINUM 50.000 Fcfa / an </span
              >Accès à la base de profils. Publication illimitée d’offres. Positionnement
              prioritaire des annonces en tête de liste lors des recherches effectuées sur
              la plateforme. Le premier recrutement est gratuit
            </p>
            <p style="text-align: center">(2) Résiliation</p>
            <p>
              A défaut pour l’abonné(e) de résilier son contrat dans un délai minimum d’un
              mois avant la date d’expiration du contrat par lettre recommandée avec
              accusé de réception, son abonnement se renouvellera par tacite reconduction.
              En cas de résiliation, l’abonné(e) restera redevable du montant de
              l’abonnement restant à courir pour sa durée minimale. Il ne sera procédé à
              aucun remboursement. En cas de non-paiement par l’abonné(e) de son
              abonnement aux échéances convenues, LCE pourra procéder à la résiliation du
              contrat d’abonnement sans qu’aucune indemnité de quelque nature que ce soit
              ne soit mise à sa charge. En cas de non utilisation des prestations liées à
              l abonnement, aucun rembousement ne sera effectué.
            </p>
            <h2 class="text-left">
              <code>ARTICLE 4-UTILISATION DE LA PLATEFORME</code>
            </h2>
            <p style="text-align: center">1) Création d’un profil personnel sécurisé</p>
            <p>
              Chaque utilisateur (trice) qu’il soit étudiant, entreprise ou particulier
              doit créer un compte personnel sur la plateforme. Ce profil est soumis à une
              vérification préalable pour garantir l’authenticité des informations
              fournies et sécuriser les échanges entre les différentes parties
            </p>
            <p>1a) Publication d’une offre de mission ou de service</p>
            <p>
              Les entreprises et particuliers agissant en qualité d’etablissement
              d’accueil et /ou de Tuteur peuvent publier librement des offres
              correspondant à leurs besoins spécifiques (missions ponctuelles, projets ou
              services). Chaque annonce doit être claire, précise et conforme aux
              conditions d’utilisation de la plateforme.
            </p>
            <p>1b) Dépôt de candidature ou invitation à postuler</p>
            <p>
              Les étudiants ayant souscrit à un abonnement actif (ECO ou Platinum) peuvent
              consulter les offres disponibles et y postuler selon leurs compétences,
              intérêts et disponibilités. Par ailleurs, les entreprises ont la possibilité
              de sélectionner certains profils à postuler, après consultation des
              informations présentes sur les profils étudiants.Les abonnés Platinum
              bénéficient d’une visibilité accrue, ce qui augmente significativement leurs
              chances d’être sélectionnés directement par les recruteurs.
            </p>
            <p>1c.) Accord mutuel et lancement de la mission</p>
            <p>
              Une fois la candidature acceptée et la mission validée par les deux parties,
              un accord formel est établi. Celui-ci peut prendre la forme d’un contrat ou
              d’un engagement encadré, selon la nature et la durée de la mission. La
              collaboration peut ensuite débuter dans les conditions convenues entre
              l’étudiant et l’Etablissement d’acceuil.
            </p>
            <p>1d.) Valeur contractuelle des échanges</p>
            <p>
              Après la mise en relation entre étudiant et entreprise, le document généré a
              pour seule fonction d’attester que l’étudiant a postulé à une offre via la
              plateforme MonBrobroli. Il ne constitue ni une preuve d’embauche, ni une
              confirmation de réalisation de mission. Il peut néanmoins être utilisé par
              l’étudiant pour Justifier une démarche de candidature auprès d’un recruteur.
            </p>
            <h2 class="text-left">
              <code>ARTICLE 5-OBLIGATIONS DES UTILISATEURS</code>
            </h2>
            <p>
              Afin de garantir un environnement de confiance, respectueux et conforme aux
              principes éthiques portés par la plateforme MonBrobroli, chaque utilisateur
              qu’il soit étudiant, entreprise ou particulier est tenu de respecter les
              obligations qui lui incombent.
            </p>
            <p>5.a) Obligations des étudiants</p>
            <p>Les étudiants utilisant la plateforme s’engagent à :</p>
            <p>
              – Compléter un profil véridique, sincère et régulièrement mis à jour,
              incluant notamment leurs informations personnelles, leurs compétences, leur
              parcours académique ainsi que leur disponibilité
            </p>
            <p>
              – Faire preuve de sérieux, de ponctualité et d’engagement dans l’ensemble
              des missions qu’ils acceptent, en respectant les conditions convenues avec l
              entreprise
            </p>
            <p>
              – Respecter la confidentialité des informations échangées, qu’il s’agisse de
              données professionnelles, personnelles ou sensibles, obtenues dans le cadre
              des échanges ou de l’exécution d’une mission.
            </p>
            <p>5.b) Obligations des entreprises et des particuliers</p>
            <p>
              Les entreprises et les particuliers qui déposent des offres sur la
              plateforme ont la responsabilité de :
            </p>
            <p>
              – Proposer des offres claires, transparentes et conformes à la législation
              ivoirienne en particulier en ce qui concerne les conditions de travail, la
              nature des tâches et la rémunération éventuelle
            </p>
            <p>
              – Garantir des conditions de travail dignes, sûres et adaptées à la mission
              confiée en veillant au respect des droits et à la sécurité des étudiants
              mobilisés
            </p>
            <p>
              – Adopter un comportement éthique et respectueux, en s’interdisant toute
              forme d’exploitation, de harcèlement, de discrimination ou tout autre abus
              pouvant porter atteinte à l’intégrité physique, morale ou professionnelle
              des étudiants.
            </p>
            <p>5.b) SANCTIONS</p>
            <p>
              Tout manquement aux présentes règles d’utilisation, qu’il soit le fait d’un
              étudiant, d’une entreprise ou d’un particulier, est susceptible d’entraîner
              des mesures disciplinaires prises par la plateforme MonBrobroli.En cas de
              non-respect avéré du règlement, la plateforme se réserve expressément le
              droit de :
            </p>
            <p>
              – Suspendre temporairement ou définitivement le compte de l’utilisateur
              concerné selon la gravité des faits constatés
            </p>
            <p>
              – Restreindre l’accès à certaines fonctionnalités de la plateforme,
              notamment la publication d’offres, la candidature à des missions.
            </p>
            <p>
              – Signaler les comportements inappropriés, abusifs ou illégaux aux autorités
              compétentes lorsque la situation l’exige, conformément aux obligations
              légales en vigueur.
            </p>
            <p>
              Ces sanctions visent à préserver un environnement sain, éthique et sécurisé
              pour l’ensemble des utilisateurs, et à faire respecter les principes
              fondamentaux de respect, d’équité et de responsabilité qui régissent la
              plateforme MonBrobroli.
            </p>
            <h2 class="text-left">
              <code>ARTICLE 6-RESPONSABILITE</code>
            </h2>
            <p>
              L’abonné(e) admet expressément que LCE, en qualité d’intermediaire n’est
              tenue qu’à une obligation de moyens. LCE ne saurait par conséquent encourir,
              quel que soit le motif, aucune indemnité de quelque nature que ce soit,
              seule la responsabilité des Utilisateurs peut être engagée suite à un accord
              conclu.
            </p>
            <p>
              L’abonné(e) s’adressera donc directement à son cocontractant toute demande
              de dédommagement ou toute autre demande relative à la signature d’une
              offre.LCE est exonérée de toute responsabilité relative à l’exécution d’un
              contrat à la suite de l’utilisation de la plateforme par les abonnés. En
              tout état de cause, LCE ne saurait être tenue pour responsable de
              l’inexécution de ses obligations en cas de force majeure définie par le Code
              Civil, et notamment en cas de grève totale ou partielle, inondation,
              incendie, panne informatique, etc. (liste non exhaustive).
            </p>
            <h2 class="text-left">
              <code>ARTICLE 7-SECURITE-PROTECTION DES DONNEES A CARACTERE PERSONNEL</code>
            </h2>
            <p>
              MonBrobroli met en œuvre les mesures techniques et organisationnelles
              nécessaires pour assurer un haut niveau de sécurité
            </p>
            <p>La plateforme s’engage à :</p>
            <p>
              - prévenir tout accès non autorisé, et protéger l’intégrité des informations
              confiées par ses utilisateurs.
            </p>
            <p>- Garantir :</p>
            <p>
              *la confidentialité absolue des informations fournies par les utilisateurs
              lors de leur inscription ou de l’utilisation des services
            </p>
            <p>
              *le respect rigoureux de la vie privée conformément aux dispositions légales
              et réglementaires applicables en matière de protection des données (loi
              n°2013-451 du 19 juin 2013 relative à la protection des données à caractère
              personnel).
            </p>
            <p>
              En aucun cas, les données personnelles des utilisateurs ne seront
              communiquées à des tiers sans avoir obtenu au préalable leur consentement
              explicite, libre et éclairé.
            </p>
            <p>
              Par application de la Loi N°2023-450 du 19 juin 2013 relatif à la protection
              des données à caractère personnel par les personnes physiques et morales,
              l’Utilisateur peut à tout moment accéder à ses données, les rectifier et
              demander leur utilisation conformément à la legislation en vigueur,
              s’opposer à un traitement pour des motifs legitmes en formulant une demande
              à l’adresse :
              <a
                href="mailto:contact@monbrobroli.com"
                style="text-decoration: underline; color: purple"
                >contact@monbrobroli.com</a
              >
            </p>
            <p>
              Nature des les données collectées par l’utilisation de la plateforme sont :
            </p>
            <p>
              - Données d’identification : Nom, prénom(s), date et lieu de naissance,
              sexe, signature, photo ;
            </p>
            <p>
              - Données relatives à la formation : diplôme, niveau d’etude, carte
              d’étudiant en cours de validité, ect…
            </p>
            <p>
              -Numéro d’identification national : numéro de téléphone, numéro de la Carte
              nationale d’identité ;
            </p>
            <p>-Données de localisation : adresse géographique (lieu d’habitation) ;</p>
            <p>
              -Données d’ordre économique et financier : Relevé d’identité bancaire (RIB),
              numéro de compte bancaire.
            </p>
            <p>
              Utilisation des données collectées par l’utilisation de la plateforme à des
              fins notamment :
            </p>
            <p>
              -Information pour l’utilisation de la plateforme pour la mise en relation;
            </p>
            <p>-de sollicitations commerciales pour ses biens et services ;</p>
            <p>
              -Lorsqu’elle y a un intérêt légitime et, notamment pour évaluer et améliorer
              le Service.
            </p>
            <p>
              L’Utilisateur reconnait avoir été informé(e) que le traitement de ses
              données personnelles est nécessaire à l'utilisation de la plateforme et
              qu’il peut retirer son consentement à tout moment en adressant une demande à

              <a
                href="mailto:contact@monbrobroli.com"
                style="text-decoration: underline; color: purple"
                >contact@monbrobroli.com</a
              >
            </p>
            <h2 class="text-left">
              <code>ARTICLE 8-LOI APPLICABLE-LITIGE</code>
            </h2>
            <p>
              LCE est une société de droit ivoirien. La loi applicable aux relations
              contractuelles est la loi ivoirienne exclusivement.
            </p>
            <p>
              Tout litige relatif à l’interprétation et à l’exécution des conditions
              générales d’utilisation est soumis au droit ivoirien. A défaut de résolution
              amiable, le litige sera porté devant les tribunaux civils compétents.
            </p>
          </section>
        </div>

        <section class="text-right">
          <button class="btn p-2 bg-warning" @click.prevent="handleRegister">
            {{ !registerStore.isLoading ? "Accepter" : "chargement" }}
          </button>
        </section>
      </div>
    </Dialog>
  </div>
</template>
<style scoped>
.conteneur {
  display: flex;
  justify-content: center;
  background: black;
}
code {
  color: orange !important;
}
p {
  text-align: justify;
  font-size: 1em;
}
</style>
