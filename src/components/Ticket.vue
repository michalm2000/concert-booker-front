<template>
  <div class="ticket-frame">
      <div>Seat: {{seat}} </div>
      <div>Row: {{row}}</div>
      <div>Sector: {{sector}}</div>
      <div>Type: {{type}}</div>
  </div>
</template>

<script>
export default {
  name: 'TicketModel',
  props: {
      seat: Number,
      row: String,
      sector: String,
      type: String
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

.ticket-frame{
    border: 1px solid black;
    margin: 1vw 1vh
}
</style>
