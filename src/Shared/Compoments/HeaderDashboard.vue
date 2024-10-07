<script>
export default {
    name:"HeaderDashboard",
    props:{
        TitleHeader:String,
        subTitleHeader:String
    },
    data() {
       return{

       } 
    },
}
</script>
<template>
    <div class="conteneur-titleHeader">
        <h1 class="fw-bold">{{ TitleHeader}}</h1>
        <div class="conteneur-span-ecriteau">
            <span></span>
            <span>Home</span>
            <span> /{{ subTitleHeader }}</span>
        </div>
    </div>
</template>
<style scoped>
.conteneur-span-ecriteau{
    display: flex;
    align-items: center;
    gap:1em;
}
.conteneur-titleHeader{
    padding: 1em;
    background: gray;
}
h1{
    font-size:3em;
    text-align:left;
}
</style>