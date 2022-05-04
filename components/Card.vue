<template>
  <div class="card" v-bind:class="{ active: isActive }">
    <div class="card_avatar">
      <img :src="user.avatar" />
    </div>
    <div class="card_info" v-bind:class="{ inactive: !isActive }">
      <div class="column">
        <h3 v-html="highlight(user.name)" />
        <p><b v-html="highlight(user.title)" /></p>
        <p v-html="highlight(user.address)" />
      </div>
      <span v-html="highlight(user.email)" />
    </div>
    <div class="card_button" @click="isActive = !isActive">
      <div v-if="isActive">SKIP SELECTION</div> 
      <div v-else>MARK AS SUITABLE</div>
    </div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    isActive: false
  }),
  props: {
    query: String,
    user: Object
  },
  methods: {
    highlight (string) {
      const re = new RegExp(`(${this.query})`, 'ig')
      return string.match(re) ? string.replace(re, '<em>$1</em>') : string
    }
  }
}
</script>

<style lang="scss">

.active {
  border: 1px solid #4765FF
}
.inactive {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}    

.card {
  display: grid;
  grid-template-columns: 134px 1fr;
  grid-template-rows: 1fr auto;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  background: #FAFAFA;
  margin-bottom: 21px;
  grid-template-areas:
            "a b b"
            "a b b"
            "a c c";      

  h3 {
    font-size: 24px;
    font-weight: normal;
    margin: 0;
    color: rgba(0, 0, 0, 0.87);
    line-height: 32px;
  }


  p {
    font-size: 14px;
    margin: 0;
    color: #0000008B;
    line-height: 20px;
  }

  em {
    font-style: normal;
    background-color: #FFF73B;
  }

  span {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
  }

  &_info {
    padding: 10px 10px 10px 30px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-area: b;
   
  }

  &_avatar {
    background-color: rgba(0, 0, 0, 0.25);
    grid-area: a;
    display: grid;
    & img{
       width: 134px;
       height: 136px;
    }
  }

  &_button {
    grid-area: c;
    color: #009688;
    height: 40px;
    line-height: 40px;
    font-weight: 500;
    text-transform: uppercase;
    padding-left: 40px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
