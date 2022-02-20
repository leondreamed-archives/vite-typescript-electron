import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: async () => import('~r/views/landing-view.vue'),
	},
];

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
});
