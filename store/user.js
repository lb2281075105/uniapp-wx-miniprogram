export default {
	namespaced: true,
	// state里面的数据在使用的时候，一般是挂在computed里面的
	state:() => ({
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		token:''
	}),
	// state里面的数据只能在mutations里面进行修改
	mutations:{
		updateAddress(state,address){
			state.address = address
			this.commit('m_user/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	// getters相当于vue中的(computed)计算属性，通过getters进一步处理，得到我们想要的值，而且允许传参，第一个参数就是state
	getters:{
		addStr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}

}
