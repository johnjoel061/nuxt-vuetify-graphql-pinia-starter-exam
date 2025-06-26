import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		favorites: [] as any[],
	}),
	actions: {
		addFavorite(rocket: any) {
			if (!this.favorites.find((r) => r.id === rocket.id)) {
				this.favorites.push(rocket)
			}
		},
		removeFavorite(id: string) {
			this.favorites = this.favorites.filter((r) => r.id !== id)
		},
		clearFavorites() {
			this.favorites = []
		},
	},
})
