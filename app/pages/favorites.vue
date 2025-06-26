<template>
	<v-container>
		<h2 class="my-5">Favorite Rockets</h2>

		<v-btn color="red" class="mb-4" @click="favoritesStore.clearFavorites">Clear All Favorites</v-btn>

		<v-card v-for="rocket in favoritesStore.favorites" :key="rocket.id" class="mb-3">
			<v-card-title>{{ rocket.rocket_name || rocket.name }}</v-card-title>
			<v-card-text>
				<p>
					<strong>ID:</strong>
					{{ rocket.id }}
				</p>
				<p>
					<strong>Name:</strong>
					{{ rocket.name || rocket.rocket_name }}
				</p>
			</v-card-text>
			<v-card-actions>
				<v-btn color="error" @click="favoritesStore.removeFavorite(rocket.id)">Remove</v-btn>
			</v-card-actions>
		</v-card>

		<v-alert v-if="favoritesStore.favorites.length === 0" type="info">No favorite rockets yet.</v-alert>
	</v-container>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
const favoritesStore = useFavoritesStore()
</script>
