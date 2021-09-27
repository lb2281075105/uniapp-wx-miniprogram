<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <!-- / 根目录 -->
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" mode=""/>
      </view>
    </view>
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" class="floor-title"/>
      </view>
    </view>
  </view>
  
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        navList:[],
        floorList:[]
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
      async getSwiperList(){
        // uni.$http.get 返回的是promise对象 需要用上async await
       const {data:res} = await uni.$http.get("/api/public/v1/home/swiperdata")
       if(res.meta.status == 200){
         this.swiperList = res.message
       }else{
         uni.$showMsg()
       }
      },
      async getNavList(){
        // uni.$http.get 返回的是promise对象 需要用上async await
       const {data:res} = await uni.$http.get("/api/public/v1/home/catitems")
       if(res.meta.status == 200){
         this.navList = res.message
       }else{
         uni.$showMsg()
       }
      },
      navClickHandler(item){
        console.log(item.name)
        if(item.name == "分类"){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      async getFloorList(){
        // uni.$http.get 返回的是promise对象 需要用上async await
       const {data:res} = await uni.$http.get("/api/public/v1/home/floordata")
       if(res.meta.status == 200){
         this.floorList = res.message
         console.log(this.floorList)
       }else{
         uni.$showMsg()
       }
      },
    }
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
  .swiper-item,image{
    width: 100%;
    height: 100%;
  }
}
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
  .nav-item{
    image{
      width: 128rpx;
      height: 140rpx;
    }
  }
}
.floor-title{
    width: 100%;
    height: 60rpx;
}
</style>
