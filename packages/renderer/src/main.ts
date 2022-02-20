import { createApp } from 'vue';

import App from '~r/app.vue';
import { router } from '~r/router';
import './tailwind.css';

createApp(App).use(router).mount('#app');
