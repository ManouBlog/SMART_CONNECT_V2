<script>
// import vue3starRatings from "vue3-star-ratings";
export default {
  name: "BodyExperience",
  props: {
    timetable_for_student: { type: Object },
  },
  components:{
    // vue3starRatings,
  },
  data() {
    return { toogleExperience: false };
  },
};
</script>
<template>
  <section class="section_experience_evaluation">
    <div class="conteneur_section_experience">
        <p
          class="w-100 experience text-left fw-bold"
          style="color: orange;cursor:pointer;"
          v-if="timetable_for_student.experiences.length"
          @click.prevent="toogleExperience = !toogleExperience"
        >
          Expériences
          <em
            class="bi bi-chevron-down"
            v-if="toogleExperience == false"
            :class="toogleExperience == true ? 'd-none' : ''"
          >
          </em>
          <em class="bi bi-chevron-up" v-if="toogleExperience == true"></em>
        </p>
        <div v-if="toogleExperience">
          <div class="conteneur_experience">
            <div
              class="experiences position-relative px-4"
              v-for="(item, index) in timetable_for_student.experiences.slice(0, 1)"
              :key="index"
            >
              <div class="content_experience">
                <div>
                  <h3 class="text-left font-weight-bold">
                    {{ item.entreprise }}
                  </h3>
                  <p class="text-left ms-2 para">
                    <em class="bi bi-calendar-date"></em>
                    {{
                      `${new Date(item.dateDebut).toLocaleDateString()} au ${new Date(
                        item.dateFin
                      ).toLocaleDateString()}`
                    }}
                  </p>
                  <p class="text-left ms-2 font-weight-bold para">
                    Poste occupé : {{ item.poste }}
                  </p>
                </div>
                <hr />
              </div>
            </div>
            <button class="btn bg-warning">Voir plus</button>
          </div>
        </div>
      </div>
    <div class="conteneur_evaluation_experience">
      <h5 class="text-left evaluation" v-if="timetable_for_student?.etoiles.length">
        <span> ( {{ timetable_for_student?.etoiles.length }} )</span>
        Evaluations/avis
      </h5>
      <div class="container-testominal">
        <div class="carrousel_container_testominal">
            <a-carousel arrows>
                <template #prevArrow>
                  <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                    <left-circle-outlined />
                  </div>
                </template>
                <template #nextArrow>
                  <div class="custom-slick-arrow" style="right: 10px">
                    <right-circle-outlined />
                  </div>
                </template>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
              </a-carousel>
        </div>
      </div>
      
     
      <!-- <div class="commentaires">
        <div
          class="experiences position-relative px-4"
          v-for="(item, index) in paginatedData"
          :key="index"
        >
          <div class="content_commentaire">
            <hr />
            <div class="d-flex my-2">
              <vue3starRatings
                v-model="item.notes"
                :showControl="false"
                :starSize="13"
                :disableClick="true"
              />
              <span class="mx-3"> Noté par : {{ item?.entreprise.nom }} </span>
            </div>

            <div class="conteneur_ecriteau">
              <span v-if="item.offre" class="my-3"
                >Poste occupé : {{ item.offre.nom_offre }}</span
              >
              <p class="avis_cont my-3">{{ item.avis }}</p>
            </div>
          </div>
        </div>
      </div>
      <ul class="pagination justify-content-center conteneur_pagination">
        <li class="fs-5">
          <button @click="onClickFirstPage" :disabled="isInFirstPage">&laquo;</button>
        </li>
        <li class="fs-5">
          <button
            class="pagination_btn"
            v-for="(page, index) in pages"
            :key="index"
            @click="onClickPage(page.number)"
            :class="{ color: isPageActive(page.number) }"
          >
            {{ page.number }}
          </button>
        </li>
        <li class="fs-5">
          <button @click="onClickNextPage" :disabled="isInLastPage">&raquo;</button>
        </li>
      </ul> -->
    </div>
    
  </section>
</template>
<style scoped>
.carrousel_container_testominal{
    position: absolute;
    top:0;
    left:0;
    right:0;
    width:100%;
    height:100%;
}
.container-testominal{
    width:100%;
    position: relative;
    height: 200px;
    border-radius:20px;
}
:deep(.slick-slide) {
    text-align: center;
    height: 200px;
    border-radius:20px;
    line-height: 200px;
    background: #364d79;
    overflow: hidden;
  }
  
  :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1000;
  }
  :deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
  }
  :deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 0.5;
  }
  
  :deep(.slick-slide h3) {
    color: #fff;
  }

.section_experience_evaluation{
    display: flex;
    align-content: center;
    gap:1em;
    justify-content: space-between;
    flex-wrap: wrap;
}
.section_experience_evaluation .conteneur_section_experience{
    flex:2 2 300px;
}
.section_experience_evaluation .conteneur_evaluation_experience{
    flex:1 1 300px;
}
.info_student_detail {
  text-transform: capitalize;
}
.bi-person {
  font-size: 4em;
}
.section_student_header {
  display: flex;
  gap: 1em;
  align-items: flex-start;
}
</style>
