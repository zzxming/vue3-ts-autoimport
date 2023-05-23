<script setup lang="ts">
	import { routes } from '@/router';
</script>

<template>
	<nav>
		<RouterLink
			v-for="route in routes.slice(1)"
			:to="route.path"
		>
			{{ route.name }}
		</RouterLink>
	</nav>

	<RouterView />
</template>

<style scoped lang="less"></style>
