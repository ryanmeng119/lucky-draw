<script setup lang="ts">
import { onMounted } from 'vue'

const appendSnowEffects = () => {
  const box = document.querySelector('.scss-snow-bg')

  const fragment = document.createDocumentFragment()

  for (let i = 0; i < 200; i++) {
    let snow = document.createElement('div')
    snow.classList.add('snow')
    fragment.appendChild(snow)
  }

  box?.appendChild(fragment)
}
onMounted(() => {
  appendSnowEffects()
})
</script>

<template>
  <div class="scss-snow-bg"></div>
</template>

<style lang="scss">
.scss-snow-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  // background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  filter: drop-shadow(0 0 10px white);
}

$total: 200;
.snow {
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
}
@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}
@for $i from 1 through $total {
  $random-x: random(1000000) * 0.0001vw;
  $random-offset: random_range(-100000, 100000) * 0.0001vw;
  $random-x-end: $random-x + $random-offset;
  $random-x-end-yoyo: $random-x + calc($random-offset / 2);
  $random-yoyo-time: calc(random_range(30000, 80000) / 100000);
  $random-yoyo-y: $random-yoyo-time * 100vh;
  $random-scale: random(10000) * 0.0001;
  $fall-duration: random_range(10, 30) * 1s;
  $fall-delay: random(30) * -1s;

  .snow:nth-child(#{$i}) {
    opacity: random(10000) * 0.0001;
    transform: translate($random-x, -10px) scale($random-scale);
    animation: fall-#{$i} $fall-duration $fall-delay linear infinite;
  }

  @keyframes fall-#{$i} {
    #{percentage($random-yoyo-time)} {
      transform: translate($random-x-end, $random-yoyo-y) scale($random-scale);
    }

    to {
      transform: translate($random-x-end-yoyo, 100vh) scale($random-scale);
    }
  }
}
</style>
