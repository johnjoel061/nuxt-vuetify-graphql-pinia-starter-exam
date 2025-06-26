<template>
	<v-app>
		<Navbar />
		<v-main>
			<slot />
		</v-main>
		<Footer />
	</v-app>
</template>

<script setup>
import Footer from '@/components/footer.vue'
import Navbar from '@/components/navbar.vue'
</script>
