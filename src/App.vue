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

export default {
  name: "App",
  components: {
    OrderCompleteModal,
    Product,
    ProductCart,
  },
  computed: {
    products() {
      return this.$store.getters["getProductList"];
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
    grid-template-columns: 5fr 2fr;
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
@media screen and (max-width: 970px) {
  section.app {
    section.body {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
}

@media screen and (min-width: 720px) and (max-width: 970px) {
  section.app {
    section.body {
      section.product-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

@media screen and (max-width: 720px) {
  section.app {
    section.body {
      section.product-list {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>