import {
	mapGetters
} from 'vuex'

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	
	onShow() {
		uni.setTabBarBadge({
			index: 2,
			text: this.total + ''
		})
	}
	
}
