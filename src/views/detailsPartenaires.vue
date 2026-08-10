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
    <HeaderDashboard TitleHeader="Partenaires" :subTitleHeader="this.$route.params.title" />
    <h1 style="text-align: center;color:#ff9900">{{ this.$route.params.title }}</h1>
    <div class="grid-container">
        <div v-for="partenaire in data" :key="partenaire.id" class="partner-item">
            <Hexagon @select="handlePartnerSelect(partenaire)" :stylehexagon="{
                width: '80px',
                height: '90px',
            }" />
        </div>
    </div>
    <!-- Modal -->
    <div v-if="showModal" class="partner-modal-overlay" @click.self="closeModal">
        <div class="partner-modal">

            <div v-if="selectedPartner" class="partner-modal-content">
                 <h5>Description</h5>
                <div class="partner-image-container">
                    <img v-if="selectedPartner.image" :src="selectedPartner.image" :alt="selectedPartner.name"
                        class="partner-image" />

                    <div v-else class="partner-image-empty">
                        {{ selectedPartner.name?.charAt(0) }}
                    </div>
                </div>

                <h2>
                    {{ selectedPartner.name }}
                </h2>

                <p v-if="selectedPartner.description">
                    {{ selectedPartner.description }}
                </p>

            </div>

        </div>
    </div>
</template>
<style scoped>
.grid-container {
    display: flex;
    justify-content: center;
    place-content: center;
    align-items: center;
    gap: 0.1em;
    padding: 1em 0;
    flex-wrap: wrap;
}

.partner-modal-overlay {
    position: fixed;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    background: rgba(177, 178, 179, 0.65);

    z-index: 9999;
}

.partner-modal {
    position: relative;

    width: 100%;
    max-width: 500px;

    max-height: 90vh;
    overflow-y: auto;

    padding: 35px;

    background: #25525F;
    color:#FFFFFF;
    border-radius: 20px;

    box-shadow:
        0 20px 50px rgba(121, 121, 121, 0.3);
}

.partner-modal-content {
    text-align: center;
}

.partner-image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.partner-image-empty {
    width: 130px;
    height: 130px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #1E3A5F;
    color: #FFFFFF;

    font-size: 40px;
    font-weight: bold;
}

.partner-modal h2 {
    margin: 10px 0;
    color:#FFFFFF;
}

.partner-modal p {
    color:#FFFFFF;
    line-height: 1.6;
}
</style>