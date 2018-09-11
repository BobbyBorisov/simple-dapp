<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 class="text-orange">Account: {{account}}</h2>
    <div class="mt-3">
      Name <input type="text" class="border-2 border-grey-light py-2 px-2 mx-2" :value="name" @input="updateName">
      Age <input type="text" class="border-2 border-grey-light py-2 px-2 mx-2" :value="age" @input="updateAge">
      <button class="bg-teal py-2 px-3 text-white rounded hover:bg-teal-light" @click="setDataHandler">Save</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as types from '../store/mutation-types'
export default {
  data () {
    return {
      msg: 'Welcome to My First Vue.js DApp'
    }
  },
  computed:{
      ...mapGetters(['account','name', 'age'])
  },
  methods:{
      updateName(e){
          this.$store.commit(types.UPDATE_NAME, e.target.value)
      },
      updateAge(e){
          this.$store.commit(types.UPDATE_AGE, e.target.value ? parseInt(e.target.value, 10) : '')
      },
      setDataHandler(){
          if(this.name && this.age){
              this.$store.dispatch('setData')
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
