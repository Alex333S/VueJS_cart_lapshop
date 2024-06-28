<!--Cart view component. It serves the purpose of displaying items in cart and provides options: remove item from cart, proceed to check out, calculate total value in cart-->
<template>
  <!--go back to catalog button-->
  <button @click="router.push({ name: 'Catalog' })"><i class="bi bi-arrow-left"></i></button>
  <div v-if="!store.cart.length" style="text-align: center">
    <h1><i class="bi bi-cart"></i></h1>
  </div>
  <!--Cart visibility toggle-->
  <div class="cart-items" v-else>
    <div class="toggle-switch">
      <input type="checkbox" id="toggle-cart" v-model="showCart" />
      <label for="toggle-cart"></label>
    </div>
    <div v-if="showCart">
      <!--item and its details-->
      <div
        class="cart-item"
        v-for="item in store.cart"
        :key="item.id"
      >
        <div class="item-details">
          <img :src="item.thumbnail" alt="">
          <span>Price: ${{ item.price }}</span>
          <button @click="removeFromCart(item.id)"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
      <!--total price and checkout button-->
      <div class="total-price">Total Price: ${{ getTotalPrice() }}</div>
      <button @click="checkout()">Checkout</button>
      </div>
  </div>
  <modal v-if="showMessage" @close="showMessage = false">{{ message }}</modal>
</template>

<script>
//imports. defineComponent, ref from vue etc.
import { defineComponent, ref } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";
//cart view component javascript code
export default defineComponent({
  name: 'CartView',
  //setup function. Defines the store, router, showCart, showMessage, message
  setup() {
    const store = productsStore();
    const router = useRouter();
    const showCart = ref(true);
    const showMessage = ref(false);
    const message = ref('');
    //removeFromCart method. Removes item from cart
    const removeFromCart = (id) => {
      store.removeFromCart(id);
    };
    //toggleCart method. Toggles cart visibility
    const toggleCart = () => {
      showCart.value = !showCart.value;
    };
    //getTotalPrice method. Calculates total price of items in cart
    const getTotalPrice = () => {
      return store.cart.reduce((total, item) => total + item.price, 0);
    };
    //Defines the checkout method. It shows the message and clears the cart
    const checkout = () => {
      showMessage.value = true;
      message.value = `Total to pay $${getTotalPrice()} + shipping (9.99$ if you are not a premium user)`;
      store.clearCart();
    };
    //returns parameters
    return {
      store,
      router,
      showCart,
      removeFromCart,
      getTotalPrice,
      checkout,
      toggleCart,
      showMessage,
      message
    };
  }
});
</script>

<style scoped>
/*style of cart item*/
.cart-item {
  margin-top: 20px;
  margin-bottom: 32px;
  box-shadow: 0 0 1px 1px rgb(151, 145, 149);
  border-radius: 8px;
  padding: 16px;
  
}
/*item details*/
.cart-items .cart-item .item-details {
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-weight: 600;
  
}
/*image*/
.cart-items .cart-item .item-details img {
  width: 30%;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;
}
  
/*button*/
button:hover {
  background-color: #3e8e41;
}
.cart-items button
{
  background-color: #14b61a;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;
}

.cart-items .cart-item .item-details button {
  background-color: #4CAF50;
  border: none;
  color: white;
}

.cart-items .cart-item .item-details button:hover {
  background-color: #3e8e41;
}
/*toggle*/
.toggle-switch {
  display: inline-block;
  position: relative;
  margin: 0 10px;
  width: 60px;
  height: 26px;
}

.toggle-switch input[type="checkbox"] {
  display: none;
}

.toggle-switch label {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 34px;
  background-color: #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-switch label:after {
  content: "";
  display: block;
  position: absolute;
  top: 0px;
  left: 2px;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: left 0.3s ease;
}

.toggle-switch input[type="checkbox"]:checked + label {
  background-color: #2ecc71;
}

.toggle-switch input[type="checkbox"]:checked + label:after {
  left: calc(100% - 28px);
}
</style>


  