const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
  return fetch(url)
  .then((res) => res.json());
}

Vue.component('basket', {
  template:`
  <div class="fixed-area">
      <div class="basket-card">
        <div class="basket-card__header">
          <h1 class="basket-card__header__title">basket-card</h1>
          <div class="basket-card__header__delete-icon"
          @click="$emit('close')"></div>
        </div>
        <div class="basket-card__content">content
        </div>
      </div>
    </div>
  `
})

Vue.component('custom-button', {
  template: `
  <button class="search-button" type="button" v-on:click="$emit('click')">
  <slot></slot>
  </button>
  `
})

Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})

Vue.component('good', {
  props: [
    'item'
  ],
  template: `
  <div class="goods-item">
    <h3>{{ item.product_name}} </h3>
    <p>{{ item.price }}</p>
  </div>
  `
})

const app = new Vue({
  el: '#app',
  data: {
    message: 'Привет, Vue!'
  }
})




window.onload = () => {
  const root = new Vue({
    el: '#root',
    data: {
      items: [],
      searchValue: '',
      isVisibleCart: false,
    },
    

    methods: {
      setVisibleCart() {
        this.isVisibleCart = !this.isVisibleCart
      }
    },
    mounted() {
      service(GET_GOODS_ITEMS).then((data) => {
        this.items = data;
        return data;
      })
    },
    computed: {
      calculatePrice() {
        return this.items.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      },

      filteredItems() {
          return this.items.filter(({ product_name }) => {
            return product_name.match(new RegExp(this.searchValue, 'gui'))
          })
        
      }
    }
  })
}