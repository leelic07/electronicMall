<template>
  <div>
    <NavHeader></NavHeader>
    <NavBread>
      <span>Goods</span>
    </NavBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods($event)">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)">All</a></dd>
              <dd>
                <a href="javascript:void(0)">0 - 100</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item,index in goodsList">
                  <div class="pic">
                    <a href="#"><img :src="'../../static/' + item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name" v-text="item.productName"></div>
                    <div class="price" v-text="item.salePrice"></div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavFooter></NavFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import '@/assets/css/base.css'
  import '@/assets/css/product.css'
  import NavHeader from '@/components/Header.vue'
  import NavBread from '@/components/Bread.vue'
  import NavFooter from '@/components/Footer.vue'
  export default {
    data() {
      return {
        goodsList: [],
        page: 1,
        pageSize: 8,
        sortFlag: true
      }
    },
    methods: {
      getGoodsList(){
        axios.get('/mall/goods', {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            sort: this.sortFlag ? 1 : -1
          }
        }).then(res => res.data.status === 0 && (this.goodsList = res.data.result.list)).catch(err => console.log(err))
      },
      sortGoods(e){
        e.preventDefault();
        this.sortFlag = !this.sortFlag;
      }
    },
    mounted(){
      this.getGoodsList()
    },
    components: {
      NavHeader,
      NavBread,
      NavFooter
    }
  }
</script>

<style type="text/css">
  /*@import "../assets/css/base.css";*/
  /*@import "../assets/css/product.css";*/
</style>
