<template>
	<div>
		<button class="btn btn-primary" @click="emitLoad()">Edit</button>
		<button @click="deleteEntity(id)" class="btn btn-danger">Delete</button>
	</div>
</template>

<script>
export default{
	props: {
        id: Number,
		entityName: String,

    },
    methods: {
		async deleteEntity(id){
			let request = new Request(`http://localhost:9000/api/v1/${this.entityName}/${id}`,
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