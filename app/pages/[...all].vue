<!-- pages/[...all].vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
	router.replace('./launches')
})
</script>

<template>
	<div class="text-center mt-10">
		<h2>Page not found. Redirecting to Launches...</h2>
	</div>
</template>
