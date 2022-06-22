const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
  return fetch(url)
  .then((res) => res.json());
}


window.onload = () => {
  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      filteredItems: [],
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
        this.filteredItems =data;
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