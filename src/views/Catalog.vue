<!--Catalog view component. It is for displaying all of products in store on one one page-->
<template>
  <!--product list-->
  <div class="products-list">
    <v-row no-gutters>
      <v-col
        v-for="product in store.products"
        :key="product.id"
        cols="12"
        sm="4"
        @click="goToProductPage(product.id)"
      ><!--redirects on product page if clicked-->
        <product-item
          :product-data="product"
          @item-clicked="goToProductPage"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-switch v-model="premium" label="Premium" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
//imports. onMounted, ref from vue composition API. productsStore from products store. useRouter from vue-router. defineComponent from vue.
import { onMounted, ref } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import ProductItem from "@/components/ProductItem.vue";
//Define Catalog View. Components: ProductItem
export default defineComponent({
  name: "CatalogView",
  components: {
    ProductItem,
  },
  
  setup() {
    
    const premium = ref(false);
    //defines the store, router and search.
    const store = productsStore();
    const router = useRouter();
    const search = ref("");
    //goToProductPage method. It redirects to the product page with the id that matches the id in the params
    const goToProductPage = (id) => {
      router.push({ name: "ProductView", params: { id } });
    };
    //fetches the products from the database on mount
    onMounted(async () => {
      await store.fetchProductsFromDB();
    });

    return {
      premium,
      store,
      search,
      goToProductPage,
    };
  },
});
</script>


<style scoped>
</style>
  