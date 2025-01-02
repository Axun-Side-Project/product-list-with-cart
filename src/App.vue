<template>

  <section class="app">
    
    <!-- Modal -->
    <OrderCompleteModal />
  
    <!-- Body -->
    
    <section class="body">
      
      <!-- Product Area -->
      <div>

        <h1 class="title">Desserts</h1>
  
        <section class="product-list">
          <Product
            v-for="product in products"
            :key="product.name"
            :product="product"
          />
        </section>
      
      </div>
      
      <!-- Cart -->
      <ProductCart />
  
    </section>

  </section>

</template>

<script lang="ts">
import OrderCompleteModal from "@/components/OrderCompleteModal.vue";
import Product from "@/components/Product.vue";
import ProductCart from "@/components/ProductCart.vue";
import productData from "@/data.json";

export default {
  name: "App",
  components: {
    OrderCompleteModal,
    Product,
    ProductCart,
  },
  computed: {
    products() {
      return productData;
    },
  },
}
</script>

<style style="scss" scoped>
section.app {
  background: #FCF8F5;
  padding: 4rem;
  section.body {
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 4rem;
    h1.title {
      color: #27140E;
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    section.product-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }
}
</style>