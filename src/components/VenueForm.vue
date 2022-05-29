<template>
	<div id="venue-form" >
		
		<b-form @submit.prevent="venue.id == 0 ? postVenue(venue) : editVenue(venue)" method="post" >
			<b-form-group v-if="venue.id != 0"
				id="input-group-0"
				label="Id:"
				label-for="input-0"
			>
				<b-form-input
					id="input-0"
					v-model="venue.id"
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
					v-model="venue.name"
					type="text"
					placeholder="Enter name"
					required
					></b-form-input>
			</b-form-group>
			
			<b-form-group
				id="input-group-2"
				label="Address:"
				label-for="input-2"
			>
				<b-form-input
					id="input-2"
					v-model="venue.address"
					type="text"
					placeholder="Enter address"
					required
					></b-form-input>
			</b-form-group>
            <b-form-group
				id="input-group-3"
				label="Seat pattern:"
				label-for="input-3"
				v-if="venue.id == 0"
			>
				<b-form-input
					id="input-3"
					v-model="venue.seatPattern"
					type="text"
					placeholder="Enter seat pattern"
					required
					></b-form-input>
			</b-form-group>
			<b-button type="submit" variant="primary">Submit</b-button>
		</b-form>
	</div>
</template>



<script>
export default {
	data(){
		return {
			venue: {}
		}
	},
	name: 'VenueForm',
	props: {
		venueToEdit: Object
	},
	watch: {
		venueToEdit(newVal, oldVal){
			oldVal
			this.venue = newVal
		}
		
	},
	methods: {
		clearForm: function(){
			this.venue.name = ""
            this.venue.address = ""
		},
		
		async postVenue(pvenue){
			let retVenue = {...pvenue}
			delete retVenue.id
			this.$emit('post:venue', retVenue)
			this.clearForm()
		},
		editVenue(evenue){
			const retvenueId = evenue.id
			let retVenue = {...evenue}
			delete retVenue.id
			this.$emit('edit:venue', retVenue, retvenueId)
			this.clearForm()
		},
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