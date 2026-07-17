<script>
import instance, { lienPhoto } from "../api/api";
import { useWindowSize } from "@vueuse/core";
import SubscriptionAlert from '../components/SubscriptionAlert.vue';
const { width: windowWidth } = useWindowSize();

export default {
  name: "Banniere",
  components: {
    SubscriptionAlert,
  },
  data() {
    return {
      windowWidth: windowWidth,
      afficheAll: [],
      lienPhoto: lienPhoto,
      messages:[],
      afficheDefault: [
        {
          iphone: require("../assets/mobile/baniere_1.png"),
          ipad: require("../assets/ipad/baniere_1.png"),
          pc: require("../assets/baniere_1.png"),
        },
        {
          iphone: require("../assets/mobile/baniere_2.png"),
          ipad: require("../assets/ipad/baniere_2.png"),
          pc: require("../assets/baniere_2.png"),
        },
        {
          iphone: require("../assets/mobile/baniere_3.png"),
          ipad: require("../assets/ipad/baniere_3.png"),
          pc: require("../assets/baniere_3.png"),
        },
      ],
      afficheShow: [],
    };
  },
  computed: {
    // Détermine le type d'appareil selon la largeur
    deviceType() {
      if (this.windowWidth < 768) return "iphone";
      if (this.windowWidth < 1024) return "ipad";
      return "pc";
    },

    // Retourne les dimensions appropriées selon l'appareil
    // carouselDimensions() {
    //   if (this.windowWidth < 768) {
    //     return { height: "250px" }; // Mobile
    //   }
    //   if (this.windowWidth < 1024) {
    //     return { height: "350px" }; // Tablette
    //   }
    //   return { height: "400px" }; // Desktop
    // },
  },
  methods: {
    // Retourne l'image appropriée selon le type d'appareil
    getImageForDevice(item) {
      // Si l'item a des images spécifiques pour chaque device
      if (item.iphone || item.ipad || item.pc) {
        return item[this.deviceType] || item.pc || item.ipad || item.iphone;
      }
      // Si c'est une image simple (depuis l'API)
      return item.affiche;
    },

    mergeTableau(data) {
      const grouped = {};

      data.forEach((item) => {
        const company = item.company;

        if (!grouped[company]) {
          grouped[company] = { company };
        }

        if (item.pc) grouped[company].pc = item.pc;
        if (item.iphone) grouped[company].iphone = item.iphone;
        if (item.ipad) grouped[company].ipad = item.ipad;
        if (item.fin) grouped[company].fin = item.fin;
        if (item.lien) grouped[company].lien = item.lien;
        if (item.affiche) grouped[company].affiche = item.affiche;
      });

      const result = Object.values(grouped);
      return result;
    },

    openLink(lien) {
      if (!/^https?:\/\//i.test(lien)) {
        window.open(`https://${lien}`, "_blank");
      } else {
        window.open(lien, "_blank");
      }
    },

    getAllAffiche() {
      instance
        .get("showAllAffiche")
        .then((res) => {
          this.afficheAll = res.data.data;
          const elements = [];

          for (const company in this.afficheAll) {
            elements.push(this.afficheAll[company]);
          }

          const elementsFlats = elements.flat();

         
          if (elementsFlats.length > 0) {
            this.afficheShow = elementsFlats;
          } else {
            this.afficheShow = this.afficheDefault;
          }
        })
        .catch((err) => {
          console.log(err);
          // En cas d'erreur, utiliser les images par défaut
          this.afficheShow = this.afficheDefault;
        });
    },
    async getNotificationAbonnemetExipration(){
      if(this.$store.state?.user?.user?.statuses.some(status => status.statut !== 'Particulier' && status.statut !== 'Entreprise')){
try{
     const response = await instance.get('notifications_expiration');
     if(response.data.status){
      // console.log(response);
        this.messages = response.data.data;
      }
      }catch(err){
        console.log(err);
  }
      }else{
        return;
      }
      
}
  },
  async created() {
    this.getAllAffiche();
   
    await this.getNotificationAbonnemetExipration();
  },
};
</script>

<template>
  <div class="container-fluid page-title bg-image" style="margin: 2em 0">
     <SubscriptionAlert v-if="messages.length > 0" :messages="messages" />
    <div class="row section-title">
      <div class="main-container">
        <div
          class="col-lg-12 col-md-12 col-sm-12 mt-2 height_banniere"
          :style="{
            minWidth: '300px',
            textAlign: 'center',
            position: 'relative',
          }"
        >
          <n-carousel autoplay :interval="3000">
            <!-- Slide publicitaire -->
            <div class="promo-slide">
              <div class="text-center promo-content">
                <h1 class="promo-title">Affichez-vous ici pour plus de visibilité.</h1>
                <h3 class="promo-phone">+225 0707969672 / +225 0546667766</h3>
              </div>
            </div>

            <!-- Slides d'images -->
            <div class="carousel-slide" v-for="(item, index) in afficheShow" :key="index">
              <img
                v-if="item.lien"
                class="carousel-img"
                style="width: 99%;height: 100%;"
                :src="
                  item.affiche
                    ? lienPhoto + getImageForDevice(item)
                    : getImageForDevice(item)
                "
                :alt="`Bannière ${index + 1}`"
                @click="openLink(item.lien)"
              />
              <img
                v-else
                class="carousel-img"
               style="width: 99%;height: 100%;"
                :src="
                  item.affiche
                    ? lienPhoto + getImageForDevice(item)
                    : getImageForDevice(item)
                "
                :alt="`Bannière ${index + 1}`"
              />
            </div>
          </n-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.height_banniere{
  height: 420px;
}
.promo-slide {
  background: #80808024;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.promo-content {
  padding: 1rem;
}

.promo-title {
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  color: orange;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.promo-phone {
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  color: orange;
  font-weight: bold;
  text-align: center;
}

.carousel-slide {
  position: relative;
  width: 100%;
  height: 100%;
}

/* tablette */
@media (max-width: 1024px) {
  .height_banniere {
    height: 320px;
  }
}

/* mobile */
@media (max-width: 768px) {
  .height_banniere {
    height: 200px;
  }
}

/* mobile */
@media (max-width: 568px) {
  .height_banniere {
    height: 170px;
  }
}


:deep(.n-carousel__dots) {
  background: black !important;
  padding: 0.5em;
  border-radius: 10px;
}
@media (min-width: 2000px) {
 .height_banniere{
  height: 800px;
}
}
/* Responsive adjustments */
@media (max-width: 767px) {
  .promo-title {
    font-size: 1.5rem;
  }

  .promo-phone {
    font-size: 1.2rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .promo-title {
    font-size: 2rem;
  }

  .promo-phone {
    font-size: 1.8rem;
  }
}

@media (min-width: 1024px) {
  .promo-title {
    font-size: 2.5rem;
  }

  .promo-phone {
    font-size: 2.5rem;
  }
}
</style>
