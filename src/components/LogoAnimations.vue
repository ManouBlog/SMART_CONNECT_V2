<template>
  <div class="svg-container">
    <svg width="200" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Définition du dégradé -->
   <defs>
    <linearGradient  
    id="circulatingGradient" gradientTransform="rotate(0 100 100)">
      <stop offset="0%" stop-color="orange" stop-opacity="1"/>
      <stop offset="20%" stop-color="orange" stop-opacity="1"/>
      <stop offset="50%" stop-color="white" stop-opacity="0.5"/>
      <stop offset="70%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>
       <!-- Cercle avec le dégradé -->
  <circle 
  cx="100" 
  cy="100" 
  r="80" 
  stroke="url(#circulatingGradient)" 
  stroke-width="15"
  style="stroke: white;"
  fill="hsla(193, 44%, 26%, 1)">
    <!-- Animation de rotation du dégradé -->
    
  </circle>
  <circle 
  cx="100" 
  cy="100" 
  r="85" 
  stroke="url(#circulatingGradient)" 
  stroke-width="5.5"
  fill="hsla(193, 44%, 26%, 1)">
  <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 100 100"
      to="360 100 100"
      dur="3s"
      repeatCount="indefinite"
    />
    </circle>

      <!-- Animation de la flèche -->
      <!-- <path
        d="M100,10 L100,30"
        stroke="#FF8C00"
        stroke-width="10"
        stroke-linecap="round"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 100"
          to="360 100 100"
          dur="3s"
          repeatCount="indefinite"
        />
      </path> -->

      <!-- Cercle intérieur pour l'utilisateur -->
      <!-- <circle cx="100" cy="100" r="40" fill="#FF8C00"/> -->

      <!-- Corps de l'utilisateur -->
      <!-- <path d="M100,60 L100,120" stroke="#fff" stroke-width="10" stroke-linecap="round"/> -->

      <!-- Bras de l'utilisateur -->
      <!-- <path d="M100,80 L70,70" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
      <path d="M100,80 L130,70" stroke="#fff" stroke-width="8" stroke-linecap="round"/> -->

      <!-- Tête de l'utilisateur -->
      <!-- <circle cx="100" cy="28" r="40" 
      style="stroke: hsla(193, 44%, 26%, 1);stroke-width:6;"
      fill="orange"/> -->
        <circle cx="100" cy="28" r="40" style="stroke: hsla(193, 44%, 26%, 1); stroke-width:6;" fill="orange">
     <animate attributeName="opacity" values="1; 0.2; 0" dur="1s" repeatCount="indefinite"/>
  </circle>


      <!-- corps de l'utilisateur -->
      <circle cx="100" cy="115" r="48" fill="orange"
      style="stroke: hsla(193, 44%, 26%, 1);stroke-width:5;"
      />
     
  <!-- Flèche -->
  <!-- <line x1="20" y1="40" x2="150" y2="50" 
        stroke="#000000" 
        stroke-width="15" 
        stroke-linecap="round"/> -->
  
  <!-- Pointe de la flèche -->
 <path d="M450,170 L490,190 L450,220 Z"
        fill="#FFA500"
        stroke="hsla(193, 44%, 26%, 1)"
        stroke-width="5"
        stroke-linejoin="round"
        transform="rotate(-130, 300, 270)"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'LogoAnimations'
}
</script>


