<template>
  <view class="goods-container">
      <view class="left-img-container">
		  <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="clickRadioHandler"></radio>
        <image :src="goods.goods_small_logo || defaultPic" class="left-img"></image>
      </view>
      <view class="right-title-container">
        <view class="top-title">{{goods.goods_name}}</view>
		<!-- 通过管道符 | 调用过滤器 -->
        
		<view class="bottom">
			<view class="bottom-money">¥{{goods.goods_price | toFixed}}</view>
			<uni-number-box v-model = "goods.goods_count" :min="1" @change="bindChange" v-if="showNumberBox"/>
		</view>
		
      </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
		  type:Object,
		  default:{}
	  },
	  showRadio:{
		  type:Boolean,
		  default:false
	  },
	  showNumberBox:{
		  type:Boolean,
		  default:false
	  }
      
    },
	filters:{
		toFixed(num){
			return Number(num).toFixed(2)
		}
	},
    data() {
      return {
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
	methods:{
		clickRadioHandler(){
			this.$emit('radio-change',{
				goods_id:this.goods.goods_id,
				goods_state:!this.goods.goods_state
			})
		},
		bindChange(value){
			console.log(value)
			this.$emit('numChangeHandler',{
				goods_id:this.goods.goods_id,
				goods_count:+value
			})
		}
	}
  }
</script>

<style lang="scss">
  .goods-container{
    padding: 10px 5px;
    border-bottom: 1px solid #efefef;
    display: flex;
	.left-img-container{
		display: flex;
		align-items: center;
		.left-img{
		  width: 100px;
		  height: 100px;
		  display: block; // 去除image 空白区域
		}
	}
    
    .right-title-container{
      display: flex;
	  flex: 1;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 5px;
      .top-title{
        font-size: 13px;
      }
	  .bottom{
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		 .bottom-money{
		   color: #C00000;
		 }
		  
	  }
      
    }
   
  }

</style>
