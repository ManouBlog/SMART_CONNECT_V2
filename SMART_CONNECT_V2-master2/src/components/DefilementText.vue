<template>
  <div>
    <div id="container">
      <span ref="text1" id="text1"></span>
      <span ref="text2" id="text2"></span>
    </div>

    <svg class="d-none">
      <defs>
        <filter id="threshold">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const text1 = ref(null)
const text2 = ref(null)
let elts = {
  text1: text1.value,
  text2: text2.value,
}

const texts = [
  'naturopathe',
  'ostéopathe',
  'acupuncteur',
  'hypnothérapeute',
  'psychologue',
  'sophrologue',
  'kinésithérapeute',
  'réflexologue',
  'diététicien',
];

const morphTime = 0.95
const cooldownTime = 1

let textIndex = texts.length - 1
let time = new Date()
let morph = 0
let cooldown = cooldownTime

function doMorph() {
  morph -= cooldown
  cooldown = 0

  let fraction = morph / morphTime

  if (fraction > 1) {
    cooldown = cooldownTime
    fraction = 1
  }

  setMorph(fraction)
}

function setMorph(fraction) {
  fraction = Math.pow(fraction, 0.65)

  const distance = 40

  elts.text2.style.transform = `translateY(${distance * (1 - fraction)}px)`
  elts.text2.style.opacity = '100%'

  elts.text1.style.transform = `translateY(${-distance * fraction}px)`
  elts.text1.style.opacity = fraction > 0.95 ? '0%' : '100%'

  elts.text1.textContent = texts[textIndex % texts.length]
  elts.text2.textContent = texts[(textIndex + 1) % texts.length]
}


function doCooldown() {
  morph = 0

  elts.text2.style.transform = 'translateY(0px)'
  elts.text2.style.opacity = '100%'
  elts.text2.style.filter = 'none'

  elts.text1.style.transform = 'translateY(-20px)'
  elts.text1.style.opacity = '0%'
  elts.text1.style.filter = 'none'
}

function animate() {
  requestAnimationFrame(animate)

  let newTime = new Date()
  let shouldIncrementIndex = cooldown > 0
  let dt = (newTime - time) / 1000
  time = newTime

  cooldown -= dt

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++
    }

    doMorph()
  } else {
    doCooldown()
  }
}

onMounted(() => {
  text1.value.textContent = texts[textIndex % texts.length]
  text2.value.textContent = texts[(textIndex + 1) % texts.length]
  elts = {
    text1: text1.value,
    text2: text2.value,
  }
  animate()
})
</script>

<style scoped>


#container {
  overflow: hidden;
  width: auto;
  height: 50px;
  color: #ff7a00; /* orange franc */
  filter: url(#threshold) blur(0.1px);
}

#text1,
#text2 {
  position: absolute;
  width: 260px;
  display: inline-block;
  font-weight: bold;
  font-family: "Raleway", sans-serif;
  font-size: 28pt;        /* plus grand */
  font-weight: 900;       /* gras réel */
  letter-spacing: 0.5px;  /* meilleure lisibilité */
  text-align: left;
  user-select: none;
  will-change: transform, opacity, filter;
}

</style>
