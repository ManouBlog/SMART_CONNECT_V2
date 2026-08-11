<script setup>
import { defineProps, ref } from 'vue';
import Hexagon from '../components/partenaires/Hexagon.vue';
import HeaderDashboard from '../Shared/Compoments/HeaderDashboard.vue';
import { usePartenaireStore } from '../store-pinia/partenaire/usePartenaireStore.js';
defineProps({
    data: {
        type: Array,
        default: () => []
    }
})
const STOREPARTNER = usePartenaireStore();
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
    <div class="grid-container" v-if="STOREPARTNER?.partnerChoose.length">
        <div v-for="partenaire in STOREPARTNER?.partnerChoose" :key="partenaire.id" class="partner-item">
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