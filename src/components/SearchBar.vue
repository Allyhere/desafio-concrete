<template>
  <form method="get" :class="found ? 'search--top' : 'search'">
    <h1 class="search__title">
      <span>Github</span>
      Search
    </h1>
    <div class="search-container">
      <input
        autofocus
        autocomplete="true"
        class="search__bar"
        name="search"
        type="text"
        v-model="profile"
        @keydown.enter.prevent="fetchData"
      />
      <button role="button" class="search__btn">
        <img src="../assets/images/search_icon.svg" alt class="button__icon" />
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      profile: null,
      found: false
    };
  },
  methods: {
    fetchData() {
      this.$router.push(`/found/${this.profile}`);
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path && to.path !== "/") {
      this.found = true;
      next();
    }
  },
  watch: {
    $route(to) {
      to.path === "/" ? (this.found = false) : (this.found = true);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/partials/variables";
@import "../scss/partials/mixins";

.search {
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-area: search;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  font-size: $font-title-main;
  @include media(550px) {
    font-size: calc(#{$font-title-main} * 0.7);
  }
  &__title {
    margin-bottom: 10px;
    white-space: nowrap;
    font: {
      style: italic;
      family: $raleway;
      weight: 200;
      size: inherit;
    }
    span {
      font: {
        style: italic;
        family: $monaco;
        weight: bold;
        size: inherit;
      }
    }
  }
  &-container {
    display: grid;
    grid-template-columns: 650px 100px;
    grid-template-rows: 50px;
    box-shadow: $default-shadow;
    @include media(1024px) {
      width: 80%;
      grid-template-columns: 1fr 100px;
    }
    @include media(426px) {
      width: 320px;
      grid-template-columns: 220px 100px;
    }
  }
  &__bar {
    border: none;
    padding: 5px 10px;
    font-size: $font-body;
    color: $clr-main;
  }
  &__btn {
    background-color: $clr-theme;
    text-align: center;
    display: grid;
    place-items: center;
    cursor: pointer;
    min-width: 80px;
    transition: background 0.4s ease-in-out;
    &:focus {
      outline: 2px solid;
    }
    &:hover {
      background-color: darken($clr-theme, 10%);
    }
  }
  &--top {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    gap: 0 70px;
    grid-area: search;
    font-size: $font-title-top;
    opacity: 0;
    width: 100%;
    margin-top: 40px;
    animation: appear-top 0.8s forwards ease-in-out;
    @include media(550px) {
      flex-direction: column;
      font-size: calc(#{$font-title-main} * 0.7);
    }
  }
}
</style>
