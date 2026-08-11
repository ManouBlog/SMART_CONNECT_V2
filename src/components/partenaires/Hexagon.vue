<script>
import { COLORS } from '../../utils';
import { lienPhoto } from '../../api/api';
export default {
    name: 'Hexagon',
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            required: true
        },
        color: {
            type: String,
            default: COLORS.hexagonBlue
        },
        textColor: {
            type: String,
            default: COLORS.textLight
        },
        stylehexagon: {
            type: Object,
            default: () => ({
                width: '60px',
                height: '70px',
            })
        }
    },
    emits: ['select', 'closeModal'],
    data() {
        return {
            COLORS: COLORS,
            lienPhoto: lienPhoto
        };
    },
    methods: {
        handleClick() {
            this.$emit('select', this.partner);
        },
        handleCloseModal() {
            this.$emit('closeModal');
        }
    }

};
</script>
<template>
    <div style="position: relative;">
        <div class="conteneur_hexagon" :style="stylehexagon" @click="handleClick">
            <img :src="lienPhoto + item.partenaire" :alt="item.partenaire" />
        </div>
        <!-- Modal -->
        <div v-if="showModal" class="partner-modal-overlay" 
        @click.self="handleCloseModal">
            <div class="partner-modal">
                <div v-if="item" class="partner-modal-content">
                    <h5>Détail</h5>
                    <div class="partner-image-container">
                        <img v-if="item?.partenaire" :src="lienPhoto + item?.partenaire" :alt="item?.partenaire"
                            class="partner-image" />

                        <div v-else class="partner-image-empty">
                            {{ item?.nom_partenaire?.charAt(0) }}
                        </div>
                    </div>

                    <h2>
                        {{ item?.nom_partenaire }}
                    </h2>

                    <p v-if="item?.description">
                        {{ item?.description }}
                    </p>

                </div>

            </div>
        </div>
    </div>


</template>
<style scoped>
.conteneur_hexagon img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    object-fit: contain;
}

.conteneur_hexagon {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: #25525F;
    clip-path: polygon(45% 1%,
            50% 0%,
            55% 1%,

            94% 22%,
            98% 25%,
            100% 30%,

            100% 70%,
            98% 75%,
            94% 78%,

            55% 99%,
            50% 100%,
            45% 99%,

            6% 78%,
            2% 75%,
            0% 70%,

            0% 30%,
            2% 25%,
            6% 22%);

    border-radius: 12px;
    margin: 0 5px;
    padding: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    color: orange;
    font-size: 10px;
    font-weight: bold;
}



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
  align-items: flex-end;
    justify-content: center;
    padding: 20px;
    background: rgba(177, 178, 179, 0.65);
    z-index: 9999;
}

.partner-modal {
    position: relative;

    width: 100%;
    max-width: 500px;

    max-height: 80vh;
    overflow-y: auto;

    padding: 35px;
    margin-top: 1em;

    background: #25525F;
    color: #FFFFFF;
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
    color: #FFFFFF;
}

.partner-modal p {
    color: #FFFFFF;
    line-height: 1.6;
}
</style>
