<script setup>
import { defineProps, ref } from 'vue';
import Hexagon from '../components/partenaires/Hexagon.vue';
import HeaderDashboard from '../Shared/Compoments/HeaderDashboard.vue';
defineProps({
    data: {
        type: Array,
        default: () => []
    }
})

const showModal = ref(false)
const handlePartnerSelect = () => {
    showModal.value = true
}
const closeModal = () => {
    showModal.value = false
}
</script>
<template>
    <HeaderDashboard TitleHeader="Partenaires" :subTitleHeader="$route.params.title" />
    <h1 style="text-align: center;color:#ff9900">{{ $route.params.title }}</h1>
    <div class="grid-container">
        <div v-for="partenaire in data" 
        :key="partenaire.id" class="partner-item">
            <Hexagon 
            @select="handlePartnerSelect()" 
            @closeModal="closeModal"
            :showModal="showModal"
            :item="partenaire"
            :stylehexagon="{
                width: '80px',
                height: '90px',
            }" />
        </div>
    </div>
   
</template>
<style scoped>
.partner-item{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>