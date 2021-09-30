export default {
	namespaced: true,
	// state里面的数据在使用的时候，一般是挂在computed里面的
	state:() => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	// state里面的数据只能在mutations里面进行修改
	mutations:{
		addToCart(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		updateCartStorage(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		updateCartCountStorage(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		removeCartCountStorage(state,goods){
			state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		}
	},
	// getters相当于vue中的(computed)计算属性，通过getters进一步处理，得到我们想要的值，而且允许传参，第一个参数就是state
	getters:{
		total(state){
			let count = 0
			state.cart.forEach(x => count += x.goods_count)
			return count
		}
	}

}
