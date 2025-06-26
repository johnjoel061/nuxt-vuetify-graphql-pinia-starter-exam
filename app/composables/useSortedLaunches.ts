import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'

interface Launch {
	id: string
	mission_name: string
	launch_date_utc: string
	launch_site?: {
		site_name_long?: string
	}
	rocket?: {
		[x: string]: any
		rocket: any
		rocket_name?: string
	}
	details?: string | null
}

type SortOrder = 'asc' | 'desc'

export function useSortedLaunches(
	launches: Ref<Launch[]>,
	sortOrder: Ref<SortOrder>,
): {
	sortedLaunches: ComputedRef<Launch[]>
} {
	const sortedLaunches = computed(() => {
		return [...launches.value].sort((a, b) => {
			const dateA = new Date(a.launch_date_utc).getTime()
			const dateB = new Date(b.launch_date_utc).getTime()

			return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
		})
	})

	return {
		sortedLaunches,
	}
}
