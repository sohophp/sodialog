import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'
import DemoPreview from './components/DemoPreview.vue'
import CdnNotice from './components/CdnNotice.vue'
import CdnExamples from './components/CdnExamples.vue'
import HomePage from './components/HomePage.vue'
import VersionBadge from './components/VersionBadge.vue'
import DocPageHeader from './components/DocPageHeader.vue'
import LabCard from './components/LabCard.vue'
import ApiParamTable from './components/ApiParamTable.vue'
import ModalLab from './components/ModalLab.vue'
import OffcanvasPlayground from './components/OffcanvasPlayground.vue'

export default {
	...DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		app.component('DemoPreview', DemoPreview)
		app.component('CdnNotice', CdnNotice)
		app.component('CdnExamples', CdnExamples)
		app.component('HomePage', HomePage)
		app.component('VersionBadge', VersionBadge)
		app.component('DocPageHeader', DocPageHeader)
		app.component('LabCard', LabCard)
		app.component('ApiParamTable', ApiParamTable)
		app.component('ModalLab', ModalLab)
		app.component('OffcanvasPlayground', OffcanvasPlayground)
	},
}
