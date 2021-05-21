<template>
  <div>
      <div v-for="item in 90" :key="item">
        {{item}}
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list:[
          { id: 1, name: '李斯' },
          { id: 2, name: '吕不韦' },
          { id: 3, name: '嬴政' }
      ]
    }
  },
  
  created () {
    console.log(321);
  }
}
</script>

<style>

</style>