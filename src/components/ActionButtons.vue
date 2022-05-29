<template>
	<div>
		<button class="btn btn-primary" @click="emitLoad()">Edit</button>
		<button @click="deleteVenue(id)" class="btn btn-danger">Delete</button>
	</div>
</template>

<script>
export default{
	props: {
        id: Number
    },
    methods: {
		async deleteBook(id){
			let request = new Request(`http://localhost:9000/api/v1/venue/${id}`,
						{method: 'DELETE', headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
			fetch(request)
				.then(() => {
						
						this.$emit('load:venues')
						}
				)
		},
		emitLoad(){
			this.$emit('load:editForm')
		}
		
    },
	
	
}
</script>