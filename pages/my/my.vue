<template>
	<view>
		<my-login v-if="!token"></my-login>
		
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badge from '@/mixins/tabbar-badge.js'
	import {
		mapMutations,
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		mixins: [badge],
		data() {
			return {

			};
		},
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">

</style>
