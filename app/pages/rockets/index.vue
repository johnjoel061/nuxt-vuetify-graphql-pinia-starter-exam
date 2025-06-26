<template>
	<v-container>
		<h3 class="my-5">
			<v-chip color="blue">Rockets</v-chip>
			<v-chip color="orange">All SpaceX Rockets</v-chip>
		</h3>

		<v-row>
			<v-col v-for="rocket in rockets" :key="rocket.id" cols="12" md="6" lg="4">
				<v-card class="mb-4" elevation="2">
					<v-card-title>{{ rocket.name }}</v-card-title>
					<v-card-subtitle>First Flight: {{ formatDate(rocket.first_flight) }}</v-card-subtitle>
					<v-card-text>
						<p>
							<strong>Company:</strong>
							{{ rocket.company }}
						</p>
						<p>
							<strong>Country:</strong>
							{{ rocket.country }}
						</p>
						<p>
							<strong>Stages:</strong>
							{{ rocket.stages }}
						</p>
					</v-card-text>
					<v-card-actions>
						<NuxtLink :to="`/rockets/${rocket.id}`">
							<v-btn color="primary" text>View Details</v-btn>
						</NuxtLink>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { gql, useAsyncQuery } from '#imports'
import { computed } from 'vue'

const query = gql`
	query GetRockets {
		rockets(limit: 10) {
			id
			name
			company
			country
			first_flight
			stages
		}
	}
`

const { data } = useAsyncQuery(query)
const rockets = computed(() => data.value?.rockets ?? [])

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
</script>
