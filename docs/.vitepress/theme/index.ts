import DefaultTheme from 'vitepress/theme'
import './custom.css'
import DemoPreview from './components/DemoPreview.vue'
import CdnNotice from './components/CdnNotice.vue'

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.component('DemoPreview', DemoPreview)
		app.component('CdnNotice', CdnNotice)
	},
}
