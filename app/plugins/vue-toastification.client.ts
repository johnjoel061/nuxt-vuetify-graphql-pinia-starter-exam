import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
	const options: PluginOptions = {
		position: 'top-right',
		timeout: 3000,
		closeOnClick: true,
		pauseOnFocusLoss: true,
		pauseOnHover: true,
		draggable: true,
		draggablePercent: 0.6,
		showCloseButtonOnHover: false,
		hideProgressBar: false,
		closeButton: 'button',
		icon: true,
		rtl: false,
	}

	nuxtApp.vueApp.use(Toast, options)
})
