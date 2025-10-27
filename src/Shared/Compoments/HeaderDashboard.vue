<script>
import { HomeOutlined, UserOutlined } from '@ant-design/icons-vue'
export default {
    name:"HeaderDashboard",
    props:{
        TitleHeader:String,
        subTitleHeader:String
    },
    data() {
       return{
        HomeOutlined:HomeOutlined,
        UserOutlined:UserOutlined
       } 
    },
}
</script>
<template>
    <div class="conteneur-titleHeader">
        <h1 class="fw-bold">{{ TitleHeader}}</h1>
        <div class="conteneur-span-ecriteau">
            <a-breadcrumb>
                <a-breadcrumb-item class="fw-bold">
                  <span>Home</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item class="subTitleHeader">{{ subTitleHeader }}</a-breadcrumb-item>
              </a-breadcrumb>
    
        </div>
    </div>
</template>
<style scoped>
@import "../../Shared/styles/stylesShared.css";

.conteneur-span-ecriteau{
    display: flex;
    align-items: center;
    gap:1em;
}
.conteneur-titleHeader{
    padding: 2em;
    background: var(--secondary-color) !important;
    color: var(--third-color) !important;
    margin:6.5em 0;
}
.subTitleHeader,h1{
    color: var(--main-color) !important;
}
h1{
    font-size:3em;
    text-align:left;
}

/* 📱 Version mobile */
@media (max-width: 1200px) {
  .conteneur-titleHeader {
    padding: 1em;           /* réduit l’espace interne */
    margin: 0 0 3em 0;           /* moins d’espace au-dessus et en dessous */
  }
}
</style>