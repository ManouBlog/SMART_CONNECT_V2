<script setup>
import Dialog from "primevue/dialog";
import { useRegisterStore } from "../../store-pinia/register/useRegisterStore";


// Store Pinia
const registerStore = useRegisterStore();

// Méthodes
const registerTalent = () => {
  // console.log("props.payload", registerStore.payload);
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
  case 'entreprise':
    registerEntreprise();
    break;
  case 'particulier':
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
      :style="{ width: '60rem',zIndex:99999 }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
         <div class="myconteneur">
    <h1
      style="
        text-align: center;
        font-size: 3.5vh;
        padding: 1em;
        color: orange;
        font-weight: bold;
      "
    >
      CGU(conditions générale d'utilisation)
    </h1>
    <p
      class="p-4"
      style="padding: 1.5em; font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;"
    >
      MonBrobroli est une plateforme en ligne qui a pour vocation principale de mettre en
      relation de manière transparente et équilibrée les étudiants et les entreprises
      ainsi que les particuliers. Cette plateforme facilite ainsi l’accès des étudiants à
      des opportunités ponctuelles ou à temps partiel, tels que des emplois.
      <br />
      Elle offre en parallèle aux entreprises et aux particuliers la possibilité de
      répondre à leurs besoins flexibles en s’appuyant sur des profils jeunes, compétents
      et disponibles. Il est important de souligner que MonBrobroli se limite à cette
      fonction de mise en relation.
      <br />
      Toute interaction, accord ou engagement contractuel intervenant entre les parties
      après cette mise en relation relève exclusivement de leur responsabilité. La
      plateforme ne saurait être tenue responsable du suivi, de la réalisation ou de
      l’exécution des missions convenues.
      <br />
      Ainsi, MonBrobroli contribue à créer une valeur ajoutée sociale et économique, en
      favorisant des échanges locaux, équitables et sécurisés entre étudiants et
      entreprises potentiels.
      <br />
      La plateforme s’adresse à un public varié, réunissant des acteurs aux besoins
      complémentaires, dans une dynamique de collaboration constructive et de valorisation
      des compétences locales. Les étudiants, inscrits dans un établissement
      d’enseignement supérieur reconnu en Côte d’Ivoire, y trouvent une opportunité
      concrète de mettre en pratique leurs connaissances, de développer leurs compétences
      professionnelles et de bénéficier d’un revenu complémentaire. La plateforme leur
      permet de s’engager dans des expériences enrichissantes et formatrices. Les
      entreprises tous secteurs confondus, peuvent accéder à un vivier de jeunes talents
      disponibles, motivés. En recourant aux services proposés aux étudiants, elles
      répondent efficacement à des besoins spécifiques, tout en contribuant au
      développement professionnel de la jeunesse locale. Cette mise en relation repose sur
      des valeurs de proximité, de confiance et de solidarité, offrant une solution
      pratique et accessible tout en soutenant l’engagement des jeunes dans la vie active.
      En facilitant ces interactions, la plateforme se positionne comme un véritable trait
      d’union entre les aspirations des étudiants et les besoins ponctuels des entreprises
      ou des particuliers, au service d’un impact social et économique durable.
    </p>

    <section
      class="p-4 row"
      style="padding: 3.5em; font-family: 'Roboto', 'Segoe UI', Arial, sans-serif"
    >
      <h1 class="text-left">
        <code>1) PRINCIPES DE FONCTIONNEMENT DE LA PLATEFORME</code>
      </h1>
      <p>
        Le fonctionnement de la plateforme repose sur un processus clair et sécurisé,
        visant à assurer des échanges équitables et transparents entre les étudiants en
        recherche d’un emploi à temps partiel et les entreprises ou particuliers en quête
        de profils qualifiés. Afin de garantir la qualité des services proposés et
        d'assurer le bon déroulement des missions, l’accès à certaines fonctionnalités de
        la plateforme est soumis à un abonnement annuel obligatoire, selon deux formules
        disponibles : Standard et Premium.
      </p>
      <code style="font-size: 2em">1.a)Création d’un profil personnel sécurisé</code>
      <p style="margin: 1em 0">
        Chaque utilisateur qu’il soit étudiant, entreprise ou particulier doit créer un
        compte personnel sur la plateforme. Ce profil est soumis à une vérification
        préalable pour garantir l’authenticité des informations fournies et sécuriser les
        échanges entre les différentes parties.
      </p>
      <p>
        Pour les étudiants, l’abonnement annuel est requis apres la création du compte
        pour accéder aux offres et postuler :
      </p>

      <p>
        -Formule Standard 5.000 F / an Offre un accès complet aux offres d'emploi
        disponibles sur la plateforme.
        <br />
        <br />
        -Formule Premium 15.000 F / an Inclut tous les avantages de la formule Standard,
        avec en plus : La réception d'offres d’emploi ciblées par email, selon les
        compétences renseignées dans le profil. Une mise en avant prioritaire du profil
        lors des recherches effectuées par les entreprises, augmentant ainsi les chances
        de sélection.
      </p>
      <p>
        Pour les entreprises et particuliers, l’accès aux services de publication d’offres
        et de consultation des profils est également conditionné par un abonnement annuel
        :
      </p>
      <p>
        -Formule Standard 10.000 F CFA / an Accès à la base de données des profils
        étudiants qualifiés. Possibilité de publier des offres de mission.
        <br />
        <br />
        -Formule Premium 25.000 F CFA / an Accès à la base de profils. Publication
        illimitée d’offres. Positionnement prioritaire des annonces en tête de liste lors
        des recherches effectuées sur la plateforme.
      </p>
      <code style="font-size: 2em"
        >1.b)Publication d’une offre de mission ou de service</code
      >
      <p>
        Les entreprises et particuliers peuvent publier librement des offres correspondant
        à leurs besoins spécifiques (missions ponctuelles, projets ou services). Chaque
        annonce doit être claire, précise et conforme aux conditions d’utilisation de la
        plateforme.
      </p>
      <code style="font-size: 2em"
        >1.c)Dépôt de candidature ou invitation à postuler</code
      >
      <p>
        Les étudiants ayant souscrit un abonnement actif (Standard ou Premium) peuvent
        consulter les offres disponibles et y postuler selon leurs compétences, intérêts
        et disponibilités.
      </p>
      <p>
        Par ailleurs, les entreprises ont la possibilité de sélectionner certains profils
        à postuler, après consultation des informations présentes sur les profils
        étudiants.
      </p>
      <p>
        Les abonnés Premium bénéficient d’une visibilité accrue, ce qui augmente
        significativement leurs chances d’être sélectionnés directement par les
        recruteurs.
      </p>
      <code style="font-size: 2em">1.d)Accord mutuel et lancement de la mission</code>
      <p>
        Une fois la candidature acceptée et la mission validée par les deux parties, un
        accord formel est établi. Celui-ci peut prendre la forme d’un contrat ou d’un
        engagement encadré, selon la nature et la durée de la mission. La collaboration
        peut ensuite débuter dans les conditions convenues entre l’étudiant et
        l’employeur.
      </p>
      <h1 class="text-left">
        <code>2)VALEUR CONTRACTUELLE DES ECHANGES </code>
      </h1>
      <p>
        Apres la mise en relation entre étudiant et entreprise, le document généré a pour
        seule fonction d’attester que l’étudiant a postulé à une offre via la plateforme
        MonBrobroli.
      </p>
      <p>
        Il ne constitue ni une preuve d’embauche, ni une confirmation de réalisation de
        mission. Il peut néanmoins être utilisé par l’étudiant pour Justifier une démarche
        de candidature auprès d’un recruteur.
      </p>
      <h1 class="text-left">
        <code>3)OBLIGATIONS DES UTILISATEURS</code>
      </h1>
      <p>
        Afin de garantir un environnement de confiance, respectueux et conforme aux
        principes éthiques portés par la plateforme MonBrobroli, chaque utilisateur qu’il
        soit étudiant, entreprise ou particulier est tenu de respecter les obligations qui
        lui incombent.
      </p>
      <code style="font-size: 2em">3.a)Obligations des étudiants</code>
      <p>Les étudiants utilisant la plateforme s’engagent à :</p>
      <p>
        – Compléter un profil véridique, sincère et régulièrement mis à jour, incluant
        notamment leurs informations personnelles, leurs compétences, leur parcours
        académique ainsi que leur disponibilité <br />
        – Faire preuve de sérieux, de ponctualité et d’engagement dans l’ensemble des
        missions qu’ils acceptent, en respectant les conditions convenues avec l
        entreprise <br />
        – Respecter la confidentialité des informations échangées, qu’il s’agisse de
        données professionnelles, personnelles ou sensibles, obtenues dans le cadre des
        échanges ou de l’exécution d’une mission.
      </p>
      <code style="font-size: 2em"
        >3.b)Obligations des entreprises et des particuliers</code
      >
      <p>
        Les entreprises et les particuliers qui déposent des offres sur la plateforme ont
        la responsabilité de :
      </p>
      <p>
        – Proposer des offres claires, transparentes et conformes à la législation
        ivoirienne en particulier en ce qui concerne les conditions de travail, la nature
        des tâches et la rémunération éventuelle
        <br />
        – Garantir des conditions de travail dignes, sûres et adaptées à la mission
        confiée en veillant au respect des droits et à la sécurité des étudiants mobilisés
        <br />
        – Adopter un comportement éthique et respectueux, en s’interdisant toute forme
        d’exploitation, de harcèlement, de discrimination ou tout autre abus pouvant
        porter atteinte à l’intégrité physique, morale ou professionnelle des étudiants.
      </p>

      <h1 class="text-left">
        <code>4)SECURITE ET CONFIDENTIALITE</code>
      </h1>
      <p>
        MonBrobroli accorde une importance fondamentale à la protection des données
        personnelles de ses utilisateurs, ainsi qu’au respect de leur vie privée.
      </p>
      <p>La plateforme s’engage à garantir :</p>
      <p>
        – la confidentialité absolue des informations fournies par les utilisateurs lors
        de leur inscription ou de l’utilisation des services
        <br />
        – le respect rigoureux de la vie privée conformément aux dispositions légales et
        réglementaires applicables en matière de protection des données (loi n°2013-451 du
        19 juin 2013 relative à la protection des données à caractère personnel).
        <br />
        En aucun cas, les données personnelles des utilisateurs ne seront communiquées à
        des tiers sans avoir obtenu au préalable leur consentement explicite, libre et
        éclairé.
      </p>
      <p>
        MonBrobroli met en œuvre les mesures techniques et organisationnelles nécessaires
        pour assurer un haut niveau de sécurité, prévenir tout accès non autorisé, et
        protéger l’intégrité des informations confiées par ses utilisateurs.
      </p>
      <h1 class="text-left">
        <code>5)SANCTIONS</code>
      </h1>
      <p>
        Tout manquement aux présentes règles d’utilisation, qu’il soit le fait d’un
        étudiant, d’une entreprise ou d’un particulier, est susceptible d’entraîner des
        mesures disciplinaires prises par la plateforme MonBrobroli.
      </p>
      <p>
        En cas de non-respect avéré du règlement, la plateforme se réserve expressément le
        droit de :
      </p>
      <p>
        – Suspendre temporairement ou définitivement le compte de l’utilisateur concerné
        selon la gravité des faits constatés
        <br />
        – Restreindre l’accès à certaines fonctionnalités de la plateforme, notamment la
        publication d’offres, la candidature à des missions.
        <br />
        – Signaler les comportements inappropriés, abusifs ou illégaux aux autorités
        compétentes lorsque la situation l’exige, conformément aux obligations légales en
        vigueur.
        <br />
        Ces sanctions visent à préserver un environnement sain, éthique et sécurisé pour
        l’ensemble des utilisateurs, et à faire respecter les principes fondamentaux de
        respect, d’équité et de responsabilité qui régissent la plateforme MonBrobroli.
      </p>

      <h1 class="text-left">
        <code>6)ACCESSIBILITE</code>
      </h1>
      <p>
        La plateforme MonBrobroli est disponible en continu, 24 heures sur 24, et
        accessible depuis tout type d’appareil connecté, qu’il s’agisse de smartphones, de
        tablettes ou d’ordinateurs.
      </p>
      <p>
        L’accès aux services proposés n’est toutefois pas gratuit pour l’ensemble des
        utilisateurs. En effet, certaines prestations, notamment des services premium
        destinés aux entreprises et aux particuliers, peuvent être proposées moyennant une
        tarification adaptée à leurs besoins spécifiques.
      </p>
    </section>
  </div>
        <!-- <section class="px-4 row">
          <h1 class="text-left">
            <code>Réglement 1 : Donneés à caractère personnel</code>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Accumsan sit amet nulla facilisi.
            Dolor sit amet consectetur adipiscing elit ut aliquam. Vulputate eu
            scelerisque felis imperdiet proin. Leo integer malesuada nunc vel. Justo nec
            ultrices dui sapien eget mi proin sed. Molestie ac feugiat sed lectus
            vestibulum mattis ullamcorper velit sed. Semper auctor neque vitae tempus quam
            pellentesque nec nam. Consequat interdum varius sit amet mattis vulputate.
            Turpis cursus in hac habitasse. Arcu vitae elementum curabitur vitae nunc sed
            velit dignissim sodales. Vehicula ipsum a arcu cursus vitae. Tellus
            pellentesque eu tincidunt tortor aliquam. Tempus urna et pharetra pharetra. In
            aliquam sem fringilla ut morbi tincidunt augue interdum. Ultricies integer
            quis auctor elit sed vulputate mi. Arcu cursus vitae congue mauris rhoncus
            aenean vel. Ultrices in iaculis nunc sed augue lacus viverra vitae. Cursus
            vitae congue mauris rhoncus aenean vel. In nisl nisi scelerisque eu ultrices.
            Neque vitae tempus quam pellentesque. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam quis. Pellentesque habitant morbi tristique
            senectus et. Imperdiet sed euismod nisi porta lorem mollis aliquam. Quis
            hendrerit dolor magna eget est lorem ipsum dolor. Id aliquet risus feugiat in
            ante metus dictum. Varius sit amet mattis vulputate enim nulla aliquet
            porttitor. Sit amet consectetur adipiscing elit duis. Neque gravida in
            fermentum et sollicitudin. Congue eu consequat ac felis donec et odio
            pellentesque diam. Turpis egestas integer eget aliquet nibh praesent tristique
            magna sit. Nec ullamcorper sit amet risus. Est ultricies integer quis auctor
            elit sed vulputate. Aliquam faucibus purus in massa tempor nec feugiat. At
            lectus urna duis convallis convallis. Elementum nibh tellus molestie nunc non
            blandit massa. Vivamus at augue eget arcu dictum varius. Phasellus egestas
            tellus rutrum tellus pellentesque eu tincidunt tortor. Varius vel pharetra vel
            turpis nunc eget. Dignissim cras tincidunt lobortis feugiat vivamus. Etiam non
            quam lacus suspendisse faucibus interdum posuere. Malesuada nunc vel risus
            commodo viverra maecenas accumsan lacus vel. Ullamcorper sit amet risus nullam
            eget. Placerat vestibulum lectus mauris ultrices eros in cursus. Nulla
            pellentesque dignissim enim sit amet venenatis urna cursus eget. Volutpat odio
            facilisis mauris sit amet massa vitae tortor condimentum. Donec et odio
            pellentesque diam volutpat. Massa massa ultricies mi quis hendrerit dolor. Ac
            tortor dignissim convallis aenean et. Dis parturient montes nascetur
            ridiculus. Eu volutpat odio facilisis mauris sit. Porttitor massa id neque
            aliquam. Dui ut ornare lectus sit amet. Sem fringilla ut morbi tincidunt augue
            interdum velit euismod. Id nibh tortor id aliquet lectus proin nibh. Nulla
            pellentesque dignissim enim sit. Faucibus nisl tincidunt eget nullam. Purus ut
            faucibus pulvinar elementum integer enim neque volutpat ac. Gravida in
            fermentum et sollicitudin ac orci phasellus egestas tellus. Fames ac turpis
            egestas integer eget aliquet nibh praesent. Odio facilisis mauris sit amet.
            Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. In
            aliquam sem fringilla ut. Cras pulvinar mattis nunc sed blandit libero.
            Integer quis auctor elit sed vulputate mi. A diam maecenas sed enim ut sem.
            Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris.
            Sagittis nisl rhoncus mattis rhoncus urna neque viverra. Metus vulputate eu
            scelerisque felis. Elit pellentesque habitant morbi tristique. Aliquam purus
            sit amet luctus venenatis. Sollicitudin tempor id eu nisl nunc mi. Sit amet
            cursus sit amet. Eget egestas purus viverra accumsan in. Purus gravida quis
            blandit turpis cursus in hac habitasse platea. Nibh tellus molestie nunc non
            blandit massa enim nec. A lacus vestibulum sed arcu non odio euismod lacinia.
            Erat velit scelerisque in dictum. Nibh venenatis cras sed felis eget velit.
            Aliquam id diam maecenas ultricies mi. Gravida neque convallis a cras semper
            auctor. Tellus cras adipiscing enim eu turpis egestas pretium. Morbi tempus
            iaculis urna id volutpat. Amet volutpat consequat mauris nunc congue nisi
            vitae suscipit. Odio morbi quis commodo odio aenean. Viverra nibh cras
            pulvinar mattis nunc sed blandit libero. Tristique sollicitudin nibh sit amet.
            Risus sed vulputate odio ut enim blandit volutpat. Mi quis hendrerit dolor
            magna eget est lorem ipsum dolor. Varius quam quisque id diam vel. Turpis
            egestas maecenas pharetra convallis. Donec ac odio tempor orci. At ultrices mi
            tempus imperdiet nulla malesuada pellentesque. Ornare arcu odio ut sem nulla
            pharetra diam. Nibh nisl condimentum id venenatis a condimentum vitae sapien
            pellentesque. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur
            adipiscing. Diam maecenas ultricies mi eget mauris pharetra et ultrices neque.
            Sit amet consectetur adipiscing elit. Lobortis elementum nibh tellus molestie
            nunc. Rhoncus aenean vel elit scelerisque mauris. Faucibus vitae aliquet nec
            ullamcorper sit. Nullam non nisi est sit amet facilisis magna. Laoreet id
            donec ultrices tincidunt arcu non. Fusce id velit ut tortor pretium viverra
            suspendisse potenti nullam. Amet consectetur adipiscing elit pellentesque
            habitant morbi tristique. Non enim praesent elementum facilisis leo vel. Arcu
            odio ut sem nulla. At quis risus sed vulputate odio ut enim. Mattis
            pellentesque id nibh tortor id aliquet lectus. Turpis massa tincidunt dui ut
            ornare lectus. Hac habitasse platea dictumst vestibulum rhoncus est
            pellentesque elit ullamcorper. Fermentum leo vel orci porta non pulvinar neque
            laoreet suspendisse. Libero id faucibus nisl tincidunt eget nullam. Aliquam
            vestibulum morbi blandit cursus risus at. Quam lacus suspendisse faucibus
            interdum posuere lorem ipsum dolor sit. Adipiscing diam donec adipiscing
            tristique risus nec feugiat in. Id aliquet risus feugiat in ante metus dictum
            at tempor. Leo duis ut diam quam nulla. Faucibus vitae aliquet nec ullamcorper
            sit amet. Sem integer vitae justo eget magna fermentum. Massa sed elementum
            tempus egestas sed sed risus pretium. Ut placerat orci nulla pellentesque. Non
            enim praesent elementum facilisis leo vel. Est velit egestas dui id ornare
            arcu. Massa tincidunt dui ut ornare lectus sit amet est. Feugiat in fermentum
            posuere urna. Egestas integer eget aliquet nibh praesent tristique magna sit
            amet. At volutpat diam ut venenatis tellus in metus. Amet nulla facilisi morbi
            tempus iaculis urna id volutpat. Tellus orci ac auctor augue mauris augue
            neque gravida in. Est pellentesque elit ullamcorper dignissim. Tempus egestas
            sed sed risus pretium quam vulputate dignissim suspendisse. Auctor neque vitae
            tempus quam pellentesque nec. Gravida neque convallis a cras semper. Tristique
            senectus et netus et malesuada fames ac turpis egestas. Arcu odio ut sem nulla
            pharetra. Viverra accumsan in nisl nisi scelerisque eu ultrices. Rhoncus
            mattis rhoncus urna neque viverra justo nec ultrices. Nunc aliquet bibendum
            enim facilisis gravida neque convallis a. At lectus urna duis convallis
            convallis tellus id. Sem fringilla ut morbi tincidunt. Amet justo donec enim
            diam vulputate ut pharetra. Cursus sit amet dictum sit amet justo donec enim.
            Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Justo
            eget magna fermentum iaculis eu non diam. Urna duis convallis convallis tellus
            id interdum. Velit aliquet sagittis id consectetur.
          </p>
          <h1 class="text-left">
            <code>Réglement 2 : Collecte et traitement des données</code>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Justo nec ultrices dui sapien
            eget mi proin sed libero. Adipiscing diam donec adipiscing tristique risus.
            Sit amet luctus venenatis lectus. Cras tincidunt lobortis feugiat vivamus at
            augue. Pellentesque eu tincidunt tortor aliquam. Natoque penatibus et magnis
            dis parturient montes nascetur. Purus semper eget duis at tellus at urna
            condimentum mattis. A lacus vestibulum sed arcu non odio euismod lacinia. At
            ultrices mi tempus imperdiet nulla malesuada pellentesque. Ipsum faucibus
            vitae aliquet nec ullamcorper sit amet risus nullam. Porta nibh venenatis cras
            sed felis eget velit aliquet sagittis. Eget nunc lobortis mattis aliquam
            faucibus purus. Euismod lacinia at quis risus sed vulputate odio ut. Tellus id
            interdum velit laoreet id donec ultrices tincidunt arcu. Vestibulum sed arcu
            non odio euismod lacinia at quis. Lorem ipsum dolor sit amet consectetur
            adipiscing elit pellentesque. Ultrices in iaculis nunc sed augue lacus
            viverra. Id porta nibh venenatis cras sed. Scelerisque eu ultrices vitae
            auctor eu augue. Iaculis urna id volutpat lacus. Dictumst quisque sagittis
            purus sit amet volutpat. Dui faucibus in ornare quam viverra orci. Nulla
            porttitor massa id neque aliquam vestibulum morbi. Blandit volutpat maecenas
            volutpat blandit aliquam etiam erat velit scelerisque. At quis risus sed
            vulputate odio ut enim. Nibh venenatis cras sed felis eget velit. Vulputate
            dignissim suspendisse in est ante in. Massa vitae tortor condimentum lacinia
            quis vel. Venenatis tellus in metus vulputate eu scelerisque. Lorem ipsum
            dolor sit amet consectetur adipiscing. Massa massa ultricies mi quis hendrerit
            dolor. Ornare aenean euismod elementum nisi quis eleifend quam. Odio euismod
            lacinia at quis risus. Tristique risus nec feugiat in fermentum posuere urna.
            Non tellus orci ac auctor augue mauris augue. Pharetra pharetra massa massa
            ultricies mi quis hendrerit dolor. Magna etiam tempor orci eu lobortis.
            Malesuada fames ac turpis egestas. Praesent tristique magna sit amet purus
            gravida quis blandit. Feugiat vivamus at augue eget. Mauris rhoncus aenean vel
            elit. Vehicula ipsum a arcu cursus vitae congue mauris. Ipsum dolor sit amet
            consectetur adipiscing elit duis tristique. Turpis massa tincidunt dui ut
            ornare lectus sit amet est. Tellus mauris a diam maecenas. Sagittis id
            consectetur purus ut faucibus. Nibh cras pulvinar mattis nunc sed blandit
            libero volutpat. Diam vulputate ut pharetra sit amet aliquam id. Eu lobortis
            elementum nibh tellus. Natoque penatibus et magnis dis parturient montes
            nascetur ridiculus mus. Venenatis tellus in metus vulputate eu scelerisque
            felis imperdiet proin. Felis eget nunc lobortis mattis aliquam faucibus.
            Elementum sagittis vitae et leo duis ut diam quam nulla. Neque viverra justo
            nec ultrices dui sapien eget. At elementum eu facilisis sed odio. Justo eget
            magna fermentum iaculis eu non diam phasellus vestibulum. Facilisis volutpat
            est velit egestas. Scelerisque varius morbi enim nunc faucibus a pellentesque
            sit amet. Cursus sit amet dictum sit amet justo donec enim diam. Lectus arcu
            bibendum at varius vel pharetra vel turpis. Turpis tincidunt id aliquet risus
            feugiat in. Non odio euismod lacinia at quis. Sem viverra aliquet eget sit
            amet tellus cras adipiscing enim. Lobortis mattis aliquam faucibus purus. Sit
            amet luctus venenatis lectus magna fringilla. Gravida arcu ac tortor
            dignissim. Massa sapien faucibus et molestie ac feugiat. Venenatis urna cursus
            eget nunc scelerisque viverra. Maecenas accumsan lacus vel facilisis volutpat
            est velit egestas. Tincidunt id aliquet risus feugiat in ante metus. Sagittis
            vitae et leo duis ut diam quam. Viverra tellus in hac habitasse platea
            dictumst. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus
            mauris. Mauris ultrices eros in cursus. Ornare massa eget egestas purus
            viverra accumsan in nisl nisi. Aliquet sagittis id consectetur purus ut
            faucibus pulvinar. Quam id leo in vitae turpis massa. Duis at consectetur
            lorem donec massa sapien faucibus et. Metus vulputate eu scelerisque felis
            imperdiet proin fermentum leo vel. Quis auctor elit sed vulputate mi sit amet
            mauris. Id porta nibh venenatis cras sed felis. Diam ut venenatis tellus in
            metus vulputate. Fringilla est ullamcorper eget nulla. Scelerisque eleifend
            donec pretium vulputate sapien. Vel turpis nunc eget lorem dolor. Elit
            ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Sit amet nulla
            facilisi morbi tempus iaculis urna.
          </p>
          <h1 class="text-left">
            <code>Réglement 3 : Contacter un personnel</code>
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae ipsa
            dignissimos minus fugiat velit quaerat non provident laudantium corporis
            aliquam. Tenetur in error excepturi pariatur voluptatem recusandae eos
            nesciunt ut.
          </p>
          <h1 class="text-left">
            <code>Réglement 4 : Postuler à une offre</code>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate excepturi
            at, pariatur cum reiciendis illum a culpa nobis ex, provident deleniti veniam
            dignissimos! Voluptatum fugiat tenetur repellat ad similique reprehenderit!
          </p>
          <h1 class="text-left">
            <code>Réglement 4 : Securité</code>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate excepturi
            at, pariatur cum reiciendis illum a culpa nobis ex, provident deleniti veniam
            dignissimos! Voluptatum fugiat tenetur repellat ad similique reprehenderit!
          </p>
        </section> -->
        <section class="text-right">
          <button class="btn-lg p-2 bg-warning" 
          @click.prevent="handleRegister">
            {{!registerStore.isLoading ? 'Accepter':'chargement'}}
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
  font-size:1em;
}
</style>
