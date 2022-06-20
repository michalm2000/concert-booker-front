<template>
  <div>
      <div v-for="(event, index) in events" :key="index">
        <router-link :to="'/event/' + event.id">{{event.name}}</router-link>
      </div>
  </div>
</template>

<script>
import authHeader from '@/services/auth-header'

export default {
  name: 'EventTiles',
  data() {
    return {
      events: null,
    }
  },
  created() {
    let request = new Request(`http://localhost:9090/api/v1/event/all`,
				{method: 'GET', headers: new Headers({'Content-Type': 'application/json; charset=UTF8',
        ...authHeader()},)})
    fetch(request)
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
