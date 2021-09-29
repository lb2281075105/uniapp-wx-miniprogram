<template>
	<view>
		<view v-for="(item,i) in goodsList" :key="i">
		  <view @click="gotoDetail(item)">
			  <my-goods :goods="item" ></my-goods>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
          cid:'',
          query:'',
          pagenum:1,
          pagesize:10
        },
        total:0,
        goodsList:[],
		isloading:false
			};
		},
    onLoad(options) {
      this.queryObj.cid = options.cid || ''
      this.queryObj.query = options.query || ''
      this.getGoodsList()
    },
    methods:{
      async getGoodsList(cb){
		  this.isloading = true
        const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
		this.isloading = false
		cb && cb()
        if(res.meta.status == 200){
          this.goodsList = [...this.goodsList,...res.message.goods]
          this.total = res.message.total
        }else{
          uni.$showMsg()
        }
      },
	  gotoDetail(item){
		  uni.navigateTo({
		  	url:"/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
		  })
	  }
    },
	onReachBottom() {
		
		if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg("数据加载完毕")
		
		if(this.isloading)return
		this.queryObj.pagenum += 1
		this.getGoodsList()
	},
	onPullDownRefresh() {
		this.queryObj.pagenum = 1
		this.goodsList = []
		this.isloading = false
		this.getGoodsList(() => uni.stopPullDownRefresh())
	}
	}
</script>

<style lang="scss">
 

</style>
