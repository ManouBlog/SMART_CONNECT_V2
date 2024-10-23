<script>
import Buttons from "../../../Shared/Compoments/Buttons.vue";
export default {
  name: "RechercheOffre",
  components: { Buttons },
  data() {
    return {
      elmentsOfBtn: [
        {
          name_btn: "En savoir plus",
          color_btn: "primary",
        },
      ],
    };
  },
};
</script>
<template>
  <div class="header_banner">
    <div class="ecriteau_image">
      <img
        src="../../../assets/search_offre.png"
        class="position-absolute image"
        alt=""
      />
    </div>
    <div class="ecriteau">
      <h1 class="fw-bold">{{$t("Home.rechercheOffre.title")}}</h1>
      <h5 class="my-5 text-center">
        {{$t("Home.rechercheOffre.description1")}} <br />
        {{$t("Home.rechercheOffre.description2")}} <br />
        {{$t("Home.rechercheOffre.description3")}}
      </h5>
      <Buttons :elmentsOfBtn="elmentsOfBtn" :shapeBtn="'round'" />
    </div>
  </div>
</template>
<style scoped>
.image {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
}
.ecriteau_image {
  position: relative;
  flex: 2 2 200px;
}
.ecriteau {
  padding: 0 0 0 1.5em;
  flex: 3 3 200px;
}
.ecriteau > h1 {
  font-weight: bold;
  font-size: 4em;
}
.header_banner {
  width: 100%;
  height: auto;
  padding: 0 0 1em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
