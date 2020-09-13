<template>
  <div class="results">
    <section class="user">
      <img :src="remoteData.avatar_url" alt class="user__profile" />
      <h2 class="user__name">{{ remoteData.name }}</h2>
      <p class="user__alias">{{ remoteData.login }}</p>
      <transition appear name="slide-left">
        <ul class="user__list">
          <li class="user__list-item" key="item-1">
            <img src="../assets/images/icon-1.svg" class="user__list-icon" />
            <p class="user__desc">{{ remoteData.company }}</p>
          </li>
          <li class="user__list-item" key="item-2">
            <img src="../assets/images/icon-2.svg" class="user__list-icon" />
            <p class="user__desc">{{ remoteData.location }}</p>
          </li>
          <li class="user__list-item" key="item-3">
            <img src="../assets/images/icon-3.svg" class="user__list-icon" />
            <p class="user__desc">{{ remoteData.starred }}</p>
          </li>
          <li class="user__list-item" key="item-4">
            <img src="../assets/images/icon-4.svg" class="user__list-icon" />
            <p class="user__desc">{{ remoteData.public_repos }}</p>
          </li>
          <li class="user__list-item" key="item-5">
            <img src="../assets/images/icon-5.svg" class="user__list-icon" />
            <p class="user__desc">{{ remoteData.followers }}</p>
          </li>
        </ul>
      </transition>
    </section>

    <section class="repo">
      <div
        class="repo-card"
        v-for="(repo, index) in repoData"
        :key="index + repo.name"
      >
        <h2 class="repo-card__heading">
          <a :href="repo.html_url"> {{ repo.name | capitalizeResponse }} </a>
        </h2>
        <p class="repo-card__desc">{{ repo.description }}</p>
        <small class="repo-card__stars">
          <img src="../assets/images/icon-3.svg" alt />
          {{ repo.stargazers_count }}
        </small>
      </div>
    </section>
    <!-- <section class="no-repo">No repository found :(</section> -->
  </div>
</template>

<script>
import fetchMixin from "../mixins/fetchMixin.js";

export default {
  name: "SearchResults",
  data() {
    return {
      remoteData: [],
      repoData: [],
      remote: false
    };
  },
  mixins: [fetchMixin],
  methods: {
    async mapProfile() {
      await this.fetchDataFromRepo(this.$route.params);
    }
  },
  filters: {
    capitalizeResponse(word) {
      if (word) {
        return word
          .split(" ")
          .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
      }
    }
  },
  created() {
    this.mapProfile();
  },
  watch: {
    $route(to, from) {
      if (from.path !== to.path) this.mapProfile();
    }
  }
};
</script>

<style lang="scss">
@import "../scss/partials/variables";

.results {
  height: 100%;
  width: 100%;
  display: grid;
  grid-area: profile;
  grid-template-columns: 1fr 2fr;
  margin-top: 50px;
  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    margin-top: 95px;
  }
}

.user {
  @media screen and (max-width: 560px) {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
  &__profile {
    max-width: 280px;
    min-height: 280px;
  }
  &__name {
    font: 200 $font-title $raleway;
    color: $clr-main;
  }
  &__alias {
    font: 200 $font-body $raleway;
    color: $clr-main;
    opacity: 0.8;
  }
  &__list {
    margin-top: 15px;
    @media screen and (max-width: 560px) {
      width: 90%;
    }
    & > * + * {
      margin-top: 10px;
    }
    &-item {
      display: flex;
      align-items: center;
      gap: 0 7px;
      color: $clr-main;
      font: $font-body $raleway;
    }
    &-icon {
      width: 24px;
      height: 24px;
    }
  }
}

.repo {
  & > * + * {
    margin-top: 15px;
  }
  &-card {
    width: 100%;
    min-height: 90px;
    display: flex;
    flex-flow: column nowrap;
    &__heading {
      font: 200 $font-title $raleway;
      a {
        color: $clr-theme;
        text-decoration: none;
      }
    }
    &__desc {
      margin: 10px 0;
      color: $clr-main;
      font: 200 $font-body $raleway;
    }
    &__stars {
      display: flex;
      align-items: center;
      gap: 0 7px;
      color: $clr-main;
      opacity: 0.7;
    }
  }
}

.no-repo {
  color: $clr-theme;
  font: 200 $font-title $raleway;
}
</style>
