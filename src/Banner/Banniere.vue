<script>

export default {
  name: "Banniere",
  data() {
    return {
    };
  },
 
 
  created() {

  },
};
</script>
<template>
    <div class="container-fluid page-title bg-image" style="margin:4em 0 0 0;">
        <div class="row section-title">
          <div class="main-container">
            <div class="col-lg-12 col-md-12 col-sm-12 mt-2">
              <n-carousel autoplay :interval="1500">
                <img
                  class="carousel-img"
                  src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
                >
                <img
                  class="carousel-img"
                  src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
                >
                <img
                  class="carousel-img"
                  src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
                >
                <img
                  class="carousel-img"
                  src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
                >
              </n-carousel>
            </div>
          </div>
        </div>
      </div>
</template>
<style scoped>
.carousel-img {
    width: 100%;
    height:180px;
    object-fit: cover;
  }
</style>