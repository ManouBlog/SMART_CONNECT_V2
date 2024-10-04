<script>
import ImageView from "./ImageView.vue";
export default {
  name: "AppMobileView",
  components: {
    ImageView,
  },
  data() {
    return {
      illustrationData: [
        {
          lien: require("../../../assets/googleplay.png"),
          alt_img: "googleplay",
        },
        {
          lien: require("../../../assets/app_store.png"),
          alt_img: "app_store",
        },
      ],
      illustrationApp: require("../../../assets/illustration_app.png"),
    };
  },
};
</script>
<template>
  <div class="header_banner py-3">
    <div class="ecriteau">
      <h1>
        Télécharger notre <br />
        application mobile
      </h1>
      <h6 class="my-5 text-center">
        Trouver des offres, ressources partout ou vous êtes
      </h6>
      <div class="conteneur_logo_app_telechargement">
        <ImageView
          v-for="(item, index) in illustrationData"
          :key="index"
          :lien_img_folder="item.lien"
          :name_class_img="'w-25 mx-2'"
          :alt_img="item.alt_img"
        />
      </div>
    </div>
    <div class="ecriteau_image">
      <ImageView
        :lien_img_folder="illustrationApp"
        :name_class_img="'position-absolute w-50 image'"
        :alt_img="'illustration_app'"
      />
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
  font-size: 3em;
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
