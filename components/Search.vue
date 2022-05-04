<template>
  <div class="search">
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.54" d="M12.502 11H11.708L11.432 10.726C12.407 9.589 13 8.115 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.115 13 9.588 12.408 10.725 11.434L11.001 11.708V12.5L15.999 17.491L17.49 16L12.502 11ZM6.5 11C4.014 11 2 8.986 2 6.5C2 4.015 4.014 2 6.5 2C8.985 2 11 4.015 11 6.5C11 8.986 8.985 11 6.5 11Z" fill="black" />
    </svg>
    <input
      type="text"
      v-model="string"
      v-focus @input="onInput(string)"
    />
  </div>
</template>

<script>
export default {
  props: {
    query: String
  },
  data () {
    return {
      string: this.query
    }
  },
  methods: {
    onInput (string) {
      this.$router.push(
        string.length
          ? `/search/${string}`
          : '/'
      )
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss">
.search {
  background: #FAFAFA;
  padding: 0 19px;
  height: 48px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 15px;
  align-items: center;
  margin-bottom: 20px;

  input {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.75);
    width: 100%;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    outline: none;
  }
}
</style>
