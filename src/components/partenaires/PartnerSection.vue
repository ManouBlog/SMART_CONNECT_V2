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
        }
    },
    data() {
        return {
            COLORS: COLORS,
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
                width: '120px',
                height: '130px',
            }
        }

        if (count === 2) {
            return {
                width: '100px',
                height: '100px',
            }
        }

        if (count === 3) {
            return {
                width: '50px',
                height: '60px',
            }
        }

        return {
            width: '60px',
            height: '70px',
        }
    }
    },
    methods: {
        voirPlus() {
            this.$router.push({
                name: 'detail_partenaires',
                params: { title: this.titlePartenaire }
            })
        }
    }

};
</script>
<template>
    <div class="container_partner">
        <h2>{{ title }}</h2>
        <div style="display: flex;justify-content: center;align-items: center;">
            <Hexagon v-for="(items, index) in dataPartenaires" :key="index"
             :stylehexagon="styleHexagon"
                 />
                 <!-- :style="index % 2 !== 0 ? stylemargin : null" -->
        </div>

        <a @click.prevent="voirPlus(title)">Voir plus...</a>
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
