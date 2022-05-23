<template>
  <div id="app">
    <EventTiles />
    <a href="#/events">siema</a>

  </div>
</template>

<script>
import EventTiles from './components/EventTiles.vue'
import VenueMap from './VenueMap.vue'
const routes = [
  {path: "/events", component: VenueMap}
]
export default {
  name: 'App',
  components: {
    EventTiles,
  },
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/']
    }
  },
mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
		})
  }

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
