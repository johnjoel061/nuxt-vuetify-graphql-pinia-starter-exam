<template>
	<v-container>
		<v-card v-if="rocket" class="pa-4">
			<v-card-title class="text-h5">{{ rocket.name }}</v-card-title>
			<v-card-subtitle class="text-subtitle-1">
				First Flight: {{ formatDate(rocket.first_flight) }}
			</v-card-subtitle>
			<v-card-text>
				<p>
					<strong>Description:</strong>
					{{ rocket.description }}
				</p>
				<p>
					<strong>Company:</strong>
					{{ rocket.company }}
				</p>
				<p>
					<strong>Country:</strong>
					{{ rocket.country }}
				</p>
				<p>
					<strong>Cost per Launch:</strong>
					${{ rocket.cost_per_launch?.toLocaleString() }}
				</p>
				<p>
					<strong>Stages:</strong>
					{{ rocket.stages }}
				</p>
				<p>
					<strong>Boosters:</strong>
					{{ rocket.boosters }}
				</p>
				<p>
					<strong>Height:</strong>
					{{ rocket.height?.meters }} m
				</p>
				<p>
					<strong>Diameter:</strong>
					{{ rocket.diameter?.meters }} m
				</p>
				<p>
					<strong>Mass:</strong>
					{{ rocket.mass?.kg }} kg
				</p>
				<p>
					<strong>Success Rate:</strong>
					{{ rocket.success_rate_pct }}%
				</p>
				<p>
					<strong>Type:</strong>
					{{ rocket.type }}
				</p>
				<p>
					<strong>Wikipedia:</strong>
					<a :href="rocket.wikipedia" target="_blank">{{ rocket.wikipedia }}</a>
				</p>
			</v-card-text>
		</v-card>

		<v-alert v-else type="warning">Rocket not found.</v-alert>
	</v-container>
</template>

<script setup lang="ts">
import { gql, useAsyncQuery } from '#imports'
import { useRoute } from 'vue-router'

const route = useRoute()
const rocketId = route.params.id as string

const query = gql`
	query GetRocket($id: ID!) {
		rocket(id: $id) {
			id
			name
			description
			first_flight
			company
			country
			cost_per_launch
			height {
				meters
			}
			diameter {
				meters
			}
			mass {
				kg
			}
			stages
			boosters
			success_rate_pct
			type
			wikipedia
		}
	}
`


const { data } = useAsyncQuery(query, { id: rocketId })
const rocket = computed(() => data.value?.rocket)

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
</script>
