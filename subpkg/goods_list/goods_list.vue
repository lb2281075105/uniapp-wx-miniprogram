<template>
	<view>
    <view v-for="(item,i) in goodsList" :key="i">
      <my-goods :goods="item"></my-goods>
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
			};
		},
    onLoad(options) {
      this.queryObj.cid = options.cid || ''
      this.queryObj.query = options.query || ''
      this.getGoodsList()
    },
    methods:{
      async getGoodsList(){
        const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        if(res.meta.status == 200){
          this.goodsList = res.message.goods
          this.total = res.message.total
        }else{
          uni.$showMsg()
        }
      }
    }
	}
</script>

<style lang="scss">
 

</style>
