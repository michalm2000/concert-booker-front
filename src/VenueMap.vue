<template>
  <div class="hello">
    <!-- {{tutu}}
    {{maxRows}}
    {{maxCols}}

    {{(tutu.sectors.map(({rowInVenue, columnInVenue}) =>  ({[rowInVenue] : columnInVenue})))}}
    {{Math.max(tutu.sectors.filter(sector => sector.rowInVenue == 1).map(sector=> sector.columnInVenue))}}
    {{tutu.sectors.filter(sector => sector.rowInVenue == 1).map(sector=> sector.columnInVenue).slice(-1)[0]}}
    {{tutu.sectors.filter((sector) => sector.columnInVenue == 0 && sector.rowInVenue == 0)[0]}}

    {{tutu.sectors}} -->
    {{chosenTickets}}

    <div class="mapwrap">
      <div>
        <div class="sector_row" v-for="rown in maxRows+1" :key="rown">
          <div class= "sector_column" v-for="coln in tutu.sectors.filter(sector => sector.rowInVenue == rown-1).map(sector=> sector.columnInVenue).slice(-1)[0]+1" :key="coln">
            <span class="sector">
              {{tutu.sectors.filter(sector => sector.rowInVenue == rown-1 && sector.columnInVenue == coln-1)[0].sectorName}}
              <div class="seat_row" v-for="(row, index) in tutu.sectors.filter((sector) => sector.columnInVenue == coln-1 && sector.rowInVenue == rown-1)[0].rows" :key="index"> 
              <div v-if="coln == 1" class="rownumber"> {{index+1}} </div>
                <div class="seat" v-for="(seat, index2) in row.seats" :key="index2">         
                      <b-button @click="reserveSeat(seat.id)"  v-bind:variant="tickets.filter(t => t.seatId == seat.id)[0].type == null ?
                        tickets.filter(t => t.seatId == seat.id)[0].chosen ?'primary' : 'outline-primary' : 'danger'"
                        :disabled="!(tickets.filter(t => t.seatId == seat.id)[0].type == null)" >
                        {{seat.number}}  
                      </b-button>
                  </div>
                </div>
            </span>
          </div>
        </div>
      </div>
      <b-button @click="buyTickets()" :disabled="chosenTickets.length == 0" > Buy tickets</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VenueMap',
  data () {
	return {
		tutu: null,
    maxRows: null,
    maxCols: null,
    tickets: null,
    rawResponse: null,
    chosenTickets: []
	}
  },
  created() {
	// fetch("http://localhost:9000/api/v1/venue/full/6")
	// .then(response => response.json())
	// .then(data => {this.tutu = data; this.maxRows = Math.max(...data.sectors.map((sector) =>  sector.rowInVenue)); this.maxCols =Math.max(...data.sectors.map((sector) =>  sector.columnInVenue)); });
    fetch("http://localhost:9000/api/v1/event/venue/371")
    .then(response => response.json())
    .then(data => {this.tickets = data.tickets.map(ticket => ({...ticket, chosen: false})); this.tutu = data.venue; this.maxRows = Math.max(...data.venue.sectors.map((sector) =>  sector.rowInVenue)); this.maxCols =Math.max(...data.venue.sectors.map((sector) =>  sector.columnInVenue));})
  },
  methods: {
    async reserveSeat (seatId){
      var ticket = this.tickets.find(t => t.seatId == seatId)
      ticket.chosen = !ticket.chosen
      this.chosenTickets = this.tickets.filter(t => t.chosen).map(t => t.id)

    
      // this.rawResponse = await fetch(`http://localhost:9000/api/v1/ticket/buy/${ticket.id}?ticketType=FULL`, {
      //   method: 'POST'
      // })
      // await fetch(`http://localhost:9000/api/v1/ticket?eventId=371`)
      // .then(response => response.json())
      // .then(data => this.tickets = data)
    },
    async buyTickets(){
      for (const i in this.chosenTickets){
       await fetch(`http://localhost:9000/api/v1/ticket/buy/${this.chosenTickets[i]}?ticketType=FULL`, {
        method: 'POST'})
      }
      await fetch(`http://localhost:9000/api/v1/ticket?eventId=371`)
      .then(response => response.json())
      .then(data => this.tickets = data.map(ticket => ({...ticket, chosen: false})))
      this.chosenTickets = []
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
.dupa {
  width: 20px;
  color: green
}

/* .sector{
  padding: 5%
} */

.rownumber {
  margin-right: 1vw;
}

b-col {
  width:1%;
  white-space: nowrap;
}
.sector_row {
  display: flex;
  justify-content: center;
  
}
.sector_column{
  width: fit-content;
  margin: 1.5vh 1.5vw
}
.seat{
  max-width: fit-content
}

.seat_row {
  display: flex;
  justify-content: center;
  align-items: center;

}

/* .mapwrap{
  width: 45%
} */

</style>
