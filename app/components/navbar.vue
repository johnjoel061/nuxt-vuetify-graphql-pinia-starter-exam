<template>
	<v-app-bar color="primary" dark>
		<v-toolbar-title>SpaceX Explorer</v-toolbar-title>
		<v-spacer />
		<NuxtLink to="/" class="nav-link">Home</NuxtLink>
		<NuxtLink to="/rockets" class="nav-link">Rockets</NuxtLink>
		<NuxtLink to="/launches" class="nav-link">Launches</NuxtLink>
	</v-app-bar>
</template>

<style scoped>
.nav-link {
	margin: 0 10px;
	color: white;
	text-decoration: none;
	position: relative;
	padding-bottom: 4px;
}

.nav-link.router-link-exact-active::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	height: 2px;
	width: 100%;
	background-color: white;
}
</style>
