export default {
	namespaced: true,
	// state里面的数据在使用的时候，一般是挂在computed里面的
	state:() => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart:[]
	}),
	// state里面的数据只能在mutations里面进行修改
	mutations:{
		addToCart(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			console.log(findResult)
			if(!findResult){
				state.cart.push(findResult)
			}else{
				findResult.goods_count++
			}
			console.log(state.cart)
		}
	},
	// getters相当于vue中的(computed)计算属性，通过getters进一步处理，得到我们想要的值，而且允许传参，第一个参数就是state
	getters:{}

}
