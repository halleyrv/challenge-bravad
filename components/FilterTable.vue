<template>
  <div id="app">
    <Search :query="q" />
    <div v-if="isLoading">Loading data....</div>
    <div id="list">
      <template v-for="(user, index) in filtered">
        <Card :key="index" :user="user" :query="q" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterTable',
  data: () => ({
    users: [],
    isLoading: false,
  }),
  computed: {
    q () {
      return this.$route.path.split('/')[2] || ''
    },
    filtered () {
      const re = new RegExp(this.q, 'ig')
      return this.users.filter(u => Object.values(u).join().match(re))
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      const url = "/users.json";
       const result  = await fetch(url).then((res => res.json()))
       this.users = result.slice(0,600);
       this.isLoading = false;

    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
 
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #EEEEEE;
  display: grid;
  align-items: center;
  justify-items: center;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(0, 0, 0, 0.87);
  width: 564px;
  padding: 19px 12px 0;
  background-color: #FFFFFF;
}
#list {
  width: 100%;
  height: 643px;
  overflow: auto;
}
</style>
