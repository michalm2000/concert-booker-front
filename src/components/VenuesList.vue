<template>
  <div id="main">
    <h1>Venues</h1>
    <div id="table">  
      <b-table striped hover :items="getVenuesTable" :fields = "fields">
        <template #cell(actions)="data">
          <col class="actions-column">
          <action-buttons @load:venues="getVenues()"  @load:editForm="showEditForm(data.value)" :id=data.value entityName="venue"></action-buttons>
        </template>
      </b-table>
      <b-button @click="showAddForm()" variant="success">Add new venue</b-button>
      
    </div>
    <venue-form id="form" @post:venue="postVenue"  @edit:venue="editVenue" :venueToEdit="venueToEdit" hidden />
  </div>
  
</template>

<script>
import ActionButtons from './ActionButtons.vue'
import VenueForm from './VenueForm.vue'
export default {
  data(){
    return {
      fields: ['id','name', 'address', 'actions'],
      venues: [],
      venueID: 0,
      venueToEdit: {id: 0, name: null, address: null, seatPattern: null}
    }
  },
  name: 'VenuesList',
  computed: {
    getVenuesTable: function() {
      return  this.venues.map(venue => {
        return {...venue, name: venue.name}
      })
    }   
  },
  components:{
    VenueForm,
    ActionButtons
  },
  methods: {
    
    async getVenues(){
      try{
        const response = await fetch('http://localhost:9090/api/v1/venue/all')
        let data = await response.json()
        this.venues = data.map(venue => {
           return {...venue, actions: venue.id}
        })
        } catch (error){
          console.log(error)
        }
    },

    async editVenue(evenue){
      let data = evenue
      evenue.id = evenue.actions
			let request = new Request(`http://localhost:9090/api/v1/venue`,
				{method: 'PUT', body: JSON.stringify(data), headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
			
			fetch(request)
				.then(() => {
					this.getVenues()
          document.getElementById("form").setAttribute("hidden", true)
					}
          
        )
      
    },

    async postVenue(pvenue){
      let data = pvenue
      let request = new Request('http://localhost:9090/api/v1/venue',
				{method: 'POST', body: JSON.stringify(data), headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
			
			fetch(request)
				.then(() => {
					this.getVenues()
          document.getElementById("form").setAttribute("hidden", true)
					}
				)

    },

    showAddForm (){
      this.venueToEdit = {id: 0}
      document.getElementById("form").removeAttribute("hidden")
    },

    showEditForm(id){
      console.log(id)
      this.venueToEdit = {...this.venues.filter(venue => venue.id == id)[0]}
      console.log(this.venueToEdit)
      document.getElementById("form").removeAttribute("hidden")
    }
    
    
  },
  mounted() {
      this.getVenues()
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

#main{
  margin: 0 10vw;
}
#buttons {
  width: fit-content;
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
}

.actions-column{
  width: 40px !important;
}

#form {
  margin-right: 30vw;
}



</style>