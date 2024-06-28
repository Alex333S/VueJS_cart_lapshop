<!---ProductDetail component. Serves as separate tab for selected product. Shows its brand, description, price, shipping price and reviews--->
<template>
<!--template. Firstly there's v-btn for going back to "Catalog" with the products-->
  <div></div>
    <v-btn
        @click="router.push({ name: 'Catalog' })"
        color="green"
        variant="elevated"> <i class="bi bi-arrow-left"></i>
    
    </v-btn>
  <!--html template to show product image, brand, description, price, shipping, add to cart button, review form-->
  
    <div class="product">
      <div class="product-image">
        <img :src="selectedProduct.thumbnail" alt="">
      </div>
      
      <div class="product-details">
        
        <p class="product-stock" v-if="selectedProduct.stock > 0">
        In Stock: {{ selectedProduct.stock }}
        </p>
        
        <p class="product-out-of-stock" v-else>
        Out of Stock
        </p>
        
        <p>Brand: {{ selectedProduct.brand }}</p>
        <p>Description: {{ selectedProduct.description }}</p>
        <h2>Price: ${{ selectedProduct.price }}</h2>
        
        <!-- Display the shipping cost -->
        <p>Shipping: {{shippingCost}}</p>
        <v-btn
            variant="elevated"
            color="green"
            @click="addToCart"
        >Add to cart</v-btn>
        <!--Premium toggle-->
        <div class="premium">
        <label for="premium-toggle">Premium:</label>
        <input
          type="checkbox"
          id="premium-toggle"
          v-model="localPremium"
          true-value="true"
          false-value="false"
        />
      </div>
      <!--review component integration-->
        <review-component>Review</review-component>
      </div>
      
    </div>
  </template>
  
  
  
  
  <script>
  //ProductDetails script (vue 3 syntax)
  //import all the necessary components and libraries. After, define the store, router and route. useRouter() and useRoute() are used to get the router and route objects from the router.
  
  import { computed, ref, watch } from "vue";
  import { productsStore } from "@/stores/products";
  import { useRoute, useRouter } from "vue-router";
  import ReviewComponent from "@/components/Review.vue";
  //our component is defined as ProductDetails. It has components: ReviewComponent.
  export default {
    name: "ProductDetails",
    components: {
      "review-component": ReviewComponent,
    },
    props: {
      premium: {
        type: Boolean,
        required: true,
      },
    },
    //setup function. We define the store, router and route. We define the localPremium as ref and set it to the value of the premium prop. We define the selectedProduct as computed property. It returns the product with the id that matches the id in the route params. We define the shippingCost as computed property. It returns "Free" if the localPremium is true, otherwise it returns "$9.99". We define the addToCart method. It decreases the stock of the selectedProduct by 1 and adds the selectedProduct to the cart. We watch the localPremium and change the shippingCost accordingly.
    setup(props) {
      const store = productsStore();
      const router = useRouter();
      const route = useRoute();
      //localPremium as reference to prop premium  We define the selectedProduct as computed property. It returns the product with the id that matches the id in the route params. We define the shippingCost as computed property. It returns "Free" if the localPremium is true, otherwise it returns "$9.99". We define the addToCart method. It decreases the stock of the selectedProduct by 1 and adds the selectedProduct to the cart. We watch the localPremium and change the shippingCost accordingly.
      const localPremium = ref(props.premium);
      //selectedProduct computed. It returns the product with the id that matches the id in the route params.
      const selectedProduct = computed(() => {
        return store.products.find(
          (item) => item.id === Number(route.params.id)
        );
      });
      //shippingCost is computed value. "Free" if localPremium is true, otherwise "$9.99".
      const shippingCost = computed(() => {
        return localPremium.value ? "Free" : "$9.99";
      });
      // addToCart method. It decreases the stock of the selectedProduct by 1 and adds the selectedProduct to cart.
      const addToCart = () => {
        const newStock = selectedProduct.value.stock - 1;
        store.addToCart(selectedProduct.value);
        selectedProduct.value.stock = newStock;
      };

      watch(localPremium, (newVal) => {
        shippingCost.value = newVal ? "Free" : "$9.99";
      });

      return {
        router,
        selectedProduct,
        localPremium,
        shippingCost,
        addToCart,
      };
    },
  };
  </script>
  
  
  
  
  
  <style scoped>
  /*styling of product component (image, details, button, button hovering) */
    .product {
      display: flex;
      margin-top: 50px;
      align-items: center;
    }

    .product-image {
      margin-right: 45px;
      margin-bottom: 750px;
      width: 400px;
      height: 400px;
      object-fit: contain;
    }

    .product-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-left: 150px;
    }

    .product-details p {
      margin: 0;
      font-size: 18px;
      line-height: 1.5;
    }
  
    .product-details h2 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      margin-top: 16px;
      margin-bottom: 32px;
      margin-left: 100px;
    }

    .product-details button {
      display: flex;
      margin-top: 32px;
      margin-left: 50px;
      justify-content: center;
      padding: 16px 32px;
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      background-color: #4caf50;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    .product-details button:hover {
      background-color: #388e3c;
    }

    .product-details button:active {
      background-color: #1b5e20;
    }

    .product-details button:focus {
      outline: none;
    }

    .product .product-details .product-stock {
      color: rgba(0, 0, 0, 0.576);
      font-weight:500;
      margin-bottom: 16px;
    }
    .product .product-details .product-out-of-stock{
      color: rgba(0, 0, 0, 0.576);
      font-weight:500;
      margin-bottom: 16px;
    }

    .product .product-details .premium {
    margin-top: 20px;
    font-weight: bold;
    color: rgba(14, 107, 6, 0.596);
    }
  </style>