<template>
  <div class="home">
    <search-bar />
    <transition appear mode="out-in" name="appear-top">
      <router-view />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home"
};
</script>
