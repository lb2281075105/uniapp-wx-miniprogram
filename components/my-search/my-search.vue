<template>
	<!-- 下面的可以
		:style="{'background-color':bgcolor}"
		style="{background-color:#FFFFFF}"
		:style="{backgroundColor:bgcolor}"
	 -->
	<view class="my-search-container" :style="{'background-color':bgcolor}">
		<view class="my-search-box" :style="{'border-radius':radius + 'px'}" @click="searchClickHandler">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			bgcolor:{
				type:String,
				default:"#C00000"
			},
			radius:{
				type:Number,
				default:18
			}
			
		},
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchClickHandler(){
				this.$emit('gotoSearchClick')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;	
	padding: 0 10px;
	display: flex;
	align-items: center;
	.my-search-box{
		height: 36px;
		background-color: #FFFFFF;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			margin-left: 5px;
			font-size: 15px;
		}
	}
}
</style>
