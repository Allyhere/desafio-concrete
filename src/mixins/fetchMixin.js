export default {
  data() {
    return {
      remoteData: [],
      repoData: [],
      fetchErr: null
    };
  },
  methods: {
    fetchDataFromRepo(profile) {
      fetch(`https://api.github.com/users/${profile.repo}`).then(async res => {
        if (res.status === 404 && this.$route.path !== "/unknown") {
          this.$router.push("/unknown");
        }
        this.remoteData = await res.json();
      });
      fetch(`https://api.github.com/users/${profile.repo}/repos`).then(
        async res => {
          const repo = await res.json();
          repo.sort((a, b) => b.stargazers_count - a.stargazers_count);
          this.repoData = repo;
        }
      );
      fetch(`https://api.github.com/users/${profile.repo}/starred`).then(
        async res => {
          this.starred = await res.json();
          this.remoteData["starred"] = Object.keys(this.starred).length;
        }
      );
    }
  }
};
