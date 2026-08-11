<script>
import Hexagon from './Hexagon.vue';
import { COLORS } from '../../utils';

export default {
    name: 'PartnerSection',
    components: { Hexagon },
    props: {
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
        detail:{
            type:String,
            required:true
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
            console.log("payload_voirplus",payload)
            this.$router.push({
                name: 'detail_partenaires',
                params: { title: this.titlePartenaire},
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
    <div class="container_partner">
        <h2>{{ title }}</h2>
        <div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;">
            <Hexagon v-for="(partner, index) in dataPartenaires" 
                :key="index" 
                :stylehexagon="styleHexagon"
                :showModal="showModal" 
                :item="partner" 
                @select="handlePartnerSelect()" 
                @closeModal="closeModal()" 
                />
            <!-- :style="index % 2 !== 0 ? stylemargin : null" -->
        </div>

        <a @click.prevent="voirPlus(title,detail)">Voir plus...</a>
    </div>
</template>
<style scoped>
.container_partner {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.1em
}

.container_partner h2 {
    font-size: 1em;
    font-weight: bold;
    color: black;
    margin-bottom: 1.5rem;
    font-family: Arial, sans-serif;
}

.container_partner a {
    color: #FFA500;
    font-size: 1rem;
    font-family: Arial, sans-serif;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 1rem;
    display: inline-block;
}
</style>
