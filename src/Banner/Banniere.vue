<script>
import instance ,{lienPhoto} from '../api/api';
export default {
  name: "Banniere",
  data() {
    return {
      afficheAll:[],
      lienPhoto:lienPhoto,
    };
  },
  methods:{
   getAllAffiche() {
      instance
        .get("showAffiche")
        .then((res) => {
          // // console.log(res);
          //  // console.log("this.afficheAll",res.data.data)
            this.afficheAll = res.data.data
        })
        .catch((err) => {
          console.log(err)
          this.afficheAll = []
        });
    },
  },
  created() {
   this.getAllAffiche();
  },
};
</script>
<template>
    <div 
    class="container-fluid page-title bg-image" style="margin:1em 0 0 0;">
        <div class="row section-title">
          <div class="main-container">
            <div class="col-lg-12 col-md-12 col-sm-12 mt-2">
              <n-carousel autoplay :interval="1500">
                <a
                target="_blank" 
                v-for="item in this.afficheAll"
                :key="item.id"
                :href="item.lien ? item.lien:'https://google.com'"
                >
                  <img
                class="carousel-img"
                :src="lienPhoto+item.affiche"
                >
                </a>
                
              </n-carousel>
            </div>
          </div>
        </div>
      </div>
</template>
<style scoped>
.carousel-img {
    width: 100%;
    height:285px;
    cursor:pointer;
    object-fit: cover;
  }
</style>