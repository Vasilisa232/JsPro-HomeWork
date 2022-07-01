const BASE_URL = 'https://localhost:8000/';
const GET_GOODS_ITEMS = `${BASE_URL}goods.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}basket`

function service(url) {
  return fetch(url)
  .then((res) => res.json())
}
function serviceBody(url = "", method = "POST", body = {}) {
 return fetch(
  url,
  {
    method,
    headers: {
     "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body)
  }
 )
}

function init() {

  const BasketItem = Vue.component('basket-item', {
    props: [
      'item'
    ],
    template: `
        <div class="basket-item">
          <div class="basket-item_field">
            <span class="basket-item__title">{{ item.data.product_name }}</span>
            <span class="basket-item__price">( {{ item.data.price }}р. )</span>
          </div>
           <div class="basket-item__count">
             <span>{{ item.count }}шт.</span>
             <button>+</button>
             <button>-</button>
           </div>
           <div class="basket-item__total">Всего: {{ item.total }}р.</div>
        </div>
      `
  })

  const CustomButton = Vue.component('custom-button', {
    template: `
    <button class="search-button custom-button" type="button" v-on:click="$emit('click')">
    <slot></slot>
    </button>
    `
  })

  const basketGoods = Vue.component('basket', {
    data() {
      return {
        basketGoodsItems: []
      }
    },
   template: `
    <div class="fixed-area">
     <div class="basket-card">
      <div class="basket-card__header">
        <h1 class="basket-card__header__title">basket-card</h1>
        <div class="basket-card__header__delete-icon" @click="$emit('closeclick')">
        </div>
      </div>
      <div class="basket-card__content">
      <basket-item v-for="item in basketGoodsItem" :item="item"></basket-item>
      </div>
     </div>
    </div>
  `,
   mounted() {
    service(GET_BASKET_GOODS_ITEMS).then((data) => {
     this.basketGoodsItems = data
    })
   }
  })

  const goodsItem = Vue.component('goods-item', {
    props: [
      'item'
    ],
    template:`
    <div class="goods-item">
      <h3>{{ item.product_name}} </h3>
      <p>{{ item.price }}</p>
      <div>
      </div>
    </div>
    `
  })

  Vue.component('custom-search', {
    template:`
      <input type="text" class="goods-search" @input="$emit('input', $event.target.value)"/>
    `
  })

  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      filteredItems: [],
      basketGoodsItems: [],
      searchValue: '',
      isVisibleCart: false
    },
    methods: {
      setVisibleCart() {
        this.isVisibleCart = !this.isVisibleCart
      },
      fetchGoods() {
        service(GET_GOODS_ITEMS).then((data) => {
          this.items = data;
          this.filteredItems = data;
        });
      },
      filterItems() {
        this.filteredItems = this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.searchValue, 'gui'))
        })
      },
    /* mounted() {
      service(GET_GOODS_ITEMS).then((data) => {
        this.items = data;
        this.filteredItems = data;
        return data;
      })*/
    },
    computed: {
      calculatePrice() {
        return this.items.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      }
      /* filteredItems() {
        return this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.searchValue, 'gui'))
        })
      } */
    },
  })

}
window.onload = init;