<script>
import Hexagon from './Hexagon.vue';
import { COLORS } from '../../utils';

export default {
    name: 'PartnerSection',
    components: { Hexagon },
    props: {
        subTitle: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        dataPartenaires: {
            type: Array,
            required: true
        },
        stylemargin: {
            type: String,
            default: null
        },
        detail: {
            type: String,
            required: true
        },
        stylePartner:{
            type:Object,
            default:()=>null
        }
    },
    data() {
        return {
            COLORS: COLORS,
            showModal: false,
        };
    },
    computed: {
        titlePartenaire() {
            return `${this.title}`
        },
        styleHexagon() {
            const count = this.dataPartenaires.length

            if (count === 1) {
                return {
                    width: '180px',
                    height: '220px',
                }
            }

            if (count === 2) {
                return {
                    width: '150px',
                    height: '160px',
                }
            }

            if (count === 3) {
                return {
                    width: '100px',
                    height: '90px',
                }
            }

            return {
                width: '60px',
                height: '70px',
            }
        }
    },
    methods: {
        voirPlus(payload) {
            console.log("payload_voirplus", payload)
            this.$router.push({
                name: 'detail_partenaires',
                params: { title: this.titlePartenaire },
            })
        },
        handlePartnerSelect() {
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
        }
    },

};
</script>
<template>
    <div class="container_partner" :style="stylePartner">
        <h2>{{ title }}</h2>
        <p>{{ subTitle }}</p>
        <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;">
            <Hexagon v-for="(partner, index) in dataPartenaires" :key="index" :stylehexagon="styleHexagon"
                :showModal="showModal" :item="partner" @select="handlePartnerSelect()" @closeModal="closeModal()" />
            <!-- :style="index % 2 !== 0 ? stylemargin : null" -->
        </div>

        <a @click.prevent="voirPlus(title, detail)" v-if="dataPartenaires.length >= 4">Voir plus...</a>
    </div>
</template>
<style scoped>
.container_partner {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    /* Hauteur responsive */
    height: 350px;
    border-radius: 10px 0 0 10px;
    padding: 0.5em;
    box-sizing: border-box;
}

/* Tablette */
@media (max-width: 1024px) {
    .container_partner {
        height: clamp(270px, 32vh, 350px);
    }
}

/* Mobile */
@media (max-width: 768px) {
    .container_partner {
        height: auto;
        min-height: 220px;
        width: 100%;
        border-radius: 10px;
        padding: 0.5rem;
    }
}

/* Petit mobile */
@media (max-width: 480px) {
    .container_partner {
        min-height: 380px;
        padding: 0.4rem;
    }
}

.container_partner h2 {
    font-size: 1em;
    font-weight: bold;
    color: rgb(255, 255, 255);
    margin-bottom: 1.5rem;
    font-family: Arial, sans-serif;
}

.container_partner a {
    color: #FFA500;
    font-size: 1em;
    font-family: Arial, sans-serif;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 1rem;
    display: inline-block;
}
p {
  font-size: clamp(0.9em, 1vw + 0.5rem, 1.25em);
  text-align: center;
  font-size: 1em;
}
</style>
