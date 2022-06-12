<template>
  <div id="main">
    <h1>Events</h1>
    <div id="table">  
      <b-table striped hover :items="getEventsTable" :fields = "fields">
        <template #cell(actions)="data">
          <col class="actions-column">
          <action-buttons @load:events="getEvents()"  @load:editForm="showEditForm(data.value)" :id=data.value entityName="event"></action-buttons>
        </template>
      </b-table>
      <b-button @click="showAddForm()" variant="success">Add new event</b-button>
      
    </div>
    <event-form id="form" @post:event="postEvent"  @edit:event="editEvent" :eventToEdit="eventToEdit" hidden />
  </div>
  
</template>

<script>
import ActionButtons from './ActionButtons.vue'
import EventForm from './EventForm.vue'
export default {
  data(){
    return {
      fields: ['id','name', 'date', 'artist', 'description', 'actions'],
      events: [],
      eventID: 0,
      eventToEdit: {id: 0, name: null, date: null, artist: null, description: null}
    }
  },
  name: 'EventsList',
  computed: {
    getEventsTable: function() {
      return  this.events.map(event => {
        return {...event, name: event.name}
      })
    }   
  },
  components:{
    EventForm,
    ActionButtons
  },
  methods: {
    
    async getEvents(){
      try{
        const response = await fetch('http://localhost:9000/api/v1/event/all')
        let data = await response.json()
        this.events = data.map(event => {
           return {...event, actions: event.id}
        })
        } catch (error){
          console.log(error)
        }
    },

    async editEvent(eevent){
      let data = eevent
      eevent.id = eevent.actions
      console.log(eevent.time)
      if (eevent.time) {
          eevent.date = eevent.date.substring(0, 10) + 'T' + eevent.time + '.000Z'
      }
      console.log(eevent)
        let request = new Request(`http://localhost:9000/api/v1/event`,
            {method: 'PUT', body: JSON.stringify(data), headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
        
        fetch(request)
            .then(() => {
                this.getEvents()
        document.getElementById("form").setAttribute("hidden", true)
                }
            
        )
      
    },

    async postEvent(pevent){
      let data = pevent
      pevent.date = pevent.date + 'T' + pevent.time + '.000Z'
      let request = new Request('http://localhost:9000/api/v1/event',
				{method: 'POST', body: JSON.stringify(data), headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
			
			fetch(request)
				.then(() => {
					this.getEvents()
          document.getElementById("form").setAttribute("hidden", true)
					}
				)

    },

    showAddForm (){
      this.eventToEdit = {id: 0}
      document.getElementById("form").removeAttribute("hidden")
    },

    showEditForm(id){
      console.log(id)
      this.eventToEdit = {...this.events.filter(event => event.id == id)[0]}
      console.log(this.eventToEdit)
      document.getElementById("form").removeAttribute("hidden")
    }
    
    
  },
  mounted() {
      this.getEvents()
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