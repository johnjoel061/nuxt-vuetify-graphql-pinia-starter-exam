<template>
	<v-card class="mb-4">
		<v-card-title>{{ rocket.name }}</v-card-title>
		<v-card-text>
			<p>
				<strong>First flight:</strong>
				{{ formatDate(rocket.first_flight) }}
			</p>
			<p>
				<strong>Company:</strong>
				{{ rocket.company }}
			</p>
		</v-card-text>
		<v-card-actions>
			<NuxtLink :to="`/rockets/${rocket.id}`">
				<v-btn text color="primary">View Details</v-btn>
			</NuxtLink>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
defineProps<{
	rocket: {
		id: string
		name: string
		first_flight: string
		company: string
	}
}>()

function formatDate(date: string) {
	return new Date(date).toLocaleDateString()
}
</script>
