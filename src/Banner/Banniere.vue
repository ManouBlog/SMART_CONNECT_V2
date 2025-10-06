<script>
import instance, { lienPhoto } from "../api/api";
export default {
  name: "Banniere",
  data() {
    return {
      afficheAll: [],
      lienPhoto: lienPhoto,
    };
  },
  methods: {
    openLink(lien) {
      if (!/^https?:\/\//i.test(lien)) {
        window.open(`https://${lien}`, "_blank");
      } else {
        window.open(lien, "_blank");
      }
    },
    getAllAffiche() {
      instance
        .get("showAffiche/"+'pc')
        .then((res) => {
          // // console.log(res);
          //  // console.log("this.afficheAll",res.data.data)
          this.afficheAll = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          this.afficheAll = [];
        });
    },
  },
  created() {
    this.getAllAffiche();
  },
};
</script>
<template>
  <div class="container-fluid page-title bg-image" style="margin: 2em 0">
    <div class="row section-title">
      <div class="main-container">
        <div
          class="col-lg-12 col-md-12 col-sm-12 mt-2"
          style="
            min-width: 300px;
            height: 400px;
            text-align: center;
            position: relative;
          "
        >
          <n-carousel autoplay :interval="1500">
            <div
              style="
                background: white;
                position: relative;
                width: 100%;
                background:#80808014;
                height: 100%;
                top: 0;
                bottom: 0;
                left: 0;
                left: 0;
              "
              v-for="item in this.afficheAll"
              :key="item.id"
            >
              <img
                class="carousel-img"
                :src="lienPhoto + item.affiche"
                @click="openLink(item.lien)"
              />
            </div>
          </n-carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.carousel-img {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  object-fit: contain;
}
:deep(.n-carousel__dots) {
  background: black !important;
  padding: 0.5em;
}
</style>
