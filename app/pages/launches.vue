<template>
	<v-container>
		<h3 class="my-5 d-flex justify-space-between align-center">
			<div>
				<v-chip color="blue" class="mr-2">Launches Table</v-chip>
				<v-chip color="orange">Filter & Sort</v-chip>
			</div>
			<NuxtLink to="/favorites">
				<v-btn color="deep-purple">View Favorites</v-btn>
			</NuxtLink>
		</h3>

		<v-row class="mb-4">
			<v-col cols="12" md="6">
				<v-select
					v-model="selectedYear"
					:items="yearOptions"
					label="Filter by Launch Year"
					clearable
					color="blue"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-select
					v-model="sortOrder"
					:items="['asc', 'desc']"
					label="Sort by Launch Date"
					color="deep-purple"
				/>
			</v-col>
		</v-row>

		<v-table>
			<thead>
				<tr>
					<th class="text-left">Mission Name</th>
					<th class="text-left">Launch Date</th>
					<th class="text-left">Launch Site</th>
					<th class="text-left">Rocket Name</th>
					<th class="text-left">Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in sortedFilteredLaunches" :key="launch.id">
					<td>{{ launch.mission_name }}</td>
					<td>{{ formatDate(launch.launch_date_utc) }}</td>
					<td>{{ launch.launch_site?.site_name_long || 'N/A' }}</td>
					<td>{{ launch.rocket?.rocket_name || 'N/A' }}</td>
					<td>
						<span v-if="launch.details">{{ launch.details }}</span>
						<span v-else class="text-grey">No details</span>
					</td>
					<td>
						<v-btn
							v-if="launch.rocket"
							size="small"
							color="green"
							@click="addToFavorites(launch)"
						>
							Favorite
						</v-btn>
					</td>
				</tr>
			</tbody>
		</v-table>
	</v-container>
</template>

<script setup lang="ts">
import { gql, useAsyncQuery } from '#imports'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useFilteredLaunches } from '@/composables/useFilteredLaunches'
import { useSortedLaunches } from '@/composables/useSortedLaunches'
import { useFavoritesStore } from '@/stores/favorites'

const toast = useToast()

const selectedYear = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('desc')

const query = gql`
	query GetLaunches {
		launchesPast(limit: 50) {
			id
			mission_name
			launch_date_utc
			launch_site {
				site_name_long
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`


const { data } = useAsyncQuery(query)
const launches = computed(() => data.value?.launchesPast ?? [])

const { filteredLaunches } = useFilteredLaunches(launches, selectedYear)
const { sortedLaunches } = useSortedLaunches(filteredLaunches, sortOrder)

const sortedFilteredLaunches = computed(() => sortedLaunches.value)

const yearOptions = computed(() => {
	const years = launches.value.map((launch) => launch.launch_date_utc?.substring(0, 4))
	return [...new Set(years)].filter(Boolean).sort((a, b) => Number(b) - Number(a))
})

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}


// Favorites logic
const favoritesStore = useFavoritesStore()

function addToFavorites(launch: any) {
	const rocket = {
		id: launch.id,
		name: launch.rocket?.rocket_name || 'N/A',
		description: launch.details || 'No description',
		first_flight: 'Unknown', // placeholder
		company: 'Unknown',
		country: 'Unknown',
		cost_per_launch: 0,
		height: { meters: 0 },
		diameter: { meters: 0 },
		mass: { kg: 0 },
		stages: 0,
		boosters: 0,
		success_rate_pct: 0,
		type: 'N/A',
		wikipedia: '',
	}

	favoritesStore.addFavorite(rocket)

	// Show success message
	toast.success(`${rocket.name} added to favorites!`)
}
</script>
