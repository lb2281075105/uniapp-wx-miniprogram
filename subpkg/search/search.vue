<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入内容" v-model="searchValue">
				<!-- <view slot="clearIcon" style="color: #999999" >X</view> -->
			</uni-search-bar>
		</view>
		<view class="goods-list" v-if="searchResults.length !== 0">
			<view v-for="(item,i) in searchResults" class="goods-item" @click="gotoGoodsTail(item)" :key="i">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<view class="history-box" v-else>
				
			<view class="history-title">
				<view>搜索历史</view>
				<uni-icons type="trash"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i"></uni-tag>
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
				searchResults:[], 
				historyList:JSON.parse(uni.getStorageSync('kw') || '[]')
			};
		},
		computed:{
			// 计算属性处理搜索文字在最前面显示
			histories(){
				return [...this.historyList].reverse()
			}
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					console.log(e)
					this.kw = e
					this.getSearchList()
					this.saveHistoryKeyword()
				},500)
				
			},
			saveHistoryKeyword(){
				// 处理搜索文字重复的问题
				let set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
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
			},
			gotoGoodsTail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
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
	.history-box{
		padding: 0 5px;
		.history-title{
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			border-bottom: 1px solid #efefef;
			height: 40px;
			align-items: center;
		}
		.uni-tag{
			margin-top: 5px;
			margin-right: 5px;
		}
	}
	
</style>
