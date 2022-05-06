<template>
  <div id="app">
    <button @click="moreData"> mas </button>
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
 import API from '../util/api'
 let apiClass = new API();
export default {
  name: 'FilterTable',
  data: () => ({
    users: [],
    startFromPage: 0,
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
       if (this.$store.state.users.listUsers.length == 0){
          await apiClass.load();
          this.users =  await apiClass.getUser(this.startFromPage);
          this.$store.commit('users/append', this.users)
       }
       this.isLoading = false;

    },
    async moreData(){
       this.$store.commit('users/incrementStartFromPage', apiClass.getByPage()+1)
       this.startFromPage = this.$store.state.users.startFromPage;
       let newData = await apiClass.getUser(this.startFromPage);
       this.$store.commit('users/append', newData);
       this.users = this.$store.state.users.listUsers;
    },
    getNextUser() {
      const listNode = document.getElementById("list")
      listNode.onscroll = () => {
        let bottomOfWindow = listNode.scrollTop + listNode.clientHeight >= listNode.scrollHeight ;
        if (bottomOfWindow) {
          this.moreData()
        }
      }
    },
  },
  watch: {
    users: {
      handler(newValue, oldValue) {
        this.users = newValue;
      },
      deep: true
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.users = this.$store.state.users.listUsers;
        this.startFromPage =  this.$store.state.users.startFromPage;
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  
  },
  mounted(){
    this.getNextUser();
  }
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
