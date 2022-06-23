<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="bg">
    <img class="PC" src="../assets/PC.jpg" alt="">
    <img class="MOBILE" src="../assets/mobile.jpg" alt="">
  </div>
</template>
<style lang="less" scoped>
body,
html,
.bg {
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  object-fit: cover;
}

.PC {
  display: inherit;
}

.MOBILE {
  display: none;
}

@media only screen and (min-width: 321px) and (max-width: 1024px) {
  .PC {
    display: none;
  }

  .MOBILE {
    display: inherit;
  }
}
</style>