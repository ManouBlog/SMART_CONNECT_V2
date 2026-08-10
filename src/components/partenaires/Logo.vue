<script>
import { COLORS } from '../../utils';
export default {
    name: 'Logo',
    data() {
        return {
            COLORS:COLORS
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
      <div :style="{
        width: '200px',
        height: `${200 * Math.sqrt(3)}px`,
        backgroundColor: COLORS.hexagonBlue,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '1rem',
      }">
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
