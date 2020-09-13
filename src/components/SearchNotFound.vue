<template>
  <h2 class="not-found">User not found :(</h2>
</template>

<script>
export default {
  name: "searchNotFound"
};
</script>

<style lang="scss">
@import "../scss/partials/variables";
.not-found {
  grid-area: profile;
  align-self: start;
  margin-top: 100px;
  color: $clr-theme;
  font: 200 $font-title $raleway;
}
</style>
