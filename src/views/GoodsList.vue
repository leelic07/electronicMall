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
              <dd v-for="item,key in priceFilter"><a href="javascript:void(0)"
                                                     @click="selectPriceLevel(item)">{{key}}</a></dd>
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
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                <img src="../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录,否则无法加入到购物车中!
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>

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
  import Modal from '@/components/Modal.vue'
  import qs from 'qs'
  export default {
    data() {
      return {
        goodsList: [],
        page: 1,
        pageSize: 8,
        sortFlag: true,
        busy: true,
        priceLevel: 'all',
        priceFilter: {
          'All': 'all',
          '0 - 100': 1,
          '100 - 500': 2,
          '500 - 1000': 3,
          '1000 - 5000': 4
        },
        loading: false,//控制显示加载loading
        mdShow: false,
        mdShowCart: false
      }
    },
    methods: {
      getGoodsList(flag){
        this.loading = true;
        axios.get('/mall/goods', {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            sort: this.sortFlag ? 1 : -1,
            priceLevel: this.priceLevel
          }
        }).then(res => {
          this.loading = false;
          if (res.data.status === 0) {
            if (flag)
              this.goodsList = this.goodsList.concat(res.data.result.list);
            else
              this.goodsList = res.data.result.list;
            if (res.data.result.count === 0)
              this.busy = true;
            else
              this.busy = false;
          }
        }).catch(err => console.log(err))
      },
      sortGoods(e){
        e.preventDefault();
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      loadMore(){
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 1000);
      },
      selectPriceLevel(priceLevel){
        this.priceLevel = priceLevel;
        this.page = 1;
        this.pageSize = 8;
        this.getGoodsList(false);
      },
      addCart(productId){
        axios.post('/mall/goods/addCart', qs.stringify({
          productId: productId
        })).then(res => {
          if (res.data.status === '0')
            alert('添加商品成功！');
          else
            alert('添加商品失败！' + res.data.msg);
        }).catch(err => console.log(err));
      },
      closeModal(){
        this.mdShow = false;
        this.mdShowCart = false;
      }
    },
    mounted(){
      this.getGoodsList();
    },
    components: {
      NavHeader,
      NavBread,
      NavFooter,
      Modal
    }
  }
</script>

<style type="text/css">
  /*@import "../assets/css/base.css";*/
  /*@import "../assets/css/product.css";*/
</style>
