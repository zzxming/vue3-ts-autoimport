import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/Home.vue'),
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
