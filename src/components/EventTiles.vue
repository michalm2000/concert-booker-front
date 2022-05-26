<template>
  <div>
      <div v-for="(event, index) in events" :key="index">
        <router-link :to="'/event/' + event.id">{{event.name}}</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'EventTiles',
  data() {
    return {
      events: null,
    }
  },
  created() {
    fetch("http://localhost:9000/api/v1/event/all")
    .then(response => response.json())
    .then(data => this.events = data)
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
