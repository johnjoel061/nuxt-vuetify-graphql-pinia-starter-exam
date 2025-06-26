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
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
</script>
