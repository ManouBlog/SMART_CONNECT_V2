<script>
export default {
    name:"CardTimetable",
    data() {
        return{

        }
    },
}
</script>
<template>
    <div>
        <div class="container d-grid">
          <div
            v-for="(emploi, index) in list_emploi"
            :key="index"
            class="card Mycard-body"
          >
            <div class="icons_interesse">
              <em
                v-if="user && user.user.statut.statut != 'etudiant'
                "
                @click="addPersonAtWishLit(emploi)"
                :class="isWhished[emploi.id] ? 'text-danger' : 'null'"
                class="fa-solid fa-heart"
              ></em>
              <em v-else class="fa-solid fa-heart"></em>
            </div>
            <em class="bi bi-person"></em>
            <div class="card-body">
              <h3 class="name">
                {{ emploi.nom }}
                {{ emploi.prenoms }}
              </h3>

              <div class="jour">
                <span v-for="(item, index) in emploi.competences" :key="index">
                  <strong class="bg-teal cpt">{{ item.competence }}</strong>
                </span>
              </div>

              <span class="biStar">
                <Rating v-model="emploi.average" readonly :cancel="false" />
              </span>

              <button
                class="btn bg-primary voirPlus"
                @click="voirDetailTimetable(emploi.id)"
              >
                Voir plus

                <em class="bi bi-eye"></em>
              </button>
            </div>
          </div>
        </div>
      </div>
</template>