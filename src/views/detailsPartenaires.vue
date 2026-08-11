<script setup>
import { defineProps, ref } from 'vue';
import Hexagon from '../components/partenaires/Hexagon.vue';
import HeaderDashboard from '../Shared/Compoments/HeaderDashboard.vue';
defineProps({
    data: {
        type: Array,
        default: () => [
            {
                id: 1,
                name: 'Partenaire 1',
                image: '/images/partenaire1.png'
            },
            {
                id: 2,
                name: 'Partenaire 2',
                image: '/images/partenaire2.png'
            }
        ]
    }
})
const selectedPartner = ref(null)
const showModal = ref(false)
const handlePartnerSelect = (partenaire) => {
    selectedPartner.value = partenaire
    showModal.value = true
}
const closeModal = () => {
    showModal.value = false
    selectedPartner.value = null
}
</script>
<template>
    <HeaderDashboard TitleHeader="Partenaires" :subTitleHeader="$route.params.title" />
    <h1 style="text-align: center;color:#ff9900">{{ $route.params.title }}</h1>
    <div class="grid-container">
        <div v-for="partenaire in data" :key="partenaire.id" class="partner-item">
            <Hexagon 
            @select="handlePartnerSelect(partenaire)" 
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