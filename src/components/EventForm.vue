<template>
	<div id="event-form" >
		
		<b-form @submit.prevent="event.id == 0 ? postEvent(event) : editEvent(event)" method="post" >
			<b-form-group v-if="event.id != 0"
				id="input-group-0"
				label="Id:"
				label-for="input-0"
			>
				<b-form-input
					id="input-0"
					v-model="event.id"
					type="text"
					disabled
					></b-form-input>
			</b-form-group>
			<b-form-group
				id="input-group-1"
				label="Name:"
				label-for="input-1"
			>
				<b-form-input
					id="input-1"
					v-model="event.name"
					type="text"
					placeholder="Enter name"
					required
					></b-form-input>
			</b-form-group>
			
			<b-form-group
				id="input-group-2"
				label="Artist:"
				label-for="input-2"
			>
				<b-form-input
					id="input-2"
					v-model="event.artist"
					type="text"
					placeholder="Enter artist"
					required
					></b-form-input>
			</b-form-group>
            <b-form-group
				id="input-group-3"
				label="Description:"
				label-for="input-3"
			>
				<b-form-input
					id="input-3"
					v-model="event.description"
					type="text"
					placeholder="Enter description"
					required
					></b-form-input>
			</b-form-group>
            <b-form-group
				id="input-group-4"
				label="Date:"
				label-for="input-4"
			>
				<b-form-datepicker
					id="input-4"
					v-model="event.date"
					placeholder="Enter date"
					required
					></b-form-datepicker>
                <b-form-timepicker
                    id="input-5"
                    v-model="event.time"
                    placeholder="Enter time"
                    required
                    ></b-form-timepicker>
			</b-form-group>
            <b-form-group
                id="input-group-venue"
                label="Venue:"
                label-for="input-venue"
                >
                <b-form-select
                    v-model="event.venueId" :options="venues" :disabled="event.id != 0 ? true : false">
                </b-form-select>
            </b-form-group>
			<b-button type="submit" variant="primary">Submit</b-button>
		</b-form>
	</div>
</template>



<script>
import authHeader from '../services/auth-header.js'

export default {
	data(){
		return {
			event: {},
            venues: []
		}
	},
	name: 'EventForm',
	props: {
		eventToEdit: Object
	},
	watch: {
		eventToEdit(newVal, oldVal){
			oldVal
			this.event = newVal
		}
		
	},
	methods: {
		clearForm: function(){
			this.event.name = ""
            this.event.address = ""
		},
		
		async postEvent(pevent){
			let retEvent = {...pevent}
			delete retEvent.id
			this.$emit('post:event', retEvent)
			this.clearForm()
		},
		editEvent(eevent){
			const reteventId = eevent.id
			let retEvent = {...eevent}
			delete retEvent.id
			this.$emit('edit:event', retEvent, reteventId)
			this.clearForm()
		},
	},
    created() {
		let request = new Request(`http://localhost:9090/api/v1/venue/all`,
				{method: 'GET', headers: new Headers({'Content-Type': 'application/json; charset=UTF8',
        ...authHeader()},)})
        fetch(request)
        .then(response => response.json())
        .then(data => this.venues = data.map(venue => ({value: venue.id, text: venue.name})))
    },
	mounted(){
        
	},
	
	
}
</script>

<style scoped>
hidden {
	visibility: hidden;
}
visible {
	visibility: visible;
}
button {
	margin-top: 1.2vh
}
</style>