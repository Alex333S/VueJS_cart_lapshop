<!--Product component-->
<template>
  <v-sheet class="ma-2 pa-2">
    <v-card
        class="product"
    > 
      <v-img
          :src="props.productData.thumbnail"
          height="200px"
          cover
      />
    <!--Cards for product data to be displayed-->
      <v-card-title>
        {{ props.productData.brand }}
      </v-card-title>

      <v-card-subtitle>
        $ {{ props.productData.price }}
        <!--v-if to check if item In stock or not-->
        <span v-if="props.productData.stock > 0">In stock</span>
         <span v-else>- Out of stock</span>
      </v-card-subtitle>

      <v-card-text>
        {{ props.productData.description }}
      </v-card-text>
      <!--Button redirects in Product Details page-->
      <v-card-actions>
        <v-btn @click="goToProductPage(props.productData.id)">
          Add to cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
//import defineComponent from vue
  import { defineComponent } from "vue";
  export default defineComponent({
    name: 'ProductItem',
  })
</script>

<script setup>
//setup script. Imports defineProps and defineEmits from vue.
  import { defineProps, defineEmits } from 'vue'
  const props = defineProps({
    productData: {
      type: Object,
      required: true,
    },
    premiumUser: {
      type: Boolean,
      default: false,
    },
  })
  //defines the emit method
  const emit = defineEmits(["item-clicked", "update:productData"]);
  //defines go to product page method
  const goToProductPage = (productId) => {
  emit('item-clicked', productId)
  }

    
</script>