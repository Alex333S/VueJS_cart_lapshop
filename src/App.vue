<!--main App instance-->
<template>
  
  <header>
    <!--toolbar and "lapshop" tag-->
    <v-toolbar title="lapshop">
      <!--cart button. Redirects to cart-->
      <v-btn 
          @click="router.push({ name: 'CartView' })"
          color="primary"
          variant="elevated"
          premium="false"
      ><i class="bi bi-cart-check"></i>: {{ store.cart.length }}
      
      </v-btn>
    </v-toolbar>
  </header>
  <main>
    <!--router view-->
    <RouterView />
  </main>

</template>
<script>

</script>

<script setup>
//import store and router
  import { useRouter } from "vue-router";
  import { productsStore } from "@/stores/products";

  const router = useRouter()
  const store = productsStore()

  
</script>


<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>

