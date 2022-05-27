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
    <!-- {{chosenTickets}} -->
    <div v-if="errored">
      <h3>EVENT NOT FOUND</h3>
    </div>
    <div class="mapwrap" v-if="!errored">
      <div class="ticketList" v-if="chosenTickets.length > 0">
        <b>Chosen Tickets</b>
        <div v-for="(ticket, index) in chosenTickets" :key="index">
          <TicketModel :seat="ticket.seatNumber" :row="ticket.rowName" :sector="ticket.sectorName" :type="ticket.type.toLowerCase()"/>
        </div>
              <b-button @click="buyTickets()" :disabled="chosenTickets.length == 0" > Buy tickets</b-button>

      </div>
      <h2>{{venueData.artist}} - {{venueData.name}} </h2>
      <div>
        <div class="sector_row" v-for="rown in maxRows+1" :key="rown">
          <div class= "sector_column" v-for="coln in tutu.sectors.filter(sector => sector.rowInVenue == rown-1).map(sector=> sector.columnInVenue).slice(-1)[0]+1" :key="coln">
            <span class="sector">
              {{tutu.sectors.filter(sector => sector.rowInVenue == rown-1 && sector.columnInVenue == coln-1)[0].sectorName}}
              <div class="seat_row" v-for="(row, index) in tutu.sectors.filter((sector) => sector.columnInVenue == coln-1 && sector.rowInVenue == rown-1)[0].rows" :key="index"> 
              <div v-if="coln == 1" class="rownumber"> {{index+1}} </div>
                <div class="seat" v-for="(seat, index2) in row.seats" :key="index2">         
                      <b-button @click="reserveSeat(seat.id)"  v-bind:variant="tickets.filter(t => t.seatId == seat.id)[0].available ?
                        tickets.filter(t => t.seatId == seat.id)[0].chosen ?'success' : 'outline-primary' : 'danger'"
                        :disabled="!(tickets.filter(t => t.seatId == seat.id)[0].available) || choosingTicketType" >
                        {{seat.number}}
                      </b-button>
                  </div>
                </div>
            </span>
          </div>
        </div>
      </div>
      <div v-if="choosingTicketType" class="ticket-type-chooser">
          Choose your ticket type
          <b-radio-group
          v-model="ticketType"
          :options="tOptions"
          class="mb-3"
          value-field="item"
          text-field="name">
          </b-radio-group>
          <b-button @click="addTicket()" variant="primary"> Confirm </b-button>
          <b-button @click="choosingTicketType = false" variant="danger"> Cancel</b-button>
      </div>

    </div>
  </div>
</template>

<script>
import TicketModel from './components/Ticket.vue'
export default {
  name: 'VenueMap',
  data () {
	return {
    currentSeatId: null,
    currentTicketId: null,
    ticketType: null,
		tutu: null,
    maxRows: null,
    maxCols: null,
    tickets: null,
    rawResponse: null,
    venueData: null,
    errored: false,
    choosingTicketType: false,
    chosenTickets: [],
    tOptions: [{item: 'FULL', name: "Full ticket"}, {item: 'REDUCED', name: "Reduced ticket"}] 
	}
  },
  components: {
    TicketModel,
  },
  created() {
	// fetch("http://localhost:9000/api/v1/venue/full/6")
	// .then(response => response.json())
	// .then(data => {this.tutu = data; this.maxRows = Math.max(...data.sectors.map((sector) =>  sector.rowInVenue)); this.maxCols =Math.max(...data.sectors.map((sector) =>  sector.columnInVenue)); });
    fetch(`http://localhost:9000/api/v1/event/venue/${this.$route.params.id}`)
    .then(response =>{
      if(response.ok){
      return response.json()
      }
      throw new Error();
  })
    .then(data => {this.venueData= data; this.tickets = data.tickets.map(ticket => ({...ticket, chosen: false})); this.tutu = data.venue; this.maxRows = Math.max(...data.venue.sectors.map((sector) =>  sector.rowInVenue)); this.maxCols =Math.max(...data.venue.sectors.map((sector) =>  sector.columnInVenue))
    ;})
    .catch(() =>
      this.errored = true
    )
  },
  methods: {
    async addTicket() {
      var ticket = this.tickets.find(t => t.seatId == this.currentSeatId)
      ticket.chosen = true
      ticket.type = this.ticketType
      this.chosenTickets = this.tickets.filter(t => t.chosen)
      this.choosingTicketType =!this.choosingTicketType

    },
    async reserveSeat (seatId){
      console.log(this.chosenTickets.filter(t => t.seatId == seatId))
      if (this.chosenTickets.filter(t => t.seatId == seatId).length == 0){
        this.choosingTicketType = true
        this.currentSeatId = seatId;
      }
      else {
        var ticket = this.tickets.find(t => t.seatId == seatId)
        ticket.chosen = false
        this.chosenTickets = this.tickets.filter(t => t.chosen)
      }
    },

    async buyTickets(){
      for (const i in this.chosenTickets){
       await fetch(`http://localhost:9000/api/v1/ticket/buy/${this.chosenTickets[i].id}?ticketType=${this.chosenTickets[i].type}`, {
        method: 'POST'})
      }
      await fetch(`http://localhost:9000/api/v1/ticket/full?eventId=${this.$route.params.id}`)
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
  position: relative;

  max-width: fit-content
}

.seat_row {
  display: flex;
  justify-content: center;
  align-items: center;

}

.ticketTypeChooser {
  position: absolute;
  width: 200px;
  height: 200px;
  z-index: 9;
}

.ticketList {
  position: fixed;
  top: 1vh;
  right: 10vw;
  border: 1px solid black;
}

/* .mapwrap{
  width: 45%
} */

</style>
