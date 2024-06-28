//import pinia
import { defineStore } from 'pinia'


export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: []
  }),
  
  //methods for products
  actions: {
    fetchProductsFromDB() {
      fetch('https://dummyjson.com/products/category/laptops') //fetching data from dummyjson framework
          .then(res => res.json())
          .then(json => {
          this.products = json.products;
          })
    },
    //add to cart with decreasing amount of items left in stock
    addToCart(product) {
      const productIndex = this.products.findIndex(p => p.id === product.id);
      if (productIndex !== -1 && this.products[productIndex].stock > 0) {
        this.products[productIndex].stock--;
        this.cart.push(this.products[productIndex]);
      }
    },
    //remove item from cart
    removeFromCart(id) {
      console.log('>>>>> ID', id)
      this.cart = this.cart.filter((item) => item.id !== id)
    },
    //remove all items from cart
    clearCart() {
      this.cart = [];
    }
  }
})