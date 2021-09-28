<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入内容" v-model="searchValue">
				<!-- <view slot="clearIcon" style="color: #999999" >X</view> -->
			</uni-search-bar>
		</view>
		<view class="goods-list">
			<view v-for="(item,i) in searchResults" class="goods-item">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				searchValue:"",
				kw:'',
				searchResults:[]
			};
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					console.log(e)
					this.kw = e
					this.getSearchList()
				},500)
				
			},
			async getSearchList(){
				
				if(this.kw == ''){
					this.searchResults = []
					return
				}
				
				const {data:res} = await uni.$http.get("/api/public/v1/goods/qsearch",{query:this.kw})
				if(res.meta.status == 200){
				  this.searchResults = res.message
				}else{
				  uni.$showMsg()
				}
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.goods-list{
		padding: 0 5px;
		.goods-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #efefef;
			padding: 13px 0;
			.goods-name{
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 12px;
				margin-right: 3px;
			}
		}
	}
	
</style>
