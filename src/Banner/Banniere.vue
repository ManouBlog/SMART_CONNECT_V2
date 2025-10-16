<script>
import instance, { lienPhoto } from "../api/api";
import { useWindowSize } from '@vueuse/core'
const { width: windowWidth } = useWindowSize();
export default {
  name: "Banniere",
  data() {
    return {
      windowWidth:windowWidth,
      afficheAll: [],
      lienPhoto: lienPhoto,
      afficheDefault: [
        {
          iphone: require("../assets/mobile/baniere_1.png"),
          ipad:require("../assets/ipad/baniere_1.png"),
          pc:require("../assets/baniere_1.png"),
        },
        {
          iphone: require("../assets/mobile/baniere_2.png"),
          ipad:require("../assets/ipad/baniere_2.png"),
          pc:require("../assets/baniere_2.png"),
        },
        {
           iphone: require("../assets/mobile/baniere_3.png"),
          ipad:require("../assets/ipad/baniere_3.png"),
          pc:require("../assets/baniere_3.png"),
        },
      ],
      // afficheDefault_pc: [
      //   require("../assets/baniere_1.png"),
      //   require("../assets/baniere_2.png"),
      //   require("../assets/baniere_3.png"),
      // ],
      // afficheDefault_ipad: [
      //   require("../assets/ipad/baniere_1.png"),
      //   require("../assets/ipad/baniere_2.png"),
      //   require("../assets/ipad/baniere_3.png"),
      // ],
      // afficheDefault_iphone: [
      //   require("../assets/mobile/baniere_1.png"),
      //   require("../assets/mobile/baniere_2.png"),
      //   require("../assets/mobile/baniere_3.png"),
      // ],
      afficheShow: [],
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
        .get("showAffiche/" + "pc")
        .then((res) => {
          this.afficheAll = res.data.data;
          if (this.afficheAll.length > 0) {
            this.afficheShow = this.afficheAll;
          } else {
            this.afficheShow = this.afficheDefault;
          }
        })
        .catch((err) => {
          console.log(err);
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
          style="min-width: 300px; height: 400px; text-align: center; position: relative"
        >
          <n-carousel autoplay :interval="3000">
            <div
              style="
                background: #80808024;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center; /* centre verticalement */
                justify-content: center; /* centre horizontalement */
              "
            >
              <div class="text-center">
                <h1
                  style="
                    font-family: 'Poppins', sans-serif;
                    font-size: 2.5rem;
                    color: orange;
                    text-align: center;
                    font-weight: bold;
                  "
                >
                  Affichez-vous ici pour plus de visibilité.
                </h1>
                <h3
                  style="
                    font-family: 'Poppins', sans-serif;
                    font-size: 2.5rem;
                    color: orange;
                    font-weight: bold;
                    text-align: center;
                  "
                >
                  +225 0707969672 / +225 0546667766
                </h3>
              </div>
            </div>
            <div
              style="
                position: relative;
                width: 100%;
                height: 100%;
                top: 0;
                bottom: 0;
                left: 0;
                left: 0;
              "
              v-for="(item, index) in this.afficheShow"
              :key="index"
            >
              <img
                v-if="item.lien"
                class="carousel-img"
                :src="lienPhoto + item.affiche"
                @click="openLink(item.lien)"
              />
              <div v-else>
                <img
                v-if="windowWidth > 1200"
                :src="item.pc"
                class="carousel-img"
                :alt="`Bannière ${index + 1}`"
              />
               <img
                v-if="windowWidth <= 1200 && windowWidth > 600"
                :src="item.ipad"
                class="carousel-img"
                :alt="`Bannière ${index + 1}`"
              />
               <img
                v-if="windowWidth <= 500"
                :src="item.iphone"
                class="carousel-img"
                :alt="`Bannière ${index + 1}`"
              />
              </div>
            
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
