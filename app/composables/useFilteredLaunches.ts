import type { Ref } from 'vue'
import { computed } from 'vue'


export function useFilteredLaunches(launches: Ref<any[]>, selectedYear: Ref<string | null>) {
	const filteredLaunches = computed(() => {
		if (!selectedYear.value) return launches.value
		return launches.value.filter((launch) => launch.launch_date_utc?.startsWith(selectedYear.value))
	})

	return {
		filteredLaunches,
	}
}
