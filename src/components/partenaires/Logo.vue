<script>
import { COLORS } from '../../utils';
export default {
    name: 'Logo',
    data() {
        return {
            COLORS: COLORS
        };
    },
};
</script>
<template>
    <div :style="{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2rem auto',
    }">
        <div class="conteneur_logo_container">
            <div style="text-align: center">
                <div :style="{
                    width: '60px',
                    height: '60px',
                    backgroundColor: COLORS.primaryOrange,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.5rem',
                }">
                    <span style="font-size: 2rem; color: white">👤</span>
                </div>
                <div :style="{
                    color: COLORS.textLight,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    lineHeight: '1.2',
                }">
                    mon<br>brobroli
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.conteneur_logo_container{
    width: 200px;
    height: 250px;
    background-color: #1E3A5F;
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 1em;
}
</style>
